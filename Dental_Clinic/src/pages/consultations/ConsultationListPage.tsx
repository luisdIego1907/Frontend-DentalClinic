import { useEffect, useState } from "react";
import { getAllConsultations } from "../../services/ConsultationService";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ConsultationSummaryResponse } from "../../models/consultationResponse";

export default function ConsultationListPage() {
  const [consultations, setConsultations] = useState<
    ConsultationSummaryResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    async function loadConsultations() {
      try {
        const data = await getAllConsultations();
        setConsultations(data);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las consultas.");
      } finally {
        setLoading(false);
      }
    }
    loadConsultations();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-6 text-slate-500">Cargando consultas...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Consultas</h1>
        <p className="text-slate-500 mt-1">Historial clínico completo</p>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          <span>Fecha</span>
          <span>Paciente</span>
          <span>Odontólogo</span>
          <span>Motivo</span>
          <span className="text-right">Detalle</span>
        </div>

        {consultations.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">
            No hay consultas registradas.
          </p>
        ) : (
          consultations.map((consultation) => (
            <div
              key={consultation.consultation_id}
              className="border-b border-slate-100 last:border-none"
            >
              <div className="grid grid-cols-5 px-5 py-4 items-center hover:bg-slate-50 transition-colors">
                <span className="text-sm text-slate-700">
                  {consultation.consultation_date}
                </span>
                <span className="text-sm text-slate-700">
                  {consultation.patient_first_name}{" "}
                  {consultation.patient_last_name}
                </span>
                <span className="text-sm text-slate-700">
                  {consultation.odontologist_first_name}{" "}
                  {consultation.odontologist_last_name}
                </span>
                <span className="text-sm text-slate-700">
                  {consultation.reason}
                </span>
                <div className="flex justify-end">
                  <button
                    onClick={() => toggleExpand(consultation.consultation_id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    {expandedId === consultation.consultation_id ? (
                      <>
                        Ocultar <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        Ver detalle <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {expandedId === consultation.consultation_id && (
                <div className="px-5 pb-5 bg-slate-50 space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Diagnósticos
                    </h3>
                    {consultation.diagnoses.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        Sin diagnósticos.
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {consultation.diagnoses.map((d) => (
                          <li
                            key={d.diagnosis_id}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>
                              {d.description} —{" "}
                              <span className="text-slate-400">
                                {d.diagnosis_date}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Tratamientos
                    </h3>
                    {consultation.treatments.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        Sin tratamientos.
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {consultation.treatments.map((t) => (
                          <li
                            key={t.treatment_id}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>
                              {t.description} — ₡{t.cost.toLocaleString()} —{" "}
                              <span className="text-slate-400 capitalize">
                                {t.status}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
