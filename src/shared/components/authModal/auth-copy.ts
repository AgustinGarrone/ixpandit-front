import { FormMode } from "./form-mode";

export const AUTH_COPY = {
  [FormMode.LOGIN]: {
    title: "Iniciá sesión",
    description: "Ingresá con tu email y contraseña para guardar favoritos y abrir huevos misteriosos.",
    footerPrompt: "¿No tenés cuenta?",
    footerAction: "Crear cuenta",
  },
  [FormMode.REGISTER]: {
    title: "Creá tu cuenta",
    description: "Registrate para explorar el catálogo, guardar Pokémon y vivir la aventura.",
    footerPrompt: "¿Ya tenés cuenta?",
    footerAction: "Iniciar sesión",
  },
} as const;
