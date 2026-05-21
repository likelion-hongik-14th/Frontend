import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import MovieCard from "../components/MovieCard"

// ⭐ 새로 가져올 것들
import { getContentsAPI } from "../apis/contentsApi"
import useAuthStore from "../stores/useAuthStore"


const Mypage = () => {
    // store에서 토큰 꺼내기
    const accessToken = useAuthStore((state) => state.accessToken)

    // ===== 상태들 =====
    // contents: 서버에서 받아온 저장 컨텐츠 목록 (변환된 형태)
    const [contents, setContents] = useState([])
    // loading: 데이터 불러오는 중인지
    const [loading, setLoading] = useState(true)
    // error: 에러 발생 시 보여줄 메시지
    const [error, setError] = useState('')
    // selectedShow: 모달에 표시할 영화 (클릭 시)
    const [selectedShow, setSelectedShow] = useState(null)


    // ⭐ 컴포넌트가 화면에 나타날 때(=마운트) 서버 호출
    // 의존성 배열에 [accessToken] 을 넣어서, 로그인 상태 바뀌면 다시 가져오게 함
    useEffect(() => {
        // App.jsx가 로그인 안 한 사용자를 막아주지만, 안전장치로 한 번 더 체크
        if (!accessToken) {
            setLoading(false)
            return
        }

        // useEffect 안에서는 async를 직접 못 써서, 안에 또 함수 정의해서 호출하는 패턴
        const fetchContents = async () => {
            try {
                setLoading(true)
                setError('')

                // 서버에서 raw 데이터 받아오기
                const data = await getContentsAPI(accessToken)

                // ⭐ 데이터 변환 (서버 형태 → MovieCard 형태)
                // 서버:  { internalId, tvMazeId, name, imageUrl, user }
                // 카드:  { id,         name,    image: { medium } }
                const transformed = data.map((item) => ({
                    id: item.internalId,                  // React key용 (각 항목 고유 식별자)
                    tvMazeId: item.tvMazeId,              // 혹시 모를 참조용
                    name: item.name,                      // 그대로 매핑
                    image: {
                        medium: item.imageUrl,            // imageUrl → image.medium 으로 매핑
                    },
                }))

                setContents(transformed)
            } catch (err) {
                setError('컨텐츠를 불러올 수 없습니다.')
            } finally {
                // 성공이든 실패든 로딩은 끝났으니 false로
                setLoading(false)
            }
        }

        fetchContents()
    }, [accessToken])


    return (
        <main className="p-4 tb:p-6 dt:p-10 space-y-6">
            <h1 className="text-white text-2xl font-bold">마이페이지</h1>

            <section>
                <h2 className="text-white text-xl font-bold mb-4">저장한 컨텐츠</h2>

                {/* ⭐ 4가지 상태에 따라 다른 UI 보여주기 */}
                {loading ? (
                    // 1. 로딩 중
                    <p className="text-gray-400">불러오는 중...</p>
                ) : error ? (
                    // 2. 에러 발생
                    <p className="text-red-400">{error}</p>
                ) : contents.length === 0 ? (
                    // 3. 데이터는 받았지만 비어있음
                    <p className="text-gray-400">
                        저장한 컨텐츠가 없어요. 메인 페이지에서 영화를 클릭해보세요!
                    </p>
                ) : (
                    // 4. 데이터 있음 → 그리드로 보여주기
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
