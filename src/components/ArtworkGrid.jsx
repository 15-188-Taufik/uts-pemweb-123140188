import React from 'react';
import ArtworkCard from './ArtworkCard';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

function ArtworkGrid({ artworks, isLoading, error }) {
  
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (artworks.length === 0) {
    return <p>Tidak ada hasil. Silakan lakukan pencarian baru.</p>;
  }

  return (
    <section className="artwork-grid">
      {artworks.map(art => (
        art && art.objectID ? 
          <ArtworkCard key={art.objectID} artwork={art} /> : null
      ))}
    </section>
  );
}

export default ArtworkGrid;