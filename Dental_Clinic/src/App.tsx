import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Home from "./features/home/Home";
import PatientList from "./features/PatientList";
import RegisterPatient from "./pages/patients/RegisterPatient";
import Login from "./pages/login/Login";
import ScheduleAppointment from "./pages/appointments/ScheduleAppointments";
import "./App.css";
import NotFound from "./shared/NotFound";

import { patientsMock } from "./mocks/patient.mock";

import "./App.css";
import HomeDentist from "./features/home/homeDentist";
import HomeRecepcionist from "./features/home/homeReceptionist";
import HomeAdmin from "./features/home/homeAdmin";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/patients"
              element={<PatientList patients={patientsMock} />}
            />

            <Route path="/patients/register" element={<RegisterPatient />} />

            <Route
              path="/appointments/schedule"
              element={<ScheduleAppointment />}
            />
            <Route path="/patients/register" element={<RegisterPatient />} />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/recepcionista" element={<HomeRecepcionist />} />
            <Route path="/odontologo" element={<HomeDentist />} />
            <Route
              path="/appointments/schedule"
              element={<ScheduleAppointment />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
