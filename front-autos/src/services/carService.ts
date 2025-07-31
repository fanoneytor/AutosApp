import type { Car } from "../types/car";
import { axiosInstance } from "../utils/api"; // Updated import path

export const API_URL = "/cars"; // Base URL is now in axiosInstance

export interface CarSearchParams {
  query?: string;
  brand?: string;
  model?: string;
  year?: number;
  plate?: string;
  color?: string;
}

export const getCars = async (params?: CarSearchParams): Promise<Car[]> => {
  const urlParams = new URLSearchParams();
  if (params) {
    for (const key in params) {
      const value = params[key as keyof CarSearchParams];
      if (value !== undefined && value !== null && value !== "") {
        urlParams.append(key, String(value));
      }
    }
  }
  const url = `${API_URL}?${urlParams.toString()}`;
  const response = await axiosInstance.get<Car[]>(url);
  return response.data;
};

export const createCar = async (car: Car): Promise<Car> => {
  const response = await axiosInstance.post<Car>(API_URL, car);
  return response.data;
};

export const updateCar = async (car: Car): Promise<Car> => {
  const response = await axiosInstance.put<Car>(`${API_URL}/${car.id}`, car);
  return response.data;
};

export const deleteCar = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};
