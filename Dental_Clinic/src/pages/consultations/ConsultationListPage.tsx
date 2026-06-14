import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

import { getAllConsultations } from "../../services/ConsultationService";
import type { ConsultationSummaryResponse } from "../../models/consultationResponse";

export default function ConsultationListPage() {
  const [consultations, setConsultations] = useState<
    ConsultationSummaryResponse[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [patientFilter, setPatientFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");

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

  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      const patient =
        `${c.patient_first_name} ${c.patient_last_name}`.toLowerCase();

      const doctor =
        `${c.odontologist_first_name} ${c.odontologist_last_name}`.toLowerCase();

      return (
        patient.includes(patientFilter.toLowerCase()) &&
        doctor.includes(doctorFilter.toLowerCase()) &&
        c.reason.toLowerCase().includes(reasonFilter.toLowerCase())
      );
    });
  }, [consultations, patientFilter, doctorFilter, reasonFilter]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          <p className="mt-6 text-slate-500">Cargando consultas...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700">
            No se pudieron cargar las consultas para este paciente
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Consultas
        </h1>

        <p className="text-slate-500 mt-1">Historial clínico completo</p>
      </div>

      {/* FILTROS */}

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <Search size={18} className="text-purple-500" />
          <h2 className="font-semibold text-slate-700">Filtrar consultas</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            type="text"
            placeholder="Paciente..."
            value={patientFilter}
            onChange={(e) => setPatientFilter(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-purple-200
            "
          />

          <input
            type="text"
            placeholder="Odontólogo..."
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-purple-200
            "
          />

          <input
            type="text"
            placeholder="Motivo..."
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-purple-200
            "
          />
        </div>
      </section>

      {/* TABLA */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-5 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
          <span>Fecha</span>
          <span>Paciente</span>
          <span>Odontólogo</span>
          <span>Motivo</span>
          <span className="text-right">Detalle</span>
        </div>

        {filteredConsultations.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">
            No se encontraron consultas.
          </p>
        ) : (
          filteredConsultations.map((consultation) => (
            <div
              key={consultation.consultation_id}
              className="border-b border-slate-100 last:border-none"
            >
              <div className="grid grid-cols-1 gap-3 px-4 py-4 transition hover:bg-slate-50 md:grid-cols-5 md:items-center md:px-5">
                <span className="text-sm text-slate-700">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400 md:hidden">
                    Fecha
                  </span>
                  {consultation.consultation_date}
                </span>

                <span className="text-sm text-slate-700">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400 md:hidden">
                    Paciente
                  </span>
                  {consultation.patient_first_name}{" "}
                  {consultation.patient_last_name}
                </span>

                <span className="text-sm text-slate-700">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400 md:hidden">
                    Odontólogo
                  </span>
                  {consultation.odontologist_first_name}{" "}
                  {consultation.odontologist_last_name}
                </span>

                <span className="break-words text-sm text-slate-700">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400 md:hidden">
                    Motivo
                  </span>
                  {consultation.reason}
                </span>

                <div className="flex justify-start md:justify-end">
                  <button
                    onClick={() => toggleExpand(consultation.consultation_id)}
                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-medium
                      text-purple-600
                      hover:text-purple-700
                    "
                  >
                    {expandedId === consultation.consultation_id ? (
                      <>
                        Ocultar
                        <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        Ver detalle
                        <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {expandedId === consultation.consultation_id && (
                <div className="space-y-5 bg-slate-50 px-4 pb-5 md:px-6">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                      Diagnósticos
                    </h3>

                    {consultation.diagnoses.length === 0 ? (
                      <p className="text-sm text-slate-400">Sin diagnósticos</p>
                    ) : (
                      <ul className="space-y-2">
                        {consultation.diagnoses.map((d) => (
                          <li
                            key={d.diagnosis_id}
                            className="text-sm text-slate-700"
                          >
                            • {d.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                      Tratamientos
                    </h3>

                    {consultation.treatments.length === 0 ? (
                      <p className="text-sm text-slate-400">Sin tratamientos</p>
                    ) : (
                      <ul className="space-y-2">
                        {consultation.treatments.map((t) => (
                          <li
                            key={t.treatment_id}
                            className="text-sm text-slate-700"
                          >
                            • {t.description} — ${t.cost.toLocaleString()} —{" "}
                            {t.status}
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
