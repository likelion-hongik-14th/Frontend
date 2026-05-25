import out from '/src/assets/X.png'
import { useEffect } from 'react';
import { X, Star, Calendar, Tv } from 'lucide-react';


const Modal = ({ movie, onClose }) => {
  if (!movie) return null;
  const summary = movie.summary?.replace(/<[^>]+>/g, '') ?? '설명이 없습니다.';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
    }, []);

  return (
    <div onClick={onClose} className=" fixed inset-0 flex items-center justify-center bg-black/80 p-4">
        <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[800px] max-h-[80vh] overflow-y-auto flex bg-gray-800 rounded-lg p-6 gap-[10px] ">
            <button onClick={onClose} className=" cursor-pointer absolute top-[7px] right-[7px] hover:scale-130  ">
                <img src={out} className='h-[50px] w-[50px]' />
            </button>
            
            <img 
              src={movie.image?.original ?? 
                movie.image?.medium ?? 
                'https://via.placeholder.com/400x600?text=No+Image'
              } 
              alt={movie.name} className="max-h-52 md:max-h-none w-[300px] rounded mb-4 mx-auto"/>
            <div>
              <h2 className="text-2xl pr-10 font-semibold">{movie.name}</h2>
              <hr className="my-4" />
            
              <p className="text-gray-200 mb-[30px] line-clamp-5 md:line-clamp-10 ">📝 줄거리: {summary}</p>
              <p className="text-gray-400 text-xs mt-1 truncate">
                   장르 : {movie.genres?.join(', ')}
              </p>
              <p className="text-gray-400 text-sm mt-2">📅 개봉일: {movie.premiered}</p>
            </div>
        </div>
    </div>
  );
};

export default Modal;