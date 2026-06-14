import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Users,
  ClipboardPlus,
  Clock,
  Stethoscope,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { AppointmentRow } from "../../components/home/AppointmentRow";
import { SectionHeader } from "../../components/home/SectionHeader";

import { getToken } from "../../auth/sessionAuth";
import {
  getAppointmentDoctors,
  getAppointments,
} from "../../services/AppointmentService";

import type { AppointmentData, DoctorData } from "../../models/appointment";

const TEAL = {
  bg: "#E1F5EE",
  soft: "#F0FDF8",
  dark: "#0C447C",
  mid: "#185FA5",
  green: "#1D9E75",
};

interface JwtPayload {
  externalId?: string;
}

const getDateOnly = (date: string) => date.split("T")[0];

const getToday = () => new Date().toISOString().split("T")[0];

const getMonthOnly = (date: string) => getDateOnly(date).slice(0, 7);

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const sortByTime = (appointments: AppointmentData[]) =>
  [...appointments].sort((a, b) => a.time.localeCompare(b.time));

function decodeJwtPayload(token: string): JwtPayload {
  const payload = token.split(".")[1];

  if (!payload) {
    return {};
  }

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );

  return JSON.parse(atob(paddedBase64)) as JwtPayload;
}

function getCurrentUserResourceId() {
  const token = getToken();

  if (!token) {
    return "";
  }

  try {
    const payload = decodeJwtPayload(token);
    return payload.externalId ?? "";
  } catch {
    return "";
  }
}

function getDoctorDisplayName(doctor: DoctorData | undefined) {
  if (!doctor) {
    return "Odontólogo";
  }

  return doctor.display_name || `${doctor.first_name} ${doctor.last_name}`;
}

