import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/Description';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Login from './pages/login';
import Admin from './pages/admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Description />
              <Gallery />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
