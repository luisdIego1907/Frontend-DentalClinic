import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import RegisterPatient from "../src/pages/patients/RegisterPatient";
import './App.css'

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/patients/register" element={<RegisterPatient />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;