import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Heart, Share2, Bed, Bath, Square, 
  Car, ShieldCheck, CheckCircle2, Phone, MessageCircle, Calendar 
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import BackButton from './BackButton';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

const PropertyDetail = ( { properties } ) => {
  const [esFavorito, setEsFavorito] = useState(false);

  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const property = properties.find((prop) => String(prop.id) === id);
  const [imagenPrincipal, setImagenPrincipal] = useState(FALLBACK_IMAGE);

  console.log(property);

  useEffect(() => {
    if (property?.images?.length > 0) {
      setImagenPrincipal(property.images[0]);
    } else {
      setImagenPrincipal(FALLBACK_IMAGE);
    }
  }, [property]);

  // 1. Mientras App.jsx está cargando el arreglo de propiedades desde Supabase
  if (properties.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center text-slate-500 text-sm font-medium">
        Cargando detalles de la propiedad...
      </div>
    );
  }

  // 2. Si ya cargaron las propiedades pero el UUID de la URL no existe
  if (!property) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900">Propiedad no encontrada</h2>
        <p className="text-sm text-slate-500">El inmueble que buscas no existe o fue retirado del catálogo.</p>
        <Link
          to="/catalogo"
          className="mt-2 bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-all"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const saved = isFavorite(property.id);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 font-sans py-6 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* BOTÓN VOLVER Y ACCIONES */}
        <div className="flex justify-between items-center">
          <BackButton label="Volver" />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(property.id)}
              title={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#ff385c] transition-all cursor-pointer shadow-sm active:scale-90"
            >
              <Heart className={`w-4 h-4 transition-colors ${saved ? 'fill-[#ff385c] text-[#ff385c]' : ''}`} />
            </button>
            <button
              type="button"
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-slate-400 transition-all cursor-pointer shadow-sm"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* GALERÍA DE IMÁGENES */}
        <div className="space-y-3">
          <div className="h-[300px] sm:h-[420px] w-full rounded-3xl overflow-hidden bg-slate-200 shadow-md">
            <img
              src={imagenPrincipal}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {property.images?.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImagenPrincipal(img)}
                  className={`h-20 w-28 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    imagenPrincipal === img ? 'border-[#ff385c] scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ESTRUCTURA DE CONTENIDO PRINCIPAL Y PANEL LATERAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* DETALLES DE LA PROPIEDAD */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* TÍTULO Y PRECIO EN MÓVIL */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff385c] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> {property.location}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
                {property.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1">Ref: MK-2026-{String(property.id).slice(0, 8)}</p>
            </div>

            {/* ESPECIFICACIONES RÁPIDAS (ICONS BAR) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Dormitorios</span>
                  <span className="text-sm font-bold">{property.bedrooms} Hab.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Baños</span>
                  <span className="text-sm font-bold">{property.bathrooms} Baños</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                  <Square className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Área Total</span>
                  <span className="text-sm font-bold">{property.area} m²</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Estacionamiento</span>
                  <span className="text-sm font-bold">{property?.garage ?? 0} Espacio</span>
                </div>
              </div>
            </div>

            {/* DESCRIPCIÓN */}
            {property.description && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">Descripción</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>
            )}

            {/* CARACTERÍSTICAS Y AMENIDADES */}
            {property.features?.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">Amenidades y detalles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#ff385c]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* TARJETA FLOTANTE DE CONTACTO / ASESOR */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-6 sticky top-6">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Precio de venta</span>
                <span className="text-3xl font-extrabold text-[#ff385c]">{property.price}</span>
                {property?.maintenance && (
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Mantenimiento aprox: {property.maintenance}
                  </span>
                )}
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Contactar con un asesor</h3>
                
                <a
                  href={`https://wa.me/51${property.contact_phone || '988067397'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Contactar por WhatsApp
                </a>

                <button
                  type="button"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> Solicitar Llamada
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#ff385c] shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-snug">
                  Propiedad legalmente verificada y lista para financiamiento o independización.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;