import type { PatientDetails } from "../models/patient";

type Props = {
  patient: PatientDetails;
};

export default function PatientInfo({ patient }: Props) {
  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"
      data-cy="patient-detail-info">
      <div>
        <p className="text-sm font-semibold text-slate-500">ID</p>
        <p data-cy="patient-detail-id" className="break-words text-base text-slate-800 sm:text-lg">{patient.patient_id}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Nombre completo</p>
        <p data-cy="patient-detail-full-name" className="break-words text-base text-slate-800 sm:text-lg">{fullName}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Identificación</p>
        <p data-cy="patient-detail-identification" className="break-words text-base text-slate-800 sm:text-lg">{patient.identification}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Teléfono</p>
        <p data-cy="patient-detail-phone" className="break-words text-base text-slate-800 sm:text-lg">{patient.phone}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Dirección</p>
        <p data-cy="patient-detail-address" className="break-words text-base text-slate-800 sm:text-lg">{patient.address}</p>
      </div>
    </div>
  );
}
