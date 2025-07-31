import axios from "axios";
import type { Car } from "../types/car";

const API_URL = "http://localhost:8080/cars";

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(API_URL, getConfig());
  return response.data;
};

export const createCar = async (car: Car): Promise<Car> => {
  const response = await axios.post<Car>(API_URL, car, getConfig());
  return response.data;
};

export const updateCar = async (car: Car): Promise<Car> => {
  const response = await axios.put<Car>(`${API_URL}/${car.id}`, car, getConfig());
  return response.data;
};

export const deleteCar = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getConfig());
};
