import axios from "axios";
import type { Car } from "../types/car";

export const API_URL = "http://localhost:8080/cars";

// Export the axios instance directly
export const axiosInstance = axios.create();

export const getCars = async (query?: string): Promise<Car[]> => {
  const url = query ? `${API_URL}?query=${query}` : API_URL;
  const response = await axiosInstance.get<Car[]>(url);
  return response.data;
};

export const createCar = async (car: Car): Promise<Car> => {
  const response = axiosInstance.post<Car>(API_URL, car);
  return response.data;
};

export const updateCar = async (car: Car): Promise<Car> => {
  const response = axiosInstance.put<Car>(`${API_URL}/${car.id}`, car);
  return response.data;
};

export const deleteCar = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};
