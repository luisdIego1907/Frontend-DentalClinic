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
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* LISTA */}
      <div className="col-span-1 space-y-2">
        {patients.map((p) => (
          <PatientCard
            key={p.patient_id}
            patient={p}
            onClick={() => setSelectedPatient(p)}
            selected={selectedPatient?.patient_id === p.patient_id}
          />
        ))}
      </div>

      {/* DETALLE CLÍNICO */}
      <div className="col-span-2">
        {!selectedPatient ? (
          <p className="text-slate-500">Selecciona un paciente</p>
        ) : (
          <PatientClinicalView patient={selectedPatient} />
        )}
      </div>
    </div>
  );
}
