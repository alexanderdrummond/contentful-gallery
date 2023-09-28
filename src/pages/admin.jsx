import { useState, useEffect } from 'react';
import { createClient } from 'contentful-management';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebaseConfig';


const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/pages/login');
      }
    });
  }, []);

  const notify = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  

  const client = createClient({
    accessToken: import.meta.env.VITE_CMA_TOKEN,
  });

  useEffect(() => {
    const fetchData = async () => {
      const space = await client.getSpace('39os5917g9er');
      const environment = await space.getEnvironment('master');
      const entry = await environment.getEntry('4KXDxrBvsswjxTu47qvfkU');
  
      // resolve af linkede assets
      const galleryImageLinks = entry.fields.galleryImages['en-US'];
      const galleryImagesResolved = await Promise.all(
        galleryImageLinks.map(async (link) => {
          return await environment.getAsset(link.sys.id);
        })
      );
  
      setTitle(entry.fields.title['en-US']);
      setDescription(entry.fields.descriptionText['en-US']);
      setGalleryImages(galleryImagesResolved);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const descriptions = {};
    galleryImages.forEach((img) => {
      descriptions[img.sys.id] = img.fields?.description?.['en-US'] || '';
    });
    setImageDescriptions(descriptions);
  }, [galleryImages]);

  const updateField = async (field, value) => {
    const space = await client.getSpace('39os5917g9er');
    const environment = await space.getEnvironment('master');
    const latestEntry = await environment.getEntry('4KXDxrBvsswjxTu47qvfkU');
    latestEntry.fields[field]['en-US'] = value;
    const updatedEntry = await latestEntry.update();
    await updatedEntry.publish();
    return updatedEntry;
  };

  const updateImageDescription = async (imageId) => {
    try {
      const space = await client.getSpace('39os5917g9er');
      const environment = await space.getEnvironment('master');
      const asset = await environment.getAsset(imageId);

      asset.fields.description = { 'en-US': imageDescriptions[imageId] };
      const updatedAsset = await asset.update();
      await updatedAsset.publish();

      const updatedImages = galleryImages.map((img) => {
        if (img.sys.id === imageId) {
          img.fields.description['en-US'] = imageDescriptions[imageId];
        }
        return img;
      });

      setGalleryImages(updatedImages);
      notify('Image description updated successfully');
    } catch (error) {
      notify('Error updating image description', 'error');
    }
  };

  const handleImageDescriptionChange = (imageId, newDescription) => {
    setImageDescriptions({
      ...imageDescriptions,
      [imageId]: newDescription,
    });
  };

  const deleteImage = async (imageId) => {
    const filteredImages = galleryImages.filter((img) => img.sys.id !== imageId);
    await updateField('galleryImages', filteredImages);
  };

  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    await updateField('title', title);
    notify('Title successfully updated');
  };

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    await updateField('descriptionText', description);
    notify('Description successfully updated');
  };

  const uploadNewImage = async (newImageFile) => {
    const newImage = {
      id: 'newId',
      url: URL.createObjectURL(newImageFile),
      description: 'New Image',
    };
    const updatedImages = [...galleryImages, newImage];
    await updateField('galleryImages', updatedImages);
  };

  return (
    
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="flex items-start">
        <div className="flex flex-col space-y-4 mr-8">
          <form onSubmit={handleTitleSubmit} className="bg-white rounded-lg p-6 shadow-md mb-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border focus:border-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
              Update Title
            </button>
          </form>
          <form onSubmit={handleDescriptionSubmit} className="bg-white rounded-lg p-6 shadow-md mb-4">
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 w-full h-32 rounded-md border focus:border-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
              Update Description
            </button>
          </form>
        </div>
        <div className="inline-block bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Gallery Images</h2>
        <div className="space-y-4">
          {galleryImages.map((img) => (
            <div key={img.sys.id} className="flex items-center space-x-4">
              <div>
                <img
                  src={img.fields?.file?.['en-US']?.url || ''}
                  alt={img.fields?.description?.['en-US'] || ''}
                  width="50"
                  height="50"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label htmlFor={`description-${img.sys.id}`} className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <input 
                  type="text" 
                  id={`description-${img.sys.id}`} 
                  value={imageDescriptions[img.sys.id] || ''} 
                  onChange={(e) => handleImageDescriptionChange(img.sys.id, e.target.value)} 
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex items-center mt-5">
                <button 
                  onClick={() => updateImageDescription(img.sys.id)} 
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button 
                  onClick={() => deleteImage(img.sys.id)} 
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700 ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label htmlFor="new-image" className="block text-sm font-medium text-gray-600">
            Upload New Image
          </label>
          <input 
            type="file" 
            id="new-image" 
            onChange={(e) => uploadNewImage(e.target.files[0])} 
            className="border p-2 rounded"
          />
        </div>
      </div>
    </div>
  </div>
  );
  
};

export default Admin;
