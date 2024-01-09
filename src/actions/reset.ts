"use server";

import { getUserByEmail } from "@/data/user";
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

  return {
    success: "Se envio un correo con instrucciones para resetear tu contraseña",
  };
};
