import { useEffect } from "react";

const Modal = ({ show, onClose }) => {
  // show가 없으면 모달 렌더링 안 함
  if (!show) return null;

  // 모달 열려 있는 동안 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-gray-900 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-red-600 transition-colors duration-200 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold z-10"
        >
          ✕
        </button>

        {/* 포스터 이미지 */}
        <img
          src={show.image?.original || show.image?.medium || 'https://via.placeholder.com/400x560?text=No+Image'}
          alt={show.name}
          className="max-h-52 md:max-h-none w-full h-80 object-cover"
        />

        {/* 쇼 정보 */}
        <div className="p-6 flex flex-col lg:gap-4 gap-3 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">{show.name}</h2>
          <hr className="border-gray-600 my-3" />
          <p className="text-gray-300 mb-1">🎭 장르: {show.genres?.join(', ')}</p>
          <p className="text-gray-300 mb-1">📅 개봉일: {show.premiered}</p>
          <p className="text-gray-300 mb-3">⭐ 평점: {show.rating?.average ?? '없음'}</p>
          <p
            className="text-gray-400 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: show.summary }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
