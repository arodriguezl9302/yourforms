"use server";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
  generateTwoFactorAuthenticationToken,
  generateVerificationTokens,
} from "@/lib/tokens";
import { sendTwoFactorSendEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactoConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Formulario inválido!" };
  }

  const { email, password, code } = validatedFields.data;

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

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: "Error al comprobar 2Fa" };
      if (twoFactorToken.token != code)
        return { error: "Error al comprobar 2Fa" };

      const hasExpires = new Date(twoFactorToken.expires) < new Date();

      if (hasExpires) return { error: "Error al comprobar 2Fa" };

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactoConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactoToken = await generateTwoFactorAuthenticationToken(
        existingUser.email
      );
      await sendTwoFactorSendEmail(twoFactoToken.email, twoFactoToken.token);

      return {
        success: "Se envio un correo con el código 2Fa!",
        twoFactor: true,
      };
    }
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
