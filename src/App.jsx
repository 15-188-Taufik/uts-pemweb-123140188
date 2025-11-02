import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Header from './components/Header';

function App() {
  // State favorit, dibaca dari localStorage saat awal load
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('museum-favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Gagal membaca localStorage", error);
      return [];
    }
  });

  // useEffect untuk MENYIMPAN ke localStorage setiap kali 'favorites' berubah
  useEffect(() => {
    try {
      localStorage.setItem('museum-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage", error);
    }
  }, [favorites]); // Dependency: 'favorites'

  // Fungsi untuk menambah favorit
  const addFavorite = (artwork) => {
    // Cek agar tidak duplikat
    if (!favorites.find(fav => fav.objectID === artwork.objectID)) {
      setFavorites([...favorites, artwork]);
      alert(`${artwork.title} telah ditambahkan ke favorit!`);
    } else {
      alert(`${artwork.title} sudah ada di favorit.`);
    }
  };

  // Fungsi untuk menghapus favorit
  const removeFavorite = (artworkId) => {
    const newFavorites = favorites.filter(fav => fav.objectID !== artworkId);
    setFavorites(newFavorites);
  };
  
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Oper fungsi 'addFavorite' ke DetailPage */}
          <Route 
            path="/artwork/:id" 
            element={<DetailPage onAddFavorite={addFavorite} />} 
          />
          
          {/* Oper data & fungsi remove ke FavoritesPage */}
          <Route 
            path="/favorites" 
            element={
              <FavoritesPage 
                favorites={favorites} 
                onRemoveFavorite={removeFavorite} 
              />
            } 
          />
        </Routes>
      </main>

      {/* Footer Branded */}
      <footer className="app-footer">
        © 2025 Taufik — Curate your world.
      </footer>
    </>
  );
}

export default App;