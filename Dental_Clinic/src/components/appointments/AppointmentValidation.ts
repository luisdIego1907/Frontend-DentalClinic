import type { AppointmentData } from "../../data/appointment";

export type AppointmentFormErrors = Partial<Record<keyof AppointmentData, string>>;

export function validateAppointmentForm(
  formData: AppointmentData
): AppointmentFormErrors {
  const newErrors: AppointmentFormErrors = {};

  if (!formData.patientName.trim()) {
    newErrors.patientName = "El nombre del paciente es obligatorio.";
  }

  if (!formData.date) {
    newErrors.date = "La fecha de la cita es obligatoria.";
  }

  if (!formData.time) {
    newErrors.time = "La hora de la cita es obligatoria.";
  }

  if (!formData.reason.trim()) {
    newErrors.reason = "El motivo de la cita es obligatorio.";
  }

  return newErrors;
}