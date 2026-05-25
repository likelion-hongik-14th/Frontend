import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "../apis/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signupAPI({ email, password });
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      setErrorMessage("회원가입에 실패했습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] rounded-lg bg-black/75 p-10">
        <h1 className="mb-6 text-3xl font-bold">회원가입</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded bg-zinc-800 px-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded bg-zinc-800 px-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className="h-12 w-full rounded bg-zinc-800 px-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="mt-2 h-12 w-full rounded bg-red-600 text-base font-bold hover:bg-red-700 transition"
          >
            회원가입하기
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="text-white hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;