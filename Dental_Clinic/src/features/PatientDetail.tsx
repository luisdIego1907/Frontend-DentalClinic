import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { PatientDetails } from "../data/patient";
import PatientEditForm from "../components/Forms/UpdatePatientForm/PatientEditForm";
import PatientInfo from "./PatientInfo";
import { getPatientById } from "../services/PatientService";

export default function PatientDetail() {
  const { id } = useParams();

  /* Guarda la información del paciente obtenida desde el backend. */
  const [patient, setPatient] = useState<PatientDetails | undefined>(undefined);

  /* Indica si la información del paciente todavía se está cargando. */
  const [loading, setLoading] = useState(true);

  /* Guarda un mensaje de error si ocurre un problema al consultar el backend. */
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /* Se ejecuta cuando se carga el componente o cuando cambia el ID de la URL.
     Busca el paciente en el backend usando el ID recibido por parámetros. */
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

  const handleSavePatient = (updatedPatient: PatientDetails) => {
    console.log("Paciente actualizado:", updatedPatient);

    setPatient(updatedPatient);
    setIsEditing(false);
    setSuccessMessage("Paciente actualizado correctamente.");
  };

  if (loading) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
          <p className="text-slate-500">Cargando información del paciente...</p>
        </div>
      </main>
    );
  }

  if (error || !patient) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
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
              {fullName}
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