export default function HomeDentist() {
  const [citas, setCitas] = useState<AppointmentData[]>([]);
  const [currentDoctor, setCurrentDoctor] = useState<DoctorData | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadDentistData = async () => {
      try {
        const currentUserResourceId = getCurrentUserResourceId();

        const [appointmentsResponse, doctorsResponse] = await Promise.all([
          getAppointments(),
          getAppointmentDoctors(),
        ]);

        setCitas(
          appointmentsResponse.filter(
            (appointment) =>
              appointment.doctorUserResourceId.toLowerCase() ===
              currentUserResourceId.toLowerCase(),
          ),
        );

        setCurrentDoctor(
          doctorsResponse.find(
            (doctor) =>
              doctor.user_resource_id.toLowerCase() ===
              currentUserResourceId.toLowerCase(),
          ),
        );
      } catch (error) {
        console.error("Error al cargar datos del odontólogo:", error);
        setErrorMessage("No se pudieron cargar las citas del odontólogo.");
      }
    };

    loadDentistData();
  }, []);

  const today = getToday();
  const currentMonth = getCurrentMonth();

  const citasHoy = useMemo(
    () =>
      sortByTime(
        citas.filter(
          (cita) =>
            getDateOnly(cita.date) === today && cita.status !== "Atendida",
        ),
      ),
    [citas, today],
  );

  const citasConfirmadasHoy = useMemo(
    () => citasHoy.filter((cita) => cita.status === "Confirmada").length,
    [citasHoy],
  );

  const citasPendientesMes = useMemo(
    () =>
      citas.filter(
        (cita) =>
          getMonthOnly(cita.date) === currentMonth &&
          cita.status !== "Atendida",
      ).length,
    [citas, currentMonth],
  );

  const pacientesAsignados = useMemo(
    () =>
      new Set(
        citas
          .map((cita) => cita.patient?.patient_id)
          .filter((patientId): patientId is number => Boolean(patientId)),
      ).size,
    [citas],
  );

  const doctorName = getDoctorDisplayName(currentDoctor);

  return (
    <main className="relative isolate overflow-hidden bg-slate-50 px-4 py-5 text-sm sm:px-6 sm:text-base lg:px-8 2xl:px-10 2xl:text-base min-[1800px]:text-[17px]">
      {/* Fondo decorativo */}


      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-7 2xl:gap-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8 xl:p-9">
         

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <PageGreeting nombre={doctorName} colorClass="text-[#185FA5]" />

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base 2xl:text-lg min-[1800px]:text-xl">
                Panel clínico para revisar las citas asignadas, acceder a
                pacientes y comenzar la atención odontológica del día.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-5 py-4 2xl:px-6 2xl:py-5 min-[1800px]:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#185FA5] 2xl:text-sm">
                  Hoy
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 2xl:text-3xl min-[1800px]:text-4xl">
                  {citasHoy.length}
                </p>
                <p className="text-xs text-slate-500 2xl:text-sm min-[1800px]:text-base">
                  citas pendientes
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 2xl:px-6 2xl:py-5 min-[1800px]:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 2xl:text-sm">
                  Confirmadas
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 2xl:text-3xl min-[1800px]:text-4xl">
                  {citasConfirmadasHoy}
                </p>
                <p className="text-xs text-slate-500 2xl:text-sm min-[1800px]:text-base">
                  para atender
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
        <section className="grid grid-cols-1 gap-7 2xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="flex min-w-0 flex-col gap-7">
            {/* STATS */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6 xl:p-7">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-950 2xl:text-xl min-[1800px]:text-2xl">
                  Resumen clínico
                </h2>
                <p className="text-sm text-slate-500 2xl:text-base min-[1800px]:text-[17px]">
                  Indicadores principales de la agenda del odontólogo.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-5">
                <StatCard
                  label="Pacientes Asignados"
                  value={pacientesAsignados}
                  sub="Pacientes con citas asignadas"
                  icon={Users}
                  iconBg={TEAL.bg}
                  iconColor={TEAL.dark}
                  subColor={TEAL.mid}
                />

                <StatCard
                  label="Citas de Hoy"
                  value={citasHoy.length}
                  sub={`${citasConfirmadasHoy} confirmadas`}
                  icon={Calendar}
                  iconBg={TEAL.bg}
                  iconColor={TEAL.dark}
                  subColor={TEAL.mid}
                />

                <StatCard
                  label="Citas Pendientes del Mes"
                  value={citasPendientesMes}
                  sub="Citas asignadas no atendidas"
                  icon={ClipboardPlus}
                  iconBg={TEAL.bg}
                  iconColor={TEAL.dark}
                  subColor={TEAL.mid}
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
                  Atajos para iniciar atención o consultar información clínica.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-5">
                <QuickAccessButton
                  label="Atención de emergencia"
                  description="Seleccionar un paciente de la lista sin cita"
                  to="/patients?emergency=true"
                  icon={AlertCircle}
                  iconBg={TEAL.bg}
                  iconColor={TEAL.dark}
                  accentBorder={TEAL.mid}
                />

                <QuickAccessButton
                  label="Ver citas"
                  description="Lista de citas registradas"
                  to="/appointments"
                  icon={Calendar}
                  iconBg={TEAL.bg}
                  iconColor={TEAL.dark}
                  accentBorder={TEAL.mid}
                />

                <QuickAccessButton
                  label="Ver mis pacientes"
                  description="Lista de pacientes asignados"
                  to="/clinical-patients"
                  icon={Users}
                  iconBg={TEAL.bg}
                  iconColor={TEAL.dark}
                  accentBorder={TEAL.mid}
                />
              </div>
            </section>
          </div>

          {/* CITAS DE HOY */}
          <aside className="min-w-0 2xl:sticky 2xl:top-32 2xl:self-start min-[1800px]:top-36">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-sm backdrop-blur">
              <div className="border-b border-slate-100 bg-gradient-to-r from-white to-emerald-50/60">
                <SectionHeader
                  label="Citas de Hoy"
                  icon={Clock}
                  iconColor={TEAL.mid}
                />
              </div>

              {citasHoy.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#185FA5] 2xl:h-16 2xl:w-16">
                    <Stethoscope className="h-7 w-7 2xl:h-8 2xl:w-8" />
                  </div>

                  <p className="text-sm font-semibold text-slate-800 2xl:text-base min-[1800px]:text-lg">
                    No tiene citas para hoy.
                  </p>

                  <p className="mt-1 max-w-xs text-sm text-slate-500 2xl:text-base">
                    Cuando tenga citas asignadas, aparecerán en esta sección.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {citasHoy.map((cita) => (
                    <AppointmentRow
                      key={cita.id}
                      cita={cita}
                      timeBg={TEAL.bg}
                      timeColor={TEAL.dark}
                      actions={
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/consultations/patient/${cita.patient?.patient_id}?appointmentId=${cita.id}`,
                            )
                          }
                          className="w-full rounded-xl bg-[#185FA5] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#0C447C] sm:w-auto 2xl:px-4 2xl:py-2.5 2xl:text-base min-[1800px]:text-lg"
                        >
                          Atender
                        </button>
                      }
                    />
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