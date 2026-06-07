import { z } from "zod";

export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 15;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

const usernameSchema = z
  .string()
  .trim()
  .min(1, "El nombre de usuario es obligatorio.")
  .min(
    USERNAME_MIN_LENGTH,
    `El nombre de usuario debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres.`,
  )
  .max(
    USERNAME_MAX_LENGTH,
    `El nombre de usuario debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres.`,
  );

const emailSchema = z
  .string()
  .trim()
  .min(1, "El email es obligatorio.")
  .pipe(z.email("Ingresá un correo electrónico válido."));

const passwordSchema = z
  .string()
  .min(1, "La contraseña es obligatoria.")
  .min(
    PASSWORD_MIN_LENGTH,
    `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`,
  )
  .max(
    PASSWORD_MAX_LENGTH,
    `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`,
  );

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const formatZodError = (error: z.ZodError): string =>
  error.issues[0]?.message ?? "Datos inválidos";
