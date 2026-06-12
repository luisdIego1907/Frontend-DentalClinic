import { useEffect, useState } from "react";
import { Calendar, Users, ClipboardPlus, Clock } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

const TEAL = { bg: "#E1F5EE", dark: "#0C447C", mid: "#185FA5" };

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
  const citasHoy = sortByTime(
    citas.filter(
      (cita) => getDateOnly(cita.date) === today && cita.status !== "Atendida",
    ),
  );
  const consultasMes = citas.filter(
    (cita) =>
      getMonthOnly(cita.date) === currentMonth && cita.status !== "Atendida",
  ).length;
  const pacientesAsignados = new Set(
    citas
      .map((cita) => cita.patient?.patient_id)
      .filter((patientId): patientId is number => Boolean(patientId)),
  ).size;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageGreeting
        nombre={getDoctorDisplayName(currentDoctor)}
        colorClass="text-[#1D9E75]"
      />

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
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
          sub={`${citasHoy.filter((c) => c.status === "Confirmada").length} confirmadas`}
          icon={Calendar}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          subColor={TEAL.mid}
        />
        <StatCard
          label="Consultas del Mes"
          value={consultasMes}
          sub="Citas asignadas este mes"
          icon={ClipboardPlus}
          iconBg={TEAL.bg}
          iconColor={TEAL.dark}
          subColor={TEAL.mid}
        />
      </div>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Acceso Rápido
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <QuickAccessButton
          label="Atención de emergencia"
          description="Seleccionar un paciente de la lista sin cita"
          to="/patients?emergency=true"
          icon={ClipboardPlus}
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
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader label="Citas de Hoy" icon={Clock} iconColor={TEAL.mid} />
        {citasHoy.length === 0 ? (
          <p className="px-5 py-4 text-sm text-gray-500">
            No tiene citas registradas para hoy.
          </p>
        ) : (
          citasHoy.map((cita) => (
            <AppointmentRow
              key={cita.id}
              cita={cita}
              timeBg={TEAL.bg}
              timeColor={TEAL.dark}
              actions={
                <button
                  onClick={() =>
                    navigate(
                      `/consultations/patient/${cita.patient?.patient_id}?appointmentId=${cita.id}`,
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#185FA5] text-white text-sm font-medium hover:bg-[#0C447C] transition"
                >
                  Atender
                </button>
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
