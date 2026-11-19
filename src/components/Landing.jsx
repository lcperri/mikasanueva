import React from 'react';

const Landing = ({ setVistaActual }) => {
  return (
    <div className="h-dvh flex flex-col justify-between bg-slate-900 font-sans relative overflow-hidden">
      
      {/* SECCIÓN HERO CON TÍTULO SUPERPUESTO EN LA IMAGEN */}
      <section className="relative flex-1 flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-6">
        
        {/* Imagen de fondo absoluta */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80"
            alt="Edificio Residencial Mikasa Nueva"
            className="w-full h-full object-cover object-center"
          />
          {/* Degradado lateral izquierdo para que el texto blanco resalte perfectamente sobre la foto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
        </div>

        {/* TÍTULO PRINCIPAL FLOTANDO SOBRE LA IMAGEN */}
        <div className="relative z-10 max-w-2xl my-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-shadow-white tracking-tight leading-[1.15]">
            Encuentra tu Casa/Departamento 
            <br className="sm:inline" />
            <span className="text-[#ff385c]">Nuevo y Accesible</span>
          </h1>
        </div>
      </section>

    </div>
  );
};

export default Landing;