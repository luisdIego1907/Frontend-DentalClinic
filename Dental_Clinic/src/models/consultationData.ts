import type { Diagnosis } from "./diagnosis";
import type { Treatment } from "./treatment";

export interface ConsultationFormData {
  record_id: number;
  appointment_id?: number;
  consultation_date: string;
  reason: string;
  observations?: string;
  odontogram?: string;
  diagnoses: Diagnosis[];
  treatments: Treatment[];
}

//Datos para la consulta
