import React from 'react';
import { Building2, Heart, PlusCircle, LogIn, LogOut, Home, Search } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Extraemos el nombre de Google (o el correo si no tiene nombre)
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
  return (
    <header className="h-24 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
        
        {/* LOGO E IDENTIDAD */}
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0">
          <div className="p-2.5 sm:p-3 bg-rose-50 text-[#ff385c] rounded-2xl group-hover:bg-[#ff385c] group-hover:text-white transition-all duration-300">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-[#ff385c] transition-colors">
            Mikasa <span className="text-[#ff385c]">Nueva</span>
          </span>
        </Link>

        {/* NAVEGACIÓN PRINCIPAL EN LÍNEA (Limpia) */}
        <nav className="flex items-center bg-slate-100/80 p-1.5 rounded-full gap-1 overflow-x-auto max-w-[50%] sm:max-w-none">
          <NavLink to="/"
            className={({isActive}) => `flex items-center gap-2 text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none shrink-0 
              ${ isActive
                ? 'bg-white text-slate-900 shadow-sm scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
              }`}
          >
            <Home className="w-4 h-4 stroke-[2.2]" /> Inicio
          </NavLink>

          <NavLink to="/catalogo"
            className={({isActive}) => `flex items-center gap-2 text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none shrink-0 
              ${ isActive
                ? 'bg-white text-slate-900 shadow-sm scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
              }`
            }
          >
            <Search className="w-4 h- 4 stroke-[2.2]" /> Catálogo
          </NavLink>

          {user && (
            <>
              <NavLink to="/favoritos"
                className={({isActive}) => `flex items-center gap-2 text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none shrink-0 
                  ${ isActive
                    ? 'bg-white text-slate-900 shadow-sm scale-[1.02]' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                  }`
                }
              >
                <Heart className="w-4 h-4 stroke-[2.2]" /> <span className="hidden md:inline">Mis</span> Favoritos
              </NavLink>

              <NavLink 
                to="/publicar"
                className={({isActive}) => `flex items-center gap-2 text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none shrink-0 
                  ${ isActive
                    ? 'bg-white text-slate-900 shadow-sm scale-[1.02]' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                  }`
                }
              >
                <PlusCircle className="w-4 h-4 stroke-[2.2]" /> Publicar
              </NavLink>
            </>
          )}
        </nav>

        {/* SESIÓN DE USUARIO */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-100/70 pl-3 sm:pl-4 pr-2 py-1.5 rounded-full">
              <span className="hidden sm:inline text-[11px] font-extrabold text-[#ff385c] bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Bienvenido {userName}
                {/* {user.user_metadata?.full_name ? user.user_metadata.full_name.split(' ')[0] : user.email.split('@')[0]} */}
              </span>
              <span className="text-xs font-bold text-slate-800">{user.full_name}</span>
              <button
                type="button"
                onClick={() => logout()}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-full transition-all duration-200 cursor-pointer"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          ) : (
            <Link to="/login"
              state={{ from: location.pathname + location.search }} // Guarda ruta + filtros/paginación
              className="bg-[#ff385c] hover:bg-rose-600 text-white text-xs font-extrabold px-5 sm:px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <LogIn className="w-4 h-4 stroke-[2.5]" /> <span className="hidden sm:inline">Iniciar Sesión</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;