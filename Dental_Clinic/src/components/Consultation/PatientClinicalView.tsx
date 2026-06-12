import { useEffect, useState } from "react";
import type { PatientDetails } from "../../models/patient";
import type { ConsultationResponse } from "../../models/consultationResponse";

import { getMedicalRecordByPatientId } from "../../services/MedicalRecordService";
import { getConsultationByRecordId } from "../../services/ConsultationService";

type Props = {
  patient: PatientDetails;
};

export default function PatientClinicalView({ patient }: Props) {
  const [recordId, setRecordId] = useState<number | null>(null);
  const [consultations, setConsultations] = useState<ConsultationResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setConsultations([]);

      try {
        const record = await getMedicalRecordByPatientId(patient.patient_id);
        setRecordId(record.record_id);

        const history = await getConsultationByRecordId(record.record_id);
        setConsultations(history);
      } catch (error) {
        console.error("Error cargando historial clínico:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [patient.patient_id]);

  return (
    <div className="space-y-6">
      {/* HISTORIAL */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-slate-800 mb-4">
          Historial de consultas
        </h2>

        {loading && <p className="text-slate-500 text-sm">Cargando...</p>}

        {!loading && consultations.length === 0 && (
          <p className="text-slate-500 text-sm">Sin consultas registradas</p>
        )}

        {!loading && consultations.length > 0 && (
          <div className="space-y-3">
            {consultations.map((c) => (
              <div
                key={c.consultation_id}
                className="
                group
                relative
                bg-white
                border border-sky-100
                rounded-2xl
                p-4
                shadow-sm
                transition-all duration-300
                hover:shadow-md hover:-translate-y-0.5
                hover:border-sky-200
              "
              >
                {/* fecha */}
                <p className="text-xs text-sky-500 font-medium">
                  {c.consultation_date}
                </p>

                {/* motivo */}
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {c.reason}
                </p>

                {/* observaciones */}
                <p className="text-sm text-slate-600 mt-2">{c.observations}</p>

                {/* barra inferior */}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
