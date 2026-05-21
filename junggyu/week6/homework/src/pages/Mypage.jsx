import { useState } from "react";
import Modal from "../components/Modal";
import MovieCard from "../components/MovieCard";
import useRecentShows from "../hooks/useRecentShow";
import out from '/src/assets/X.png'
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../apis/authApi";
import useAuthStore from "../stores/useAuthStore";



const Mypage = () => {
  const {recentShows, removeShow} = useRecentShows();
  const [ selectedShow, setSelectedShow] = useState(null);

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
          {recentShows.length ===0?(
            <p className="text-gray-400">최근 본 콘텐츠가 없습니다.</p>
          ):(
            <div>
              {recentShows.map((show)=>(
                <div key={show.id} onClick={()=> setSelectedShow(show)} className="w-[220px]">
                  <MovieCard movie={show} />
                  <button
                    onClick={(e)=> {
                      e.stopPropagation();
                      removeShow(show.id);
                    }}
                    >
                      <img src={out} className=' cursor-pointer hover:scale-130 h-[50px] w-[50px]' /> 
                    </button>
                </div>
              
              ))}
              </div>
            )}
          






      </section>
      <Modal movie={ selectedShow} onClose={()=> setSelectedShow(null)}/>
    </main>
  );
}


export default Mypage