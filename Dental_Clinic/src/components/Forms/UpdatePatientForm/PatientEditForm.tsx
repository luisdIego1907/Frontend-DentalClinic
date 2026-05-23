import { useState } from "react";
import type { PatientDetails } from "../../../data/patient";
import {
  validatePatientEditForm,
  type PatientEditFormErrors,
} from "../PatientValidation";

type Props = {
  patient: PatientDetails;
  onSave: (updatedPatient: PatientDetails) => void;
  onCancel: () => void;
};

export default function PatientEditForm({
  patient,
  onSave,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<PatientDetails>(patient);
  const [errors, setErrors] = useState<PatientEditFormErrors>({});


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

      const validationErrors = validatePatientEditForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Nombre completo
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`
            w-full rounded-xl border px-4 py-3 outline-none transition
            ${errors.name
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:ring-2 focus:ring-cyan-200"
            }
          `}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Identificación
        </label>

        <input
          type="text"
          name="identification"
          value={formData.identification}
          onChange={handleChange}
          className={`
            w-full rounded-xl border px-4 py-3 outline-none transition
            ${errors.identification
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:ring-2 focus:ring-cyan-200"
            }
          `}
        />

        {errors.identification && (
          <p className="text-red-500 text-sm mt-1">
            {errors.identification}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Teléfono
        </label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`
            w-full rounded-xl border px-4 py-3 outline-none transition
            ${errors.phone
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:ring-2 focus:ring-cyan-200"
            }
          `}
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Dirección
        </label>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`
            w-full rounded-xl border px-4 py-3 outline-none transition
            ${errors.address
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:ring-2 focus:ring-cyan-200"
            }
          `}
        />

        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}