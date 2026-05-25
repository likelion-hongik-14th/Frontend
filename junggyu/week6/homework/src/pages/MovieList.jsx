import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import useRecentShows from '../hooks/useRecentShow';
import useAuthStore from '../stores/useAuthStore';
import { getContentsAPI, postContentsAPI } from '../apis/contentsApi';


const MovieList = () => {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const { addShow } = useRecentShows();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const controller = new AbortController();
		// axios 연동
    axios.get('https://api.tvmaze.com/shows')
        .then((res)=> setShows(res.data))
        .catch(()=>{})
		
    return () => controller.abort();
  }, []);

  const trimmedQuery = query.trim();
  
  useEffect(()=>{
    if (!trimmedQuery){
        setSearchResults([]);
        return;
    }
    const constroller = new AbortController();
    const timer = setTimeout(()=>{
        axios.get(`https://api.tvmaze.com/shows?q=${trimmedQuery}`,{signal:constroller.signal,})
            .then((res)=> setSearchResults(res.data.map((item)=> item.show)))
            .catch(()=>{});
    },400);
    return ()=> {
        clearTimeout(timer);
        controller.abort();
    };
  },[trimmedQuery]);




  const featured = shows.slice(0, 4);
  const grid = shows.slice(4, 20);

  const saveContentIfNotExists = async (show) => {
  if (!accessToken) return;

  try {
    const savedContents = await getContentsAPI(accessToken);

    const alreadySaved = savedContents.some(
      (item) => item.tvMazeId === show.id
    );

    if (alreadySaved) {
      console.log("이미 저장된 컨텐츠입니다.");
      return;
    }

    const payload = {
      id: show.id,
      name: show.name,
      image: {
        medium:
          show.image?.medium ??
          show.image?.original ??
          "https://via.placeholder.com/210x295?text=No+Image",
      },
    };

    console.log("POST payload:", payload);

    await postContentsAPI(payload, accessToken);
    console.log("컨텐츠 저장 성공");
  } catch (error) {
    console.error("컨텐츠 저장 실패:", error);
  }
};


  const handleCardClick = async (show) => {
    /*addShow(show);*/
    await saveContentIfNotExists(show);
    /*setSelectedShow(show);*/
  };

  return (
    <main className="p-10 space-y-10">
      <SearchBar value={query} onChange={setQuery} />

      {trimmedQuery ? (
        <section>
          <h2 className="text-white text-xl font-bold mb-4">
            검색 결과 &quot;{trimmedQuery}&quot;
          </h2>
          {searchResults.length === 0 ? (
            <p className="text-gray-400">결과가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {searchResults.map((show) => (
                <div key={show.id} onClick={() => handleCardClick(show)} className="cursor-pointer">
                  <MovieCard movie={show} />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-white text-xl font-bold mb-4">Featured</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-6 no-scrollbar">
              {featured.map((show) => (
                <div key={show.id} className="w-full cursor-pointer" onClick={() => handleCardClick(show)}>
                  <MovieCard movie={show} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">All Shows</h2>
            <div className="grid lg:grid-cols-[repeat(auto-fill,minmax(220px,220px))] md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-10">
              {grid.map((show) => (
                <div key={show.id} className="w-full cursor-pointer" onClick={() => handleCardClick(show)}>
                  <MovieCard movie={show} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

        {selectedShow && (
            <Modal movie={selectedShow} onClose={() => setSelectedShow(null)} />
        )}
    </main>
  );
};

export default MovieList;
