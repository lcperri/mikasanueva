// src/components/BackButton.jsx
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BackButton({ label = 'Volver', fallback = '/' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    //recibe el estado de la navegación desde el login con Google
    const comeFromOAuth = location.state?.fromOAuth; 
    // React Router asigna location.key === 'default' cuando es la primera carga (ej. regreso de Google)
    const previousHistory = location.key !== 'default';
    if (previousHistory && !comeFromOAuth) {
        console.log(previousHistory);
        navigate(-1); // Retrocede conservando ?page=3, filtros y scroll
    } else {
        navigate(fallback || '/catalogo', { replace: true }); // Va seguro al catálogo si entró directo desde OAuth
    }

    // if (fallback) {
    //   console.log('Navegando a fallback:', fallback);
    //   navigate(fallback, { replace: true });
    // } else {
    //   navigate(-1);
    // }

    //Si hay historial previo en la app, retrocede (conservando ejemplo ?page=3)
    // if (window.history.length > 1) {
    //   navigate(-1);
    // } else {
    //   navigate(fallback); // Si no hay historial, navega al inicio
    // }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-rose-500 transition-colors cursor-pointer"
    >
      <span><ArrowLeft className="w-4 h-4" /></span>
      <span>{label}</span>
    </button>
  );
}