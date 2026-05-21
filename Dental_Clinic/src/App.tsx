import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./shared/Footer";
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <BrowserRouter>

        <main className="flex-1 flex flex-col items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-4xl font-bold text-sky-500">
                  Clínica Dental
                </h1>
              }
            />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;