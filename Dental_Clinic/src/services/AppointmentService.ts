import { config } from "../config";
import type {
  AppointmentData,
  DoctorData,
  SaveAppointmentRequest,
} from "../data/appointment";
import { apiClient } from "./apiClient";

const API_URL = `${config.api.url}/api/appointments`;

export async function getAppointments(): Promise<AppointmentData[]> {
  try {
    return await apiClient<AppointmentData[]>(API_URL);
  } catch (error) {
    console.error("Error en getAppointments:", error);
    throw error;
  }
}

export async function getAppointmentDoctors(): Promise<DoctorData[]> {
  try {
    return await apiClient<DoctorData[]>(`${API_URL}/odontologists`);
  } catch (error) {
    console.error("Error en getAppointmentDoctors:", error);
    throw error;
  }
}

export async function createAppointment(
  appointmentData: SaveAppointmentRequest
): Promise<AppointmentData> {
  try {
    return await apiClient<AppointmentData>(API_URL, {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  } catch (error) {
    console.error("Error en createAppointment:", error);
    throw error;
  }
}

export async function updateAppointment(
  id: number,
  appointmentData: SaveAppointmentRequest
): Promise<void> {
  try {
    await apiClient<void>(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    });
  } catch (error) {
    console.error("Error en updateAppointment:", error);
    throw error;
  }
}
