import { useEffect, useState } from "react";
import MovieModal from "../components/MovieModal";
import MovieCard from "../components/MovieCard";
import useAuthStore from "../stores/useAuthStore";
import { getContentsAPI } from "../apis/contentApi";

const MyPage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [contents, setContents] = useState([]);
  const [selectShow, setSelectShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getContentsAPI(accessToken);

        const convertedContents = data.map((content) => ({
          id: content.tvMazeId,
          internalId: content.internalId,
          name: content.name,
          image: {
            medium: content.imageUrl,
          },
        }));

        setContents(convertedContents);
      } catch (error) {
        console.error("저장한 컨텐츠 조회 실패:", error);
        setErrorMessage("저장한 컨텐츠를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchContents();
    }
  }, [accessToken]);

  return (
    <main className="min-h-screen bg-gray-950 p-10 space-y-7">
      <h1 className="text-white text-2xl font-bold">마이페이지</h1>

      <section>
        <h2 className="mb-6 text-xl font-semibold text-white">
          저장한 컨텐츠
        </h2>

        {isLoading && <p className="text-gray-400">불러오는 중...</p>}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {!isLoading && !errorMessage && contents.length === 0 && (
          <p className="text-gray-400">저장한 컨텐츠가 없습니다.</p>
        )}

        {!isLoading && contents.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {contents.map((show, index) => {
              const uniqueKey = show.internalId
                ? `content-${show.internalId}`
                : `show-${show.id}-${index}`;

              return (
                <div
                  key={uniqueKey}
                  onClick={() => setSelectShow(show)}
                  className="relative group cursor-pointer"
                >
                  {/* MovieCard에 데이터를 넘겨줌 */}
                  <MovieCard movie={show} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selectShow && (
        <MovieModal show={selectShow} onClose={() => setSelectShow(null)} />
      )}
    </main>
  );
};

export default MyPage;