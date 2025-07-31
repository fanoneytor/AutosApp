import { useEffect, useState } from "react";
import { getCars, deleteCar } from "../services/carService";
import CarForm from "../components/CarForm";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import type { Car } from "../types/car";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
    } catch (error) {
      toast.error("Error al cargar los autos.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      await deleteCar(id);
      toast.success("Auto eliminado exitosamente.");
      fetchCars();
    } catch (error) {
      toast.error("Error al eliminar el auto.");
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCar(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
    fetchCars(); // Refresh cars after form submission
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mis Autos</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        Agregar Nuevo Auto
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {editingCar ? "Editar Auto" : "Agregar Auto"}
            </h2>
            <CarForm car={editingCar} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Marca</th>
              <th className="py-2 px-4 border-b">Modelo</th>
              <th className="py-2 px-4 border-b">Año</th>
              <th className="py-2 px-4 border-b">Placa</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="py-2 px-4 border-b text-center">{car.brand}</td>
                <td className="py-2 px-4 border-b text-center">{car.model}</td>
                <td className="py-2 px-4 border-b text-center">{car.year}</td>
                <td className="py-2 px-4 border-b text-center">{car.plate}</td>
                <td className="py-2 px-4 border-b text-center">{car.color}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEdit(car)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
