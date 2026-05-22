import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getContentsAPI = async (accessToken) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/contents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error("저장한 무비 조회 실패");
  }
};