// src/store/users.js
import { create } from 'zustand'; // Importar la función create de zustand

// Definir el store para manejar usuarios
const useUserStore = create((set) => ({
  user: null, // Información inicial del usuario (nulo cuando no está autenticado)
  setUserData: (userData) => {
    console.log('Estableciendo datos del usuario en Zustand:', userData);
    set({ user: userData }); // Acción para establecer los datos del usuario
  },
  clearUserData: () => {
    console.log('Limpiando los datos del usuario en Zustand');
    set({ user: null }); // Acción para limpiar los datos al cerrar sesión
  },
  showProfile: false, // Estado inicial de mostrar perfil
  setShowProfile: (value) => {
    console.log('Seteando showProfile en Zustand:', value);
    set({ showProfile: value }); // Acción para establecer el valor de showProfile
  },
}));

export default useUserStore;
