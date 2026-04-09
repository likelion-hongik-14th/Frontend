const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const { movieImage, title } = movie;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-lg bg-zinc-900"
        onClick={handleModalClick}
      >
        <button
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg font-bold text-white"
          onClick={onClose}
        >
          X
        </button>

        <img
          src={movieImage}
          alt={`${title} 영화 포스터`}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default MovieModal;