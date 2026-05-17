import { useState } from "react";

export default function PatientForm({ onSubmit }) {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
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
        <label>Identificación</label>
        <input
          type="text"
          name="identification"
          value={formData.identification}
          onChange={handleChange}
        />
        {errors.identification && <span>{errors.identification}</span>}
      </div>

      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && <span>{errors.first_name}</span>}
      </div>

      <div>
        <label>Apellido</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {errors.last_name && <span>{errors.last_name}</span>}
      </div>

      <div>
        <label>Fecha de nacimiento</label>
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />
        {errors.birth_date && <span>{errors.birth_date}</span>}
      </div>

      <div>
        <label>Teléfono</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Dirección</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span>{errors.address}</span>}
      </div>

      <div>
        <label>Género</label>
        <select
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
        <label>Estado</label>
        <select
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