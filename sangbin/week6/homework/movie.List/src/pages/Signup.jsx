// React Hook: useState는 컴포넌트 안에서 변하는 값을 관리할 때 사용
import { useState } from 'react'

// 페이지 이동을 위한 훅 (예: 회원가입 성공 후 로그인 페이지로 이동)
import { useNavigate } from 'react-router-dom'

// 방금 만든 회원가입 함수
import { signupAPI } from '../apis/authApi'


const Signup = () => {
    // ===== 상태(state) 만들기 =====
    // useState('') 의 빈 문자열은 초기값
    // [현재값, 값을_바꿀_함수] 형태로 반환됨
    const [email, setEmail] = useState('')        // 사용자가 입력하는 이메일
    const [password, setPassword] = useState('')  // 사용자가 입력하는 비밀번호

    // useNavigate(): 페이지 이동시키는 함수를 돌려줌
    const navigate = useNavigate()


    // ===== 폼 제출 시 실행될 함수 =====
    const handleSubmit = async (e) => {
        // e.preventDefault(): 폼 제출 시 페이지 새로고침되는 기본 동작을 막음
        // 이거 안 하면 페이지가 새로고침되면서 React 상태 다 날아감
        e.preventDefault()

        try {
            // 우리가 만든 signupAPI 함수 호출. 끝날 때까지 await으로 기다림
            await signupAPI({ email, password })

            // 성공하면 알림 띄우고 로그인 페이지로 이동
            alert('회원가입 성공! 로그인 해주세요.')
            navigate('/login')
        } catch (error) {
            // 실패하면 에러 메시지 표시
            alert(error.message)  // "회원가입 실패" 등
        }
    }


    // ===== 화면(JSX) =====
    return (
        <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
            <div className="w-full max-w-[420px] rounded-lg bg-black/75 p-10">
                <h1 className="mb-6 text-3xl font-bold">회원가입</h1>

                {/* onSubmit={handleSubmit}: 폼 안에서 submit 버튼 누르거나 Enter 치면 실행 */}
                <form className="space-y-3" onSubmit={handleSubmit}>

                    {/* 이메일 입력 */}
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}                                  // 현재 상태값을 입력창에 보여줌
                        onChange={(e) => setEmail(e.target.value)}     // 사용자가 글자 칠 때마다 상태 업데이트
                        required                                       // HTML 기본 검증 (빈 값이면 제출 안됨)
                        className="w-full px-4 py-3 rounded bg-gray-800 text-white"
                    />

                    {/* 비밀번호 입력 */}
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded bg-gray-800 text-white"
                    />

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition-colors"
                    >
                        회원가입
                    </button>
                </form>

                {/* 로그인 페이지로 가는 링크 */}
                <p className="mt-6 text-sm text-gray-400">
                    이미 계정이 있나요?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-white hover:underline"
                    >
                        로그인
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Signup
