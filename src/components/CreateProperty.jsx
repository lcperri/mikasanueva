import React, { useState } from 'react';
import { ArrowLeft, Building2, MapPin, DollarSign, ImagePlus, Check, Plus, Trash2 } from 'lucide-react';

const CreateProperty = ({ setVistaActual }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'departamento',
    ubicacion: '',
    precio: '',
    mantenimiento: '',
    habitaciones: 2,
    banos: 1,
    cocheras: 0,
    areaTotal: '',
    descripcion: '',
    caracteristicas: []
  });

  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');
  const [imagenesUrl, setImagenesUrl] = useState([]);
  const [nuevaImagen, setNuevaImagen] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()]
      }));
      setNuevaCaracteristica('');
    }
  };

  const eliminarCaracteristica = (index) => {
    setFormData((prev) => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index)
    }));
  };

  const agregarImagen = () => {
    if (nuevaImagen.trim() !== '') {
      setImagenesUrl((prev) => [...prev, nuevaImagen.trim()]);
      setNuevaImagen('');
    }
  };

  const eliminarImagen = (index) => {
    setImagenesUrl((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí conectaremos directamente la inserción a la base de datos de Supabase
    console.log('Datos a enviar:', { ...formData, imagenes: imagenesUrl });
    alert('¡Propiedad creada con éxito!');
    if (setVistaActual) setVistaActual('catalogo');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 font-sans py-8 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* BOTÓN VOLVER */}
        <button
          type="button"
          onClick={() => setVistaActual && setVistaActual('catalogo')}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#ff385c] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </button>

        {/* TITULO */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Publicar nueva <span className="text-[#ff385c]">Propiedad</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Completa los detalles de tu inmueble para publicarlo en la plataforma.
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl space-y-8">
          
          {/* SECCIÓN 1: DATOS PRINCIPALES */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#ff385c]" /> Información Básica
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">Título de la publicación</label>
                <input
                  type="text"
                  name="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ej: Departamentos Modernos en San Carlos"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tipo de Inmueble</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                >
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa</option>
                  <option value="terreno">Terreno</option>
                  <option value="oficina">Oficina</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ubicación / Zona</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="ubicacion"
                    required
                    value={formData.ubicacion}
                    onChange={handleChange}
                    placeholder="Ej: El Tambo, Huancayo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: PRECIOS Y DIMENSIONES */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#ff385c]" /> Precio y Dimensiones
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Precio (S/)</label>
                <input
                  type="text"
                  name="precio"
                  required
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Ej: S/ 250,000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Área (m²)</label>
                <input
                  type="text"
                  name="areaTotal"
                  required
                  value={formData.areaTotal}
                  onChange={handleChange}
                  placeholder="Ej: 90 m²"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Habitaciones</label>
                <input
                  type="number"
                  name="habitaciones"
                  min="0"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Baños</label>
                <input
                  type="number"
                  name="banos"
                  min="0"
                  value={formData.banos}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: DESCRIPCIÓN Y AMENIDADES */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Detalles Adicionales
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Descripción detallada</label>
              <textarea
                name="descripcion"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Escribe los aspectos destacados, acabados, entorno..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
              />
            </div>

            {/* Agregar características */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Amenidades (Ascensor, Balcón, etc.)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevaCaracteristica}
                  onChange={(e) => setNuevaCaracteristica(e.target.value)}
                  placeholder="Ej: Seguridad 24/7"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
                <button
                  type="button"
                  onClick={agregarCaracteristica}
                  className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.caracteristicas.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3 text-[#ff385c]" /> {item}
                    <button
                      type="button"
                      onClick={() => eliminarCaracteristica(idx)}
                      className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: IMÁGENES (URLs) */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-[#ff385c]" /> Fotos del inmueble (URLs)
            </h2>

            <div className="flex gap-2">
              <input
                type="url"
                value={nuevaImagen}
                onChange={(e) => setNuevaImagen(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
              />
              <button
                type="button"
                onClick={agregarImagen}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Agregar
              </button>
            </div>

            {/* Vista previa de imágenes cargadas */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
              {imagenesUrl.map((url, idx) => (
                <div key={idx} className="relative h-20 rounded-xl overflow-hidden group bg-slate-100 border border-slate-200">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => eliminarImagen(idx)}
                    className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOTÓN SUBMIT */}
          <button
            type="submit"
            className="w-full bg-[#ff385c] hover:bg-[#e0314f] text-white font-extrabold py-4 rounded-2xl transition-all shadow-lg shadow-rose-500/25 active:scale-[0.99] cursor-pointer text-sm"
          >
            Publicar Propiedad Ahora
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateProperty;