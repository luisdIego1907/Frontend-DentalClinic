import { useState } from "react";
import PatientForm from "../../components/patients/PatientForm";
import type { PatientData } from "../../data/patient";

export default function RegisterPatient() {
  const [successMessage, setSuccessMessage] = useState("");

  const handleSavePatient = async (patientData: PatientData) => {
    try {
      console.log("Paciente a registrar:", patientData);

      setSuccessMessage("Paciente registrado correctamente.");
    } catch (error) {
      console.error("Error al registrar paciente:", error);
    }
  };

  return (
    <main>
      <h1>Registrar Paciente</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <PatientForm onSubmit={handleSavePatient} />
    </main>
  );
}