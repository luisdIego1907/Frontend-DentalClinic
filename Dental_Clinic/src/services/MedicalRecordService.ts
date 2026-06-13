import { config } from "../config";
import type { MedicalRecordData } from "../models/medicalRecordResponse";
import { apiClient } from "./apiClient";

const API_URL = `${config.api.url}/api`;

export async function getMedicalRecordByPatientId(
  patientId: number,
): Promise<MedicalRecordData> {
  try {
    return await apiClient<MedicalRecordData>(
      `${API_URL}/medical-records/patient/${patientId}`,
    );
  } catch (error) {
    console.error("Error en obtener el expediente médico:", error);
    throw error;
  }
}
