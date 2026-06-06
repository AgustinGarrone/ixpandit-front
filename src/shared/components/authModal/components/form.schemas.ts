import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 15;
export const PASSWORD_REGEX = /^.{6,15}$/;

const passwordSchema = z
  .string()
  .regex(
    PASSWORD_REGEX,
    `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres`,
  );

export const registerSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.email("Ingrese un correo electrónico válido"),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.email("Ingrese un correo electrónico válido"),
  password: passwordSchema,
});