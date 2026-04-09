import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import movieData from '../data/movie.json';

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <>
      <main className="min-h-screen bg-black px-6 py-8">
        <section className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white">Movie List</h1>
          <p className="text-sm text-gray-400">
            좋아하는 영화들을 카드 형식으로 모아본 페이지입니다.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movieData.map((movie) => (
            <MovieCard
              key={movie.id}
              movieImage={movie.movieImage}
              releaseDate={movie.releaseDate}
              actor={movie.actor}
              title={movie.title}
              director={movie.director}
              description={movie.description}
              onClick={() => handleOpenModal(movie)}
            />
          ))}
        </section>
      </main>

      {isModalOpen && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default MovieList;