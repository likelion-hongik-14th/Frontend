import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const saveContentAPI = async ({ accessToken, show }) => {
  try {
    const body = {
      id: show.id,
      name: show.name,
      image: {
        medium: show.image?.medium || "",
      },
    };

    const { data } = await axios.post(`${BASE_URL}/api/contents`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.error("컨텐츠 저장 실패:", error);
    throw new Error("컨텐츠 저장 실패");
  }
};

export const getContentsAPI = async (accessToken) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/contents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.error("저장한 컨텐츠 조회 실패:", error);
    throw new Error("저장한 컨텐츠 조회 실패");
  }
};