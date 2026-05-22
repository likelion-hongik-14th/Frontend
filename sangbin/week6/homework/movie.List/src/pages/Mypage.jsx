import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import MovieCard from "../components/MovieCard"
import { getContentsAPI } from "../apis/contentsApi"
import useAuthStore from "../stores/useAuthStore"

const Mypage = () => {
    const accessToken = useAuthStore((state) => state.accessToken)

    const [contents, setContents] = useState([])
    const [selectedShow, setSelectedShow] = useState(null)

    useEffect(() => {
        if (!accessToken) return

        const fetchContents = async () => {
            const data = await getContentsAPI(accessToken)
            const transformed = data.map((item) => ({
                id: item.internalId,
                name: item.name,
                image: {
                    medium: item.imageUrl,
                },
            }))
            setContents(transformed)
        }

        fetchContents()
    }, [accessToken])

    return (
        <main className="p-4 tb:p-6 dt:p-10 space-y-6">
            <h1 className="text-white text-2xl font-bold">마이페이지</h1>

            <section>
                <h2 className="text-white text-xl font-bold mb-4">저장한 컨텐츠</h2>

                {contents.length === 0 ? (
                    <p className="text-gray-400">저장한 컨텐츠가 없습니다.</p>
                ) : (
                    <div className="grid grid-cols-2 tb:grid-cols-4 dt:grid-cols-6 gap-3 tb:gap-4">
                        {contents.map((show) => (
                            <div
                                key={show.id}
                                onClick={() => setSelectedShow(show)}
                                className="cursor-pointer"
                            >
                                <MovieCard show={show} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Modal show={selectedShow} onClose={() => setSelectedShow(null)} />
        </main>
    )
}

export default Mypage
