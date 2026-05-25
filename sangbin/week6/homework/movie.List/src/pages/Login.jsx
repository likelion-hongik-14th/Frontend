import { useState } from 'react' // 리액트 상태 축
import { useNavigate} from 'react-router-dom' // 라우터네비게이션  축
import { loginAPI } from '../apis/authApi' // 로그인 API 함수 가져오기
import useAuthStore from '../stores/useAuthStore' // 인증 상태 관리 훅 가져오기


const Login = () => {

    const setAccessToken = useAuthStore((state) => state.setAccessToken) // 인증 상태 관리 훅에서 setAccessToken 함수 가져오기
    const Navigate = useNavigate() // 라우터 네비게이션 훅 사용

    const [username, setUsername] = useState('') // 사용자 이름 상태 축
    const [password, setPassword] = useState('') // 비밀번호 상태 축

const handleSubmit = async (e) => {
    e.preventDefault() // 폼 제출 기본 동작(페이지새로고침) 방지

    const accessToken = await loginAPI( {username, password }) // 로그인 API 호출하여 accessToken 받기

    setAccessToken(accessToken) // 인증 상태 관리 훅에 accessToken 설정

    alert('로그인 성공') // 로그인 성공 알림
    console.log("발급된 토큰:", accessToken) // 발급된 토큰 콘솔에 출력

    Navigate('/',{replace:true}) // 로그인 성공 후 홈 페이지로 이동
}

    return (
        <div className = "min-h-screen bg-[#141414] text-white flex items-center justify-center text-3xl font-bold">
        <div className = "w-full max-w-[420px] rounded-lg bg-black75 p-10">
        <h1 className = "mb-6 text-3xl font-bold">로그인</h1>

            <form className = "space-y-3" onSubmit={handleSubmit}>
                <input type = "text" placeholder = "아이디" value={username} onChange={(e)=> setUsername(e.target.value)}></input>
            <input type = "password" placeholder = "비밀번호" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
            <button className = "w-full bg-red-600 py-3 rounded-lg font-bold">로그인</button>
                
            </form>
            
        
            </div>
        </div>
    )
}

export default Login