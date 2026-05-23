import type { AppointmentData } from "../../data/appointment";

export const initialAppointmentFormData: AppointmentData = {
  id: 0,
  patient: null,
  date: "",
  time: "",
  durationMinutes: 15,
  reason: "",
};
