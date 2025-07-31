import { useEffect, useState } from "react";
import { getCars, deleteCar, updateCar, type CarSearchParams } from "../services/carService";
import CarForm from "../components/CarForm";
import ImageUploadModal from "../components/ImageUploadModal";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import type { Car } from "../types/car";
import { Link } from "react-router-dom";
import { Role } from "../types/auth";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [carToUpdateImage, setCarToUpdateImage] = useState<Car | null>(null);
  const [generalSearchQuery, setGeneralSearchQuery] = useState("");
  const [individualFilters, setIndividualFilters] = useState<Partial<Car>>({
    brand: "",
    model: "",
    year: undefined,
    plate: "",
    color: "",
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [debouncedSearchParams, setDebouncedSearchParams] = useState<CarSearchParams>({});
  const { logout, userRole } = useAuth();

  const fetchCars = async (params: CarSearchParams) => {
    try {
      const data = await getCars(params);
      setCars(data);
    } catch (error) {
      toast.error("Error al cargar los autos.");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const combinedParams: CarSearchParams = {};

      if (generalSearchQuery.trim() !== "") {
        combinedParams.query = generalSearchQuery.trim();
      } else {
        for (const key in individualFilters) {
          const value = individualFilters[key as keyof Partial<Car>];
          if (value !== undefined && value !== null && String(value).trim() !== "") {
            (combinedParams as any)[key] = value;
          }
        }
      }
      setDebouncedSearchParams(combinedParams);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [generalSearchQuery, individualFilters]);

  useEffect(() => {
    fetchCars(debouncedSearchParams);
  }, [debouncedSearchParams]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      await deleteCar(id);
      toast.success("Auto eliminado exitosamente.");
      fetchCars(debouncedSearchParams);
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
    fetchCars(debouncedSearchParams);
  };

  const handleImageUploadClick = (car: Car) => {
    setCarToUpdateImage(car);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setCarToUpdateImage(null);
    fetchCars(debouncedSearchParams);
  };

  const handleImageUpdate = async (carId: string, imageUrl: string) => {
    try {
      const carToUpdate = cars.find((car) => car.id === carId);
      if (carToUpdate) {
        await updateCar({ ...carToUpdate, imageUrl });
        toast.success("URL de imagen actualizada exitosamente.");
        fetchCars(debouncedSearchParams);
      } else {
        toast.error("Auto no encontrado.");
      }
    } catch (error) {
      toast.error("Error al actualizar la URL de la imagen.");
    }
  };

  const handleIndividualFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIndividualFilters((prev) => ({
      ...prev,
      [name]: name === "year" ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mis Autos</h1>
        <div className="flex space-x-2">
          {userRole === Role.ADMIN && (
            <Link
              to="/admin/users"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Admin Usuarios
            </Link>
          )}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
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
          placeholder="Buscar por cualquier campo..."
          value={generalSearchQuery}
          onChange={(e) => setGeneralSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          {showAdvancedFilters ? "Ocultar Filtros Avanzados" : "Mostrar Filtros Avanzados"}
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 mb-4">
          <input
            type="text"
            name="brand"
            placeholder="Marca..."
            value={individualFilters.brand || ""}
            onChange={handleIndividualFilterChange}
            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="model"
            placeholder="Modelo..."
            value={individualFilters.model || ""}
            onChange={handleIndividualFilterChange}
            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="year"
            placeholder="Año..."
            value={individualFilters.year || ""}
            onChange={handleIndividualFilterChange}
            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="plate"
            placeholder="Placa..."
            value={individualFilters.plate || ""}
            onChange={handleIndividualFilterChange}
            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="color"
            placeholder="Color..."
            value={individualFilters.color || ""}
            onChange={handleIndividualFilterChange}
            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

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

      {isImageModalOpen && (
        <ImageUploadModal
          car={carToUpdateImage}
          onClose={handleCloseImageModal}
          onSave={handleImageUpdate}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded shadow-md relative">
            <img
              src={car.imageUrl || "/default-car-image.svg"}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <button
              onClick={() => handleImageUploadClick(car)}
              className="absolute top-6 right-6 bg-gray-800 bg-opacity-75 p-2 rounded-full text-white hover:bg-opacity-100 transition-opacity"
              title="Actualizar URL de imagen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
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