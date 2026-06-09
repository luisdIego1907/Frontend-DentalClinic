import { config } from "../config";
import type { MedicalRecordData } from "../models/medicalRecordResponse";

const API_URL = `${config.api.url}/api`;

export async function getMedicalRecordByPatientId(
  patientId: number,
): Promise<MedicalRecordData> {
  try {
    const response = await fetch(
      `${API_URL}/medical-records/patient/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!response.ok) throw new Error("Error al cargar el expediente médico");
    return response.json();
  } catch (error) {
    console.log("Error en obtener el expediente médico:", error);
    throw error;
  }
}
