import ReactIcon from '/React.svg';
import TailwindIcon from '/Tailwind.svg';
import ContentfulIcon from '/Contentful.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8 px-4">
      <div className="container mx-auto flex justify-center">
        <div className="text-center mr-8">
          <h3 className="text-2xl font-semibold mb-4">Created By</h3>
          <p className="text-lg">Alex and Rasmus</p>
        </div>
        
        <div className="w-14"></div>
        
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-2">Built with</h4>
          <div className="flex space-x-4">
            <img src={ReactIcon} alt="React" className="w-12 h-12 cursor-pointer filter invert" />
            <img src={ContentfulIcon} alt="Contentful" className="w-10 h-12 cursor-pointer filter invert" />
            <img src={TailwindIcon} alt="Tailwind CSS" className="w-12 h-12 cursor-pointer filter invert" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;