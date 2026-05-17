import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <h1>Clínica Dental</h1>

      <p>
        Bienvenido al sistema de gestión de la clínica dental.
      </p>

      <Link to="/patients/register">
        Ir a registrar paciente
      </Link>
    </main>
  );
}