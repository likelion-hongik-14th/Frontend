import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL


// ============ 컨텐츠 저장 (POST /api/contents) ============
export const saveContentAPI = async (show, accessToken) => {
    try {
        const { data } = await axios.post(
            `${BASE_URL}/api/contents`,
            {
                id: show.id,
                name: show.name,
                image: {
                    medium: show.image?.medium || '',
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        console.log("✅ 컨텐츠 저장 성공:", data)
        return data
    } catch (error) {
        console.log("❌ 컨텐츠 저장 에러:", error.response?.status, error.response?.data)
        throw new Error("컨텐츠 저장 실패")
    }
}


// ============ 컨텐츠 조회 (GET /api/contents) ============
export const getContentsAPI = async (accessToken) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/api/contents`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        console.log("✅ 컨텐츠 조회 성공:", data)
        return data
    } catch (error) {
        console.log("❌ 컨텐츠 조회 에러:", error.response?.status, error.response?.data)
        throw new Error("컨텐츠 조회 실패")
    }
}
