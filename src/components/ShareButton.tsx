
type ShareButtonProps = {
  joke: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ joke }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this joke from JokeHub!',
          text: joke,
          url: window.location.href, // Shares current page link
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(joke);
        alert('Joke copied to clipboard 📋');
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <button className="btn btn-info mt-2" onClick={handleShare}>
      📤 Share Joke
    </button>
  );
};

export default ShareButton;
