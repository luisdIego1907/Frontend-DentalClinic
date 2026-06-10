import type { PatientDetails, PatientData } from "../models/patient";
import { config } from "../config";
import { apiClient } from "./apiClient";

const API_URL = `${config.api.url}/api/patients`;

export async function getPatients(): Promise<PatientDetails[]> {
  try {
    return await apiClient<PatientDetails[]>(API_URL);
  } catch (error) {
    console.error("Error en patientservice: ", error);
    throw error;
  }
}

export async function getPatientById(id: number): Promise<PatientDetails> {
  try {
    return await apiClient<PatientDetails>(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error en getPatientById:", error);
    throw error;
  }
}

export async function createPatient(
  patientData: PatientData,
): Promise<PatientDetails> {
  try {
    return await apiClient<PatientDetails>(API_URL, {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  } catch (error) {
    console.error("Error en createPatient:", error);
    throw error;
  }
}

export async function deletePatient(id: number): Promise<void> {
  try {
    await apiClient<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error en deletePatient:", error);
    throw error;
  }
}

export async function updatePatient(
  id: number,
  patientData: PatientData,
): Promise<void> {
  try {
    await apiClient<void>(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(patientData),
    });
  } catch (error) {
    console.error("Error en updatePatient:", error);
    throw error;
  }
}
//Pacientes del odontologo, ya que este necesita ver solo los pacientes con los que tiene cita
export async function getMyPatients(): Promise<PatientDetails[]> {
  try {
    return await apiClient<PatientDetails[]>(
      `${config.api.url}/api/appointments/my-patients`,
    );
  } catch (error) {
    console.error("Error en getMyPatients:", error);
    throw error;
  }
}
