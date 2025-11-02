import React, { useState, useEffect } from 'react';

function SearchForm({ onSearch }) { 
  const [departments, setDepartments] = useState([]);
  
  // State untuk SETIAP input form
  const [keyword, setKeyword] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [dateBegin, setDateBegin] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDepartments(data.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    }
    fetchDepartments();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    onSearch({
      keyword,
      departmentId,
      hasImage,
      dateBegin,
      dateEnd
    });
  };

  return (
    <form onSubmit={handleSubmit}> 
      {/* Input 1: Keyword */}
      <label htmlFor="keyword">Keyword:</label>
      <input 
        type="search" 
        id="keyword" 
        placeholder="Contoh: Monet, cats..." 
        required 
        value={keyword} 
        onChange={e => setKeyword(e.target.value)}
      />
      
      {/* Input 2: Department Dropdown */}
      <label htmlFor="department">Department:</label>
      <select 
        id="department" 
        value={departmentId}
        onChange={e => setDepartmentId(e.target.value)}
      >
        <option value="">Semua Department</option>
        {departments.map(dept => (
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.displayName}
          </option>
        ))}
      </select>
      
      {/* Input 4 & 5: Date Range */}
      <label htmlFor="dateBegin">Date (Start):</label>
      <input 
        type="number" 
        id="dateBegin" 
        placeholder="1800"
        value={dateBegin}
        onChange={e => setDateBegin(e.target.value)}
      />
      
      <label htmlFor="dateEnd">Date (End):</label>
      <input 
        type="number" 
        id="dateEnd" 
        placeholder="1900" 
        value={dateEnd}
        onChange={e => setDateEnd(e.target.value)}
      />

      {/* Input 3: Checkbox "Has Image" */}
      <label>
        <input 
          type="checkbox" 
          checked={hasImage}
          onChange={e => setHasImage(e.target.checked)}
        />
        Hanya tampilkan yang ada gambar
      </label>

      <button type="submit">Cari</button>
    </form>
  );
}

export default SearchForm;