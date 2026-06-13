import type { PatientData } from "../../../models/patient";

export const initialPatientFormData: PatientData = {
  identification: "",
  first_name: "",
  last_name: "",
  birth_date: "",
  phone: "",
  email: "",
  address: "",
  gender: "",
  status: "Activo",
};
