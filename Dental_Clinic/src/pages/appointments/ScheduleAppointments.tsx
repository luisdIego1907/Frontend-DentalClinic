import { useState } from "react";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import type { AppointmentData } from "../../data/appointment";
import type { PatientData } from "../../data/patient";

const mockPatients: PatientData[] = [
  {
    identification: "1-1902-1157",
    first_name: "María",
    last_name: "González",
    birth_date: "1998-04-12",
    phone: "8743-3451",
    email: "mariaza06@gmail.com",
    address: "San José, Costa Rica",
    gender: "Femenino",
    status: "Activo",
  },
  {
    identification: "3-4421-4254",
    first_name: "Carlos",
    last_name: "Ramírez",
    birth_date: "1995-09-23",
    phone: "6543-8634",
    email: "carlosram82@gmail.com",
    address: "Cartago, Costa Rica",
    gender: "Masculino",
    status: "Inactivo",
  },
  {
    identification: "2-6282-4595",
    first_name: "Antonio",
    last_name: "Ramos",
    birth_date: "1991-01-12",
    phone: "3485-9951",
    email: "antamos44@gmail.com",
    address: "San José, Costa Rica",
    gender: "Masculino",
    status: "Activo",
  },
];

const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const convertMinutesToTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const formatDateToDayMonthYear = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const getAppointmentEndTime = (time: string, durationMinutes: number) => {
  const startMinutes = convertTimeToMinutes(time);
  const endMinutes = startMinutes + durationMinutes;

  return convertMinutesToTime(endMinutes);
};

export default function ScheduleAppointments() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([
    {
      id: 1,
      patient: mockPatients[0],
      date: "2026-07-06",
      time: "07:30",
      durationMinutes: 30,
      reason: "Limpieza dental",
    },
  ]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveAppointment = (appointmentData: AppointmentData) => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!appointmentData.patient || appointmentData.patient.status !== "Activo") {
      setErrorMessage("No se puede agendar una cita para un paciente inactivo.");
      return;
    }

    const newStart = convertTimeToMinutes(appointmentData.time);
    const newEnd = newStart + appointmentData.durationMinutes;

    const appointmentExists = appointments.some((appointment) => {
      if (appointment.date !== appointmentData.date) {
        return false;
      }

      const existingStart = convertTimeToMinutes(appointment.time);
      const existingEnd = existingStart + appointment.durationMinutes;

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (appointmentExists) {
      setErrorMessage("El horario seleccionado no se encuentra disponible.");
      return;
    }

    const newAppointment: AppointmentData = {
      ...appointmentData,
      id: appointments.length + 1,
    };

    setAppointments([...appointments, newAppointment]);
    setSuccessMessage("Cita agendada correctamente.");
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }

    return a.time.localeCompare(b.time);
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Citas
          </span>

          <h1 className="text-3xl font-bold text-gray-900">Agendar cita</h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Complete la información necesaria para registrar una cita odontológica.
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700 shadow-sm">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
            {errorMessage}
          </div>
        )}

        <AppointmentForm patients={mockPatients} onSubmit={handleSaveAppointment} />

        <div className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Citas agendadas</h2>
          <p className="mt-1 text-sm text-gray-500">
            Vista simulada del calendario y del tab “Citas” del paciente.
          </p>

          <div className="mt-6 space-y-4">
            {sortedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <p className="font-semibold text-gray-900">
                  {appointment.patient
                    ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
                    : "Paciente no seleccionado"}
                </p>

                {appointment.patient && (
                  <p className="text-sm text-gray-600">
                    Identificación: {appointment.patient.identification}
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  Fecha: {formatDateToDayMonthYear(appointment.date)}
                </p>

                <p className="text-sm text-gray-600">
                  Horario: {appointment.time} -{" "}
                  {getAppointmentEndTime(
                    appointment.time,
                    appointment.durationMinutes
                  )}
                </p>

                <p className="text-sm text-gray-600">
                  Motivo: {appointment.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}