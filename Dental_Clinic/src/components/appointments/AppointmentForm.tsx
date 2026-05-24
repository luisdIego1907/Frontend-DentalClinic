import { useEffect, useState } from "react";
import type { AppointmentData } from "../../data/appointment";
import type { PatientData } from "../../data/patient";
import {
  validateAppointmentForm,
  type AppointmentFormErrors,
} from "./AppointmentValidation";
import { initialAppointmentFormData } from "./AppointmentInitialData";

interface AppointmentFormProps {
  patients: PatientData[];
  onSubmit: (appointmentData: AppointmentData) => void;
  appointmentToEdit?: AppointmentData | null;
  onCancelEdit?: () => void;
}

export default function AppointmentForm({
  patients,
  onSubmit,
  appointmentToEdit = null,
  onCancelEdit,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentData>(
    initialAppointmentFormData
  );

  const [errors, setErrors] = useState<AppointmentFormErrors>({});

  const activePatients = patients.filter(
    (patient) => patient.status !== "Inactivo"
  );

  const isEditing = appointmentToEdit !== null;

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData(appointmentToEdit);
      setErrors({});
      return;
    }

    setFormData(initialAppointmentFormData);
    setErrors({});
  }, [appointmentToEdit]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === "durationMinutes" ? Number(value) : value,
    });
  };

  const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPatient = activePatients.find(
      (patient) => patient.identification === event.target.value
    );

    setFormData({
      ...formData,
      patient: selectedPatient ?? null,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAppointmentForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);

    if (!isEditing) {
      setFormData(initialAppointmentFormData);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const disabledInputClass =
    "mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-600 shadow-sm outline-none";

  const textareaClass =
    "mt-1 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const labelClass = "text-sm font-medium text-gray-700";
  const errorClass = "mt-1 block text-sm text-red-600";

  const appointmentHours = Array.from({ length: 24 }, (_, index) =>
    String(index).padStart(2, "0")
  );

  const appointmentMinutes = ["00", "15", "30", "45"];

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Modificar cita" : "Registrar cita"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Actualice los datos de la cita seleccionada."
            : "Complete los datos de la cita para agendarla en el sistema."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="patient" className={labelClass}>
            Paciente
          </label>

          {isEditing ? (
            <input
              id="patient"
              type="text"
              value={
                formData.patient
                  ? `${formData.patient.first_name} ${formData.patient.last_name} - ${formData.patient.identification}`
                  : "Paciente no seleccionado"
              }
              className={disabledInputClass}
              disabled
            />
          ) : (
            <select
              id="patient"
              name="patient"
              value={formData.patient?.identification ?? ""}
              onChange={handlePatientChange}
              className={inputClass}
            >
              <option value="" disabled>
                Seleccione un paciente
              </option>
              {activePatients.map((patient) => (
                <option key={patient.identification} value={patient.identification}>
                  {patient.first_name} {patient.last_name} -{" "}
                  {patient.identification}
                </option>
              ))}
            </select>
          )}

          {errors.patient && <span className={errorClass}>{errors.patient}</span>}
        </div>

        <div>
          <label htmlFor="date" className={labelClass}>
            Fecha de la cita
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.date && <span className={errorClass}>{errors.date}</span>}
        </div>

        <div>
          <label className={labelClass}>Hora de la cita</label>

          <div className="mt-1 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hour" className={labelClass}>
                Hora
              </label>
              <select
                id="hour"
                value={formData.time.split(":")[0] || ""}
                onChange={(event) => {
                  const minutes = formData.time.split(":")[1] || "";

                  setFormData({
                    ...formData,
                    time: `${event.target.value}:${minutes}`,
                  });
                }}
                className={inputClass}
              >
                <option value="" disabled>
                  Seleccione
                </option>
                {appointmentHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="minutes" className={labelClass}>
                Minutos
              </label>
              <select
                id="minutes"
                value={formData.time.split(":")[1] || ""}
                onChange={(event) => {
                  const hour = formData.time.split(":")[0] || "";

                  setFormData({
                    ...formData,
                    time: `${hour}:${event.target.value}`,
                  });
                }}
                className={inputClass}
              >
                <option value="" disabled>
                  Seleccione
                </option>
                {appointmentMinutes.map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errors.time && <span className={errorClass}>{errors.time}</span>}
        </div>

        <div>
          <label htmlFor="durationMinutes" className={labelClass}>
            Duración de la cita
          </label>
          <select
            id="durationMinutes"
            name="durationMinutes"
            value={formData.durationMinutes}
            onChange={handleChange}
            className={inputClass}
          >
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={45}>45 minutos</option>
            <option value={60}>60 minutos</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="reason" className={labelClass}>
            Motivo de la cita
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={textareaClass}
            placeholder="Motivo de la cita"
            rows={4}
          />
          {errors.reason && <span className={errorClass}>{errors.reason}</span>}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:scale-95"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
        >
          {isEditing ? "Guardar cambios" : "Agendar cita"}
        </button>
      </div>
    </form>
  );
}