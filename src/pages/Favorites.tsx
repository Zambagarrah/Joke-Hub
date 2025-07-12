import { useEffect, useState } from 'react';

const Favorites: React.FC = () => {
  // State to store list of favorite jokes
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites on mount from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Remove a joke from favorites
  const handleRemove = (joke: string) => {
    const updated = favorites.filter(fav => fav !== joke);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🌟 Your Favorite Jokes</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet. Go find your funny bone on the homepage!</p>
      ) : (
        <div className="row justify-content-center">
          {favorites.map((joke, index) => (
            <div className="card m-2 p-3" style={{ maxWidth: '500px' }} key={index}>
              <p>{joke}</p>
              <button className="btn btn-outline-danger mt-2" onClick={() => handleRemove(joke)}>
                💔 Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
