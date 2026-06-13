import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import type { PatientDetails } from "../../models/patient";
import type { MedicalRecordData } from "../../models/medicalRecordResponse";
import type { ConsultationFormData } from "../../models/consultationData";

import { getPatientById } from "../../services/PatientService";
import { getMedicalRecordByPatientId } from "../../services/MedicalRecordService";
import { createConsultation } from "../../services/ConsultationService";

import PatientInfo from "../../features/PatientInfo";
import MedicalRecordInfo from "../../components/medicalRecord/MedicalRecordInfo";
import ConsultationForm from "../../components/Forms/ConsultationForm/ConsultationForm";

export default function ConsultationPage() {
  const { patientId } = useParams();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  const navigate = useNavigate();
  // States para obtener los datos
  const [patient, setPatient] = useState<PatientDetails>();
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordData>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //Obtener los datos
  useEffect(() => {
    async function loadData() {
      if (!patientId) {
        setError("Paciente inválido.");
        setLoading(false);
        return;
      }

      try {
        const patientData = await getPatientById(Number(patientId));

        const medicalRecordData = await getMedicalRecordByPatientId(
          Number(patientId),
        );

        setPatient(patientData);
        setMedicalRecord(medicalRecordData);
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar la información del paciente.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [patientId]);

  const handleSaveConsultation = async (data: ConsultationFormData) => {
    try {
      setError("");
      setSuccessMessage("");

      await createConsultation(data);

      //  MOSTRAR MENSAJES
      setSuccessMessage("Consulta registrada correctamente.");
    } catch (error) {
      console.error(error);
      setError("No se pudo registrar la consulta.");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>

          <h2 className="mt-6 text-xl font-semibold text-slate-700">
            Cargando consulta
          </h2>
        </div>
      </main>
    );
  }

  if (error && !patient) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">Error</h2>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  if (!patient || !medicalRecord) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700">
            No se encontró la información requerida.
          </p>
        </div>
      </main>
    );
  }

  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-6">
        <Link
          to="/odontologist"
          className="inline-flex items-center font-medium text-cyan-600 hover:text-cyan-700"
        >
          ← Volver al inicio
        </Link>
      </div>

      {/* SUCCESS / ERROR FEEDBACK */}
      {successMessage && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 sm:flex-row sm:items-center sm:justify-between">
          {successMessage}

          <button
            onClick={() => navigate("/odontologist")}
            className="font-medium text-green-700 hover:underline"
          >
            Volver
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Consulta odontológica
          </h1>
          <p className="mt-2 text-slate-500">{fullName}</p>
        </div>

        <div className="space-y-6 p-4 sm:space-y-8 sm:p-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Información del paciente
            </h2>
            <PatientInfo patient={patient} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">Expediente médico</h2>
            <MedicalRecordInfo medicalRecord={medicalRecord} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">Nueva consulta</h2>

            <ConsultationForm
              recordId={medicalRecord.record_id}
              appointmentId={appointmentId ? Number(appointmentId) : undefined}
              onSave={handleSaveConsultation}
              onCancel={() => navigate(-1)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
