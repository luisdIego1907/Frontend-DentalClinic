import type { Treatment } from "../../../data/treatment";

type Props = {
  treatments: Treatment[];
  onChange: (treatments: Treatment[]) => void;
  errors: string[];
};

const emptyTreatment = (): Treatment => ({
  description: "",
  cost: 0,
  status: "pending",
  start_date: "",
  end_date: "",
});

export default function TreatmentsTab({ treatments, onChange, errors }: Props) {
  const handleAdd = () => onChange([...treatments, emptyTreatment()]);

  const handleRemove = (index: number) =>
    onChange(treatments.filter((_, i) => i !== index));

  const handleChange = (
    index: number,
    field: keyof Treatment,
    value: string | number,
  ) => {
    const updated = treatments.map((t, i) =>
      i === index ? { ...t, [field]: value } : t,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {treatments.map((treatment, index) => (
        <div
          key={index}
          className="bg-slate-50 border border-slate-200 rounded-lg p-4"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-500">
              Tratamiento #{index + 1}
            </span>
            {treatments.length > 1 && (
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
                value={treatment.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Descripción del tratamiento..."
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Costo
                  <span className="text-slate-400 font-normal ml-1 text-xs">
                    Opcional
                  </span>
                </label>
                <input
                  type="number"
                  value={treatment.cost}
                  onChange={(e) =>
                    handleChange(index, "cost", Number(e.target.value))
                  }
                  placeholder="₡0.00"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Estado
                </label>
                <select
                  value={treatment.status}
                  onChange={(e) =>
                    handleChange(index, "status", e.target.value)
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in progress">En progreso</option>
                  <option value="completed">Completado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Fecha inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={treatment.start_date}
                  onChange={(e) =>
                    handleChange(index, "start_date", e.target.value)
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Fecha fin
                  <span className="text-slate-400 font-normal ml-1 text-xs">
                    Opcional
                  </span>
                </label>
                <input
                  type="date"
                  value={treatment.end_date}
                  onChange={(e) =>
                    handleChange(index, "end_date", e.target.value)
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full border-2 border-dashed border-teal-400 text-teal-600 rounded-lg py-2.5 text-sm font-medium hover:bg-teal-50 transition"
      >
        + Agregar tratamiento
      </button>
    </div>
  );
}
