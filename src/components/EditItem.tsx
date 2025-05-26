import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const mockItems = [
];

export default function EditItem() {
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [availability, setAvailability] = useState("");
  const [price, setPrice] = useState("");
  const [imageName] = useState("imagen.png");
  const [imagens, setItemImages] = useState(0);
  useEffect(() => {
    const item = mockItems.find(i => i.id === Number(id));
    if (item) {
      setItemName(item.name);
      setItemType(item.type);
      setAvailability(item.availability);
      setPrice(item.price);
      setItemImages(item.imagens);
    }
  }, [id]);

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
              <input
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Disponibilidade</label>
              <input
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preço</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <button className="bg-blue-600 text-white rounded py-1 mt-2 hover:bg-blue-700 transition">
              Editar
            </button>
          </div>

          <div className="flex flex-col items-start gap-2">
          <div className="grid grid-cols-5 gap-2">
            {[...Array(imagens)].map((_, i) => (
                <div
                key={i}
                className="w-[100px] h-[100px] bg-gray-400 flex items-center justify-center text-white text-sm rounded"
                >
                <img
                    src="/assets/cat.jpeg"
                    alt={`Image ${i + 1}`}
                    className="w-full h-full object-cover rounded"
                />
                </div>
            ))}
            </div>

            <div className="text-sm text-gray-800">{imageName}</div>
            <button className="bg-gray-600 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition">
              Upload
            </button>
            <button className="border border-red-500 text-red-500 text-sm px-3 py-1 rounded hover:bg-red-100 transition">
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
