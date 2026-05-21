import { useState } from "react";
import PatientForm from "../../components/PatientForm/PatientForm";
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
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Pacientes
          </span>

          <h1 className="text-3xl font-bold text-gray-900">
            Registrar paciente
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Complete los datos personales del paciente para agregarlo al sistema
            de la clínica dental.
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700 shadow-sm">
            {successMessage}
          </div>
        )}

        <PatientForm onSubmit={handleSavePatient} />
      </section>
    </main>
  );
}