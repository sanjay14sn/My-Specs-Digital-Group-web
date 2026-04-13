import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface FavoritesContextType {
    favorites: FavoriteItem[];
    toggleFavorite: (product: FavoriteItem) => void;
    isFavorite: (id: number) => boolean;
    clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product: FavoriteItem) => {
        setFavorites((prev) => {
            const isFav = prev.find((item) => item.id === product.id);
            if (isFav) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isFavorite = (id: number) => favorites.some((item) => item.id === id);

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
    return context;
};
