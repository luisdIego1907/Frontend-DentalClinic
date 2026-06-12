import type { Diagnosis } from "./diagnosis";
import type { DiagnosisResponse } from "./diagnosisResponse";
import type { Treatment } from "./treatment";
import type { TreatmentResponse } from "./treatmentResponse";

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
