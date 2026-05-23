import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import PatientCard from "./PatientCard";

// Define la estructura de un paciente.
type Patient = {
  id: number;
  name: string;
  identification: string;
  phone: string;
};

// Define las propiedades que recibe PatientList.
type Props = {
  // Lista de pacientes que se recibe desde otro componente
  patients: Patient[];
};

export default function PatientList({ patients }: Props) {
  const navigate = useNavigate();

  const [patientList, setPatientList] = useState<Patient[]>(patients);
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Función para seleccionar o deseleccionar un paciente.
  const handleSelectPatient = (patientId: number) => {
    setSuccessMessage("");

    setSelectedPatients((prevSelected) => {
      // Si el paciente ya estaba seleccionado, se elimina de la selección.
      if (prevSelected.includes(patientId)) {
        return prevSelected.filter((id) => id !== patientId);
      }
      // Si el paciente no estaba seleccionado, se agrega a la selección.
      return [...prevSelected, patientId];
    });
  };

  // Función que elimina los pacientes seleccionados.
  const handleDeletePatients = () => {
    if (selectedPatients.length === 0) return;

    // Muestra una ventana de confirmación antes de eliminar.
    const confirmDelete = window.confirm(
      `¿Está seguro de que desea eliminar ${selectedPatients.length} paciente(s)?`
    );

    if (!confirmDelete) return;

    setPatientList((prevPatients) =>
      prevPatients.filter((patient) => !selectedPatients.includes(patient.id))
    );

    setSelectedPatients([]);
    setSuccessMessage("Paciente(s) eliminado(s) correctamente.");
  };

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
          <div className="bg-white border border-slate-200 rounded-2xl px-8 py-10 shadow-sm text-center">
            <h2 className="text-xl font-semibold text-slate-700">
              No hay pacientes registrados
            </h2>

            <p className="text-slate-500 mt-2">
              No existen registros disponibles actualmente
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientList.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              selected={selectedPatients.includes(patient.id)}
              onSelect={() => handleSelectPatient(patient.id)}
              onClick={() => navigate(`/patients/${patient.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}