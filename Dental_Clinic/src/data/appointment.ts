import type { PatientData } from "./patient";
export type StatusAppointment = "Confirmada" | "Pendiente" | "En espera";
export interface AppointmentData {
  id: number;
  patient: PatientData | null;
  date: string;
  time: string;
  durationMinutes: number;
  reason: string;
  doctor: string;
  status: StatusAppointment;
}
