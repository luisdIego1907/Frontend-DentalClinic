import type { PatientDetails } from "../models/patient";

type Props = {
  patient: PatientDetails;
};

export default function PatientInfo({ patient }: Props) {
  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-sm font-semibold text-slate-500">ID</p>
        <p className="break-words text-base text-slate-800 sm:text-lg">{patient.patient_id}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Nombre completo</p>
        <p className="break-words text-base text-slate-800 sm:text-lg">{fullName}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Identificación</p>
        <p className="break-words text-base text-slate-800 sm:text-lg">{patient.identification}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Teléfono</p>
        <p className="break-words text-base text-slate-800 sm:text-lg">{patient.phone}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Dirección</p>
        <p className="break-words text-base text-slate-800 sm:text-lg">{patient.address}</p>
      </div>
    </div>
  );
}
