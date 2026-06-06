import { FormMode } from "./form-mode";

export const AUTH_COPY = {
  [FormMode.LOGIN]: {
    title: "INICIAR SESIÓN",
    description: "Ingresá con tu email y contraseña para acceder a tu cuenta.",
    footerPrompt: "¿No tenés cuenta?",
    footerAction: "Registrate",
  },
  [FormMode.REGISTER]: {
    title: "CREAR CUENTA",
    description: "Completá tus datos para registrarte en IXP-POK-FRONT.",
    footerPrompt: "¿Ya tenés cuenta?",
    footerAction: "Iniciá sesión",
  },
} as const;
