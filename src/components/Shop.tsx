import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Shop() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    nome: "",
    tipo: "",
    disponibilidade: ""
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removedIds, setRemovedIds] = useState([]); // Store removed item IDs

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://server-efvt.onrender.com/jogo/backoffice/loja", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify({})
        });
        
        const data = await response.json();
        setItems(data.itens);
        
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    !removedIds.includes(item.id) && // filter out removed items
    item.nome.toLowerCase().includes(filters.nome.toLowerCase()) &&
    (filters.tipo === "" || item.tipo === filters.tipo) &&
    (filters.disponibilidade === "" || item.disponibilidade === filters.disponibilidade)
  );

  const handleRemove = (id) => {
    setRemovedIds([...removedIds, id]);
  };

  return (
    <>
      <Navbar/>
      <div className="w-[80%] mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-left">Loja</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <input 
          type="text"
          placeholder="Nome"
          className="border rounded px-3 py-2 w-60"
          value={filters.nome}
          onChange={e => setFilters({ ...filters, nome: e.target.value })}
        />
        <select
          className="border rounded px-3 py-2"
          value={filters.tipo}
          onChange={e => setFilters({ ...filters, tipo: e.target.value })}
        >
          <option value="">Tipo</option>
          <option value="deck">Deck</option>
          <option value="avatar">Avatar</option>
          <option value="fundo">Fundo</option>
        </select>
        <select
          className="border rounded px-3 py-2"
          value={filters.disponibilidade}
          onChange={e => setFilters({ ...filters, disponibilidade: e.target.value })}
        >
          <option value="">Disponibilidade</option>
          <option value="disponivel">Disponível</option>
          <option value="indisponivel">Indisponível</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => navigate("/criar-item")}>
          Criar item ➕
        </button>
      </div>

      <div className="bg-white rounded shadow-md">
        {loading ? (
          <div className="px-6 py-4">Carregando...</div>
        ) : filteredItems.length === 0 ? (
          <div className="px-6 py-4">Nenhum item encontrado.</div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="border-t first:border-t-0 px-6 py-4 text-left hover:bg-gray-100 flex justify-between items-center cursor-pointer"
              onClick={() => navigate(`/edit/${item.id}`)}
            >
              <div>
                {index + 1} - {item.nome} ({item.tipo}, {item.disponibilidade}) - R${item.preco}
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  </>
  );
}
