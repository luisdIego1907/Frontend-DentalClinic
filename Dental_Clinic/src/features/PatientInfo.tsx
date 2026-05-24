import type { PatientDetails } from "../data/patient";

type Props = {
  patient: PatientDetails;
};

export default function PatientInfo({ patient }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-sm font-semibold text-slate-500">ID</p>
        <p className="text-lg text-slate-800">{patient.id}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">
          Nombre completo
        </p>
        <p className="text-lg text-slate-800">{patient.name}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">
          Identificación
        </p>
        <p className="text-lg text-slate-800">{patient.identification}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Teléfono</p>
        <p className="text-lg text-slate-800">{patient.phone}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Dirección</p>
        <p className="text-lg text-slate-800">{patient.address}</p>
      </div>
    </div>
  );
}