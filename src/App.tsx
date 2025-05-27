import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import EditItem from "./components/EditItem";
import Usuarios from "./components/Usuarios";
import Login from "./components/Login";
import CriarItem from "./components/CriarItem";

function App() {
  return (
    <div className="bg-gray-100">
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loja" element={<Shop />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/usuarios" element={<Usuarios />}/>
        <Route path="/criar-item" element={<CriarItem />}/>
      </Routes>
    </div>
  );
}

export default App;
