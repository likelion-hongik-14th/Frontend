import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const saveContentAPI = async (show, accessToken) => {
    const { data } = await axios.post(
        `${BASE_URL}/api/contents`,
        {
            id: show.id,
            name: show.name,
            image: {
                medium: show.image?.medium || '',
            },
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
    return data
}

export const getContentsAPI = async (accessToken) => {
    const { data } = await axios.get(
        `${BASE_URL}/api/contents`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
    return data
}
