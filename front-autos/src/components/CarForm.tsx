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
        <div className="relative mt-1">
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            className={`block w-full border ${errors.imageUrl ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2 pl-10`}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M13.125 3.004H10.875L10.5 5.254H13.5L13.125 3.004ZM18.75 7.504H5.25C4.42157 7.504 3.75 8.17557 3.75 9.004V18.004C3.75 18.8324 4.42157 19.504 5.25 19.504H18.75C19.5784 19.504 20.25 18.8324 20.25 18.004V9.004C20.25 8.17557 19.5784 7.504 18.75 7.504ZM18.75 9.004V18.004H5.25V9.004H18.75ZM12 10.504C10.067 10.504 8.5 12.071 8.5 14.004C8.5 15.937 10.067 17.504 12 17.504C13.933 17.504 15.5 15.937 15.5 14.004C15.5 12.071 13.933 10.504 12 10.504ZM12 12.004C13.1046 12.004 14 12.8994 14 14.004C14 15.1086 13.1046 16.004 12 16.004C10.8954 16.004 10 15.1086 10 14.004C10 12.8994 10.8954 12.004 12 12.004Z" />
          </svg>
        </div>
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
