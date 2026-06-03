import type { PatientDetails, PatientData } from "../data/patient";
import { config } from "../config";

const API_URL = `${config.api.url}/api/patients`;

export async function getPatients(): Promise<PatientDetails[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en patientservice: ", error);
    throw error;
  }
}

export async function getPatientById(id: number): Promise<PatientDetails> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener el paciente");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getPatientById:", error);
    throw error;
  }
}

export async function createPatient(patientData: PatientData): Promise<PatientDetails> {
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el paciente");
    }

    return await response.json();

  } catch (error) {
    console.error("Error en createPatient", error);
    throw error;
  }
}
