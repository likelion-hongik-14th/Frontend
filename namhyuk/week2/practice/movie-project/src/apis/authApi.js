import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginAPI = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    });

    if (!data.accessToken || !data.refreshToken) {
      throw new Error("로그인 실패");
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("로그인 에러:", error);
    throw new Error("로그인 실패");
  }
};

export const signupAPI = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/auth/signup`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw new Error("회원가입 실패");
  }
};

export const logoutAPI = async (accessToken) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw new Error("로그아웃 실패");
  }
};

export const reissueAPI = async (refreshToken) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/auth/reissue`,
      refreshToken,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("토큰 재발급 에러:", error);
    throw new Error("토큰 재발급 실패");
  }
};