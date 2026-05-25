import { useEffect } from "react";

const MovieModal = ({ movie, onClose }) => {
  // 모달이 열려 있는 동안 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 모달 외부(오버레이) 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // 오버레이: 배경 어둡게 처리
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      {/* 모달 본체 */}
      <div className="relative bg-gray-900 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-red-600 transition-colors duration-200 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold z-10"
          aria-label="모달 닫기"
        >
          ✕
        </button>

        {/* 포스터 이미지 */}
        <img
          src={movie.movieImage}
          alt={`${movie.title} 포스터`}
          className="w-full h-80 object-cover"
        />

        {/* 영화 정보 */}
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <hr className="border-gray-600 my-3" />
          <p className="text-gray-300 mb-1">🎬 감독: {movie.director}</p>
          <p className="text-gray-300 mb-1">🎭 주연: {movie.actor}</p>
          <p className="text-gray-300 mb-3">📅 개봉일: {movie.releaseDate}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
