import { useState } from "react";
import type { PatientData } from "../../data/patient";

interface PatientFormProps {
  onSubmit: (patientData: PatientData) => void;
}

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientData>({
    identification: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    status: "Activo",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PatientData, string>>
  >({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PatientData, string>> = {};

    if (!formData.identification.trim()) {
      newErrors.identification = "La identificación es obligatoria.";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "El nombre es obligatorio.";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "El apellido es obligatorio.";
    }

    if (!formData.birth_date) {
      newErrors.birth_date = "La fecha de nacimiento es obligatoria.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }

    if (!formData.gender) {
      newErrors.gender = "El género es obligatorio.";
    }

    if (!formData.status) {
      newErrors.status = "El estado es obligatorio.";
    }

    return newErrors;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="identification">Identificación</label>
        <input
          id="identification"
          type="text"
          name="identification"
          value={formData.identification}
          onChange={handleChange}
        />
        {errors.identification && <span>{errors.identification}</span>}
      </div>

      <div>
        <label htmlFor="first_name">Nombre</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && <span>{errors.first_name}</span>}
      </div>

      <div>
        <label htmlFor="last_name">Apellido</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {errors.last_name && <span>{errors.last_name}</span>}
      </div>

      <div>
        <label htmlFor="birth_date">Fecha de nacimiento</label>
        <input
          id="birth_date"
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />
        {errors.birth_date && <span>{errors.birth_date}</span>}
      </div>

      <div>
        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="address">Dirección</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span>{errors.address}</span>}
      </div>

      <div>
        <label htmlFor="gender">Género</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.gender && <span>{errors.gender}</span>}
      </div>

      <div>
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        {errors.status && <span>{errors.status}</span>}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}