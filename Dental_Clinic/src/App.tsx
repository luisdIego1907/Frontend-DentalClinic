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
import { patientsMock } from "./mocks/patient.mock";
import "./App.css";

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
                          <ProtectedRoute rol="admin">
                            <HomeAdmin />
                          </ProtectedRoute>
                        }
                      />

                      {/* Recepcionista */}
                      <Route
                        path="/assistant"
                        element={
                          <ProtectedRoute rol="assistant">
                            <HomeRecepcionist />
                          </ProtectedRoute>
                        }
                      />

                      {/* Odontólogo */}
                      <Route
                        path="/odontologist"
                        element={
                          <ProtectedRoute rol="odontologist">
                            <HomeDentist />
                          </ProtectedRoute>
                        }
                      />

                      {/* Pacientes — admin y assistant */}
                      <Route
                        path="/patients"
                        element={
                          <ProtectedRoute rol={["admin", "assistant"]}>
                            <PatientList patients={patientsMock} />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/patients/:id"
                        element={
                          <ProtectedRoute
                            rol={["admin", "assistant", "odontologist"]}
                          >
                            <PatientDetail />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/patients/register"
                        element={
                          <ProtectedRoute rol={["admin", "assistant"]}>
                            <RegisterPatient />
                          </ProtectedRoute>
                        }
                      />

                      {/* Citas */}
                      <Route
                        path="/appointments/schedule"
                        element={
                          <ProtectedRoute rol={["admin", "assistant"]}>
                            <ScheduleAppointment />
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
