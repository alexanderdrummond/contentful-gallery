import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../contentfulClient';

const Header = () => {
  const [headerData, setHeaderData] = useState({
    title: '',
    heroImage: '',
  });

  useEffect(() => {
    client.getEntries({ content_type: 'gallery' })
      .then((response) => {
        const title = response.items[0]?.fields?.title || '';
        const heroImage = response.items[0]?.fields?.heroImage?.fields?.file?.url || '';
        setHeaderData({ title, heroImage });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-cover bg-center h-screen relative" style={{ backgroundImage: `url(${headerData.heroImage})` }}>
      <div className="absolute top-0 right-0 p-4">
        <Link to="/login" className="text-white hover:text-gray-300">Admin Login</Link>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">{headerData.title}</h1>
        <p className="text-xl mb-8">Discover some of his masterpieces</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Header;
