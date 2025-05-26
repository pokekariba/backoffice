import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: "",
    email: ""
  });

  const [items, setItems] = useState([
  ]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    item.email.toLowerCase().includes(filters.email.toLowerCase())
  );
  

  const toggleBan = (id:number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, banido: item.banido === "s" ? "n" : "s" }
          : item
      )
    );
  };

  return (
    <div className="w-[80%] mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-left">Loja</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <input
          type="text"
          placeholder="Nome"
          className="border rounded px-3 py-2 w-60"
          value={filters.name}
          onChange={e => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          className="border rounded px-3 py-2 w-60"
          value={filters.email}
          onChange={e => setFilters({ ...filters, email: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Pesquisar 🔍
        </button>
      </div>

      <div className="bg-white rounded shadow-md">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="border-t first:border-t-0 px-6 py-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span>
              {index + 1} - {item.name} - {item.email}
            </span>
            <button
              className={`px-4 py-2 rounded ml-4 text-white font-medium transition ${
                item.banido === "n"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
              onClick={() => toggleBan(item.id)}
            >
              {item.banido === "n" ? "Banir" : "Desbanir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
