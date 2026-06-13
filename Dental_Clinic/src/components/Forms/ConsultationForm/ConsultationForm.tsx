import { useState } from "react";
import type { ConsultationFormData } from "../../../models/consultationData";
import { validateConsultationForm, hasErrors } from "./ConsultationValidation";
import type { ConsultationErrors } from "./ConsultationValidation";
import GeneralTab from "./GeneralTab";
import DiagnosesTab from "./DiagnosesTab";
import TreatmentsTab from "./TreatmentTab";

const TEAL = {
  bg: "#E1F5EE",
  dark: "#0C447C",
  mid: "#185FA5",
};

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
  diagnoses: [{ description: "", diagnosis_date: "" }],
  treatments: [
    {
      description: "",
      cost: 0,
      status: "pending",
      start_date: "",
      end_date: null,
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
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors sm:px-4 ${
              activeTab === tab.key
                ? `border-[${TEAL.mid}] text-[${TEAL.mid}]`
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
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

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto"
        >
          Cancelar
        </button>

        <button
          type="submit"
          style={{ backgroundColor: TEAL.dark }}
          className="w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white transition sm:w-auto"
        >
          Guardar consulta
        </button>
      </div>
    </form>
  );
}
