import { Link } from "react-router-dom";
import PatientCard from "./PatientCard";

type Patient = {
  id: number;
  name: string;
  identification: string;
  phone: string;
};

type Props = {
  patients: Patient[];
};

export default function PatientList({ patients }: Props) {
  if (patients.length === 0) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="block h-full"
          >
            <PatientCard patient={patient} />
          </Link>
        ))}
      </div>

    </div>
  );
}