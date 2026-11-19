import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext';

function PropertyCard({ property }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const saved = isFavorite(property.id);
    // console.log(`PropertyCard: property.id=${property.id}, saved=${saved}`); // Debugging line
    
  return (
    <Link
        to={`/propiedad/${property.id}`}
        className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
        {/* IMAGEN Y BOTÓN DE FAVORITO */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-200">
        <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge de Destacado */}
        {property.featured && (
            <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Destacado
            </span>
        )}

        {/* Botón Corazón Favorito */}
        <button
            type="button"
            onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Evita que se abra el detalle al hacer clic en el corazón
            toggleFavorite(property.id)
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 transition-transform active:scale-90 shadow-md"
        >
            <Heart
            className={`w-4 h-4 transition-colors ${
                saved ? 'fill-[#ff385c] text-[#ff385c]' : 'text-slate-600'
            }`}
            />
        </button>
        </div>

        {/* CONTENIDO DE LA TARJETA */}
        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#ff385c]" />
            {property.location}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#ff385c] transition-colors leading-snug">
            {property.title}
            </h3>
        </div>

        {/* CARACTERÍSTICAS TÉCNICAS */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-slate-400" /> {property.bedrooms} habs
            </span>
            <span className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-slate-400" /> {property.bathrooms} baños
            </span>
            <span className="flex items-center gap-1">
            <Square className="w-4 h-4 text-slate-400" /> {property.area}
            </span>
        </div>

        {/* PRECIO Y ACCIÓN */}
        <div className="pt-3 flex items-center justify-between">
            <div>
            <span className="text-[11px] text-slate-400 block font-semibold">Precio desde</span>
            <span className="text-lg font-extrabold text-[#ff385c]">{property.price}</span>
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:underline flex items-center gap-1">
            Ver detalles →
            </span>
        </div>
        </div>
    </Link>
  )
}

export default PropertyCard