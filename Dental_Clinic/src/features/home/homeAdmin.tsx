import { useEffect, useMemo, useState } from "react";
import { Calendar, Users, ClipboardPlus } from "lucide-react";

import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { ActivityFeed } from "../../components/home/ActivityFeed";

import type { AppointmentData } from "../../models/appointment";
import type { PatientDetails } from "../../models/patient";
import type { ConsultationSummaryResponse } from "../../models/consultationResponse";

import { getAppointments } from "../../services/AppointmentService";
import { getPatients } from "../../services/PatientService";
import { getAllConsultations } from "../../services/ConsultationService";

const PURPLE = {
  bg: "#EEEDFE",
  dark: "#3C3489",
  mid: "#534AB7",
};

const getDateOnly = (date: string) => date.split("T")[0];

const getToday = () => new Date().toISOString().split("T")[0];

const sortByTime = (appointments: AppointmentData[]) =>
  [...appointments].sort((a, b) => a.time.localeCompare(b.time));

export default function HomeAdmin() {
  const [citas, setCitas] = useState<AppointmentData[]>([]);
  const [pacientes, setPacientes] = useState<PatientDetails[]>([]);
  const [consultations, setConsultations] = useState<
    ConsultationSummaryResponse[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [appointmentsResponse, patientsResponse, consultationResponse] =
          await Promise.all([
            getAppointments(),
            getPatients(),
            getAllConsultations(),
          ]);

        setCitas(appointmentsResponse);
        setPacientes(patientsResponse);
        setConsultations(consultationResponse);
      } catch (error) {
        console.error("Error al cargar datos del administrador:", error);
        setErrorMessage("No se pudieron cargar los datos del panel.");
      }
    };

    loadHomeData();
  }, []);

  const citasHoy = useMemo(() => {
    const today = getToday();

    return sortByTime(citas.filter((cita) => getDateOnly(cita.date) === today));
  }, [citas]);

  return (
    <main className="relative isolate overflow-hidden bg-slate-50 px-4 py-5 text-sm sm:px-6 lg:px-8 2xl:px-10 2xl:text-base min-[1800px]:text-[17px]">
      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-7 2xl:gap-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8 xl:p-9">
         

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <PageGreeting
                nombre="Administración"
                colorClass="text-[#534AB7]"
              />

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Resumen general de pacientes, citas y consultas registradas en
                el sistema de la clínica.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
              <div className="rounded-2xl border border-violet-100 bg-violet-50/70 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#534AB7]">
                  Hoy
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {citasHoy.length}
                </p>
                <p className="text-xs text-slate-500">citas agendadas</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Panel
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  Admin
                </p>
                <p className="text-xs text-slate-500">vista general</p>
              </div>
            </div>
          </div>
        </section>

        {/* ERROR */}
        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
            {errorMessage}
          </div>
        )}

        {/* MAIN DASHBOARD */}
        <section className="grid grid-cols-1 gap-7 2xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="flex min-w-0 flex-col gap-7">
            {/* STATS */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6 xl:p-7">
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    Resumen administrativo
                  </h2>
                  <p className="text-sm text-slate-500">
                    Indicadores principales del sistema.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-5">
                <StatCard
                  label="Total Pacientes"
                  value={pacientes.length}
                  sub="Pacientes registrados"
                  icon={Users}
                  iconBg={PURPLE.bg}
                  iconColor={PURPLE.dark}
                  subColor={PURPLE.mid}
                />

                <StatCard
                  label="Citas Totales Hoy"
                  value={citasHoy.length}
                  sub="Agenda global del día"
                  icon={Calendar}
                  iconBg={PURPLE.bg}
                  iconColor={PURPLE.dark}
                  subColor={PURPLE.mid}
                />

                <StatCard
                  label="Consultas Registradas"
                  value={consultations.length}
                  sub="Total de consultas en el sistema"
                  icon={ClipboardPlus}
                  iconBg={PURPLE.bg}
                  iconColor={PURPLE.dark}
                  subColor={PURPLE.mid}
                />
              </div>
            </section>

            {/* QUICK ACCESS */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6 xl:p-7">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-950">
                  Acceso rápido
                </h2>
                <p className="text-sm text-slate-500">
                  Atajos a las áreas principales del panel.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-5">
                <QuickAccessButton
                  label="Ver Pacientes"
                  description="Lista de pacientes"
                  to="/patients"
                  icon={Users}
                  iconBg={PURPLE.bg}
                  iconColor={PURPLE.dark}
                  accentBorder={PURPLE.mid}
                />

                <QuickAccessButton
                  label="Ver Citas"
                  description="Agenda global"
                  to="/appointments"
                  icon={Calendar}
                  iconBg={PURPLE.bg}
                  iconColor={PURPLE.dark}
                  accentBorder={PURPLE.mid}
                />

                <QuickAccessButton
                  label="Ver Consultas"
                  description="Historial clínico completo"
                  to="/consultations"
                  icon={ClipboardPlus}
                  iconBg={PURPLE.bg}
                  iconColor={PURPLE.dark}
                  accentBorder={PURPLE.mid}
                />
              </div>
            </section>
          </div>

          {/* ACTIVITY FEED */}
          <aside className="min-w-0 2xl:sticky 2xl:top-8 2xl:self-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
              <ActivityFeed citas={citas} consultations={consultations} />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}