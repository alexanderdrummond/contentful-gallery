import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
    

      const token = await user.getIdToken();
    
      // Ikke best-practice, ville normalt store tokens i en HTTP only cookie.
      sessionStorage.setItem('userToken', token);
    
    
      navigate('/admin');
    } catch (e) {
      setError('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Login</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="p-3 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
