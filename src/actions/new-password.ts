"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetTokens } from "@/lib/tokens";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Ups! no pudimos cambiar su contraseña" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ups! no pudimos cambiar su contraseña" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Ups! no pudimos cambiar su contraseña" };

  const hasExpires = new Date(existingToken.expires) < new Date();

  if (hasExpires) return { error: "Ups! no pudimos cambiar su contraseña" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Ups! no pudimos cambiar su contraseña" };

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "La contraseña se cambio correctamente",
  };
};
