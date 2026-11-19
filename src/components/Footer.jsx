import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Footer = ({setVistaActual}) => {
  const user = useAuth(); // Accedemos al usuario desde el contexto de autenticación
  const navigate = useNavigate()

  const handlePublishClick = (e) => {
    e.preventDefault();
    console.log('Usuario actual:', user.user); // Verifica el estado del usuario en la consola
    if (user.user) {
      navigate('/publicar');
    } else {
      alert('Para publicar una propiedad, primero debes iniciar sesión.');
      // navigate('/login');
    }
  };

  return (
    <footer className="bg-[#ff385c] hover:bg-slate-900 text-white px-4 sm:px-8 md:px-16 py-3.5 flex flex-col sm:flex-row justify-between items-center text-xs font-bold gap-3 z-10 shadow-lg">
      <div className="flex items-center gap-2">
        <span>¿Cómo Publico mi Propiedad?</span>
        <button
          type="button"
          onClick={handlePublishClick}
          className="underline hover:opacity-85 cursor-pointer bg-transparent"
        >
          Haz clic aquí
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-8 text-[11px] sm:text-xs">
        <span className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5" /> (+51) 988 067 397
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" /> Huancayo - Perú
        </span>
      </div>
    </footer>
  );
};

export default Footer;