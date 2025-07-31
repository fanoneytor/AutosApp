import { useState, useEffect } from "react";
import { createCar, updateCar } from "../services/carService";
import { toast } from "react-toastify";
import type { Car } from "../types/car";

interface CarFormProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarForm({ car, onClose }: CarFormProps) {
  const [formData, setFormData] = useState<Car>({
    brand: "",
    model: "",
    year: 2000,
    plate: "",
    color: "",
  });

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        brand: "",
        model: "",
        year: 2000,
        plate: "",
        color: "",
      });
    }
  }, [car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year"
          ? parseInt(value)
          : name === "plate" || name === "color"
          ? value.toUpperCase()
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateCar(formData);
        toast.success("Auto actualizado exitosamente.");
      } else {
        await createCar(formData);
        toast.success("Auto agregado exitosamente.");
      }
      onClose();
    } catch (error) {
      toast.error("Error al guardar el auto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Marca</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Modelo</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Año</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Placa</label>
        <input
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
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
  );
}
