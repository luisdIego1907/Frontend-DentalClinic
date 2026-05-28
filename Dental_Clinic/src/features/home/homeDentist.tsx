import { Calendar, Users, ClipboardPlus, Clock } from "lucide-react";
import { mockCitas } from "../../mocks/appointment.mock";
import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { AppointmentRow } from "../../components/home/AppointmentRow";
import { SectionHeader } from "../../components/home/SectionHeader";

const TEAL = { bg: "#E1F5EE", dark: "#0F6E56", mid: "#1D9E75" };

const citas = mockCitas.filter((c) => c.doctor === "Dr. Rojas");

export default function HomeDentist() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageGreeting nombre="Dr. Rojas" colorClass="text-[#1D9E75]" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Pacientes Asignados"
          value={28}
          sub="+3 este mes"
          icon={Users}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          subColor={TEAL.mid}
        />
        <StatCard
          label="Citas de Hoy"
          value={citas.length}
          sub={`${citas.filter((c) => c.status === "Confirmada").length} confirmadas`}
          icon={Calendar}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          subColor={TEAL.mid}
        />
        <StatCard
          label="Consultas del Mes"
          value={47}
          sub="+8% vs mes anterior"
          icon={ClipboardPlus}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          subColor={TEAL.mid}
        />
      </div>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Acceso Rápido
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <QuickAccessButton
          label="Registrar consulta"
          description="Crear una nueva consulta médica"
          to="/patients"
          icon={ClipboardPlus}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          accentBorder={TEAL.mid}
        />
        <QuickAccessButton
          label="Ver mis pacientes"
          description="Lista de pacientes asignados"
          to="/patients"
          icon={Users}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          accentBorder={TEAL.mid}
        />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader label="Citas de Hoy" icon={Clock} iconColor={TEAL.mid} />
        {citas.map((cita) => (
          <AppointmentRow
            key={cita.id}
            cita={cita}
            timeBg={TEAL.bg}
            timeColor={TEAL.dark}
          />
        ))}
      </div>
    </div>
  );
}
