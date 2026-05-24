import { BackButton } from "./BackButton";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Error 404
        </p>

        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Página no encontrada
        </h1>

        <p className="mb-8 text-slate-600">
          La página que estás buscando no existe o fue movida a otra ubicación.
        </p>

        <BackButton />
      </section>
    </main>
  );
}
