import type { DiagnosisResponse } from "./diagnosisResponse";
import type { TreatmentResponse } from "./treatmentResponse";

export interface ConsultationResponse {
  consultation_id: number;
  consultation_date: string;
  reason: string;
  observations?: string;
  odontogram?: string;
  diagnoses: DiagnosisResponse[];
  treatments: TreatmentResponse[];
}

export interface ConsultationSummaryResponse {
  consultation_id: number;
  consultation_date: string;
  reason: string;
  observations?: string;
  odontogram?: string;
  odontologist_first_name: string;
  odontologist_last_name: string;
  patient_first_name: string;
  patient_last_name: string;
  diagnoses: DiagnosisResponse[];
  treatments: TreatmentResponse[];
}
