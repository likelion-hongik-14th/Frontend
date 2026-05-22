import { useState,useEffect } from "react";
import Modal from "../components/Modal";
import MovieCard from "../components/MovieCard";
import useRecentShows from "../hooks/useRecentShow";
import out from '/src/assets/X.png'
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../apis/authApi";
import useAuthStore from "../stores/useAuthStore";
import { getContentsAPI } from "../apis/contentsApi";



const Mypage = () => {
  const [ selectedShow, setSelectedShow] = useState(null);
  const [savedContents, setSavedContents] = useState([]);

  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      await logoutAPI(accessToken);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      clearAuth();
      localStorage.removeItem("auth-storage");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await getContentsAPI(accessToken);
        console.log("contents response:", data);
        setSavedContents(data);
      } catch (error) {
        console.error("저장한 무비 조회 실패:", error);
      }
    };
    if (accessToken) {
      fetchContents();
    } 
  }, [accessToken]);




  return (
    <main className="text-white p-10">
      <section className="flex flex-col gap-2">
        <img
            src="/src/assets/profile.png"
            alt="프로필 이미지"
            className="w-28 h-28 rounded-2xl"
        />
        
        <h1 className="text-xl font-semibold text-center mb-[10px] w-28">안정규</h1>
        
        <button
          onClick={handleLogout}
          className="mb-[10px] w-[150px] rounded bg-blue-600 px-4 py-2 text-white"
        >
          로그아웃 ㄱ_ㄱ
        </button>

      </section>

    

      <section>
          <h2>최근본 컨텐츠</h2>
          {savedContents.length === 0 ? (
            <p className="text-gray-400">저장한 콘텐츠가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {savedContents.map((show) => (
                <div
                  key={show.internalId}
                  className="w-[220px] cursor-pointer"
                >
                  <MovieCard movie={show} onOpenModal={setSelectedShow} />
                </div>
              ))}
            </div>
          )}
      </section>

      {selectedShow && (
        <Modal movie={selectedShow} onClose={() => setSelectedShow(null)} />
      )}

    </main>
  );
}


export default Mypage