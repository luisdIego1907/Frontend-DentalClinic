import type { AppointmentData } from "../../data/appointment";

export const initialAppointmentFormData: AppointmentData = {
  id: 0,
  patientName: "",
  date: "",
  time: "",
  durationMinutes: 15,
  reason: "",
};