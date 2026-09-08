import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useFetchData from "../hooks/useFetchData";
import usePostData from "../hooks/usePostData";

const EditPost = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { fetchPostById } = useFetchData();
    const [isImageChanged, setIsImageChanged] = useState(false);
    const { editPost: editPostMutation } = usePostData();
    const { data: post } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId!),
    });
    const [editPost, setEditPost] = useState<{
        caption: string;
        image: string | File;
    } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const currentEditPost = editPost ?? {
        caption: post?.caption || "",
        image: post?.image || "",
    };

    const { mutate } = useMutation({
        mutationFn: () =>
            editPostMutation(
                postId!,
                {
                    caption: currentEditPost.caption,
                    image: currentEditPost.image,
                },
                isImageChanged,
            ),
        onSuccess: () => {
            toast.success("Post updated successfully!", {
                position: "top-center",
                autoClose: 3000,
            });
            navigate(`/`);
        },
        onError: () => {
            toast.error("Failed to update the post.", {
                position: "top-center",
                autoClose: 3000,
            });
        },
    });

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setEditPost({
            ...currentEditPost,
            image: file,
        });
        setIsImageChanged(true);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleEditPost = () => {
        if (!currentEditPost.caption.trim()) {
            toast.error("Caption cannot be empty.", {
                position: "top-center",
            });
            return;
        }
        if (!currentEditPost.image) {
            toast.error("Please select an image.", {
                position: "top-center",
            });
            return;
        }
        mutate();
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight">
                        Edit post
                    </h1>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="caption"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Caption
                                </label>
                                <textarea
                                    id="caption"
                                    rows={5}
                                    value={currentEditPost.caption}
                                    maxLength={2000}
                                    onChange={(event) =>
                                        setEditPost({
                                            ...currentEditPost,
                                            caption: event.target.value,
                                        })
                                    }
                                    placeholder="Write a caption for your image..."
                                    className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                                <p className="mt-2 text-right text-xs text-gray-400">
                                    {currentEditPost.caption.length} / 2,000
                                    characters
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Current image
                                </label>
                                <img
                                    src={
                                        imagePreview ??
                                        (post?.image as string) ??
                                        "https://placehold.co/1200x675?text=Current+image"
                                    }
                                    alt="Current post"
                                    className="aspect-video w-full rounded-xl object-cover"
                                    onError={(event) => {
                                        event.currentTarget.src =
                                            "https://placehold.co/1200x675?text=Current+image";
                                    }}
                                />
                                <label className="mt-3  inline-block cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                                    Choose a new image
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handleImageChange}
                                        className="sr-only bg-primary"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleEditPost}
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                            >
                                Save changes
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default EditPost;
