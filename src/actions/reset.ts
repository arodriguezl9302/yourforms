"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetTokens } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ups! no pudimos verificar su identidad" };
  }

  const { email } = validatedFields.data;

  const exisitngEmail = await getUserByEmail(email);

  if (!exisitngEmail) return { error: "Ups! no pudimos verificar su correo" };

  const passwordResetToken = await generatePasswordResetTokens(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "Se envio un correo con instrucciones para resetear tu contraseña",
  };
};
