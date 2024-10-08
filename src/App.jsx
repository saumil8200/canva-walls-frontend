import { useState, useEffect } from 'react';
import Button from './components/Button';
import MobileImageCard from './components/MobileImageCard';
import DesktopImageCard from './components/DesktopImageCard';
import SearchBar from './components/SearchBar';

function App() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [view, setView] = useState('mobile');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/canva-walls-frontend/github_images.json')
      .then((response) => response.json())
      .then((data) => {
        // Set images for the view, considering compressed sources
        const sourceKey = view === 'mobile' ? 'compressed_mobile' : 'compressed_desktop';
        setImages(data[sourceKey] || []);
        setFilteredImages(data[sourceKey] || []);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, [view]);

  useEffect(() => {
    // Filter images based on search term globally
    const filtered = images.filter((image) =>
      image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [images, searchTerm]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-3xl font-black text-center mb-4">Canva Walls</h1>
      <div className="flex flex-col items-center w-full mb-4">
        <div className="flex mb-4 w-full">
          <Button
            label="Mobile"
            onClick={() => handleViewChange('mobile')}
            className={view === 'mobile' ? 'bg-gray-800 text-white' : 'bg-white text-black'}
          />
          <Button
            label="Desktop"
            onClick={() => handleViewChange('desktop')}
            className={view === 'desktop' ? 'bg-gray-800 text-white' : 'bg-white text-black'}
          />
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className={`flex flex-wrap ${view === 'mobile' ? 'gap-2' : 'gap-4'}`}>
        {filteredImages.length === 0 ? (
          <p className="text-gray-700 w-full text-center">No images available</p>
        ) : (
          filteredImages.map((image, index) => 
            view === 'mobile' ? (
              <MobileImageCard key={index} image={image} />
            ) : (
              <DesktopImageCard key={index} image={image} />
            )
          )
        )}
      </div>
    </div>
  );
}

export default App;
