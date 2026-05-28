import type { ConsultationFormData } from "../../../data/consultationData";
import type { ConsultationErrors } from "./ConsultationValidation";

type Props = {
  formData: ConsultationFormData;
  onChange: (field: keyof ConsultationFormData, value: string) => void;
  errors: ConsultationErrors;
};
export default function GeneralTab({ formData, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Fecha <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.consultation_date}
          onChange={(e) => onChange("consultation_date", e.target.value)}
          className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition
            ${
              errors.consultation_date
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-slate-300 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
            }`}
        />
        {errors.consultation_date && (
          <p className="text-red-500 text-xs mt-1">
            {errors.consultation_date}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Motivo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.reason}
          onChange={(e) => onChange("reason", e.target.value)}
          placeholder="Ej. Dolor en molar superior"
          className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition
            ${
              errors.reason
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-slate-300 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
            }`}
        />
        {errors.reason && (
          <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Odontograma
          <span className="text-slate-400 font-normal ml-1 text-xs">
            Opcional
          </span>
        </label>
        <textarea
          value={formData.odontogram ?? ""}
          onChange={(e) => onChange("odontogram", e.target.value)}
          placeholder="Descripción de piezas dentales tratadas..."
          rows={3}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Observaciones
          <span className="text-slate-400 font-normal ml-1 text-xs">
            Opcional
          </span>
        </label>
        <textarea
          value={formData.observations ?? ""}
          onChange={(e) => onChange("observations", e.target.value)}
          placeholder="Notas adicionales..."
          rows={3}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500 resize-none"
        />
      </div>
    </div>
  );
}
