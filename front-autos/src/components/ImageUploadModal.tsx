import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { Car } from "../types/car";

interface ImageUploadModalProps {
  car: Car | null;
  onClose: () => void;
  onSave: (carId: string, imageUrl: string) => void;
}

export default function ImageUploadModal({ car, onClose, onSave }: ImageUploadModalProps) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (car) {
      setImageUrl(car.imageUrl || "");
    }
  }, [car]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (car && car.id) {
      onSave(car.id, imageUrl);
      onClose();
    } else {
      toast.error("No se pudo actualizar la imagen: ID del auto no encontrado.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Actualizar URL de Imagen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}