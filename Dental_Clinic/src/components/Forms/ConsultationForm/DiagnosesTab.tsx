import type { Diagnosis } from "../../../models/diagnosis";

type Props = {
  diagnoses: Diagnosis[];
  onChange: (diagnoses: Diagnosis[]) => void;
  errors: string[];
};

const emptyDiagnosis = (): Diagnosis => ({
  description: "",
  diagnosis_date: "",
});

export default function DiagnosesTab({ diagnoses, onChange, errors }: Props) {
  const handleAdd = () => onChange([...diagnoses, emptyDiagnosis()]);

  const handleRemove = (index: number) =>
    onChange(diagnoses.filter((_, i) => i !== index));

  const handleChange = (
    index: number,
    field: keyof Diagnosis,
    value: string,
  ) => {
    const updated = diagnoses.map((d, i) =>
      i === index ? { ...d, [field]: value } : d,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {diagnoses.map((diagnosis, index) => (
        <div
          key={index}
          className="bg-slate-50 border border-slate-200 rounded-lg p-4"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-500">
              Diagnóstico #{index + 1}
            </span>
            {diagnoses.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-xs text-red-500 hover:text-red-700 transition"
              >
                ✕ Eliminar
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                value={diagnosis.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Descripción del diagnóstico..."
                rows={2}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition resize-none
                  ${
                    errors[index]
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                  }`}
              />
              {errors[index] && (
                <p className="text-red-500 text-xs mt-1">{errors[index]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={diagnosis.diagnosis_date}
                onChange={(e) =>
                  handleChange(index, "diagnosis_date", e.target.value)
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full border-2 border-dashed border-teal-400 text-teal-600 rounded-lg py-2.5 text-sm font-medium hover:bg-teal-50 transition"
      >
        + Agregar diagnóstico
      </button>
    </div>
  );
}
