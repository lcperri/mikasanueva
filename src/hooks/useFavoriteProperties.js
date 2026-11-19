import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient'; // Ajusta la ruta si es necesario
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

export function useFavoriteProperties() {
  const { user } = useAuth();
  const { favoriteIds } = useFavorites();

  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavoriteProperties = useCallback(async () => {
    if (!user?.id || favoriteIds.length === 0) {
      setFavoriteProperties([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('favoritos')
        .select(`
          created_at,
          propiedades (
            id,
            title,
            type,
            location,
            price,
            bedrooms,
            bathrooms,
            area,
            description,
            features,
            images,
            featured,
            contact_phone,
            status
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      // Extraemos la propiedad y filtramos nulos por seguridad (ejm. si una propiedad fue eliminada)
      const properties = (data ?? [])
        .map((row) => row.propiedades)
        .filter(Boolean);

      setFavoriteProperties(properties);
    } catch (err) {
      console.error('Error fetching favorite properties:', err.message, err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, favoriteIds]);

  useEffect(() => {
    fetchFavoriteProperties();
  }, [fetchFavoriteProperties]);

  return {
    favoriteProperties,
    isLoading,
    error,
    refetch: fetchFavoriteProperties,
  };
}