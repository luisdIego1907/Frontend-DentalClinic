import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientCard from "./PatientCard";
import type { PatientDetails } from "../models/patient";
import { deletePatient, getPatients } from "../services/PatientService";
import DeleteButton from "../shared/DeleteButton";
import { PermissionDenied } from "../shared/PermissionDenied";

const PATIENTS_PER_PAGE = 15;

export default function PatientList() {
  const navigate = useNavigate();

  const [permissionDenied, setPermissionDenied] = useState(false);

  /* Lista de pacientes que se obtiene desde el backend.
    Antes se recibía desde otro componente por medio de props,
    pero ahora la información viene desde la base de datos mediante el BE. */
  const [patientList, setPatientList] = useState<PatientDetails[]>([]);

  /* Lista de IDs de pacientes seleccionados.
     Se usa para saber cuáles pacientes fueron marcados con el checkbox. */
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);

  /* Mensaje que se muestra cuando una acción se ejecuta correctamente. */
  const [successMessage, setSuccessMessage] = useState("");

  /* Mensaje que se muestra cuando ocurre un error al eliminar pacientes. */
  const [deleteError, setDeleteError] = useState("");

  /* Estado que indica si la información aún se está cargando desde el backend. */
  const [loading, setLoading] = useState(true);

  /* Estado que guarda un mensaje de error si falla la carga de pacientes. */
  const [error, setError] = useState("");

  /* Texto que escribe el usuario en la barra de búsqueda. */
  const [searchTerm, setSearchTerm] = useState("");

  /* Página actual de la lista de pacientes. */
  const [currentPage, setCurrentPage] = useState(1);

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

  /* Normaliza el texto para que la búsqueda no falle por mayúsculas,
     minúsculas o tildes. */
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  /* Lista de pacientes filtrados según el texto ingresado en la búsqueda.
     Se busca por nombre completo y también por identificación. */
  const filteredPatients = patientList.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`;
    const searchValue = normalizeText(searchTerm);
    const identification = String(patient.identification ?? "");

    return (
      normalizeText(fullName).includes(searchValue) ||
      identification.includes(searchTerm.trim())
    );
  });

  /* Cantidad total de páginas según la cantidad de pacientes filtrados. */
  const totalPages = Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE);

  /* Índice inicial de los pacientes que se mostrarán en la página actual. */
  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;

  /* Índice final de los pacientes que se mostrarán en la página actual. */
  const endIndex = startIndex + PATIENTS_PER_PAGE;

  /* Lista final de pacientes que se muestran en pantalla.
     Aunque existan más pacientes, solo se muestran máximo 15 por página. */
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  /* Si se elimina un paciente y la página actual queda fuera del rango,
     se ajusta la página para evitar que quede una pantalla vacía. */
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* Actualiza el valor de búsqueda.
     También limpia selecciones, mensajes y vuelve a la primera página. */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setSelectedPatients([]);
    setSuccessMessage("");
    setDeleteError("");
  };

  // Función para seleccionar o deseleccionar un paciente.
  const handleSelectPatient = (patientId: number) => {
    setSuccessMessage("");
    setDeleteError("");

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

      /* Elimina los pacientes seleccionados de la lista local
         después de que fueron eliminados correctamente en el backend. */
      setPatientList((prevPatients) =>
        prevPatients.filter(
          (patient) => !selectedPatients.includes(patient.patient_id)
        )
      );

      setSelectedPatients([]);
      setSuccessMessage("Paciente(s) eliminado(s) correctamente.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      if (errorMessage.includes("permisos")) {
        setPermissionDenied(true);
        return;
      }

      setDeleteError("No se pudieron eliminar los pacientes seleccionados.");
    }
  };

  // Cambia a la página anterior si no está en la primera página.
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Cambia a la página siguiente si no está en la última página.
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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
            nuevamente.
          </p>
        </div>
      </div>
    );
  }

  if (permissionDenied) {
    return (
      <PermissionDenied
        title="No puede eliminar pacientes"
        message="Su usuario puede consultar pacientes, pero no tiene permisos para eliminarlos."
      />
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

      {/* Barra de búsqueda de pacientes. */}
      <div className="mb-6">
        <label
          htmlFor="patient-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Buscar paciente
        </label>

        <input
          id="patient-search"
          type="text"
          value={searchTerm}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Buscar por nombre, apellido o identificación..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
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

      {deleteError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {deleteError}
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
      ) : filteredPatients.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="max-w-lg rounded-3xl border border-slate-200 bg-white px-10 py-12 text-center shadow-sm">
            <div className="mb-4 text-6xl">🔎</div>

            <h2 className="text-2xl font-bold text-slate-700">
              No se encontraron pacientes
            </h2>

            <p className="mt-3 text-slate-500">
              No existe ningún paciente que coincida con la búsqueda.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
            <span>
              Mostrando {startIndex + 1} -{" "}
              {Math.min(endIndex, filteredPatients.length)} de{" "}
              {filteredPatients.length} paciente(s).
            </span>

            {totalPages > 1 && (
              <span>
                Página {currentPage} de {totalPages}
              </span>
            )}
          </div>

          {/* Contenedor que muestra las tarjetas de pacientes en forma de grid.
             Solo se muestran máximo 15 pacientes por página. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPatients.map((patient) => (
              <PatientCard
                key={patient.patient_id}
                patient={patient}
                selected={selectedPatients.includes(patient.patient_id)}
                onSelect={() => handleSelectPatient(patient.patient_id)}
                onClick={() => navigate(`/patients/${patient.patient_id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="text-sm font-medium text-slate-600">
                Página {currentPage} de {totalPages}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}