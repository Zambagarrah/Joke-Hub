import React, { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

type JokeDisplayProps = {
  category: string;
};

const JokeDisplay: React.FC<JokeDisplayProps> = ({ category }) => {
  // State to hold the current joke
  const [joke, setJoke] = useState('');
  // Spinner & error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // List of favorites
  const [favorites, setFavorites] = useState<string[]>([]);
  // Used to re-trigger joke fetch
  const [reload, setReload] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Fetch joke on category change or reload trigger
  useEffect(() => {
    const fetchJoke = async () => {
      setLoading(true);
      setError('');
      setJoke('');

      try {
        // Dedicated endpoint for Dad jokes
        if (category === 'Dad') {
          const res = await fetch('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
          });
          const data = await res.json();
          setJoke(data.joke);
        } else {
          // Use JokeAPI for other categories
          const res = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`);
          const data = await res.json();
          if (data && data.joke) {
            setJoke(data.joke);
          } else {
            setError('No joke found. Even the servers are grumpy. 😶');
          }
        }
      } catch (err) {
        setError('Oops! Failed to fetch joke. Check your internet or API status.');
      }

      setLoading(false);
    };

    fetchJoke();
  }, [category, reload]);

  // Toggle joke in favorites
  const handleFavoriteToggle = () => {
    let updatedFavorites;
    if (favorites.includes(joke)) {
      updatedFavorites = favorites.filter(fav => fav !== joke);
    } else {
      updatedFavorites = [...favorites, joke];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Is current joke favorited?
  const isFavorite = favorites.includes(joke);

  // Trigger joke refresh
  const handleNextJoke = () => setReload(prev => !prev);

  return (
    <div className="mt-4">
      {/* Spinner */}
      {loading && <div className="spinner-border text-primary" role="status" />}

      {/* Error message */}
      {error && <p className="text-danger mt-2">{error}</p>}

      {/* Joke card display */}
      {joke && (
        <div
          className="card mx-auto shadow-sm"
          style={{
            maxWidth: '600px',
            borderRadius: '12px',
            backgroundColor: '#fff',
          }}
        >
          <div className="card-body">
            {/* Joke content */}
            <p
              className="card-text"
              style={{
                fontSize: '1.2rem',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              {joke}
            </p>

            {/* Actions: favorite, share, next */}
            <div className="d-flex flex-column align-items-center gap-2">
              <FavoriteButton joke={joke} isFavorite={isFavorite} onToggle={handleFavoriteToggle} />
              <ShareButton joke={joke} />
              <button className="btn btn-secondary" onClick={handleNextJoke}>
                🔄 Next Joke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JokeDisplay;
