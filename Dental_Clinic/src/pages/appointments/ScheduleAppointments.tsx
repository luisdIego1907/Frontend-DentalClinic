import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import type {
  AppointmentData,
  DoctorData,
  SaveAppointmentRequest,
} from "../../models/appointment";
import { getPatients } from "../../services/PatientService";
import {
  createAppointment,
  getAppointmentDoctors,
  getAppointments,
  updateAppointment,
} from "../../services/AppointmentService";
import type { PatientDetails } from "../../models/patient";

interface ScheduleAppointmentsLocationState {
  appointmentToEdit?: AppointmentData | null;
}

const getDateOnly = (date: string) => date.split("T")[0];

const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const mapAppointmentToRequest = (
  appointmentData: AppointmentData,
): SaveAppointmentRequest => ({
  patient_id: appointmentData.patient?.patient_id ?? 0,
  doctor_user_resource_id: appointmentData.doctorUserResourceId,
  appointment_date: appointmentData.date,
  appointment_time: appointmentData.time,
  duration_minutes: appointmentData.durationMinutes,
  reason: appointmentData.reason,
  status: appointmentData.status || "Pendiente",
});

export default function ScheduleAppointments() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentToEdit =
    (location.state as ScheduleAppointmentsLocationState | null)
      ?.appointmentToEdit ?? null;
  const isEditing = appointmentToEdit !== null;

  const [patients, setPatients] = useState<PatientDetails[]>([]);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitButtonErrorSignal, setSubmitButtonErrorSignal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadAppointmentData = async () => {
    const [patientsResponse, doctorsResponse, appointmentsResponse] =
      await Promise.all([
        getPatients(),
        getAppointmentDoctors(),
        getAppointments(),
      ]);

    setPatients(patientsResponse);
    setDoctors(doctorsResponse);
    setAppointments(appointmentsResponse);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await loadAppointmentData();
      } catch (error) {
        console.error("Error al cargar datos para registrar citas:", error);
        setErrorMessage("No se pudieron cargar los datos para registrar citas.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCancelEdit = () => {
    navigate("/appointments");
  };

  const handleSaveAppointment = async (
    appointmentData: AppointmentData,
  ): Promise<boolean> => {
    setSuccessMessage("");
    setErrorMessage("");

    if (
      !appointmentData.patient ||
      appointmentData.patient.status === "Inactivo" ||
      appointmentData.patient.status.toLowerCase() === "inactive"
    ) {
      setErrorMessage(
        "No se puede agendar una cita para un paciente inactivo.",
      );
      return false;
    }

    if (!appointmentData.doctorUserResourceId) {
      setErrorMessage("Debe seleccionar un odontólogo.");
      return false;
    }

    const newStart = convertTimeToMinutes(appointmentData.time);
    const newEnd = newStart + appointmentData.durationMinutes;

    const appointmentExists = appointments.some((appointment) => {
      if (isEditing && appointment.id === appointmentData.id) {
        return false;
      }

      if (getDateOnly(appointment.date) !== getDateOnly(appointmentData.date)) {
        return false;
      }

      if (
        appointment.doctorUserResourceId !==
        appointmentData.doctorUserResourceId
      ) {
        return false;
      }

      const existingStart = convertTimeToMinutes(appointment.time);
      const existingEnd = existingStart + appointment.durationMinutes;

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (appointmentExists) {
      setErrorMessage(
        "El odontólogo seleccionado ya tiene una cita en ese horario.",
      );
      setSubmitButtonErrorSignal((currentValue) => currentValue + 1);
      return false;
    }

    try {
      const request = mapAppointmentToRequest(appointmentData);

      if (isEditing) {
        await updateAppointment(appointmentData.id, request);
        navigate("/appointments");
        return true;
      }

      const newAppointment = await createAppointment(request);

      setAppointments((currentAppointments) => [
        ...currentAppointments,
        newAppointment,
      ]);
      setSuccessMessage("Cita agendada correctamente.");
      return true;
    } catch (error) {
      console.error(
        isEditing ? "Error al modificar la cita:" : "Error al registrar la cita:",
        error,
      );
      setErrorMessage(
        isEditing ? "No se pudo modificar la cita." : "No se pudo registrar la cita.",
      );
      setSubmitButtonErrorSignal((currentValue) => currentValue + 1);
      return false;
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:py-10">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:mb-8 sm:p-6">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Citas
          </span>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {isEditing ? "Modificar cita" : "Registrar cita"}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            {isEditing
              ? "Actualice la información de la cita seleccionada."
              : "Complete la información necesaria para registrar una cita odontológica."}
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm font-medium text-green-700 shadow-sm sm:px-5">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700 shadow-sm sm:px-5">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl bg-white p-5 text-sm text-gray-600 shadow-lg sm:p-8">
            Cargando datos para registrar citas...
          </div>
        ) : (
          <AppointmentForm
            patients={patients}
            doctors={doctors}
            onSubmit={handleSaveAppointment}
            appointmentToEdit={appointmentToEdit}
            onCancelEdit={handleCancelEdit}
            submitButtonErrorSignal={submitButtonErrorSignal}
          />
        )}
      </section>
    </main>
  );
}
