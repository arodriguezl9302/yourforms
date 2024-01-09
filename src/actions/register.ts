"use server";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationTokens } from "@/data/tokens";
import { sendVerificationEmail } from "@/data/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Formulario inválido!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const emailExist = await getUserByEmail(email);

  if (emailExist) {
    return {
      error: "Ups! error al registrar el usuario",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationTokens(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Se envio un correo con instrucciones para activar tu cuenta",
  };
};
