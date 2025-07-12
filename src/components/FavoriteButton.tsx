
// Props: joke text and whether it's currently favorited
type FavoriteButtonProps = {
  joke: string;
  isFavorite: boolean;
  onToggle: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
  return (
    <button className={`btn btn-${isFavorite ? 'danger' : 'success'} mt-2`} onClick={onToggle}>
      {isFavorite ? '💔 Remove Favorite' : '💖 Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
