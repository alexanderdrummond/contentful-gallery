import { useState, useEffect } from 'react';
import client from '../contentfulClient';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    client.getEntries({ content_type: 'gallery' })
      .then((response) => {
        const images = response.items[0]?.fields?.galleryImages || [];
        setGalleryItems(images);
      })
      .catch(console.error);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200 py-20">
      {/* Gallery Grid */}
      <div className="container mx-auto text-center mb-12">
        <div className="inline-block mb-4">
          <svg className="w-12 h-12 mx-auto text-gray-700" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19q-.825 0-1.413-.588T1 17V7q0-.825.588-1.413T3 5h10q.825 0 1.413.588T15 7v10q0 .825-.588 1.413T13 19H3Zm15-8q-.425 0-.713-.288T17 10V6q0-.425.288-.713T18 5h4q.425 0 .713.288T23 6v4q0 .425-.288.713T22 11h-4ZM4 15h8l-2.625-3.5L7.5 14l-1.375-1.825L4 15Zm14 4q-.425 0-.713-.288T17 18v-4q0-.425.288-.713T18 13h4q.425 0 .713.288T23 14v4q0 .425-.288.713T22 19h-4Z"></path></svg>
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800">Gallery</h2>
      </div>
      <div className="w-11/12 md:w-4/5 lg:w-7/10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryItems.map((item, index) => {
            const image = item.fields.file.url;
            const description = item.fields.description;
            return (
              <div 
                key={index}
                className="rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => openModal(index)}
              >
                <img 
                  src={image}
                  alt={description}
                  className="w-full h-full object-cover cursor-pointer"
                />
                <div className="bg-white p-4">
                  <h3 className="text-lg font-semibold">{description}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-xl">&times;</button>
            <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">‹</button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">›</button>
            <img 
              src={galleryItems[currentIndex]?.fields.file.url}
              alt={galleryItems[currentIndex]?.fields.description}
              className="w-full h-full object-cover max-h-80"
            />
            <div className="mt-4">
              <p>{galleryItems[currentIndex]?.fields.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
