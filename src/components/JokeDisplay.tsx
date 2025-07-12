import { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

type JokeDisplayProps = {
  category: string;
};

const JokeDisplay: React.FC<JokeDisplayProps> = ({ category }) => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const fetchJoke = async () => {
      setLoading(true);
      setError('');
      setJoke('');

      try {
        if (category === 'Dad') {
          const res = await fetch('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
          });
          const data = await res.json();
          setJoke(data.joke);
        } else {
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

  const isFavorite = favorites.includes(joke);
  const handleNextJoke = () => setReload(prev => !prev);

  // Emoji & background styles per category
  const categoryStyles: Record<string, { emoji: string }> = {
    Dark: { emoji: '😈' },
    Dad: { emoji: '👨‍🦳' },
    Pun: { emoji: '🧠' },
    Programming: { emoji: '💻' },
    Misc: { emoji: '🎲' },
  };

  const currentStyle = categoryStyles[category] || { emoji: '🤡', bg: '#ffffff' };

  return (
    <div className="mt-4">
      {loading && <div className="spinner-border text-primary" role="status" />}
      {error && <p className="text-danger mt-2">{error}</p>}

      {joke && (
        <div
          className="card mx-auto shadow-sm"
          style={{
            maxWidth: '600px',
            borderRadius: '12px',
          }}
        >
          <div className="card-body">
            {/* Category Header with emoji */}
            <h5
              className="emoji-header"
              style={{
                fontWeight: 'bold',
                marginBottom: '1rem',
                fontSize: '1.4rem'
              }}
            >
              {currentStyle.emoji} {category} Joke
            </h5>

            {/* Joke text */}
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

            {/* Action buttons */}
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
