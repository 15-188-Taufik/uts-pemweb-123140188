import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './DetailPage.css'; // Import CSS khusus

function DetailPage({ onAddFavorite }) {
  const { id } = useParams(); 
  
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtworkDetail() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data detail artwork.');
        const data = await response.json();
        setArtwork(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArtworkDetail();
  }, [id]);

  const handleFavorite = () => {
    if (artwork) {
      onAddFavorite(artwork);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!artwork) return <p>Artwork tidak ditemukan.</p>;

  return (
    <section className="detail-page">
      <div className="detail-image">
        <img src={artwork.primaryImage || 'https://via.placeholder.com/600x800.png?text=No+Image'} alt={artwork.title} />
      </div>
      <div className="detail-info">
        <h2>{artwork.title}</h2>
        
        <button onClick={handleFavorite} className="favorite-button">
          Simpan ke Favorit
        </button>

        <h3>Detail Artwork</h3>
        <ul>
          <li><strong>Artist:</strong> {artwork.artistDisplayName || 'Unknown'}</li>
          <li><strong>Date:</strong> {artwork.objectDate || 'Unknown'}</li>
          <li><strong>Medium:</strong> {artwork.medium || 'Unknown'}</li>
          <li><strong>Culture:</strong> {artwork.culture || 'Unknown'}</li>
          <li><strong>Department:</strong> {artwork.department}</li>
          <li><strong>Accession Number:</strong> {artwork.accessionNumber}</li>
        </ul>
        {artwork.galleryDisplayName && (
          <p><strong>Lokasi:</strong> {artwork.galleryDisplayName}</p>
        )}
      </div>
    </section>
  );
}

export default DetailPage;