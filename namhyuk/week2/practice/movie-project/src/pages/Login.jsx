import { useState } from "react"; // 리액트 상태
import { Link, useNavigate } from "react-router-dom"; // 페이지 이동
import { loginAPI } from "../apis/authApi"; // 로그인 API 함수
import useAuthStore from "../stores/useAuthStore"; // zustand 인증 상태 관리 스토어

const Login = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const navigate = useNavigate();

  // 입력값을 하나로
  const [username, setUsername] = useState(""); // 아이디(사용자 이름) 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [errorMessage, setErrorMessage] = useState(""); // 로그인 실패 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기능 동작 방지(페이지 새로고침 방지)
    setErrorMessage("");

    if (!username.trim()) {
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const tokens = await loginAPI({ username, password });

      setTokens(tokens); // 토큰저장
      alert("로그인 성공");
      console.log("발급된 토큰 : ", tokens.accessToken);

      navigate("/"); // 로그인 성공 후 홈페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] rounded-lg bg-black/75 p-10">
        <h1 className="mb-6 text-3xl font-bold">로그인</h1>

        {/* 로그인 폼 handlesubmit 만들어야함*/}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 w-full rounded bg-zinc-800 px-4 text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded bg-zinc-800 px-4 text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-600"
          />

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="mt-1 h-12 w-full rounded bg-red-600 text-base font-bold hover:bg-red-700 transition"
          >
            로그인하기
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          아직 계정이 없나요?{" "}
          <Link to="/signup" className="text-white hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;