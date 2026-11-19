import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    //1. Verificar sesión activa al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    //2. Escuchar cambios de autenticación (login, logout, registro)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Redirige en cuanto exista un usuario autenticado y haya ruta pendiente
  useEffect(() => {
    if (user) {
      const savedPath = sessionStorage.getItem('auth_redirect_to');
      if (savedPath) {
        sessionStorage.removeItem('auth_redirect_to');
        navigate(savedPath, { 
          replace: true,
          state: { fromOAuth: true } // Marca que esta entrada vino de OAuth
        });
      }
    }
  }, [user, navigate]);

  // Funciones de autenticación - atajos a supabase
  const login = (email, password) => supabase.auth.signInWithPassword({ email, password })
  const loginWithGoogle = () => supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin // Redirige a la misma página después del login
    } 
  })
  const register = (email, password) => supabase.auth.signUp({ email, password })
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      navigate('/', { replace: true }) // Redirige al inicio después de cerrar sesión
    } catch (error)  {
        console.error('Error al cerrar sesión:', error.message)      
        throw error; // Re-lanzo el error para manejarlo en el componente
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)