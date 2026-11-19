import { useState, useEffect } from 'react'
import { FavoritesProvider } from './context/FavoritesContext';

// import './App.css'
import Header from './components/Header'
import Landing from './components/Landing'
import Footer from './components/Footer';
import Catalog from './components/Catalog'
import PropertyDetail from './components/PropertyDetail'
import CreateProperty from './components/CreateProperty'
import Login from './components/Login'
import Favorites from './components/Favorites'
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function App() {
  // Estado inicial en NULL para que nadie empiece logueado por defecto
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  
  // Estado para la navegación SPA ('landing', 'catalogo', 'login', etc.)
  const [vistaActual, setVistaActual] = useState('landing');
  const [propiedadSeleccionadaId, setPropiedadSeleccionadaId] = useState(null);
 
  //Estados para manejar la carga de propiedades:
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Estado para manejar fovoritos
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('mikasa_favoritos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchPropiedades();
  }, []);

  const fetchPropiedades = async () => {
    try {
      setLoading(true);
      setError(null);

      // Consulta a la tabla propiedades en Supabase
      const { data, error } = await supabase
        .from('propiedades')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPropiedades(data || []);
      console.log('Propiedades obtenidas de Supabase:', data);
    } catch (err) {
      console.error('Error al cargar propiedades:', err.message);
      setError('No se pudo conectar con la base de datos. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Sincronizar favoritos con localStorage
  useEffect(() => {
    localStorage.setItem('mikasa_favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const onToggleFavorito = (id) => {
    setFavoritos((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const cerrarSesion = () => {
  setUsuarioActivo(null);       // Limpia el usuario activo
  setFavoritos([]);             // Limpia los favoritos en memoria
  localStorage.removeItem('mikasa_favoritos'); // Limpia el almacenamiento local
  setVistaActual('landing');   
};
  
  return (
    <div className="min-h-dvh font-sans text-slate-900">
      {/* Header global */}
      <Header
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        usuarioActivo={usuarioActivo}
        setUsuarioActivo={setUsuarioActivo}
        cerrarSesion={cerrarSesion}
      />

      <main className="flex-grow">
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route 
              path="/catalogo" 
              element={
                <Catalog
                  usuarioActivo={usuarioActivo}
                  favoritos={favoritos}
                  onToggleFavorito={onToggleFavorito}
                  propiedades={propiedades}
                  loading={loading}
                />
              } 
            />

            {/* El ":id" reemplaza a tu antiguo estado propiedadSeleccionadaId */}
            <Route path="/propiedad/:id" element={<PropertyDetail properties={propiedades} />} />

            <Route 
              path="/login" 
              element={<Login setUsuarioActivo={setUsuarioActivo} />} 
            />

            <Route path="/publicar" element={<CreateProperty />} />

            <Route 
              path="/favoritos" 
              element={
                <Favorites
                  favoritos={favoritos}
                  onToggleFavorito={onToggleFavorito}
                  propiedades={propiedades}
                />
              } 
            />

            {/* Si el usuario escribe una ruta que no existe, lo redirige al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FavoritesProvider>
        
      </main>

      <Footer 
        setVistaActual={setVistaActual} 
        usuarioActivo={usuarioActivo} 
      />
    </div>
  )
}

export default App