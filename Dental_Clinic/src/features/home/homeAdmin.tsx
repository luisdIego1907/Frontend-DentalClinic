import { useEffect, useState } from "react";
import { Calendar, Users, ClipboardPlus } from "lucide-react";

import { PageGreeting } from "../../components/home/PageGreeting";
import { StatCard } from "../../components/home/StatCard";
import { QuickAccessButton } from "../../components/home/QuickAcessButton";
import { ActivityFeed } from "../../components/home/ActivityFeed";

import type { AppointmentData } from "../../models/appointment";
import type { PatientDetails } from "../../models/patient";
import type { ConsultationSummaryResponse } from "../../models/consultationResponse";

import { SectionHeader } from "../../components/home/SectionHeader";
import { StatusBadge } from "../../components/home/Statusbadge";

import { getAppointments } from "../../services/AppointmentService";
import { getPatients } from "../../services/PatientService";
import { getAllConsultations } from "../../services/ConsultationService";

const PURPLE = { bg: "#EEEDFE", dark: "#3C3489", mid: "#534AB7" };

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

  const today = getToday();

  const citasHoy = sortByTime(
    citas.filter((cita) => getDateOnly(cita.date) === today),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <PageGreeting nombre="Administración" colorClass="text-[#534AB7]" />

      {/* Error */}
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {/* STATS */}
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
          sub="Total consultas registradas"
          icon={ClipboardPlus}
          iconBg={PURPLE.bg}
          iconColor={PURPLE.dark}
          subColor={PURPLE.mid}
        />
      </div>

      {/* QUICK ACCESS */}
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Acceso Rápido
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <QuickAccessButton
          label="Ver Pacientes"
          description="Lista de Pacientes"
          to="/patients"
          icon={Users}
          iconBg={PURPLE.bg}
          iconColor={PURPLE.dark}
          accentBorder={PURPLE.mid}
        />

        <QuickAccessButton
          label="Ver citas"
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

      {/* ACTIVITY FEED */}
      <ActivityFeed citas={citas} consultations={consultations} />
    </div>
  );
}
