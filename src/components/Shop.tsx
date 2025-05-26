import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: "",
    type: "",
    availability: ""
  });

  const [items] = useState([
  ]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filters.name.toLowerCase())
  );

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
        <select
          className="border rounded px-3 py-2"
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        >
          <option>Tipo</option>
        </select>
        <select
          className="border rounded px-3 py-2"
          value={filters.availability}
          onChange={e => setFilters({ ...filters, availability: e.target.value })}
        >
          <option>Disponibilidade</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() =>  navigate("/criaritem")}>
          Criar item ➕
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Pesquisar 🔍
        </button>
      </div>

      <div className="bg-white rounded shadow-md">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => navigate(`/edit/${item.id}`)}
            className="border-t first:border-t-0 px-6 py-4 text-left hover:bg-gray-100 cursor-pointer"
          >
            {index + 1} - {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
