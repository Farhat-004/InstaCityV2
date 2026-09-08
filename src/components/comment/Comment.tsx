import { useState } from "react";
import { Avatar } from "../Avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import usePostRequest from "../../hooks/usePostData";
import { Link } from "react-router";
import type { Auth, Comment } from "../../utils/types";

export default function Comment({
    comment,
    postId,
}: {
    comment: Comment;
    postId: string;
}) {
    const { auth } = useAuth() as {
        auth: { user: Auth["user"] };
    };
    const [showActions, setShowActions] = useState(false);
    const queryClient = useQueryClient();
    const { deleteComment } = usePostRequest();
    const { isPending, mutate } = useMutation({
        mutationFn: () => deleteComment(postId, comment?._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
        },
    });
    return (
        <div className="flex gap-3 border-b border-slate-100 py-3 last:border-b-0">
            <Avatar
                name={comment?.author?.name}
                image={comment?.author?.avatar}
                userId={comment?.author?._id}
                size="sm"
            />
            <div className="relative min-w-0 flex-1">
                <div className="absolute right-0 top-0">
                    {comment?.author?._id === auth?.user?._id && (
                        <button
                            type="button"
                            aria-label="Comment options"
                            aria-expanded={showActions}
                            onClick={() =>
                                setShowActions((visible) => !visible)
                            }
                            className="rounded-full px-2 py-1 text-sm font-bold leading-none tracking-widest text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        >
                            •••
                        </button>
                    )}
                    {showActions && (
                        <div className="absolute right-0 top-8 z-10 flex min-w-24 flex-col overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-lg shadow-slate-200/60">
                            <button
                                type="button"
                                className="px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => mutate()}
                                disabled={isPending}
                                className="px-3 py-2 text-left text-xs font-semibold text-red-500 transition hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-2.5 pr-10 text-sm leading-5 text-slate-700">
                    <div>
                        <Link
                            to={`/profile/${comment?.author?._id}`}
                            className="font-bold text-slate-900"
                        >
                            {comment?.author?.name}
                        </Link>
                        <br />
                        <span>{comment?.comment}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
