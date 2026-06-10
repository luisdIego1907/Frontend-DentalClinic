import type { MedicalRecordData } from "../../models/medicalRecordResponse";

type Props = {
  medicalRecord: MedicalRecordData;
};

export default function MedicalRecordInfo({ medicalRecord }: Props) {
  const isActive = medicalRecord.status?.toUpperCase() === "ACTIVE";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-slate-500">Historial médico</p>

        <p className="mt-1 whitespace-pre-wrap break-words text-lg text-slate-800">
          {medicalRecord.medical_history || "No registrado"}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Alergias</p>

        <p className="mt-1 whitespace-pre-wrap break-words text-lg text-slate-800">
          {medicalRecord.allergies || "No registradas"}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Notas generales</p>

        <p className="mt-1 whitespace-pre-wrap break-words text-lg text-slate-800">
          {medicalRecord.general_notes || "Sin notas"}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Estado</p>

        <span
          className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {medicalRecord.status}
        </span>
      </div>
    </div>
  );
}
