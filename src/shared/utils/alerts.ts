import Swal, { type SweetAlertIcon } from "sweetalert2";

type GlassToastVariant = "info" | "success" | "error";

const GLASS_TOAST_VARIANTS: Record<
  GlassToastVariant,
  { icon: SweetAlertIcon; popupClass: string; iconClass: string; timer: number }
> = {
  info: {
    icon: "info",
    popupClass: "glass-toast glass-toast--info",
    iconClass: "glass-toast__icon glass-toast__icon--info",
    timer: 2800,
  },
  success: {
    icon: "success",
    popupClass: "glass-toast glass-toast--success",
    iconClass: "glass-toast__icon glass-toast__icon--success",
    timer: 1400,
  },
  error: {
    icon: "error",
    popupClass: "glass-toast glass-toast--error",
    iconClass: "glass-toast__icon glass-toast__icon--error",
    timer: 3200,
  },
};

const showGlassToast = (title: string, variant: GlassToastVariant) => {
  const config = GLASS_TOAST_VARIANTS[variant];

  return Swal.fire({
    toast: true,
    position: "top-end",
    icon: config.icon,
    title,
    showConfirmButton: false,
    timer: config.timer,
    customClass: {
      popup: config.popupClass,
      title: "glass-toast__title",
      icon: config.iconClass,
    },
    showClass: {
      popup: "glass-toast--show",
    },
    hideClass: {
      popup: "glass-toast--hide",
    },
  });
};

export function confirmAlert(title: string, text: string): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        void showGlassToast("Producto eliminado con éxito.", "success");
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export function successAlert(title: string) {
  return showGlassToast(title, "success");
}

export function errorAlert(title: string) {
  return showGlassToast(title, "error");
}

export function infoAlert(title: string) {
  return showGlassToast(title, "info");
}
