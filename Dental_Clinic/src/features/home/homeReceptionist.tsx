import { useEffect, useState } from "react";
import { Calendar, Users, Clock, CalendarPlus } from "lucide-react";
import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { SectionHeader } from "../../components/home/SectionHeader";
import { StatusBadge } from "../../components/home/Statusbadge";
import type { AppointmentData } from "../../models/appointment";
import { getAppointments } from "../../services/AppointmentService";

const BLUE = { bg: "#E6F1FB", dark: "#0C447C", mid: "#185FA5" };

const getDateOnly = (date: string) => date.split("T")[0];

const getToday = () => new Date().toISOString().split("T")[0];

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow.toISOString().split("T")[0];
};

const sortByTime = (appointments: AppointmentData[]) =>
  [...appointments].sort((a, b) => a.time.localeCompare(b.time));

export default function HomeRecepcionist() {
  const [citas, setCitas] = useState<AppointmentData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

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
    citas.filter((cita) => getDateOnly(cita.date) === today)
  );
  const citasManana = citas.filter((cita) => getDateOnly(cita.date) === tomorrow);
  const citasPendientes = citasHoy.filter((cita) => cita.status === "Pendiente");
  const citasEnEspera = citasHoy.filter((cita) => cita.status === "En espera");
  const proximoTurno = citasEnEspera[0]?.time ?? "Sin turnos";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageGreeting nombre="Recepción" colorClass="text-[#185FA5]" />

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
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
          sub={`${citasManana.filter((c) => c.status === "Pendiente").length} sin confirmar`}
          icon={CalendarPlus}
          iconBg={BLUE.bg}
          iconColor={BLUE.dark}
          subColor={BLUE.mid}
        />
      </div>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Acceso Rápido
      </h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
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
          icon={Calendar}
          iconBg={BLUE.bg}
          iconColor={BLUE.dark}
          accentBorder={BLUE.mid}
        />
        <QuickAccessButton
          label="Registrar paciente"
          description="Crear nuevo perfil"
          to="/patients/register"
          icon={Users}
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
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader
          label="Cola de Citas — Hoy"
          icon={Clock}
          iconColor={BLUE.mid}
        />
        {citasHoy.length === 0 ? (
          <p className="px-5 py-4 text-sm text-gray-500">
            No hay citas registradas para hoy.
          </p>
        ) : (
          citasHoy.map((cita) => (
            <div
              key={cita.id}
              className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-none"
            >
              <span
                className="text-sm font-semibold px-3 py-1.5 rounded-lg min-w-[52px] text-center"
                style={{ backgroundColor: BLUE.bg, color: BLUE.dark }}
              >
                {cita.time}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {cita.patient?.first_name} {cita.patient?.last_name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {cita.doctor} · {cita.reason}
                </p>
              </div>
              <span className="text-xs text-gray-400">
                {cita.durationMinutes} min
              </span>
              <StatusBadge estado={cita.status} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
