import type { PatientData, PatientDetails} from "../../data/patient";

/*
  Se crea un tipo llamado PatientFormErrors
  Significa que un obejto puede tener como claves los mismos campos de PatientData (predeterminados) y
  como valor un mensaje de error tipo string.

  keyof PatientData: este obtiene el nombre de las propiedades de PatientData.
  Record<keyof PatientData, string> : Crea un objeto donde todas las propiedades de PatientData deberian existir y tener un string
  Partial<> : Hace que propiedades sean opcionales. Puede que no todos los campos tengan error.
*/ 
export type PatientFormErrors = Partial<Record<keyof PatientData, string>>;

export type PatientEditFormErrors = Partial<
  Record<keyof PatientDetails, string>
>;

export function validatePatientForm(formData: PatientData): PatientFormErrors {

  /*
    Se crea un objeto vacio llmado newErrors
    Donde se guardan los errorres
  */
  const newErrors: PatientFormErrors = {};

  if (!formData.identification.trim()) {
    newErrors.identification = "La identificación es obligatoria.";
  }

  if (!formData.first_name.trim()) {
    newErrors.first_name = "El nombre es obligatorio.";
  }

  if (!formData.last_name.trim()) {
    newErrors.last_name = "El apellido es obligatorio.";
  }

  if (!formData.birth_date) {
    newErrors.birth_date = "La fecha de nacimiento es obligatoria.";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "El teléfono es obligatorio.";
  }

  if (!formData.email.trim()) {
    newErrors.email = "El correo es obligatorio.";
  }

  if (!formData.address.trim()) {
    newErrors.address = "La dirección es obligatoria.";
  }

  if (!formData.gender) {
    newErrors.gender = "El género es obligatorio.";
  }

  if (!formData.status) {
    newErrors.status = "El estado es obligatorio.";
  }

  /*
    Devuelve el objeto con todos los errores
    Si no hubo, devuelve vacio
  */ 
  return newErrors;
}

export function validatePatientEditForm(
  formData: PatientDetails
): PatientEditFormErrors {
  const newErrors: PatientEditFormErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "El nombre completo es obligatorio.";
  }

  if (!formData.identification.trim()) {
    newErrors.identification = "La identificación es obligatoria.";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "El teléfono es obligatorio.";
  }

  if (!formData.address.trim()) {
    newErrors.address = "La dirección es obligatoria.";
  }

  return newErrors;
}