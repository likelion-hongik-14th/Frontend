import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../apis/authApi";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const result = await signupAPI({ email, password });
      console.log("회원가입 응답:", result);
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[420px] rounded-lg p-10">
        <h1 className="mb-6 text-3xl font-bold">Signup</h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded border px-3 text-white"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded border px-3 text-white"
          />

          <button
            type="submit"
            className="mt-1 h-12 w-full rounded bg-blue-600 text-base font-bold text-white"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;