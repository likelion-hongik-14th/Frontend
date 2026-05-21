import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL


// ============ 로그인 ============
export const loginAPI = async ({ username, password }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
            username,
            password,
        })
        const accessToken = data.accessToken
        if (!accessToken) {
            throw new Error("로그인 실패")
        }
        return accessToken
    } catch (error) {
        throw new Error("로그인 실패")
    }
}


// ============ 회원가입 ============
export const signupAPI = async ({ email, password }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/signup`, {
            email,
            password,
        })
        return data
    } catch (error) {
        console.log("회원가입 에러:", error.response?.data)
        throw new Error(error.response?.data?.message || "회원가입 실패")
    }
}


// ============ 로그아웃 ============
export const logoutAPI = async (accessToken) => {
    try {
        await axios.post(
            `${BASE_URL}/api/auth/logout`,
            {},                                        
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
    } catch (error) {
        console.log("로그아웃 API 에러:", error.response?.data)
    }
}
