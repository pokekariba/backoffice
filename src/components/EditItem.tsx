import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type ItemLoja = {
  id: number;
  nome: string;
  tipo: "deck" | "avatar" | "fundo";
  disponibilidade: "disponivel" | "indisponivel";
  preco: number;
};

export default function EditItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState<ItemLoja["tipo"]>("deck");
  const [availability, setAvailability] = useState<ItemLoja["disponibilidade"]>("disponivel");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<ItemLoja[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://server-efvt.onrender.com/jogo/backoffice/loja", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
          body: JSON.stringify({}),
        });

        const data: { itens: ItemLoja[] } = await response.json();
        setItems(data.itens);

        if (id) {
          const itemToEdit = data.itens.find((item) => item.id === Number(id));
          if (itemToEdit) {
            setItemName(itemToEdit.nome);
            setItemType(itemToEdit.tipo);
            setAvailability(itemToEdit.disponibilidade);
            setPrice(itemToEdit.preco.toString());

            // Fetch image URLs for this item
            const imageResponse = await fetch("https://server-efvt.onrender.com/jogo/visualizar-item", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
              },
              body: JSON.stringify({ itemId: itemToEdit.id }),
            });

            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              setImageUrls(imageData.urlsItem || []);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [id]);

  const handleEdit = async () => {
    const preco = parseInt(price);
    if (isNaN(preco)) return alert("Preço inválido");

    try {
      const response = await fetch("https://server-efvt.onrender.com/jogo/backoffice/editar-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify({
          id: Number(id),
          nome: itemName,
          tipo: itemType,
          disponibilidade: availability,
          preco,
        }),
      });

      alert("Item editado com sucesso!");
      setItemName("");
      setPrice("");
      navigate("/loja");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao editar item.");
    }
  };

  if (loading) return <div className="p-6">Carregando...</div>;
  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-8 text-left">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Loja</h2>
        <p className="text-sm text-gray-600 mb-8">Editar item</p>

        <div className="flex gap-8">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700">Preço</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <button 
              className="bg-blue-600 text-white rounded py-1 mt-2 hover:bg-blue-700 transition"
              onClick={handleEdit}
            >
              Editar
            </button>
          </div>

          <div className="flex flex-col items-start gap-2">
  <div className="grid grid-cols-5 gap-2">
    {imageUrls.length > 0 ? (
      imageUrls.map((url, i) => (
        <div
          key={i}
          className="w-[100px] h-[100px] bg-gray-400 flex items-center justify-center text-white text-sm rounded"
        >
          <img
            src={url}
            alt={`Image ${i + 1}`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ))
    ) : (
      <div className="text-gray-500 text-sm">Nenhuma imagem disponível</div>
    )}
  </div>

  <input
    type="file"
    multiple
    onChange={(e) => setImages(e.target.files)}
    className="text-sm mt-4"
  />

  <button
    onClick={async () => {
      if (!images || images.length === 0 || !id) {
        alert("Selecione ao menos uma imagem.");
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("imagens", images[i]);
      }
      formData.append("idItem", id);

      try {
        const uploadResponse = await fetch(
          "https://server-efvt.onrender.com/jogo/backoffice/adicionar-imagem-item",
          {
            method: "POST",
            headers: {
              "Authorization": `${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          alert("Erro ao enviar imagens");
          return;
        }

        alert("Imagens enviadas com sucesso!");

        // Refresh image list
        const refreshed = await fetch("https://server-efvt.onrender.com/jogo/backoffice/visualizar-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
          body: JSON.stringify({ itemId: Number(id) }),
        });

        const data = await refreshed.json();
        setImageUrls(data.urlsItem || []);
        setImages(null);
      } catch (err) {
        console.error(err);
        alert("Erro ao enviar imagens");
      }
    }}
    className="bg-gray-600 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition mt-2"
  >
    Upload
  </button>
</div>
        </div>
      </div>
    </div>
  );
}
