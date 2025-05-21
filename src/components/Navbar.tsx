import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-6 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-bold text-lg">PoKariba</Link>
        <Link to="/loja" className="text-blue-500 hover:underline">Loja</Link>
        <Link to="/usuarios" className="text-blue-500 hover:underline">Usuários</Link>
      </div>

      <button className="text-blue-500 hover:underline">Sair</button>
    </nav>
  );
}

