import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

type Usuario = {
  id: number;
  name: string;
  email: string;
  banido: "s" | "n";
};

export default function Usuarios() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [filters, setFilters] = useState({ nome: "", email: "" });
  const [items, setItems] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("https://server-efvt.onrender.com/jogo/backoffice/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({
            email: "",
            nome: ""
      })
        });
        const data = await response.json();
        setItems(data.usuarios);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.nome.toLowerCase().includes(filters.nome.toLowerCase()) &&
      item.email.toLowerCase().includes(filters.email.toLowerCase())
  );

  const toggleBan = async (id: number) => {
    try {
      const response = await fetch(`https://server-efvt.onrender.com/jogo/backoffice/banir-usuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({
            idUsuario: id  
          })
      });
      if (response.ok) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? { ...item, status: item.status === "offline" ? "banido" : "offline" }
              : item
          )
        );
      } else {
        alert("Falha ao banir/desbanir usuário.");
      }
    } catch (err) {
      console.error("Erro ao atualizar banimento:", err);
    }
  };

  if (loading) return <div className="p-6">Carregando usuários...</div>;

  return (
  <>
    <Navbar/>
    <div className="w-[80%] mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-left">Usuários</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <input
          type="text"
          placeholder="Nome"
          className="border rounded px-3 py-2 w-60"
          value={filters.nome}
          onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          className="border rounded px-3 py-2 w-60"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
      </div>

      <div className="bg-white rounded shadow-md">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="border-t first:border-t-0 px-6 py-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span>
              {index + 1} - {item.nome} - {item.email}
            </span>

 
            <button
              className={`px-4 py-2 rounded ml-4 text-white font-medium transition ${
                item.status === "offline"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
              onClick={() => {
                toggleBan(item.id)
              }}
            >
              {item.status === "offline" ? "Banir" : "Desbanir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
