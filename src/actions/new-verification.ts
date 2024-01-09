"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";
import { getVerificationTokenByToken } from "../data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Ups! error al activar la cuenta" };

  const hasExpires = new Date(existingToken.expires) < new Date();

  if (hasExpires) return { error: "Ups! error al activar la cuenta" };

  const existingEmail = await getUserByEmail(existingToken.email);

  if (!existingEmail) return { error: "Ups! error al activar la cuenta" };

  await db.user.update({
    where: {
      email: existingToken.email,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Cuenta vefiricada correctamente" };
};
