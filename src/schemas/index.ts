import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El correo es requerido",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  email: z.string().email({
    message: "Ingrese un correo válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña minima es de 6 caracteres",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "La contraseña minima es de 6 caracteres",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Ingrese un correo válido",
  }),
});

export const FormSchema = z.object({
  name: z.string().min(4, {
    message: "El nombre del formulario es requerido",
  }),
  description: z.optional(z.string()),
});
