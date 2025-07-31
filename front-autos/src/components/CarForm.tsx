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
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(), // Default to current year
        plate: "",
        color: "",
        imageUrl: "",
      });
    }
    setErrors({}); // Clear errors when car changes
  }, [car]);

  const validate = (data: Car) => {
    const newErrors: Record<string, string> = {};
    if (!data.brand.trim()) newErrors.brand = "La marca es requerida.";
    if (!data.model.trim()) newErrors.model = "El modelo es requerido.";
    if (!data.plate.trim()) newErrors.plate = "La placa es requerida.";
    if (!data.color.trim()) newErrors.color = "El color es requerido.";
    if (!data.imageUrl || !data.imageUrl.trim()) newErrors.imageUrl = "La URL de la imagen es requerida.";

    if (data.year < 1900 || data.year > new Date().getFullYear() + 1) {
      newErrors.year = `El año debe estar entre 1900 y ${new Date().getFullYear() + 1}.`;
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "year") {
      newValue = parseInt(value);
    } else if (name === "plate" || name === "color") {
      newValue = value.toUpperCase();
    }

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: newValue };
      setErrors(validate(updatedData)); // Validate on change
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm font-medium text-gray-700">Marca</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.brand ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          required
        />
        {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Modelo</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.model ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          required
        />
        {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Año</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.year ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          required
        />
        {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Placa</label>
        <input
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.plate ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          required
        />
        {errors.plate && <p className="text-red-500 text-xs mt-1">{errors.plate}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.color ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          required
        />
        {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleChange}
          className={`mt-1 block w-full border ${errors.imageUrl ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          required
        />
        {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
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
