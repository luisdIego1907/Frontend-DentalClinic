import type { ConsultationFormData } from "../models/consultationData";
import type { ConsultationResponse } from "../models/consultationResponse";
import { config } from "../config";
import { apiClient } from "./apiClient";

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
