const MovieCard = ({movie,onOpenModal }) => {

    return(
        <section onClick={()=> onOpenModal(movie) } className="w-full rounded-lg bg-gray-800 cursor-pointer" >

            <section className="w-full bg-gray-800 p-6 rounded-lg shadow  hover:-translate-y-2 hover:bg-gray-700">
                <img src={movie.image?.medium ?? 'https://via.placeholder.com/210x295?text=No+Image'} alt={`${movie.name} 영화 포스터`} className="w-full rounded mb-4"/>
                <h2 className="text-2xl font-semibold">{movie.name}</h2>
                <hr className="my-2" />
                <p className="text-white font-semibold truncate">{movie.name}</p>
                <p className="text-gray-400 text-xs mt-1 truncate">
                    {movie.genres?.join(', ')}
                </p>
                <p className="text-gray-400 text-sm mt-2">📅 개봉일: {movie.premiered}</p>
            </section>
        </section>
    );
};

export default MovieCard;