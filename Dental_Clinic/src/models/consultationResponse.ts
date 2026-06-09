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
