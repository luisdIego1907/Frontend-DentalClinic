import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  ClipboardPlus,
  Clock,
  Trash2,
  FileText,
  Link,
} from "lucide-react";
import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { SectionHeader } from "../../components/home/SectionHeader";
import { StatusBadge } from "../../components/home/Statusbadge";
import type { AppointmentData } from "../../models/appointment";
import type { PatientDetails } from "../../models/patient";
import { getAppointments } from "../../services/AppointmentService";
import { getPatients } from "../../services/PatientService";
import type { ConsultationSummaryResponse } from "../../models/consultationResponse";
import { getAllConsultations } from "../../services/ConsultationService";

const PURPLE = { bg: "#EEEDFE", dark: "#3C3489", mid: "#534AB7" };

const getDateOnly = (date: string) => date.split("T")[0];

const getToday = () => new Date().toISOString().split("T")[0];

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`;
}

const sortByTime = (appointments: AppointmentData[]) =>
  [...appointments].sort((a, b) => a.time.localeCompare(b.time));

export default function HomeAdmin() {
  const [citas, setCitas] = useState<AppointmentData[]>([]);
  const [pacientes, setPacientes] = useState<PatientDetails[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [consultations, setConsultations] = useState<
    ConsultationSummaryResponse[]
  >([]);

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

  const today = getToday();
  const citasHoy = sortByTime(
    citas.filter((cita) => getDateOnly(cita.date) === today),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageGreeting nombre="Administración" colorClass="text-[#534AB7]" />

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
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
          label="Consultas del Mes"
          value={consultations.length}
          sub="Total Consultas Registradas"
          icon={ClipboardPlus}
          iconBg={PURPLE.bg}
          iconColor={PURPLE.dark}
          subColor={PURPLE.mid}
        />
      </div>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Acceso Rápido
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <QuickAccessButton
          label="Registrar paciente"
          description="Crear nuevo expediente"
          to="/patients/register"
          icon={Users}
          iconBg={PURPLE.bg}
          iconColor={PURPLE.dark}
          accentBorder={PURPLE.mid}
        />
        <QuickAccessButton
          label="Ver citas"
          description="Agenda global de hoy"
          to="/appointments/schedule"
          icon={Calendar}
          iconBg={PURPLE.bg}
          iconColor={PURPLE.dark}
          accentBorder={PURPLE.mid}
        />
        <QuickAccessButton
          label="Consultas"
          description="Historial clínico completo"
          to="/consultations"
          icon={ClipboardPlus}
          iconBg={PURPLE.bg}
          iconColor={PURPLE.dark}
          accentBorder={PURPLE.mid}
        />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-8">
        <SectionHeader
          label="Gestión de Pacientes"
          icon={Users}
          iconColor={PURPLE.mid}
        />
        {pacientes.length === 0 ? (
          <p className="px-5 py-4 text-sm text-gray-500">
            No hay pacientes registrados.
          </p>
        ) : (
          pacientes.map((p) => (
            <div
              key={p.identification}
              className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-none"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: PURPLE.bg, color: PURPLE.dark }}
              >
                {getInitials(p.first_name, p.last_name)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {p.first_name} {p.last_name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Cédula {p.identification}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/patients/${p.identification}`}
                  className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Ver expediente
                </Link>
                <button className="flex items-center gap-1.5 text-xs text-red-600 border border-red-100 bg-red-50 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader
          label="Citas de Hoy — Vista Global"
          icon={Clock}
          iconColor={PURPLE.mid}
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
                style={{ backgroundColor: PURPLE.bg, color: PURPLE.dark }}
              >
                {cita.time}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {cita.patient?.first_name} {cita.patient?.last_name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{cita.reason}</p>
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
