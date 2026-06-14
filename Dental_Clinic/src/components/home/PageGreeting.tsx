interface PageGreetingProps {
  nombre: string;
  colorClass: string;
}

export function PageGreeting({ nombre, colorClass }: PageGreetingProps) {
  const fecha = new Date().toLocaleDateString("es-CR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-6 2xl:mb-7 min-[1800px]:mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl 2xl:text-4xl min-[1800px]:text-5xl">
        Buenas tardes,{" "}
        <span className={colorClass}>{nombre}</span>
      </h1>

      <p className="mt-2 text-sm capitalize text-slate-500 sm:text-base 2xl:text-lg min-[1800px]:text-xl">
        {fecha}
      </p>
    </div>
  );
}