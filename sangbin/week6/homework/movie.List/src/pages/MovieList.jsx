import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import useRecentShows from '../hooks/useRecentShow'

// ⭐ 새로 추가된 import 들
import useAuthStore from '../stores/useAuthStore'        // 토큰 가져오기
import { saveContentAPI } from '../apis/contentsApi'      // 서버에 저장하는 함수


const MovieList = () => {
    const [shows, setShows] = useState([])
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedShow, setSelectedShow] = useState(null)
    const { addShow } = useRecentShows()

    // ⭐ store에서 토큰 꺼내오기 (로그인 여부 판단용)
    const accessToken = useAuthStore((state) => state.accessToken)


    // TVMaze에서 전체 쇼 목록 가져오기 (초기 로딩)
    useEffect(() => {
        const controller = new AbortController()
        axios.get('https://api.tvmaze.com/shows', { signal: controller.signal })
            .then((res) => { setShows(res.data) })
            .catch(() => {})
        return () => controller.abort()
    }, [])


    const trimmedQuery = query.trim()


    // 검색어 변할 때마다 TVMaze 검색
    useEffect(() => {
        if (!trimmedQuery) {
            setSearchResults([])
            return
        }
        const controller = new AbortController()
        const timer = setTimeout(() => {
            axios.get(`https://api.tvmaze.com/search/shows?q=${trimmedQuery}`, { signal: controller.signal })
                .then((res) => { setSearchResults(res.data.map((item) => item.show)) })
                .catch(() => {})
        }, 400)
        return () => {
            clearTimeout(timer)
            controller.abort()
        }
    }, [trimmedQuery])


    const featured = shows.slice(0, 8)
    const grid = shows.slice(8, 30)


    // ⭐ 영화 카드 클릭 핸들러 — 핵심 수정 부분
    const handleCardClick = async (show) => {
        // 1. 로컬 "최근 본 영화" 에 추가 (기존 로직 유지)
        addShow(show)

        // 2. 모달 즉시 열기 (서버 응답 기다리지 않음 - UX 우선)
        setSelectedShow(show)

        // 3. 로그인 상태일 때만 서버에 저장
        //    비로그인 시엔 토큰이 없어서 401/403 받을 거라 호출 자체를 안 함
        if (accessToken) {
            try {
                await saveContentAPI(show, accessToken)
            } catch (err) {
                // 백그라운드 저장이라 사용자에게 알림 안 띄움.
                // 콘솔 로그는 contentsApi.js 안에 이미 있음.
            }
        }
    }


    const gridClass = "grid grid-cols-2 tb:grid-cols-4 dt:grid-cols-6 gap-3 tb:gap-4"


    return (
        <main className="p-4 tb:p-6 dt:p-10 space-y-6 tb:space-y-8 dt:space-y-10">
            <SearchBar value={query} onChange={setQuery} />

            {trimmedQuery ? (
                <section>
                    <h2 className="text-white text-lg tb:text-xl font-bold mb-3 tb:mb-4">
                        검색 결과 &quot;{trimmedQuery}&quot;
                    </h2>
                    {searchResults.length === 0 ? (
                        <p className="text-gray-400">결과가 없습니다.</p>
                    ) : (
                        <div className={gridClass}>
                            {searchResults.map((show) => (
                                <div
                                    key={show.id}
                                    onClick={() => handleCardClick(show)}
                                    className="cursor-pointer"
                                >
                                    <MovieCard show={show} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            ) : (
                <>
                    <section>
                        <h2 className="text-white text-lg tb:text-xl font-bold mb-3 tb:mb-4">Featured</h2>
                        <div className="flex gap-3 tb:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 tb:-mx-6 tb:px-6 dt:-mx-10 dt:px-10">
                            {featured.map((show) => (
                                <div
                                    key={show.id}
                                    onClick={() => handleCardClick(show)}
                                    className="flex-shrink-0 w-36 tb:w-48 dt:w-56 cursor-pointer"
                                >
                                    <MovieCard show={show} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white text-lg tb:text-xl font-bold mb-3 tb:mb-4">All Shows</h2>
                        <div className={gridClass}>
                            {grid.map((show) => (
                                <div
                                    key={show.id}
                                    className="cursor-pointer"
                                    onClick={() => handleCardClick(show)}
                                >
                                    <MovieCard show={show} />
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            <Modal show={selectedShow} onClose={() => setSelectedShow(null)} />
        </main>
    )
}

export default MovieList
