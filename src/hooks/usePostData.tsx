import { uploadImageToCloudinary } from "../utils";
import useAxios from "./useAxios";
//this hook is just to make post requests
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
    const deleteComment = async (postId: string, commentId: string) => {
        try {
            const response = await api.delete(
                `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comment/${commentId}`,
            );
            if (response.status !== 200) {
                console.error("Failed to delete the comment");
            }
        } catch (error) {
            console.error("Error deleting the comment   :", error);
        }
    };
    const deletePost = async (postId: string) => {
        try {
            const response = await api.delete(
                `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
            );
            if (response.status === 200) {
                return response;
            } else {
                console.error("Failed to delete the post");
            }
        } catch (error) {
            console.error("Error deleting the post   :", error);
        }
    };
    const editPost = async (
        postId: string,
        updatedPost: { caption: string; image?: File | string },
        isImageChanged: boolean = false,
    ) => {
        const { image } = updatedPost;
        if (image && isImageChanged && typeof image !== "string") {
            const newImageUrl = await uploadImageToCloudinary(image);
            updatedPost.image = newImageUrl;
        }
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
                updatedPost,
            );
            if (response.status === 200) {
                return response;
            } else {
                console.error("Failed to update the post");
            }
        } catch (error) {
            console.error("Error updating the post   :", error);
        }
    };
    return { addComment, ActionLike, deleteComment, deletePost, editPost };
};

export default usePostRequest;
