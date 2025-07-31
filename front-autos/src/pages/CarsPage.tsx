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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const { logout } = useAuth();

  const fetchCars = async (query?: string) => {
    try {
      const data = await getCars(query);
      setCars(data);
    } catch (error) {
      toast.error("Error al cargar los autos.");
    }
  };

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch cars when debounced search query changes
  useEffect(() => {
    fetchCars(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      await deleteCar(id);
      toast.success("Auto eliminado exitosamente.");
      fetchCars(debouncedSearchQuery); // Refresh with current search query
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
    fetchCars(debouncedSearchQuery); // Refresh cars after form submission with current search query
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
        >
          Agregar Nuevo Auto
        </button>
        <input
          type="text"
          placeholder="Buscar vehiculos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingCar ? "Editar Auto" : "Agregar Auto"}
            </h2>
            <CarForm car={editingCar} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{car.brand} {car.model}</h3>
            <p><strong>Año:</strong> {car.year}</p>
            <p><strong>Placa:</strong> {car.plate}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <div className="mt-4 flex justify-end">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
