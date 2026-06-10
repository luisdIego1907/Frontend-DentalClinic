import type { AppointmentData } from "../../models/appointment";

export const initialAppointmentFormData: AppointmentData = {
  id: 0,
  patient: null,
  date: "",
  time: "",
  durationMinutes: 15,
  reason: "",
  doctor: "",
  doctorUserResourceId: "",
  status: "Pendiente",
};
