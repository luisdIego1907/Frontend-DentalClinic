import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { patientsMock } from "../mocks/patient.mock";
import type { PatientDetails } from "../data/patient";
import PatientEditForm from "../components/Forms/UpdatePatientForm/PatientEditForm";
import ConsultationForm from "../components/Forms/ConsultationForm/ConsultationForm";
import PatientInfo from "./PatientInfo";
import { usePermissions } from "../hook/usePermissions";
import type { ConsultationFormData } from "../data/consultationData";

type Tab = "info" | "consultas" | "nueva-consulta";

export default function PatientDetail() {
  const { id } = useParams();
  const permisos = usePermissions();

  const foundPatient = patientsMock.find(
    (patient) => patient.id === Number(id),
  );

  const [patient, setPatient] = useState<PatientDetails | undefined>(
    foundPatient,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [tabActivo, setTabActivo] = useState<Tab>("info");

  if (!patient) {
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

  const handleSaveConsultation = (data: ConsultationFormData) => {
    console.log("Consulta a guardar:", data);
    // TODO: POST /consultations cuando el backend esté listo
    setSuccessMessage("Consulta registrada correctamente.");
    setTabActivo("consultas");
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
        {/* Header del paciente */}
        <div className="border-b border-slate-200 pb-6 mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {patient.name}
            </h1>
            <p className="text-slate-500 mt-1">
              Información detallada del paciente
            </p>
          </div>

          {/* Botón editar — solo si tiene permiso, no está editando y está en tab info */}
          {permisos.editarPerfil && !isEditing && tabActivo === "info" && (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl font-medium transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => {
              setTabActivo("info");
              setIsEditing(false);
            }}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tabActivo === "info"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Información
          </button>

          {permisos.verConsultas && (
            <button
              onClick={() => {
                setTabActivo("consultas");
                setIsEditing(false);
              }}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tabActivo === "consultas"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Consultas
            </button>
          )}

          {permisos.registrarConsulta && (
            <button
              onClick={() => {
                setTabActivo("nueva-consulta");
                setIsEditing(false);
              }}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tabActivo === "nueva-consulta"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Registrar consulta
            </button>
          )}
        </div>

        {/* Contenido del tab activo */}
        {tabActivo === "info" &&
          (isEditing ? (
            <PatientEditForm
              patient={patient}
              onSave={handleSavePatient}
              onCancel={handleCancel}
            />
          ) : (
            <PatientInfo patient={patient} />
          ))}

        {tabActivo === "consultas" && permisos.verConsultas && (
          <div className="text-slate-500 text-sm py-4 text-center">
            {/* TODO: lista de consultas del paciente */}
            No hay consultas registradas.
          </div>
        )}

        {tabActivo === "nueva-consulta" && permisos.registrarConsulta && (
          <ConsultationForm
            recordId={1} // TODO: viene del backend con el record_id del paciente
            onSave={handleSaveConsultation}
            onCancel={() => setTabActivo("consultas")}
          />
        )}
      </section>
    </main>
  );
}
