"use server";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationTokens } from "@/data/tokens";
import { sendVerificationEmail } from "@/data/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Formulario inválido!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Credenciales inválidas!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationTokens(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "Se envio un correo con instrucciones para activar tu cuenta!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" };
        default:
          return { error: "Algo salio mal!" };
      }
    }

    throw error;
  }
};
