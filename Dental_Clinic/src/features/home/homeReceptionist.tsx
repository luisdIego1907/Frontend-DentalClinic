import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  CalendarPlus,
  Pencil,
  ClipboardList,
  UserPlus,
} from "lucide-react";
import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { SectionHeader } from "../../components/home/SectionHeader";
import { StatusBadge } from "../../components/home/Statusbadge";
import type { AppointmentData } from "../../models/appointment";
import { getAppointments } from "../../services/AppointmentService";
import { useNavigate } from "react-router-dom";
import { getDateOnly, getToday, getTomorrow } from "../../utils/dateHelpers";

const BLUE = {
  bg: "#E6F1FB",
  dark: "#0C447C",
  mid: "#185FA5",
};

const sortByTime = (appointments: AppointmentData[]) =>
  [...appointments].sort((a, b) => a.time.localeCompare(b.time));

export default function HomeRecepcionist() {
  const [citas, setCitas] = useState<AppointmentData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const appointments = await getAppointments();
        setCitas(appointments);
      } catch (error) {
        console.error("Error al cargar citas de recepción:", error);
        setErrorMessage("No se pudieron cargar las citas.");
      }
    };

    loadAppointments();
  }, []);

  const today = getToday();
  const tomorrow = getTomorrow();

  const citasHoy = sortByTime(
    citas.filter((cita) => getDateOnly(cita.date) === today),
  );

  const citasManana = citas.filter(
    (cita) => getDateOnly(cita.date) === tomorrow,
  );

  const citasPendientes = citasHoy.filter(
    (cita) => cita.status === "Pendiente",
  );

  const citasEnEspera = citasHoy.filter((cita) => cita.status === "En espera");

  const citasMananaPendientes = citasManana.filter(
    (cita) => cita.status === "Pendiente",
  ).length;

  const proximoTurno = citasEnEspera[0]?.time ?? "Sin turnos";

  return (
    <main className="relative isolate overflow-hidden bg-slate-50 px-4 py-5 text-sm sm:px-6 sm:text-base lg:px-8 2xl:px-10 2xl:text-base min-[1800px]:text-[17px]">
      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-7 2xl:gap-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8 xl:p-9">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <PageGreeting nombre="Recepción" colorClass="text-[#185FA5]" />

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base 2xl:text-lg min-[1800px]:text-xl">
                Panel de control para gestionar citas, pacientes y el flujo de
                atención diario de la clínica.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
              <div className="rounded-2xl border border-sky-100 bg-sky-50/80 px-5 py-4 2xl:px-6 2xl:py-5 min-[1800px]:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#185FA5] 2xl:text-sm">
                  Hoy
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 2xl:text-3xl min-[1800px]:text-4xl">
                  {citasHoy.length}
                </p>

                <p className="text-xs text-slate-500 2xl:text-sm min-[1800px]:text-base">
                  citas registradas
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 2xl:px-6 2xl:py-5 min-[1800px]:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 2xl:text-sm">
                  Próximo turno
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 2xl:text-3xl min-[1800px]:text-4xl">
                  {proximoTurno}
                </p>

                <p className="text-xs text-slate-500 2xl:text-sm min-[1800px]:text-base">
                  sala de espera
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ERROR */}
        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm 2xl:text-base min-[1800px]:text-lg">
            {errorMessage}
          </div>
        )}

        {/* DASHBOARD */}
        <section className="grid grid-cols-1 gap-7 2xl:grid-cols-[minmax(0,1fr)_500px]">
          <div className="flex min-w-0 flex-col gap-7">
            {/* STATS */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6 xl:p-7">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-950 2xl:text-xl min-[1800px]:text-2xl">
                  Resumen de recepción
                </h2>

                <p className="text-sm text-slate-500 2xl:text-base min-[1800px]:text-[17px]">
                  Indicadores principales del flujo de citas.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-5">
                <StatCard
                  label="Citas de Hoy"
                  value={citasHoy.length}
                  sub={`${citasPendientes.length} pendientes de confirmar`}
                  icon={Calendar}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  subColor={BLUE.mid}
                />

                <StatCard
                  label="En Sala de Espera"
                  value={citasEnEspera.length}
                  sub={`Próx. turno: ${proximoTurno}`}
                  icon={Users}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  subColor={BLUE.mid}
                />

                <StatCard
                  label="Citas Mañana"
                  value={citasManana.length}
                  sub={`${citasMananaPendientes} sin confirmar`}
                  icon={CalendarPlus}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  subColor={BLUE.mid}
                />
              </div>
            </section>

            {/* QUICK ACCESS */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6 xl:p-7">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-950 2xl:text-xl min-[1800px]:text-2xl">
                  Acceso rápido
                </h2>

                <p className="text-sm text-slate-500 2xl:text-base min-[1800px]:text-[17px]">
                  Acciones frecuentes para recepción y agenda.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:gap-5">
                <QuickAccessButton
                  label="Registrar cita"
                  description="Nueva reserva de cita"
                  to="/appointments/schedule"
                  icon={CalendarPlus}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  accentBorder={BLUE.mid}
                />

                <QuickAccessButton
                  label="Ver citas"
                  description="Lista de citas registradas"
                  to="/appointments"
                  icon={ClipboardList}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  accentBorder={BLUE.mid}
                />

                <QuickAccessButton
                  label="Registrar paciente"
                  description="Crear nuevo perfil"
                  to="/patients/register"
                  icon={UserPlus}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  accentBorder={BLUE.mid}
                />

                <QuickAccessButton
                  label="Ver pacientes"
                  description="Lista de pacientes"
                  to="/patients"
                  icon={Users}
                  iconBg={BLUE.bg}
                  iconColor={BLUE.dark}
                  accentBorder={BLUE.mid}
                />
              </div>
            </section>
          </div>

          {/* COLA DE CITAS */}
          <aside className="min-w-0 2xl:sticky 2xl:top-32 2xl:self-start min-[1800px]:top-36">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-sm backdrop-blur">
              <div className="border-b border-slate-100 bg-gradient-to-r from-white to-sky-50/70">
                <SectionHeader
                  label="Cola de Citas — Hoy"
                  icon={Clock}
                  iconColor={BLUE.mid}
                />
              </div>

              {citasHoy.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#185FA5] 2xl:h-16 2xl:w-16">
                    <Clock className="h-7 w-7 2xl:h-8 2xl:w-8" />
                  </div>

                  <p className="text-sm font-semibold text-slate-800 2xl:text-base min-[1800px]:text-lg">
                    No hay citas registradas para hoy.
                  </p>

                  <p className="mt-1 max-w-xs text-sm text-slate-500 2xl:text-base">
                    Cuando existan citas del día, aparecerán en esta cola.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {citasHoy.map((cita) => (
                    <div
                      key={cita.id}
                      className="flex flex-col items-start gap-3 px-4 py-4 transition hover:bg-slate-50/70 sm:px-5 2xl:px-6 2xl:py-5"
                    >
                      <div className="flex w-full items-start gap-3">
                        <span
                          className="min-w-[58px] rounded-xl px-3 py-2 text-center text-sm font-bold 2xl:min-w-[68px] 2xl:text-base min-[1800px]:text-lg"
                          style={{
                            backgroundColor: BLUE.bg,
                            color: BLUE.dark,
                          }}
                        >
                          {cita.time}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="break-words text-sm font-semibold text-slate-900 2xl:text-base min-[1800px]:text-lg">
                            {cita.patient?.first_name} {cita.patient?.last_name}
                          </p>

                          <p className="mt-0.5 break-words text-xs text-slate-500 2xl:text-sm min-[1800px]:text-base">
                            {cita.doctor} · {cita.reason}
                          </p>

                          <p className="mt-1 text-xs text-slate-400 2xl:text-sm">
                            Duración: {cita.durationMinutes} min
                          </p>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <StatusBadge estado={cita.status} />

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/appointments/schedule?appointmentId=${cita.id}`,
                            )
                          }
                          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md active:scale-95 sm:w-auto 2xl:px-4 2xl:py-2.5 2xl:text-sm min-[1800px]:text-base"
                        >
                          <Pencil className="h-3.5 w-3.5 2xl:h-4 2xl:w-4" />
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
