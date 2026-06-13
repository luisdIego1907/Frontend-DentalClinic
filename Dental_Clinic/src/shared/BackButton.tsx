import { useAuth } from "../hook/useAuth";

//Boton reutilizable para volver al home del rol, se puede usar en cualquier parte de la app
export function BackButton() {
  const { goHome } = useAuth();

  return (
    <button
      onClick={goHome}
      className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
    >
      Volver al Inicio
    </button>
  );
}
