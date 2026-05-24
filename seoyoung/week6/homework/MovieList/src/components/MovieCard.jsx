//MovieCard.jsx

const MovieCard = ({ show }) => {
  const rawImageUrl = show?.image?.medium || show?.imageUrl;

  //mypage에선 백엔드 데이터 사용, movielist에선 api연동 후 사용하므로 나눠주기
  const secureImageUrl = rawImageUrl
    ? rawImageUrl.replace('http://', 'https://')
    : 'https://via.placeholder.com/210x295?text=No+Image';

  return (
    <div className="bg-[#1A1D24] p-2 rounded-lg overflow-hidden shawdow-lg w-full border border-slate-800">
      <img
        src={secureImageUrl}
        alt={show?.name}
        className="w-full aspect-[2/3] object-cover p-2 rounded-2xl"
      />

      {/*텍스트 정보 영역*/}
      <div className="p-2">
        <p className="text-whtie text-xl font-semibold truncate">
          {show?.name}
        </p>

        {/*장르 정보 : 배열형태인 genres를 쉼표로 구분된 문자열로 출력*/}
        {show?.genres && (
          <p className="text-white text-xs mt-1 truncate">
            {show.genres.join(',')}
          </p>
        )}

        {/* premiered 역시 데이터가 '있을 때만(&&)' 화면에 그립니다. */}
        {show?.premiered && (
          <p className="text-white text-xs mt-1">🎥 {show.premiered}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
