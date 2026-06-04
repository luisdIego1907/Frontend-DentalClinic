import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import PatientCard from "./PatientCard";
import type { PatientDetails } from "../data/patient";
import { getPatients } from "../services/PatientService";

export default function PatientList() {
  const navigate = useNavigate();

  const [patientList, setPatientList] = useState<PatientDetails[]>([]);

  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);

  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await getPatients();
        setPatientList(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
        setError("No se pudieron cargar los pacientes.");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  const handleSelectPatient = (patientId: number) => {
    setSuccessMessage("");

    setSelectedPatients((prevSelected) => {
      if (prevSelected.includes(patientId)) {
        return prevSelected.filter((id) => id !== patientId);
      }

      return [...prevSelected, patientId];
    });
  };

  const handleDeletePatients = () => {
    if (selectedPatients.length === 0) return;

    const confirmDelete = window.confirm(
      `¿Está seguro de que desea eliminar ${selectedPatients.length} paciente(s)?`
    );

    if (!confirmDelete) return;

    setPatientList((prevPatients) =>
      prevPatients.filter(
        (patient) => !selectedPatients.includes(patient.patient_id)
      )
    );

    setSelectedPatients([]);
    setSuccessMessage("Paciente(s) eliminado(s) correctamente.");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>

        <h2 className="mt-6 text-xl font-semibold text-slate-700">
          Cargando pacientes
        </h2>

        <p className="mt-2 text-slate-500">
          Espera un momento mientras obtenemos la información.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-24">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">⚠️</div>

          <h2 className="text-xl font-semibold text-red-700">
            No se pudieron cargar los pacientes
          </h2>

          <p className="mt-2 text-red-600">
            Verifica que hayas iniciado sesión correctamente o intenta
            nuevamente
          </p>
          
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Lista de Pacientes
          </h1>

          <p className="text-slate-500 mt-1">
            Gestiona los pacientes registrados en el sistema
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDeletePatients}
            disabled={selectedPatients.length === 0}
            className={`
              flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors
              ${
                selectedPatients.length > 0
                  ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            <Trash2 size={18} />
            Eliminar Pacientes
          </button>

          <Link
            to="/patients/register"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl font-medium transition-colors"
          >
            Registrar Paciente
          </Link>
        </div>
      </div>

      {selectedPatients.length > 0 && (
        <div className="mb-6 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-700">
          {selectedPatients.length} paciente(s) seleccionado(s).
        </div>
      )}

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {patientList.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="bg-white border border-slate-200 rounded-3xl px-10 py-12 shadow-sm text-center max-w-lg">
            <div className="mb-4 text-6xl">🦷</div>

            <h2 className="text-2xl font-bold text-slate-700">
              No hay pacientes registrados
            </h2>

            <p className="text-slate-500 mt-3">
              Todavía no existen pacientes registrados en el sistema.
            </p>

            <Link
              to="/patients/register"
              className="mt-6 inline-block rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white transition-colors hover:bg-cyan-700"
            >
              Registrar primer paciente
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientList.map((patient) => (
            <PatientCard
              key={patient.patient_id}
              patient={patient}
              selected={selectedPatients.includes(patient.patient_id)}
              onSelect={() => handleSelectPatient(patient.patient_id)}
              onClick={() => navigate(`/patients/${patient.patient_id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}