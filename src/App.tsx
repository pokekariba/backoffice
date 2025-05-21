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
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Loja" element={<Shop />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/Usuarios" element={<Usuarios />}/>
        <Route path="/CriarItem" element={<CriarItem />}/>
      </Routes>
    </div>
  );
}

export default App;
