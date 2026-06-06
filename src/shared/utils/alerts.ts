import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Eliminado!",
          text: "Producto eliminado con éxito.",
          icon: "success",
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export function successAlert(title: string) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 1000,
  });
}

export function errorAlert(title: string) {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title,
    showConfirmButton: false,
    timer: 1000,
  });
}
