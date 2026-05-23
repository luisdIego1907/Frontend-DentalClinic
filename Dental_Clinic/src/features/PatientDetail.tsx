import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { patientsMock } from "../mocks/patient.mock";
import type {PatientDetails} from "../data/patient";

type PatientDetailsErrors = Partial<Record<keyof PatientDetails, string>>;

export default function PatientDetail() {
  const { id } = useParams();

  const foundPatient = patientsMock.find(
    (patient) => patient.id === Number(id)
  );

  const [patient, setPatient] = useState<PatientDetails | undefined>(
    foundPatient
  );

  const [formData, setFormData] = useState<PatientDetails | undefined>(
    foundPatient
  );

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<PatientDetailsErrors>({});

  if (!patient || !formData) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Paciente no encontrado
          </h1>

          <p className="text-slate-500 mt-2">
            No existe un paciente registrado con el ID {id}.
          </p>

          <Link
            to="/patients"
            className="inline-block mt-6 bg-cyan-600 text-white px-5 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Volver a pacientes
          </Link>
        </div>
      </main>
    );
  }

  const validateForm = () => {
    const newErrors: PatientDetailsErrors = {};

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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setFormData(patient);
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Paciente actualizado:", formData);

    setPatient(formData);
    setIsEditing(false);
    setSuccessMessage("Paciente actualizado correctamente.");
    setErrors({});
  };

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          to="/patients"
          className="text-cyan-600 hover:text-cyan-700 font-medium"
        >
          ← Volver a pacientes
        </Link>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="border-b border-slate-200 pb-6 mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {patient.name}
            </h1>

            <p className="text-slate-500 mt-1">
              Información detallada del paciente
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl font-medium transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        {isEditing ? (
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
                  ${
                    errors.name
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
                  ${
                    errors.identification
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
                  ${
                    errors.phone
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
                  ${
                    errors.address
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:ring-2 focus:ring-cyan-200"
                  }
                `}
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-500">ID</p>
              <p className="text-lg text-slate-800">{patient.id}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Nombre completo
              </p>
              <p className="text-lg text-slate-800">{patient.name}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Identificación
              </p>
              <p className="text-lg text-slate-800">
                {patient.identification}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Teléfono
              </p>
              <p className="text-lg text-slate-800">{patient.phone}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Dirección
              </p>
              <p className="text-lg text-slate-800">{patient.address}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}