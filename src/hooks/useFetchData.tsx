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
    const ActionLike = async (postId: string) => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/like`,
            );
            if (response.status !== 200) {
                console.error("Failed to like the post");
            }
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };
    return { fetchCurrentUser, fetchPostById, ActionLike };
};

export default useFetchData;
