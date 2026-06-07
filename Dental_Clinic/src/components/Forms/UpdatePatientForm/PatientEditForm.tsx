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
  const [isIdentificationFocused, setIsIdentificationFocused] =
    useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 4) {
      return numbers;
    }

    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "identification" || name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");

      setFormData((prevData) => ({
        ...prevData,
        [name]: onlyNumbers,
      }));

      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validatePatientEditForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("ERRORES:", validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Nombre
        </label>

        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          maxLength={50}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-200"
        />

        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.first_name}
          </p>
        )}

      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Apellido
        </label>

        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          maxLength={80}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-200"
        />

        {errors.last_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.last_name}
          </p>
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
          onFocus={() => setIsIdentificationFocused(true)}
          onBlur={() => setIsIdentificationFocused(false)}
          maxLength={9}
          placeholder="Ej: 1-2345-6789"
          className={`
    w-full rounded-xl border px-4 py-3 outline-none transition
    ${errors.identification
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:ring-2 focus:ring-cyan-200"
            }
  `}
        />

        {isIdentificationFocused && (
          <>
            <p
              className={`text-sm mt-1 ${formData.identification.length === 9
                ? "text-green-600 font-medium"
                : "text-slate-500"
                }`}
            >
              La identificación debe contener 9 dígitos.
            </p>

            <p
              className={`text-sm mt-1 font-medium ${formData.identification.length === 9
                ? "text-green-600"
                : "text-slate-500"
                }`}
            >
              {formData.identification.length}/9 dígitos
            </p>
          </>
        )}

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
          value={formatPhone(formData.phone)}
          onChange={handleChange}
          maxLength={9}
          placeholder="Ej: 8888-8888"
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
          maxLength={150}
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