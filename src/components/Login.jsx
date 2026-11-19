import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const Login = ({ setVistaActual, setUsuarioActivo }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const location = useLocation();
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  
  // Ruta a la que debe volver (si entró directo a /login, va al catálogo por defecto)
  const pathDestiny = location.state?.from || '/catalogo';
  
  // Manejador para Login con Google
  const handleGoogleLogin = async () => {
    // 1. Guardamos la ruta exacta antes de abandonar la página hacia Google
    sessionStorage.setItem('auth_redirect_to', pathDestiny);
    setError(null)
    const { error } = await loginWithGoogle()
    if (error) {
      setError('No se pudo conectar con Google. Intenta de nuevo.')
    }
  }

  //Manejador para Correo y Contraseña
  const handleEmailPassLogin = async (e) => {
    console.log('Iniciando login con email y contraseña...');
    e.preventDefault()
    setError(null)
    setIsRegistering(true)

    const { error } = await login(email, password)
    
    if (error) {
      setError('Correo o contraseña incorrectos. Verifica tus datos.')
      setIsRegistering(false)
    } else {
      navigate(pathDestiny, { replace: true }); // Vuelve directo sin recargar
    }
  }

  const handleBack = () => {
    //Si hay historial previo en la app, retrocede (conservando ejemplo ?page=3)
    if (window.history.length > 1) {
      navigate(-1); 
    } else {
      navigate('/catalogo'); // Si no hay historial, navega a catalogo
    }
  }

  return (
    <div className="min-h-[calc(92vh-80px)] bg-slate-50 font-sans flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* BOTÓN VOLVER */}
        <BackButton label="Volver atrás" />

        {/* TARJETA PRINCIPAL */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isRegistering ? 'Crea tu cuenta en' : 'Bienvenido a'} <span className="text-[#ff385c]">Micasa Nueva</span>
            </h1>
            <p className="text-xs text-slate-500">
              {isRegistering
                ? 'Regístrate para guardar favoritos y publicar propiedades'
                : 'Ingresa para gestionar tus publicaciones y propiedades guardadas'}
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-2xl flex items-center gap-2 text-xs text-rose-600 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* BOTÓN GOOGLE OAUTH */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continuar con Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-100 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 absolute uppercase">
              o con tu email
            </span>
          </div>

          {/* FORMULARIO CORREO / CONTRASEÑA */}
          <form onSubmit={handleEmailPassLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#ff385c] transition-all"
                />
              </div>
            </div>

            <button
              type="submit" 
              className="w-full bg-[#ff385c] hover:bg-[#e0314f] text-white font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 active:scale-[0.99] cursor-pointer text-xs sm:text-sm"
            >
              <LogIn className="w-4 h-4" />
              {isRegistering ? 'Registrar Cuenta' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* CAMBIAR ENTRE LOGIN Y REGISTRO */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {isRegistering ? (
                <>¿Ya tienes una cuenta? <span className="text-[#ff385c] underline">Inicia sesión</span></>
              ) : (
                <>¿No tienes cuenta? <span className="text-[#ff385c] underline">Regístrate aquí</span></>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;