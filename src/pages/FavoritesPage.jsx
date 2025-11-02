import React from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'; // Import CSS khusus

function FavoritesPage({ favorites, onRemoveFavorite }) {

  if (favorites.length === 0) {
    return <p>Anda belum memiliki koleksi favorit.</p>;
  }

  return (
    <section className="favorites-page">
      <h2>Koleksi Favorit Saya</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Artis</th>
              <th>Tahun</th>
              <th>Medium</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(art => (
              <tr key={art.objectID}>
                <td>
                  <img src={art.primaryImageSmall || 'https://via.placeholder.com/100.png?text=N/A'} alt={art.title} />
                </td>
                <td>
                  <Link to={`/artwork/${art.objectID}`}>{art.title || 'Untitled'}</Link>
                </td>
                <td>{art.artistDisplayName || 'Unknown'}</td>
                <td>{art.objectDate || 'Unknown'}</td>
                <td>{art.medium || 'Unknown'}</td>
                <td>
                  <button 
                    onClick={() => onRemoveFavorite(art.objectID)}
                    className="remove-button"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FavoritesPage;