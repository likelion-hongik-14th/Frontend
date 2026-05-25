import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import useRecentShows from '../hooks/useRecentShow'
import useAuthStore from '../stores/useAuthStore'
import { saveContentAPI } from '../apis/contentsApi'

const MovieList = () => {
    const [shows, setShows] = useState([])
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedShow, setSelectedShow] = useState(null)
    const { addShow } = useRecentShows()
    const accessToken = useAuthStore((state) => state.accessToken)

    useEffect(() => {
        const controller = new AbortController()
        axios.get('https://api.tvmaze.com/shows', { signal: controller.signal })
            .then((res) => { setShows(res.data) })
            .catch(() => {})
        return () => controller.abort()
    }, [])

    const trimmedQuery = query.trim()

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

    const handleCardClick = (show) => {
        addShow(show)
        setSelectedShow(show)

        if (accessToken) {
            saveContentAPI(show, accessToken)
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
