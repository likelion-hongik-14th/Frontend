import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [searchParams] = useSearchParams();

  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    const code = searchParmas.get("code");

    if (code) {
      // 카카오로부터 토큰 추출
      getTokenFromKakao(code);
    }
  }, [searchParams]);

  const getTokenFromKakao = async (code) => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", import.meta.env.VITE_KAKAO_API_KEY);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code", code);

    try {
      const response = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: params,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("카카오 토큰 발급 성공:", data);

        // 스토리지에 토큰 저장
        setAccessToken(data.access_token);

        // 메인으로 이동
        navigate("/", { replace: true });
      } else {
        const errorData = await response.json();
        console.error("카카오 에러 상세내역:", errorData);
        throw new Error("토큰 발급 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("로그인에 실패했습니다.");
      navigate("/login");
    }
  };
return (
  <div className="w-full h-screen flex items-center justify-center">
    <p className="text-lg font-medium text-gray-300">
      카카오 로그인 처리중입니다....
    </p>
  </div>

);

};

export default KakaoCallback;