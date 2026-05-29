import type { ConsultationFormData } from "../../../data/consultationData";
import type { Diagnosis } from "../../../data/diagnosis";
import type { Treatment } from "../../../data/treatment";

export interface ConsultationErrors {
  consultation_date?: string;
  reason?: string;
  diagnoses: string[];
  treatments: string[];
}

export function validateConsultationForm(
  data: ConsultationFormData,
): ConsultationErrors {
  const errors: ConsultationErrors = { diagnoses: [], treatments: [] };

  if (!data.consultation_date)
    errors.consultation_date = "La fecha es requerida";

  if (!data.reason.trim()) errors.reason = "El motivo es requerido";

  errors.diagnoses = data.diagnoses.map((d: Diagnosis) =>
    !d.description.trim() ? "La descripción es requerida" : "",
  );

  errors.treatments = data.treatments.map((t: Treatment) =>
    !t.description.trim() ? "La descripción es requerida" : "",
  );

  return errors;
}

export function hasErrors(errors: ConsultationErrors): boolean {
  return !!(
    errors.consultation_date ||
    errors.reason ||
    errors.diagnoses.some((e) => e) ||
    errors.treatments.some((e) => e)
  );
}
