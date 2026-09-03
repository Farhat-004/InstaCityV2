import useAxios from "./useAxios";

const useFetchData = () => {
    const api = useAxios();
    //fetch current logged in users profile data
    const fetchCurrentUser = async (userId: string) => {
        const response = await api.get(
            `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        );
        const data = response.data;
        return data;
    };
    const fetchPostById = async (postId: string) => {
        const response = await api.get(
            `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
        );
        const data = response.data;
        return data;
    };
    return { fetchCurrentUser, fetchPostById };
};

export default useFetchData;
