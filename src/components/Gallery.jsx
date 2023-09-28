import { useState, useEffect } from 'react';
import client from '../utils/contentfulClient';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    client
      .getEntries({ content_type: 'gallery' })
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
    <div id="gallery" className="bg-gradient-to-r from-gray-50 to-gray-200 py-20">
      <div className="container mx-auto text-center mb-12">
        <div className="inline-block mb-4">
          <svg
            className="w-12 h-12 mx-auto text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 19q-.825 0-1.413-.588T1 17V7q0-.825.588-1.413T3 5h10q.825 0 1.413.588T15 7v10q0 .825-.588 1.413T13 19H3Zm15-8q-.425 0-.713-.288T17 10V6q0-.425.288-.713T18 5h4q.425 0 .713.288T23 6v4q0 .425-.288.713T22 11h-4ZM4 15h8l-2.625-3.5L7.5 14l-1.375-1.825L4 15Zm14 4q-.425 0-.713-.288T17 18v-4q0-.425.288-.713T18 13h4q.425 0 .713.288T23 14v4q0 .425-.288.713T22 19h-4Z"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
      </div>
      <div className="w-11/12 md:w-4/5 lg:w-7/10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryItems.map((item, index) => {
            const image = item.fields.file.url;
            const description = item.fields.description;
            return (
              <div
                key={index}
                className="rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={description}
                  className="w-full h-full object-cover"
                />
                <div className="bg-white p-4">
                  <h3 className="text-lg font-semibold">{description}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalVisible && (
        <>
          <button
            onClick={closeModal}
            className="fixed top-4 right-4 text-1xl text-gray-600 hover:text-gray-900 bg-white rounded-sm p-2 z-50"
          >
            Close
          </button>
          <button
            onClick={prevImage}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600 hover:text-gray-900 bg-white rounded-full p-2 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z"></path></svg>
          </button>
          <button
            onClick={nextImage}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600 hover:text-gray-900 bg-white rounded-full p-2 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"></path></svg>
          </button>
          <div
            className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div
              className="relative max-w-3xl mx-auto rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[currentIndex]?.fields.file.url}
                alt={galleryItems[currentIndex]?.fields.description}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="mt-0 bg-white p-4 rounded-b-lg">
                <p className="text-lg text-gray-800">
                  {galleryItems[currentIndex]?.fields.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
