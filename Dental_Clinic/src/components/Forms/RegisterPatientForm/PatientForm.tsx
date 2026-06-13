import {
  validatePatientForm,
  type PatientFormErrors,
} from "../PatientValidation";
import { useState } from "react"; //Permite guardar informacion que cambia dentro del componente
import type { PatientData } from "../../../models/patient";
import { initialPatientFormData } from "./PatientInitialData";

interface PatientFormProps {
  onSubmit: (patientData: PatientData) => void;
}
export default function PatientForm({ onSubmit }: PatientFormProps) {
  /*
    Se crea el estado formData
    setFormData sirve para actualizar los datos
  */
  const [formData, setFormData] = useState<PatientData>(initialPatientFormData);

  const [errors, setErrors] = useState<PatientFormErrors>({});

  /*
    Se ejecuta cada vez que el usuario ya sea que escriba o seleccione algo en un campo del formulario
  */
  const handleChange = (
    //se define el tipo de evento
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    /*
      Se extra el name (nombre del campo)
      y value (valor escrito o seleccionado)
    */
    const { name, value } = event.target;

    /*
      Copia todos los datos del formulario del momento
    */
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    /*
      Un formulario HTML recarga la pagina al enviarse. Hace que se pierda el estado.
      Evita esa recarga.
    */
    event.preventDefault();

    const validationErrors = validatePatientForm(formData);

    //Si faltan campos, validationErrors tendra mensajes de error
    //Object.keys: ["first_name", "email"]
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const textareaClass =
    "mt-1 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const labelClass = "text-sm font-medium text-gray-700";

  const errorClass = "mt-1 block text-sm text-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Registrar paciente</h2>
        <p className="mt-1 text-sm text-gray-500">
          Complete la información del paciente para guardarlo en el sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="identification" className={labelClass}>
            Identificación
          </label>
          <input
            id="identification"
            type="text"
            name="identification"
            value={formData.identification}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ej: 1-2345-6789"
          />
          {errors.identification && (
            <span className={errorClass}>{errors.identification}</span>
          )}
        </div>

        <div>
          <label htmlFor="first_name" className={labelClass}>
            Nombre
          </label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Nombre del paciente"
          />
          {errors.first_name && (
            <span className={errorClass}>{errors.first_name}</span>
          )}
        </div>

        <div>
          <label htmlFor="last_name" className={labelClass}>
            Apellido
          </label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Apellido del paciente"
          />
          {errors.last_name && (
            <span className={errorClass}>{errors.last_name}</span>
          )}
        </div>

        <div>
          <label htmlFor="birth_date" className={labelClass}>
            Fecha de nacimiento
          </label>
          <input
            id="birth_date"
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.birth_date && (
            <span className={errorClass}>{errors.birth_date}</span>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Teléfono
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ej: 8888-8888"
          />
          {errors.phone && <span className={errorClass}>{errors.phone}</span>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="paciente@correo.com"
          />
          {errors.email && <span className={errorClass}>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="gender" className={labelClass}>
            Género
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.gender && <span className={errorClass}>{errors.gender}</span>}
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Estado
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          {errors.status && <span className={errorClass}>{errors.status}</span>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className={labelClass}>
            Dirección
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={textareaClass}
            placeholder="Dirección del paciente"
            rows={4}
          />
          {errors.address && (
            <span className={errorClass}>{errors.address}</span>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
        >
          Guardar paciente
        </button>
      </div>
    </form>
  );
}
