import { useEffect, useState } from "react";
import type { ConsultationResponse } from "../../models/consultationResponse";
import { getConsultationByRecordId } from "../../services/ConsultationService";

const TEAL = {
  bg: "#E1F5EE",
  dark: "#0C447C",
  mid: "#185FA5",
};

export default function ConsultationHistory({
  recordId,
}: {
  recordId: number;
}) {
  const [consultations, setConsultations] = useState<ConsultationResponse[]>(
    [],
  );

  useEffect(() => {
    async function load() {
      const data = await getConsultationByRecordId(recordId);
      setConsultations(data);
    }

    load();
  }, [recordId]);

  return (
    <div className="space-y-3">
      {consultations.map((c) => (
        <div
          key={c.consultation_id}
          className="
            group
            relative
            bg-white
            border border-slate-200
            rounded-2xl
            p-4
            shadow-sm
            transition-all duration-300
            hover:shadow-md hover:-translate-y-0.5
            hover:border-slate-300
          "
        >
          {/* fecha */}
          <p className="text-xs font-medium" style={{ color: TEAL.mid }}>
            {c.consultation_date}
          </p>

          {/* motivo */}
          <p className="text-sm font-semibold text-slate-800 mt-1">
            {c.reason}
          </p>

          {/* observaciones */}
          <p className="text-sm text-slate-600 mt-2">{c.observations}</p>

          {/* barra inferior estilo sistema */}
          <div
            className="
              absolute bottom-0 left-0 right-0 h-1
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              rounded-b-2xl
            "
            style={{ backgroundColor: TEAL.mid }}
          />
        </div>
      ))}
    </div>
  );
}
