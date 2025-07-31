import { axiosInstance, API_BASE_URL } from "../utils/api"; // Updated import path
import { Role } from "../types/auth";

export interface User {
  id: string;
  username: string;
  role: Role;
}

const ADMIN_API_URL = `${API_BASE_URL}/admin/users`; // Use API_BASE_URL

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>(ADMIN_API_URL);
  return response.data;
};

export const updateUserRole = async (userId: string, newRole: Role): Promise<User> => {
  const response = await axiosInstance.put<User>(`${ADMIN_API_URL}/${userId}/role?newRole=${newRole}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.delete(`${ADMIN_API_URL}/${userId}`);
};
