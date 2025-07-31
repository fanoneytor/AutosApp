import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../services/adminService";
import type { User as AdminUserType } from "../services/adminService";
import { toast } from "react-toastify";
import { Role } from "../types/auth";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialog";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserType[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Error al cargar los usuarios.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success("Rol de usuario actualizado.");
      fetchUsers();
    } catch (error) {
      toast.error("Error al actualizar el rol.");
    }
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDeleteId(userId);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDeleteId) {
      try {
        await deleteUser(userToDeleteId);
        toast.success("Usuario eliminado exitosamente.");
        fetchUsers();
      } catch (error) {
        toast.error("Error al eliminar el usuario.");
      } finally {
        setShowConfirmDialog(false);
        setUserToDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setUserToDeleteId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Administración de Usuarios</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Volver
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <div className="relative inline-block w-full text-gray-700">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
                    >
                      <option value={Role.USER}>USER</option>
                      <option value={Role.ADMIN}>ADMIN</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-600 hover:text-red-900 inline-flex items-center p-2 rounded-full hover:bg-red-100 transition duration-150 ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 4a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmDialog && (
        <ConfirmationDialog
          message="¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
