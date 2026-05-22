import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

import Home from "./features/home/Home";
import PatientList from "./features/PatientList";

import RegisterPatient from "./pages/patients/RegisterPatient";
import ScheduleAppointment from "./pages/appointments/ScheduleAppointments";

import { patientsMock } from "./mocks/patient.mock";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/patients"
              element={<PatientList patients={patientsMock} />}
            />

            <Route
              path="/patients/register"
              element={<RegisterPatient />}
            />

            <Route
              path="/appointments/schedule"
              element={<ScheduleAppointment />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;