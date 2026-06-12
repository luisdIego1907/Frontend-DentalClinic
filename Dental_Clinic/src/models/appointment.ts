import type { PatientDetails } from "./patient";

export type StatusAppointment =
  | "Confirmada"
  | "Pendiente"
  | "En espera"
  | "Atendida";

export interface DoctorData {
  user_resource_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  display_name: string;
}

export interface AppointmentData {
  id: number;
  patient: PatientDetails | null;
  date: string;
  time: string;
  durationMinutes: number;
  reason: string;
  doctor: string;
  doctorUserResourceId: string;
  status: StatusAppointment;
}

export interface SaveAppointmentRequest {
  patient_id: number;
  doctor_user_resource_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  reason: string;
  status: StatusAppointment;
}
