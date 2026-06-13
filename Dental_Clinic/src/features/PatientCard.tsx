import { UserRound, Phone, IdCard } from "lucide-react";
import type { PatientDetails } from "../models/patient";

type Props = {
  patient: PatientDetails;
  /*Indica si la tarjeta esta seleccionada o no.
    Opcional porque la tarjeta en si puede usarse sin seleccion*/
  selected?: boolean;

  onClick?: () => void;

  /*Funcion opcional que se ejecuta cuando se marca o desmarca el checkbox*/
  onSelect?: () => void;
};

export default function PatientCard({
  patient,
  selected = false,
  onClick,
  onSelect,
}: Props) {
  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    /*Al hacer click ejecuta onClick, navega al detalle del paciente*/
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer
        bg-white rounded-2xl border
        p-6 transition-all duration-300
        shadow-sm overflow-hidden
        hover:shadow-xl hover:-translate-y-1
        ${
          //Si la tarjeta esta seleccionada, cambia el borde y la sombra
          selected
            ? "border-sky-500 shadow-lg"
            : //sino, se mantiente normal
              "border-slate-200 hover:border-sky-300"
        }
      `}
    >
      {/*Contenedor del checkbox ubicado en la esquina superior derecha */}
      <div className="absolute top-4 right-4">
        <input
          type="checkbox"
          checked={selected}
          //Se ejecuta cuando el usuario marca o desmarca el checkbox
          onChange={(e) => {
            //Evita que el click del checkbox active tambien el click de la tarjeta
            e.stopPropagation();
            //Ejecuta la funcion de seleccion
            onSelect?.();
          }}
          // También detiene la propagación del click.
          onClick={(e) => e.stopPropagation()}
          className="
            w-5 h-5 rounded
            accent-sky-500
            cursor-pointer
          "
        />
      </div>

      {/*Contenedor de la informacion visible de la tarjeta*/}
      <div className="flex items-start gap-4">
        <div
          className="
            w-14 h-14 rounded-2xl
            bg-sky-50
            flex items-center justify-center
            text-sky-500
            transition-all duration-300
            group-hover:bg-sky-100
            group-hover:scale-110
          "
        >
          <UserRound size={28} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 truncate">
            {fullName}
          </h3>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <IdCard size={16} className="text-sky-500" />

              <span className="truncate">{patient.identification}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone size={16} className="text-sky-500" />

              <span>{patient.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          absolute bottom-0 left-0 right-0 h-1
          bg-sky-500
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          rounded-b-2xl
        "
      />
    </div>
  );
}
