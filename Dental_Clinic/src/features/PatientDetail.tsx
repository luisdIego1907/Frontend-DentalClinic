import { useParams, Link } from "react-router-dom";
import { patientsMock } from "../mocks/patient.mock";

export default function PatientDetail() {
  const { id } = useParams();

  const patient = patientsMock.find((patient) => patient.id === Number(id));

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
            className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Volver a pacientes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          to="/patients"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver a pacientes
        </Link>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            {patient.name}
          </h1>

          <p className="text-slate-500 mt-1">
            Información detallada del paciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              ID
            </p>
            <p className="text-lg text-slate-800">
              {patient.id}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Nombre completo
            </p>
            <p className="text-lg text-slate-800">
              {patient.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Identificación
            </p>
            <p className="text-lg text-slate-800">
              {patient.identification}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Teléfono
            </p>
            <p className="text-lg text-slate-800">
              {patient.phone}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}