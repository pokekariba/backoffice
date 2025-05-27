import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ItemLoja = {
  id: number;
  nome: string;
  tipo: "deck" | "avatar" | "fundo";
  disponibilidade: "disponivel" | "indisponivel";
  preco: number;
};

export default function CriarItem() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState<ItemLoja["tipo"]>("deck");
  const [availability, setAvailability] = useState<ItemLoja["disponibilidade"]>("disponivel");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    const preco = parseInt(price);
    if (isNaN(preco)) return alert("Preço inválido");

    try {
      const response = await fetch("https://server-efvt.onrender.com/jogo/backoffice/adicionar-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify({
          nome: itemName,
          tipo: itemType,
          disponibilidade: availability,
          preco,
        }),
      });


      const data = await response.json();
      const createdItemId = data.id 

      if (!createdItemId) {
        alert("Erro: ID do item não retornado.");
        return;
      }

      if (images && images.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("imagens", images[i]);
        }
        formData.append("idItem", String(createdItemId));

        const uploadResponse = await fetch("https://server-efvt.onrender.com/jogo/backoffice/adicionar-imagem-item", {
          method: "POST",
          headers: {
            "Authorization": `${token}`, 
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          alert("Erro ao enviar imagens");
          return;
        }
      }

      alert("Item criado com sucesso!");
      setItemName("");
      setPrice("");
      setImages(null);
      navigate("/loja");
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-8 text-left">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Loja</h2>
        <p className="text-sm text-gray-600 mb-8">Criar novo item</p>

        <div className="flex gap-8">
          <div className="flex flex-col gap-4 w-full max-w-md">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value as ItemLoja["tipo"])}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="deck">Deck</option>
                <option value="avatar">Avatar</option>
                <option value="fundo">Fundo</option>
              </select>
            </div>

            {/* Disponibilidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Disponibilidade</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as ItemLoja["disponibilidade"])}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="disponivel">Disponível</option>
                <option value="indisponivel">Indisponível</option>
              </select>
            </div>

            {/* Preço */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Preço</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
                type="number"
              />
            </div>

            {/* Imagens */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagens (até 10)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="w-full"
              />
            </div>

            <button
              className="bg-blue-600 text-white rounded py-1 mt-2 hover:bg-blue-700 transition"
              onClick={handleCreate}
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
