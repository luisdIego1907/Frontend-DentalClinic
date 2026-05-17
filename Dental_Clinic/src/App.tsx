import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

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