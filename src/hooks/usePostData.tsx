import useAxios from "./useAxios";

const usePostRequest = () => {
    const api = useAxios();

    const addComment = async (postId: string, text: string) => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comment`,
                { text },
            );
            return response.data;
        } catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    };
    return { addComment };
};

export default usePostRequest;
