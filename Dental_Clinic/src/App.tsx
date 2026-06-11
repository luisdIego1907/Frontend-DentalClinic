import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import PatientList from "./features/PatientList";
import RegisterPatient from "./pages/patients/RegisterPatient";
import Login from "./pages/login/Login";
import ScheduleAppointment from "./pages/appointments/ScheduleAppointments";
import NotFound from "./shared/NotFound";
import PatientDetail from "./features/PatientDetail";
import HomeDentist from "./features/home/homeDentist";
import HomeRecepcionist from "./features/home/homeReceptionist";
import HomeAdmin from "./features/home/homeAdmin";
import ProtectedRoute from "./components/security/ProtectedRoute";
import "./App.css";
import ConsultationPage from "./pages/consultations/ConsultationPage";
import ConsultationListPage from "./pages/consultations/ConsultationListPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Login — sin header ni footer */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas — con header y footer */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />

                  <main className="flex-1 flex flex-col">
                    <Routes>
                      {/* Admin */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute rol="ADMIN">
                            <HomeAdmin />
                          </ProtectedRoute>
                        }
                      />

                      {/* Recepcionista */}
                      <Route
                        path="/assistant"
                        element={
                          <ProtectedRoute rol="ASSIS">
                            <HomeRecepcionist />
                          </ProtectedRoute>
                        }
                      />

                      {/* Odontólogo */}
                      <Route
                        path="/odontologist"
                        element={
                          <ProtectedRoute rol="ODO">
                            <HomeDentist />
                          </ProtectedRoute>
                        }
                      />

                      {/* Pacientes — admin y assistant */}
                      <Route
                        path="/patients"
                        element={
                          <ProtectedRoute rol={["ADMIN", "ASSIS", "ODO"]}>
                            <PatientList />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/patients/:id"
                        element={
                          <ProtectedRoute rol={["ADMIN", "ASSIS", "ODO"]}>
                            <PatientDetail />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/consultations/patient/:patientId"
                        element={
                          <ProtectedRoute rol="ODO">
                            <ConsultationPage />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/patients/register"
                        element={
                          <ProtectedRoute rol={["ADMIN", "ASSIS"]}>
                            <RegisterPatient />
                          </ProtectedRoute>
                        }
                      />

                      {/* Citas */}
                      <Route
                        path="/appointments/schedule"
                        element={
                          <ProtectedRoute rol={["ADMIN", "ASSIS"]}>
                            <ScheduleAppointment />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/consultations"
                        element={
                          <ProtectedRoute rol="ADMIN">
                            <ConsultationListPage />
                          </ProtectedRoute>
                        }
                      />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
