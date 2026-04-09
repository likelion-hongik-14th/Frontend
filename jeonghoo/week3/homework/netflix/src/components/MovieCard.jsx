const MovieCard = ({
  movieImage,
  releaseDate,
  actor,
  title,
  director,
  description,
  onClick,
}) => {
  return (
    <article
      className="cursor-pointer overflow-hidden rounded-lg border border-gray-700 bg-zinc-900"
      onClick={onClick}
    >
      <div className="h-[380px] overflow-hidden">
        <img
          src={movieImage}
          alt={`${title} 영화 포스터`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <p className="text-sm text-gray-400">개봉일: {releaseDate}</p>
        <p className="text-sm text-gray-400">출연진: {actor}</p>
        <p className="text-sm text-gray-400">감독: {director}</p>

        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </article>
  );
};

export default MovieCard;