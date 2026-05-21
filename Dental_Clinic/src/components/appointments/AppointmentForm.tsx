import { useState } from "react";
import type { AppointmentData } from "../../data/appointment";
import {
  validateAppointmentForm,
  type AppointmentFormErrors,
} from "./AppointmentValidation";
import { initialAppointmentFormData } from "./AppointmentInitialData";

interface AppointmentFormProps {
  onSubmit: (appointmentData: AppointmentData) => void;
}

const generateTimeSlots = (
  startHour: number,
  endHour: number,
  intervalMinutes: number
) => {
  const slots: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
      slots.push(
        `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
      );
    }
  }

  return slots;
};

export default function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentData>(
    initialAppointmentFormData
  );

  const [errors, setErrors] = useState<AppointmentFormErrors>({});

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAppointmentForm(formData);

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

  const timeSlots = generateTimeSlots(7, 16, 30);

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
          Registrar cita
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Complete los datos de la cita para agendarla en el sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="patientName" className={labelClass}>
            Paciente
          </label>
          <input
            id="patientName"
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Nombre del paciente"
          />
          {errors.patientName && (
            <span className={errorClass}>{errors.patientName}</span>
          )}
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
          {errors.reason && (
            <span className={errorClass}>{errors.reason}</span>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
        >
          Agendar cita
        </button>
      </div>
    </form>
  );
}