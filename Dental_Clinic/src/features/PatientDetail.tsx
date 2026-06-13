import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import type { PatientDetails } from "../models/patient";

import PatientEditForm from "../components/Forms/UpdatePatientForm/PatientEditForm";
import PatientInfo from "./PatientInfo";

import { usePermissions } from "../hook/usePermissions";
import { getPatientById, updatePatient } from "../services/PatientService";

export default function PatientDetail() {
  const { id } = useParams();
  const permisos = usePermissions();

  const [patient, setPatient] = useState<PatientDetails | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadPatient() {
      if (!id) {
        setError("No se recibió un ID de paciente válido.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPatientById(Number(id));
        setPatient(data);
      } catch (error) {
        console.error("Error al cargar el paciente:", error);
        setError("No se pudo cargar la información del paciente.");
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSavePatient = async (updatedPatient: PatientDetails) => {
    try {
      await updatePatient(updatedPatient.patient_id, {
        identification: updatedPatient.identification,
        first_name: updatedPatient.first_name,
        last_name: updatedPatient.last_name,
        birth_date: updatedPatient.birth_date,
        phone: updatedPatient.phone,
        email: updatedPatient.email,
        address: updatedPatient.address,
        gender: updatedPatient.gender,
        status: updatedPatient.status,
      });

      setPatient(updatedPatient);
      setIsEditing(false);
      setSuccessMessage("Paciente actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      setError("No se pudo actualizar el paciente");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-slate-500">Cargando información del paciente...</p>
        </div>
      </main>
    );
  }

  if (error || !patient) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Paciente no encontrado
          </h1>

          <p className="text-slate-500 mt-2">
            {error || `No existe un paciente registrado con el ID ${id}.`}
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

  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{fullName}</h1>

            <p className="text-slate-500 mt-1">
              Información detallada del paciente
            </p>
          </div>

          {permisos.editarPerfil && !isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full rounded-xl bg-cyan-600 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-700 sm:w-auto"
            >
              Editar
            </button>
          )}
        </div>

        {isEditing ? (
          <PatientEditForm
            patient={patient}
            onSave={handleSavePatient}
            onCancel={handleCancel}
          />
        ) : (
          <PatientInfo patient={patient} />
        )}
      </section>
    </main>
  );
}
