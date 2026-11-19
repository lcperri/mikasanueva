import React from 'react';
import { ArrowLeft, Heart, MapPin, Bed, Bath, Square, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import {useAuth} from '../context/AuthContext';
import PropertyCard from './PropertyCard';
import { useFavoriteProperties } from '../hooks/useFavoriteProperties';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  //Traemos todas las propiedades favoritas del usuario desde el hook personalizado:
  const { favoriteProperties, isLoading, error } = useFavoriteProperties();  

  // const seleccionarPropiedad = (id) => {
  //   if (setPropiedadSeleccionadaId) setPropiedadSeleccionadaId(id);
  //   if (setVistaActual) setVistaActual('propiedadDetalle');
  // };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 font-sans py-8 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* BOTÓN VOLVER Y HEADER */}
        <div className="space-y-4">
          <BackButton label="Volver al catálogo" fallback="/catalogo" />
          <div className="flex justify-between items-end border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Mis <span className="text-[#ff385c]">Favoritos</span>
                <Heart className="w-6 h-6 fill-[#ff385c] text-[#ff385c]" />
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tus inmuebles guardados para revisar o comparar más tarde.
              </p>
            </div>
            
            <span className="text-xs font-bold text-slate-400">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'propiedad' : 'propiedades'}
            </span>
          </div>
        </div>

        {favoriteProperties.length > 0 ? (
          <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {favoriteProperties.map((prop) => (
              <Link to={`/propiedad/${prop.id}`}
                key={prop.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* IMAGEN Y BOTÓN DE QUITAR */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                  <img
                    src={prop.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {prop.featured && (
                    <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Destacado
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(prop.id); // Llama a la función global para quitarlo
                    }}
                    title="Quitar de favoritos"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-all active:scale-90 shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* CONTENIDO */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#ff385c]" />
                      {prop.location}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#ff385c] transition-colors leading-snug">
                      {prop.title}
                    </h3>
                  </div>

                  {/* CARACTERÍSTICAS TÉCNICAS */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-slate-400" /> {prop.bedrooms} habs
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-slate-400" /> {prop.bathrooms} baños
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4 text-slate-400" /> {prop.area}
                    </span>
                  </div>

                  {/* PRECIO Y ACCIÓN */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">Precio desde</span>
                      <span className="text-lg font-extrabold text-[#ff385c]">{prop.price}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 group-hover:underline flex items-center gap-1">
                      Ver detalles →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* ESTADO VACÍO (EMPTY STATE) */
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100 shadow-sm max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-rose-50 text-[#ff385c] rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Aún no tienes favoritos</h3>
              <p className="text-xs text-slate-500">
                Explora el catálogo y guarda los inmuebles que más te interesen haciendo clic en el icono del corazón.
              </p>
            </div>
            <Link
              to="/catalogo"
              className="mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-full transition-all cursor-pointer shadow-md"
            >
              Explorar Catálogo
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Favorites;