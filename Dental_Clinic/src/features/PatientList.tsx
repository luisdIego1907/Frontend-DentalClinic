import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import PatientCard from "./PatientCard";
import type { PatientDetails } from "../data/patient";
import { deletePatient, getPatients } from "../services/PatientService";
import DeleteButton from "../shared/DeleteButton";

export default function PatientList() {
  const navigate = useNavigate();

   /* Lista de pacientes que se obtiene desde el backend.
     Antes se recibía desde otro componente por medio de props,
     pero ahora la información viene desde la base de datos mediante el BE. */
  const [patientList, setPatientList] = useState<PatientDetails[]>([]);

  /* Lista de IDs de pacientes seleccionados.
     Se usa para saber cuáles pacientes fueron marcados con el checkbox. */
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);

   /* Mensaje que se muestra cuando una acción se ejecuta correctamente. */
  const [successMessage, setSuccessMessage] = useState("");

  const [deleteError, setDeleteError] = useState("");

  /* Estado que indica si la información aún se está cargando desde el backend. */
    /* Estado que indica si la información aún se está cargando desde el backend. */
  const [loading, setLoading] = useState(true);

   /* Estado que guarda un mensaje de error si falla la carga de pacientes. */
  const [error, setError] = useState("");

    /* Se ejecuta cuando el componente se carga por primera vez.
     Obtiene la lista de pacientes desde el backend usando el servicio getPatients. */
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
  const handleDeletePatients = async () => {
    if (selectedPatients.length === 0) return;

    try {

      setSuccessMessage("");
      setDeleteError("");


      await Promise.all(
        selectedPatients.map((patientId) => deletePatient(patientId))
      );
      /* Elimina los pacientes seleccionados*/
      setPatientList((prevPatients) =>
        prevPatients.filter(
          (patient) => !selectedPatients.includes(patient.patient_id)
        )
      );

      setSelectedPatients([]);
      setSuccessMessage("Paciente(s) eliminado(s) correctamente.");

    } catch (error) {
      console.error("Error al eliminar pacientes:", error);
      setDeleteError("No se pudieron eliminar los pacientes seleccionados.");
    }

    setSelectedPatients([]);
    setSuccessMessage("Paciente(s) eliminado(s) correctamente.");
  };

  /* Mientras se cargan los datos desde el backend,
     se muestra un mensaje de carga. */
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

  /* Si ocurre un error al obtener los pacientes,
     se muestra el mensaje de error correspondiente. */
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
          <DeleteButton
            label="Eliminar pacientes"
            loadingLabel="Eliminando pacientes..."
            disabled={selectedPatients.length === 0}
            confirmMessage={`¿Está seguro de que desea eliminar ${selectedPatients.length} paciente(s)?`}
            onDelete={handleDeletePatients}
          />

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

         // Contenedor que muestra las tarjetas de pacientes en forma de grid.
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