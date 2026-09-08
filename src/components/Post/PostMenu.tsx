import { useQueryClient } from "@tanstack/react-query";
import usePostRequest from "../../hooks/usePostData";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

export default function PostMenu({ postId }: { postId: string | undefined }) {
    const { deletePost } = usePostRequest();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleDeletePost = async () => {
        if (!postId) {
            return;
        }
        try {
            const response = await deletePost(postId);
            if (response && response.status === 200) {
                queryClient.invalidateQueries({ queryKey: ["posts"] });
                queryClient.refetchQueries({ queryKey: ["posts"] });
                toast.success("Post deleted successfully", {
                    position: "top-center",
                });
                navigate("/");
            }
        } catch (error) {
            toast.error(`Error deleting the post: ${error}`, {
                position: "top-center",
            });
        }
    };
    return (
        <div className="absolute right-0 top-8 z-10 w-32 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">
            <Link
                to={`/edit-post/${postId}`}
                className="block w-full px-4 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            >
                Edit Post
            </Link>
            <button
                className="block w-full border-t border-slate-100 px-4 py-2.5 text-left text-xs font-medium text-red-500 transition hover:bg-red-50"
                onClick={handleDeletePost}
            >
                Delete Post
            </button>
        </div>
    );
}
