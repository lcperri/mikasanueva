// src/context/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Ajusta la ruta si es necesario
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  // trae los property_ids de favoritos por cada usuario activo y los guarda en favoriteIds
  const fetchFavorites = useCallback(async () => {
    if (!user?.id) {
      setFavoriteIds([]);
      return;
    }

    setIsLoadingFavorites(true);
    try {
      const { data, error } = await supabase
        .from('favoritos')
        .select('property_id')
        .eq('user_id', user.id);
        console.log('Fetched favoritos from Supabase:', data); // Debugging line
      if (error) throw error;
        setFavoriteIds(data.map((item) => String(item.property_id))); 
    } catch (err) {
      console.error('Error fetching favoritos:', err);
    } finally {
      setIsLoadingFavorites(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Toggle favorite status (add or remove)
  const toggleFavorite = async (propertyId) => {
    if (!user?.id) {
      alert('Inicia sesión para guardar propiedades en tus favoritos.');
      navigate('/login');
      return;
    }

    const cleanId = typeof propertyId === 'string' ? propertyId.trim() : '';
    if (!cleanId) {
      console.error('Invalid propertyId in toggleFavorite:', propertyId);
    return;
    }

    const alreadyFavorite = favoriteIds.includes(cleanId);

    // Optimistic UI update
    setFavoriteIds((prev) =>
      alreadyFavorite ? prev.filter((id) => id !== cleanId) : [...prev, cleanId]
    );

    try {
      if (alreadyFavorite) {
        const { error } = await supabase
          .from('favoritos')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', cleanId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favoritos')
          .insert([{ user_id: user.id, property_id: cleanId }]);

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error updating favorite:', err);
      fetchFavorites(); // Rollback to actual DB state on failure
      alert('No se pudo actualizar el favorito. Inténtalo nuevamente.');
    }
  };

    const isFavorite = (propertyId) => {
        if (!propertyId) return false;
    return favoriteIds.includes(String(propertyId).trim());
    };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isLoadingFavorites,
        toggleFavorite,
        isFavorite,
        refetchFavorites: fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}