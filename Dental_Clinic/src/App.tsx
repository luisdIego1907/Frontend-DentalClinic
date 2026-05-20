import { BrowserRouter, Routes } from "react-router-dom";
import './App.css'
import Header from "./shared/Header";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />

        <main className="flex-1 flex flex-col">
          <Routes>
   
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;