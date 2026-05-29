import { useState } from "react";
import type { ConsultationFormData } from "../../../data/consultationData";
import { validateConsultationForm, hasErrors } from "./ConsultationValidation";
import type { ConsultationErrors } from "./ConsultationValidation";
import GeneralTab from "./GeneralTab";
import DiagnosesTab from "./DiagnosesTab";
import TreatmentsTab from "./TreatmentTab";

type SubTab = "general" | "diagnoses" | "treatments";

type Props = {
  recordId: number;
  appointmentId?: number;
  onSave: (data: ConsultationFormData) => void;
  onCancel: () => void;
};

const initialForm = (
  recordId: number,
  appointmentId?: number,
): ConsultationFormData => ({
  record_id: recordId,
  appointment_id: appointmentId,
  consultation_date: "",
  reason: "",
  observations: "",
  odontogram: "",
  diagnoses: [{ description: "", diagnosis_Date: "" }],
  treatments: [
    {
      description: "",
      cost: 0,
      status: "pending",
      start_date: "",
      end_date: "",
    },
  ],
});

const subTabs: { key: SubTab; label: string }[] = [
  { key: "general", label: "General" },
  { key: "diagnoses", label: "Diagnósticos" },
  { key: "treatments", label: "Tratamientos" },
];

export default function ConsultationForm({
  recordId,
  appointmentId,
  onSave,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<ConsultationFormData>(
    initialForm(recordId, appointmentId),
  );
  const [activeTab, setActiveTab] = useState<SubTab>("general");
  const [errors, setErrors] = useState<ConsultationErrors>({
    diagnoses: [],
    treatments: [],
  });

  const handleFieldChange = (
    field: keyof ConsultationFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateConsultationForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      // Ir al primer tab con error
      if (validationErrors.consultation_date || validationErrors.reason)
        setActiveTab("general");
      else if (validationErrors.diagnoses.some((e) => e))
        setActiveTab("diagnoses");
      else if (validationErrors.treatments.some((e) => e))
        setActiveTab("treatments");
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del sub-tab */}
      <div className="py-2">
        {activeTab === "general" && (
          <GeneralTab
            formData={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        )}
        {activeTab === "diagnoses" && (
          <DiagnosesTab
            diagnoses={formData.diagnoses}
            onChange={(diagnoses) =>
              setFormData((prev) => ({ ...prev, diagnoses }))
            }
            errors={errors.diagnoses}
          />
        )}
        {activeTab === "treatments" && (
          <TreatmentsTab
            treatments={formData.treatments}
            onChange={(treatments) =>
              setFormData((prev) => ({ ...prev, treatments }))
            }
            errors={errors.treatments}
          />
        )}
      </div>

      {/* Acciones */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition"
        >
          Guardar consulta
        </button>
      </div>
    </form>
  );
}
