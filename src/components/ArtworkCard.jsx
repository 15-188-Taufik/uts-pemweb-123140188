import React from 'react';
import { Link } from 'react-router-dom';

function ArtworkCard({ artwork }) {
  
  const { objectID, title, primaryImageSmall, artistDisplayName } = artwork;
  const imageUrl = primaryImageSmall || 'https://via.placeholder.com/300x400.png?text=No+Image';

  return (
    <article className="artwork-card">
      {/* Tanda tangan "Taufik" dot */}
      <span className="card-brand-dot"></span> 
      
      <Link to={`/artwork/${objectID}`}>
        <figure>
          <img src={imageUrl} alt={title} />
          <figcaption>
            <h3>{title || 'Untitled'}</h3>
            <p>{artistDisplayName || 'Unknown Artist'}</p>
          </figcaption>
        </figure>
      </Link>
    </article>
  );
}

export default ArtworkCard;