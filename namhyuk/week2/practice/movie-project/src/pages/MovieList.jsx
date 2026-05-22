import { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리 설치 후 import
import MovieModal from "../components/MovieModal";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import useRecentShows from "../hooks/useRecentShow";
import { saveContentAPI } from "../apis/contentApi";
import useAuthStore from "../stores/useAuthStore";

const MovieList = () => {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const { addShow } = useRecentShows();

  // zustand hook은 컴포넌트 최상단에서 호출해야 함
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const controller = new AbortController();

    // axios 연동 -> TVMaze API를 사용하여 실제 데이터를 가져옴
    const fetchShows = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows", {
          signal: controller.signal,
        });
        setShows(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("데이터 로딩 실패:", err);
        }
      }
    };

    fetchShows();
    return () => controller.abort();
  }, []);

  // 검색 로직 -> 쿼리가 바뀔 때마다 결과를 필터링
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = shows.filter((show) =>
      show.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
  }, [query, shows]);

  const trimmedQuery = query.trim();

  // 상단 하이라이트(4개)와 하단 전체 그리드(20개) 분리
  const featured = shows.slice(0, 4);
  const grid = shows.slice(4, 24);

  const handleCardClick = async (show) => {
    console.log("선택된 쇼:", show.name);

    addShow(show);
    setSelectedShow(show);

    if (!accessToken) {
      console.log("로그인하지 않은 상태라 서버에는 저장하지 않습니다.");
      return;
    }

    try {
      await saveContentAPI({ accessToken, show });
      console.log("서버에 컨텐츠 저장 성공");
    } catch (error) {
      console.error("서버 저장 실패:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 p-6 md:p-12 space-y-12">
      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {trimmedQuery ? (
        <section className="animate-fadeIn">
          <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded-full"></span>
            &quot;{trimmedQuery}&quot; 검색 결과
          </h2>

          {searchResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                찾으시는 결과가 없어요.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {searchResults.map((show) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onClick={() => handleCardClick(show)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
              지금 뜨는 콘텐츠 (Featured)
            </h2>

            <div className="md:grid lg:grid-cols-6 sm:grid-cols-3 flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
              {featured.map((show) => (
                <div
                  key={show.id}
                  className="w-64 md:w-80 flex-shrink-0 transition-transform duration-300 hover:z-10"
                >
                  <MovieCard
                    show={show}
                    onClick={() => handleCardClick(show)}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              모든 시리즈 탐색
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {grid.map((show) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onClick={() => handleCardClick(show)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </main>
  );
};

export default MovieList;