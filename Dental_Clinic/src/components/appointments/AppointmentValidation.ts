import type { AppointmentData } from "../../data/appointment";

export type AppointmentFormErrors = Partial<Record<keyof AppointmentData, string>>;

export function validateAppointmentForm(
  formData: AppointmentData
): AppointmentFormErrors {
  const newErrors: AppointmentFormErrors = {};

  const [hour, minutes] = formData.time.split(":");

  if (!formData.patient) {
    newErrors.patient = "El paciente es obligatorio.";
  }

  if (!formData.date) {
    newErrors.date = "La fecha de la cita es obligatoria.";
  }

  if (!formData.doctor.trim()) {
    newErrors.doctor = "El doctor es obligatorio.";
  }

  if (!hour || !minutes) {
    newErrors.time = "La hora de la cita es obligatoria.";
  }

  if (!formData.reason.trim()) {
    newErrors.reason = "El motivo de la cita es obligatorio.";
  }

  return newErrors;
}
