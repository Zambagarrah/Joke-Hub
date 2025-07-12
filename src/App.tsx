import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategorySelector from './components/CategorySelector';
import JokeDisplay from './components/JokeDisplay';
import Favorites from './pages/Favorites';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Dark');

  return (
    <Router>
      {/* Full screen centered wrapper */}
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100 px-3"
        style={{ textAlign: 'center' }}
      >
        {/* Fixed max width wrapper to keep content centered */}
        <div style={{ maxWidth: '600px', width: '100%' }}>
         <h1 style={{ fontWeight: 700, fontSize: '2.5rem', color: '#333' }}>
            😂 JokeHub
          </h1> 

          {/* Navigation */}
          <div className="mb-4">
            <Link to="/" className="btn btn-primary me-2">🏠 Home</Link>
            <Link to="/favorites" className="btn btn-warning">🌟 Favorites</Link>
          </div>

          {/* Routed content */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CategorySelector
                    selected={selectedCategory}
                    onSelect={(cat) => setSelectedCategory(cat)}
                  />
                  <JokeDisplay category={selectedCategory} />
                </>
              }
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
