import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import RegisterPatient from "./pages/patients/RegisterPatient";
import Home from "./features/home/Home";
import Login from "./pages/Login";
import ScheduleAppointment from "./pages/appointments/ScheduleAppointments";
import "./App.css";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients/register" element={<RegisterPatient />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={<h1>Home Admin - En construcción</h1>}
            />
            <Route
              path="/recepcionista"
              element={<h1>Home Recepcionista - En construcción</h1>}
            />
            <Route
              path="/odontologo"
              element={<h1>Home Odontólogo - En construcción</h1>}
            />
            <Route path="/appointments/schedule" element={<ScheduleAppointment />} /> 
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
