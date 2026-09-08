import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { getDateDifferenceFromNow } from "../utils";
import { Avatar } from "./Avatar";
import { startTransition, useOptimistic, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchData from "../hooks/useFetchData";
import PostMenu from "./Post/PostMenu";
import { toast } from "react-toastify";
import AddComment from "./comment/AddComment";
import type { Auth, Post } from "../utils/types";
export function PostCard({ post }: { post: Post }) {
    const { auth } = useAuth() as {
        auth: { user: Auth["user"] };
    };
    const { ActionLike } = useFetchData();
    const queryClient = useQueryClient();
    const [showMenu, setShowMenu] = useState(false);
    const { mutate, isPending } = useMutation({
        mutationFn: ActionLike,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setLiked((prev: boolean) => !prev);
        },
    });
    const [liked, setLiked] = useState(
        post?.likes.some((like) => like?._id === auth?.user?._id),
    );
    const [optimisticLike, setOPtimisticLike] = useOptimistic(liked);
    //handlers---------------------------------------------
    const handleShareBtn = async () => {
        const url = `${window.location.href}${"post/" + post?._id}`;
        // const url = `${window.location.href}${
        //     params?.postId ? "" : "post/" + postId
        // }`;
        await navigator.clipboard.writeText(url);
        toast("Post link copied in clipboard", {
            position: "top-center",
            theme: "dark",
        });
    };

    //like
    const handleLike = () => {
        if (!auth?.user) {
            toast("Please login to like the post", {
                position: "top-center",
                theme: "dark",
            });
            return;
        }
        startTransition(async () => {
            setOPtimisticLike((prev: boolean) => !prev);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            mutate(post._id);
        });
    };

    return (
        <article className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur">
            <header className="flex items-center gap-3 px-5 py-4">
                <Avatar
                    name={post?.name}
                    image={post?.avatar}
                    size="sm"
                    userId={post?.author?._id}
                />
                <div className="min-w-0">
                    <Link
                        to={`/profile/${post?.author?._id}`}
                        className="truncate text-sm font-bold"
                    >
                        {post?.author?.name}{" "}
                        <span className="font-normal text-slate-400">
                            @{post?.author?.name.split(" ")[0].toLowerCase()}
                        </span>
                    </Link>
                    <p className="text-xs text-slate-400">
                        {getDateDifferenceFromNow(post?.createdAt)}
                    </p>
                </div>
                {post?.author?._id === auth?.user?._id && (
                    <div className="relative ml-auto">
                        <button
                            type="button"
                            onClick={() => setShowMenu((previous) => !previous)}
                            className="text-xl text-slate-400"
                            aria-label="Open post menu"
                            aria-expanded={showMenu}
                        >
                            •••
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 top-full z-10 mt-2 flex min-w-max flex-col rounded-lg bg-white p-2 shadow-lg">
                                <PostMenu postId={post?._id} />
                            </div>
                        )}
                    </div>
                )}
            </header>
            <Link to={`/post/${post._id}`}>
                <img
                    src={post?.image}
                    alt="Post visual"
                    className="aspect-[4/3] w-full object-cover"
                />
            </Link>
            <div className="px-5 py-4">
                <div className="flex items-center gap-3 text-xl">
                    <button onClick={handleLike} disabled={isPending}>
                        {optimisticLike ?
                            <Liked />
                        :   <Unlike />}
                    </button>
                    {/* <button>◌</button> */}
                    <button onClick={handleShareBtn}>↗</button>
                    {/* <button className="ml-auto">♧</button> */}
                </div>
                <p className="mt-3 text-sm font-bold">
                    {post.likesCount} likes
                </p>
                <p className="mt-1 text-sm leading-6">
                    <span className="font-bold">{post?.name}</span>{" "}
                    {post.caption}
                </p>
                <Link
                    to={`/post/${post._id}`}
                    className="mt-2 text-sm text-slate-400"
                >
                    View all comments
                </Link>
            </div>
            {/* add comment */}
            <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3">
                <AddComment postId={post._id} />
            </div>
        </article>
    );
}

export function Unlike() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}
export function Liked() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-red-600"
            fill="red"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}
