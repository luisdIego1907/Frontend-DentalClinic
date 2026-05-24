interface PageGreetingProps {
  nombre: string;
  colorClass: string; // e.g. "text-[#1D9E75]"
}

export function PageGreeting({ nombre, colorClass }: PageGreetingProps) {
  const fecha = new Date().toLocaleDateString("es-CR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Buenas tardes, <span className={colorClass}>{nombre}</span> 👋
      </h1>
      <p className="text-sm text-gray-500 mt-1 capitalize">{fecha}</p>
    </div>
  );
}
