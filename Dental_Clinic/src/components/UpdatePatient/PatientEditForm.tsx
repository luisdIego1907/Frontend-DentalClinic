import { useState } from "react";

type Patient = {
  id: number;
  name: string;
  identification: string;
  phone: string;
};

type PatientFormErrors = Partial<Record<keyof Patient, string>>;

type Props = {
  patient: Patient;
  onSave: (updatedPatient: Patient) => void;
  onCancel: () => void;
};

export default function PatientEditForm({ patient, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<Patient>({
    id: patient.id,
    name: patient.name,
    identification: patient.identification,
    phone: patient.phone,
  });

  const [errors, setErrors] = useState<PatientFormErrors>({});

  const validateForm = () => {
    const newErrors: PatientFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!formData.identification.trim()) {
      newErrors.identification = "La identificación es obligatoria.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Nombre completo
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
            errors.name
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-300 focus:ring-blue-200"
          }`}
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
          className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
            errors.identification
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-300 focus:ring-blue-200"
          }`}
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
          className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
            errors.phone
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-300 focus:ring-blue-200"
          }`}
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}