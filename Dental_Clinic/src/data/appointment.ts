import type { PatientData } from "./patient";

export interface AppointmentData {
  id: number;
  patient: PatientData | null;
  date: string;
  time: string;
  durationMinutes: number;
  reason: string;
}
