import { useState, useEffect } from 'react';
import client from '../utils/contentfulClient';

const Description = () => {
  const [descriptionText, setDescriptionText] = useState('');

  useEffect(() => {
    client.getEntries({ content_type: 'gallery' })
      .then((response) => {
        const description = response.items[0].fields.descriptionText;
        setDescriptionText(description);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200 py-20">
      <div className="container mx-auto text-center">
        <div className="inline-block mb-4">
          <svg className="w-12 h-12 mx-auto text-gray-700" fill="currentColor">
           <path d="M24 19a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0-1a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm-7.5-9.25a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0Zm-6 4a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0ZM8.25 22a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5ZM16 24.25a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0Z"></path><path d="M16.2 31a16.717 16.717 0 0 1-7.84-2.622a15.045 15.045 0 0 1-6.948-9.165A13.032 13.032 0 0 1 2.859 9.22c3.757-6.2 12.179-8.033 19.588-4.256c4.419 2.255 7.724 6.191 8.418 10.03a6.8 6.8 0 0 1-1.612 6.02c-2.158 2.356-4.943 2.323-6.967 2.3h-.007c-1.345-.024-2.185 0-2.386.4c.07.308.192.604.36.873a3.916 3.916 0 0 1-.209 4.807A4.7 4.7 0 0 1 16.2 31ZM14.529 5a11.35 11.35 0 0 0-9.961 5.25a11.048 11.048 0 0 0-1.218 8.473a13.03 13.03 0 0 0 6.03 7.934c3.351 1.988 7.634 3.3 9.111 1.473c.787-.968.537-1.565-.012-2.622a2.843 2.843 0 0 1-.372-2.7c.781-1.54 2.518-1.523 4.2-1.5c1.835.025 3.917.05 5.472-1.649a4.909 4.909 0 0 0 1.12-4.314c-.578-3.2-3.536-6.653-7.358-8.6a15.482 15.482 0 0 0-7.01-1.74L14.529 5Z"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-12 text-gray-800">About Andy</h2>
        <div className="bg-white p-10 rounded-lg shadow-lg mx-auto transform transition hover:scale-105 hover:shadow-xl" style={{ maxWidth: '800px' }}>
          <p className="text-lg leading-relaxed text-gray-700">
            {descriptionText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
