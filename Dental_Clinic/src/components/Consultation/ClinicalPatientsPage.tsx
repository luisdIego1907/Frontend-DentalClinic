import { useEffect, useState } from "react";
import type { PatientDetails } from "../../models/patient";
import { getPatients } from "../../services/PatientService";
import PatientCard from "../../features/PatientCard";
import PatientClinicalView from "./PatientClinicalView";

export default function ClinicalPatientsPage() {
  const [patients, setPatients] = useState<PatientDetails[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientDetails | null>(
    null,
  );

  useEffect(() => {
    async function load() {
      const data = await getPatients();
      setPatients(data);
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3 lg:gap-6 lg:p-6">
      {/* LISTA */}
      <div
        className={`space-y-3 lg:col-span-1 ${
          selectedPatient ? "hidden lg:block" : "block"
        }`}
      >
        {patients.map((p) => (
          <PatientCard
            key={p.patient_id}
            patient={p}
            onClick={() => setSelectedPatient(p)}
            selected={selectedPatient?.patient_id === p.patient_id}
            cardSelect={true}
          />
        ))}
      </div>

      {/* DETALLE CLÍNICO */}
      <div className="lg:col-span-2">
        {selectedPatient && (
          <button
            className="mb-3 text-sm text-blue-600 lg:hidden"
            onClick={() => setSelectedPatient(null)}
          >
            ← Volver a pacientes
          </button>
        )}

        {!selectedPatient ? (
          <p className="text-slate-500">Selecciona un paciente</p>
        ) : (
          <PatientClinicalView patient={selectedPatient} />
        )}
      </div>
    </div>
  );
}
