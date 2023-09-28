import React from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../utils/contentfulClient';

const Header = () => {
  const [headerData, setHeaderData] = React.useState({
    title: '',
    heroImage: '',
  });

  React.useEffect(() => {
    client.getEntries({ content_type: 'gallery' })
      .then((response) => {
        const title = response.items[0]?.fields?.title || '';
        const heroImage = response.items[0]?.fields?.heroImage?.fields?.file?.url || '';
        setHeaderData({ title, heroImage });
      })
      .catch(console.error);
  }, []);

  const navigate = useNavigate();

  const galleryScroll = (gallery) => {
    const element = document.getElementById(gallery);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const loginTap = () => {
    navigate('/login');
  };

  return (
    <div className="bg-cover bg-center h-screen relative" style={{ backgroundImage: `url(${headerData.heroImage})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">{headerData.title}</h1>
        <p className="text-xl mb-8">Discover some of his masterpieces</p>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full absolute top-4 right-4"
          onClick={loginTap}
        >
          Admin Login
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-4 center-4"
          onClick={() => galleryScroll('gallery')}
        >
          Jump To Gallery
        </button>
      </div>
    </div>
  );
};

export default Header;
