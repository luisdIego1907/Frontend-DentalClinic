import { Calendar, Users, Clock, CalendarPlus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageGreeting } from "../../components/home/PageGreeting";
import { mockCitas } from "../../mocks/appointment.mock";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { SectionHeader } from "../../components/home/SectionHeader";
import { StatusBadge } from "../../components/home/Statusbadge";

const BLUE = { bg: "#E6F1FB", dark: "#0C447C", mid: "#185FA5" };

const citas = mockCitas;

export default function HomeRecepcionist() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageGreeting nombre="Recepción" colorClass="text-[#185FA5]" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Citas de Hoy"
          value={citas.length}
          sub={`${citas.filter((c) => c.status === "Pendiente").length} pendientes de confirmar`}
          icon={Calendar}
          iconBg={BLUE.bg}
          iconColor={BLUE.dark}
          subColor={BLUE.mid}
        />
        <StatCard
          label="En Sala de Espera"
          value={citas.filter((c) => c.status === "En espera").length}
          sub="Próx. turno: 10:30"
          icon={Users}
          iconBg={BLUE.bg}
          iconColor={BLUE.dark}
          subColor={BLUE.mid}
        />
        <StatCard
          label="Citas Mañana"
          value={17}
          sub="2 sin confirmar"
          icon={CalendarPlus}
          iconBg={BLUE.bg}
          iconColor={BLUE.dark}
          subColor={BLUE.mid}
        />
      </div>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Acceso Rápido
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
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
          label="Registrar paciente"
          description="Crear nuevo perfil"
          to="/patients/register"
          icon={Users}
          iconBg={BLUE.bg}
          iconColor={BLUE.dark}
          accentBorder={BLUE.mid}
        />
        <QuickAccessButton
          label="Ver Pacientes"
          description="Agenda completa del día"
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
        {citas.map((cita) => (
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
            <button
              type="button"
              onClick={() => navigate(`/appointments/schedule?appointmentId=${cita.id}`)}
              className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md active:scale-95"
            >
              <Pencil className="w-3.5 h-3.5" />
              Editar
            </button>
            <StatusBadge estado={cita.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
