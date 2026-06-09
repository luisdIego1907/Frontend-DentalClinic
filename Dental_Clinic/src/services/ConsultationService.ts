import type { ConsultationFormData } from "../models/consultationData";
import type { ConsultationResponse } from "../models/consultationResponse";
import { config } from "../config";

const API_URL = `${config.api.url}/api`;

export async function createConsultation(
  data: ConsultationFormData,
): Promise<ConsultationResponse> {
  try {
    const response = await fetch(`${API_URL}/consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear la consulta");
    }

    return response.json();
  } catch (error) {
    console.error("Error en crear consulta:", error);
    throw error;
  }
}

export async function getConsultationByRecordId(
  recordId: number,
): Promise<ConsultationResponse[]> {
  try {
    const response = await fetch(
      `${API_URL}/consultations/record/${recordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al obtener la consulta");
    }
    return response.json();
  } catch (error) {
    console.error("Error en obtener el expediente de la consulta:", error);
    throw error;
  }
}
