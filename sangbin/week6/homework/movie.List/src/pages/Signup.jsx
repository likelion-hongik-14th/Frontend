import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupAPI } from '../apis/authApi'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signupAPI({ email, password })
            alert('회원가입 성공! 로그인 해주세요.')
            navigate('/login')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
            <div className="w-full max-w-[420px] rounded-lg bg-black/75 p-10">
                <h1 className="mb-6 text-3xl font-bold">회원가입</h1>

                <form className="space-y-3" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded bg-gray-800 text-white"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded bg-gray-800 text-white"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
