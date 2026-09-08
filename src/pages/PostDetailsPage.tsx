import { Link, useNavigate, useParams } from "react-router";
import { Avatar } from "../components/Avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchData from "../hooks/useFetchData";
import { getDateDifferenceFromNow } from "../utils";
import { useState } from "react";
import usePostRequest from "../hooks/usePostData";
import useAuth from "../hooks/useAuth";
import { Liked, Unlike } from "../components/PostCard";
import PostMenu from "../components/Post/PostMenu";
import Comment from "../components/comment/Comment";
import AddComment from "../components/comment/AddComment";
import { toast } from "react-toastify";
import type { Auth, Like, Post } from "../utils/types";
export function PostDetailsPage() {
    const { postId } = useParams();
    const { auth } = useAuth() as {
        auth: { user: Auth["user"] };
    };
    const { fetchPostById } = useFetchData();
    const { ActionLike } = usePostRequest();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showMenu, setShowMenu] = useState(false);

    //queries to post and fetch
    const { isLoading, data: post } = useQuery<Post>({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId!),
    });
    const [isLiked, setIsLiked] = useState(
        post?.likes.some((like: Like) => like?._id === auth?.user._id),
    );

    const { isPending: isLikeLoading, mutate: likePost } = useMutation({
        mutationFn: () => ActionLike(postId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            setIsLiked((prev) => !prev);
        },
        onError: (error) => {
            console.error("Error liking the post:", error.message);
        },
    });
    //handlers

    const handleShareBtn = async () => {
        const url = `${window.location.href}${"post/" + postId}`;

        await navigator.clipboard.writeText(url);
        alert("Post link copied in clipboard");
    };

    return (
        <div className="mx-auto max-w-5xl">
            <button
                onClick={() => navigate(-1)}
                className="mb-5 text-sm font-bold text-slate-500"
            >
                ← Back to feed
            </button>
            {isLoading ?
                <p>Loading...</p>
            :   <article className="overflow-hidden rounded-3xl border border-white bg-white/85 shadow-xl shadow-violet-100 lg:grid lg:grid-cols-[1.1fr_.9fr]">
                    <img
                        className="h-full min-h-80 w-full object-cover"
                        src={post?.image}
                        alt={post?.caption}
                    />
                    <div className="flex min-h-[580px] flex-col p-6">
                        <header className="flex items-center gap-3 border-b border-slate-100 pb-5">
                            <Avatar
                                name={post?.author?.name}
                                image={post?.author?.avatar}
                                userId={post?.author?._id}
                                size="sm"
                            />
                            <div>
                                <Link
                                    to={`/profile/${post?.author?._id}`}
                                    className="text-sm font-bold"
                                >
                                    {post?.author?.name}
                                </Link>
                                <p className="text-xs text-slate-400">
                                    @
                                    {post?.author?.name
                                        .split(" ")[0]
                                        .toLowerCase() || "username"}{" "}
                                    ·
                                    {getDateDifferenceFromNow(
                                        post?.createdAt ?? "",
                                    )}
                                </p>
                            </div>
                            {auth?.user?._id === post?.author?._id && (
                                <div className="relative ml-auto">
                                    {post?.author._id == auth?.user?._id && (
                                        <button
                                            onClick={() =>
                                                setShowMenu(!showMenu)
                                            }
                                            className="rounded-full px-2 text-lg leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                            aria-label="Post options"
                                        >
                                            •••
                                        </button>
                                    )}
                                    {showMenu && (
                                        <PostMenu postId={post?._id} />
                                    )}
                                </div>
                            )}
                        </header>
                        <div className="py-5 text-sm leading-6">
                            <span className="font-bold">
                                {post?.author?.name}
                            </span>{" "}
                            {post?.caption}
                            🌿
                        </div>
                        {/* //comments section */}
                        <div className="space-y-1">
                            {post?.commentsCount == 0 ?
                                <p className="text-sm text-slate-500">
                                    No Comments
                                </p>
                            :   <p className="text-sm text-slate-500">
                                    All Comments :
                                </p>
                            }
                            {post?.comments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    postId={post._id}
                                />
                            ))}
                        </div>
                        <div className="mt-auto border-t border-slate-100 pt-5">
                            <div className="flex gap-4 text-xl">
                                <button
                                    onClick={() => {
                                        if (!auth?.user) {
                                            toast(
                                                "Please login to like the post",
                                                {
                                                    position: "top-center",
                                                    theme: "dark",
                                                },
                                            );
                                            return;
                                        }
                                        likePost();
                                    }}
                                    disabled={isLikeLoading}
                                >
                                    {isLiked ?
                                        <Liked />
                                    :   <Unlike />}
                                </button>

                                <button
                                    onClick={handleShareBtn}
                                    className="rounded-lg bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                                >
                                    Share
                                </button>
                            </div>
                            <p className="mt-3 text-sm font-bold">
                                {post?.likesCount} likes
                            </p>
                            {/* Add Comment */}
                            <AddComment postId={post?._id} />
                        </div>
                    </div>
                </article>
            }
        </div>
    );
}
