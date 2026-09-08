import { useRef } from "react";
import usePostRequest from "../../hooks/usePostData";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Auth } from "../../utils/types";

export default function AddComment({ postId }: { postId: string | undefined }) {
    const { auth } = useAuth() as {
        auth: { user: Auth["user"] };
    };
    const commentRef = useRef<HTMLInputElement>(null);
    const { addComment } = usePostRequest();
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: () => addComment(postId!, commentRef.current?.value || ""),
        onSuccess: () => {
            if (commentRef.current) {
                commentRef.current.value = "";
            }
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
        },
        onError: (error) => {
            console.error("Error adding comment:", error.message);
        },
    });
    return (
        <div className="mt-4 flex gap-2">
            <input
                placeholder="Add a comment…"
                ref={commentRef}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (!auth?.user) {
                            toast("Please login to comment on the post", {
                                position: "top-center",
                                theme: "dark",
                            });
                            return;
                        }
                        mutate();
                    }
                }}
                className="min-w-0 flex-1 rounded-xl bg-slate-100 px-4 py-2.5 text-sm outline-none"
            />
            <button
                disabled={isPending}
                onClick={() => {
                    if (!auth?.user) {
                        toast("Please login to comment on the post", {
                            position: "top-center",
                            theme: "dark",
                        });
                        return;
                    }
                    mutate();
                }}
                className="rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-300"
            >
                Send
            </button>
        </div>
    );
}
