import type {
  ConsultationResponse,
  ConsultationSummaryResponse,
} from "../models/consultationResponse";
import { config } from "../config";
import { apiClient } from "./apiClient";
import type { ConsultationFormData } from "../models/consultationData";

const API_URL = `${config.api.url}/api`;

export async function createConsultation(
  data: ConsultationFormData,
): Promise<ConsultationResponse> {
  return apiClient<ConsultationResponse>(`${API_URL}/consultations`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getConsultationByRecordId(
  recordId: number,
): Promise<ConsultationResponse[]> {
  return apiClient<ConsultationResponse[]>(
    `${API_URL}/consultations/record/${recordId}`,
  );
}

export async function getAllConsultations(): Promise<
  ConsultationSummaryResponse[]
> {
  return apiClient<ConsultationSummaryResponse[]>(`${API_URL}/consultations`);
}
