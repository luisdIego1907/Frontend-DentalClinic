import { UserRound, Phone, IdCard } from "lucide-react";
import type { PatientDetails } from "../models/patient";

type Props = {
  patient: PatientDetails;
  //Indica si la tarjeta puede usarse sin selección
  selected?: boolean;
  onClick?: () => void;
  //Seleccionar opcionalmente con un checkbox
  onSelect?: () => void;
  //Validar el uso del card
  cardSelect?: boolean;
};

export default function PatientCard({
  patient,
  selected = false,
  onClick,
  onSelect,
  cardSelect = false,
}: Props) {
  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <div
      data-cy="patient-card"
      data-patient-id={patient.patient_id}
      data-patient-name={fullName}
      data-patient-identification={patient.identification}
      onClick={onClick}
      className={`
        group relative cursor-pointer
        bg-white rounded-2xl border
        p-5 transition-all duration-300 sm:p-6
        shadow-sm overflow-hidden
        hover:shadow-xl hover:-translate-y-1
        ${
          selected
            ? "border-sky-500 shadow-lg"
            : "border-slate-200 hover:border-sky-300"
        }
      `}
    >
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          data-cy="patient-select-checkbox"
          type="checkbox"
          checked={selected}
          readOnly={cardSelect}
          aria-label={`Seleccionar paciente ${fullName}`}
          onChange={
            !cardSelect
              ? (e) => {
                  e.stopPropagation();
                  onSelect?.();
                }
              : undefined
          }
          onClick={!cardSelect ? (e) => e.stopPropagation() : undefined}
          className={`
      w-5 h-5 rounded
      accent-sky-500
      ${cardSelect ? "pointer-events-none" : "cursor-pointer"}
    `}
        />
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="
            w-12 h-12 rounded-2xl sm:h-14 sm:w-14
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
          <h3
            className="truncate pr-6 text-base font-semibold text-slate-800 sm:text-lg"
            data-cy="patient-card-name"
          >
            {fullName}
          </h3>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <IdCard size={16} className="text-sky-500" />

              <span data-cy="patient-card-identification" className="truncate">
                {patient.identification}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone size={16} className="text-sky-500" />

              <span data-cy="patient-card-phone">{patient.phone}</span>
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