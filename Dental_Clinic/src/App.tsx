import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatientList from "./features/PatientList";
import './App.css';

function App() {

  const patients = [
    {
      id: 1,
      name: "María González",
      identification: "1-1234-5678",
      phone: "+506 8888-1111"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      identification: "2-2345-6789",
      phone: "+506 8888-2222"
    },
    {
      id: 3,
      name: "Ana Fernández",
      identification: "3-3456-7890",
      phone: "+506 8888-3333"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <BrowserRouter>

        <main className="flex-1">

          <Routes>

            <Route
              path="/"
              element={<PatientList patients={patients} />}
            />

          </Routes>

        </main>


      </BrowserRouter>
    </div>
  );
}

export default App;