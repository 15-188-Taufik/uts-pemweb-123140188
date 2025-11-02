import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import ArtworkGrid from '../components/ArtworkGrid';

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    console.log("Mencari dengan:", searchParams);
    setIsLoading(true);
    setError(null);
    setArtworks([]);

    let searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchParams.keyword}`;
    
    if (searchParams.departmentId) {
      searchUrl += `&departmentId=${searchParams.departmentId}`;
    }
    
    if (searchParams.hasImage) {
      searchUrl += `&hasImages=true`;
    }

    try {
      // FETCH PERTAMA: Dapatkan daftar ID
      const response = await fetch(searchUrl);
      if (!response.ok) throw new Error('Pencarian gagal, periksa keyword Anda.');
      const data = await response.json();

      if (data.total === 0 || !data.objectIDs) {
        setArtworks([]);
        setIsLoading(false);
        return;
      }

      // Batasi hasil (20 item)
      const objectIDs = data.objectIDs.slice(0, 20);

      // FETCH KEDUA: Dapatkan detail untuk setiap ID
      const detailPromises = objectIDs.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
          .then(res => res.json())
      );
      
      const artworkDetails = await Promise.all(detailPromises);
      setArtworks(artworkDetails);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      
      <ArtworkGrid 
        artworks={artworks} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}

export default Home;