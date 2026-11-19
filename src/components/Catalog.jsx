import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import PropertyCardSkeleton from './PropertyCardSkeleton';
import PropertyCard from './PropertyCard';

const Catalog = ({ favoritos, onToggleFavorito, propiedades, loading }) => {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busquedaTexto, setBusquedaTexto] = useState('');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Esqueleto del encabezado */}
        <div className="h-10 bg-gray-200 rounded-lg w-1/3 mb-6 animate-pulse"></div>
        
        {/* Grid de skeletons reutilizables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <PropertyCardSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  // const seleccionarPropiedad = (id) => {
  //   if (setPropiedadSeleccionadaId) setPropiedadSeleccionadaId(id);
  //   if (setVistaActual) setVistaActual('propiedadDetalle');
  // };

  // Filtrado de propiedades
  const propiedadesFiltradas = propiedades.filter((p) => {
    const coincideTipo = filtroTipo === 'todos' || p.type === filtroTipo;
    const coincideTexto =
      p.title.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
      p.location.toLowerCase().includes(busquedaTexto.toLowerCase());
    return coincideTipo && coincideTexto;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 font-sans py-8 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* CABECERA Y FILTROS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de <span className="text-[#ff385c]">Propiedades</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Encuentra tu próximo hogar o inversión inmobiliaria ideal.
            </p>
          </div>

          {/* BUSCADOR RÁPIDO */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              placeholder="Buscar por zona o título..."
              className="w-full bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-full pl-10 pr-4 py-2.5 font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
            />
          </div>
        </div>

        {/* PÍLDORAS DE CATEGORÍA */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFiltroTipo('todos')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filtroTipo === 'todos'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Todas las propiedades
          </button>
          <button
            onClick={() => setFiltroTipo('Departamento')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filtroTipo === 'departamento'
                ? 'bg-[#ff385c] text-white shadow-md shadow-rose-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Departamentos
          </button>
          <button
            onClick={() => setFiltroTipo('Casa')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filtroTipo === 'casa'
                ? 'bg-[#ff385c] text-white shadow-md shadow-rose-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Casas
          </button>
          <button
            onClick={() => setFiltroTipo('Penthouse')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filtroTipo === 'penthouse'
                ? 'bg-[#ff385c] text-white shadow-md shadow-rose-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Penthouses
          </button>
        </div>

        {/* CUADRÍCULA DE PROPIEDADES (GRID) */}
        {propiedadesFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {propiedadesFiltradas.map((property) => {
              const esFavorito = favoritos.includes(property.id);
              return (
                <PropertyCard
                  key={property.id}
                  property={property}
                  esFavorito={esFavorito}
                  onToggleFavorito={onToggleFavorito}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-100 shadow-sm">
            <p className="text-base font-bold text-slate-700">No se encontraron propiedades</p>
            <p className="text-xs text-slate-400">Prueba ajustando los filtros o el término de búsqueda.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Catalog;