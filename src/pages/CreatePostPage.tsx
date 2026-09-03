import { useContext, useState } from "react";
import ForceLogin from "../components/ForceLogin";
import { PageHeader } from "../components/PageHeader";
import { AuthContext } from "../contexts";
import { uploadImageToCloudinary } from "../utils";
import useAxios from "../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export default function CreatePostPage() {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const api = useAxios();
    const navigate = useNavigate();
    const { isPending, mutate } = useMutation({
        mutationFn: handlePost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
            navigate("/");
        },
    });

    //states
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [post, setPost] = useState<{ caption: string; image: File | null }>({
        caption: "",
        image: null,
    });
    if (!auth) {
        return <ForceLogin />;
    }

    //handlers
    const handleImageUpload = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault();
        const pickerOpts = {
            types: [
                {
                    description: "Images",
                    accept: {
                        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                    },
                },
            ],
            multiple: false,
        };
        const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
        const fileData = await fileHandle.getFile();

        setPost((previousPost) => ({
            ...previousPost,
            image: fileData,
        }));
        setImageURL(URL.createObjectURL(fileData));
        console.log("Selected file:", fileData);
    };

    async function handlePost() {
        if (!post.image) {
            throw new Error("Please select an image for your post.");
        }
        const uploadedImageUrl = await uploadImageToCloudinary(post.image);
        const response = await api.post(
            `${import.meta.env.VITE_BACKEND_URL}/posts`,
            {
                caption: post.caption,
                image: uploadedImageUrl,
            },
        );
        console.log("Post created successfully:", response.data);
        setPost({ caption: "", image: null });
        setImageURL(null);
        return response.data;
    }
    return (
        <div className="mx-auto max-w-4xl">
            <PageHeader
                eyebrow="Share something"
                title="Create a new post"
                description="Your visual story is waiting to be told."
            />
            <section className="grid overflow-hidden rounded-3xl border border-white bg-white/85 shadow-sm md:grid-cols-2">
                {post.image && imageURL ?
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-100 p-8">
                        <img
                            src={imageURL}
                            alt="Post Image"
                            className="w-9/12 h-9/12"
                        />
                        <button
                            onClick={handleImageUpload}
                            className="mt-2 text-sm"
                        >
                            <u>Change image</u>
                        </button>
                    </div>
                :   <div className="grid min-h-80 place-items-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-100 p-8 gap-y-4-3">
                        <div className="grid h-48 w-full max-w-xs place-items-center rounded-3xl border-2 border-dashed border-violet-300 bg-white/60 text-center">
                            <div>
                                <span className="text-3xl">↑</span>
                                <p className="mt-2 text-sm font-bold">
                                    Drop your photo here
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    JPG, PNG or WEBP
                                </p>
                            </div>
                        </div>
                        <p>or</p>
                        <div className="grid h-24 w-full max-w-xs place-items-center rounded-3xl border-2 border-dashed border-violet-300 bg-white/60 text-center">
                            <div>
                                <button
                                    onClick={handleImageUpload}
                                    className="mt-2 text-sm font-bold"
                                >
                                    <u>Browse your picture</u>
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="p-6 sm:p-8">
                    <label className="block">
                        <span className="mb-2 block text-sm font-bold">
                            Caption
                        </span>
                        <textarea
                            placeholder="Write something lovely…"
                            rows={6}
                            value={post.caption}
                            onChange={(e) =>
                                setPost((prev) => ({
                                    ...prev,
                                    caption: e.target.value,
                                }))
                            }
                            className="w-full resize-none rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-200"
                        />
                    </label>
                    {/* <label className="mt-5 block">
                        <span className="mb-2 block text-sm font-bold">
                            Location{" "}
                            <em className="font-normal text-slate-400">
                                (optional)
                            </em>
                        </span>
                        <input
                            placeholder="Add a location"
                            className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                        />
                    </label> */}
                    <div className="mt-7 flex justify-end gap-3">
                        {/* <button className="rounded-xl px-4 py-3 text-sm font-bold text-slate-500">
                            Save draft
                        </button> */}
                        <button
                            onClick={() => mutate()}
                            disabled={isPending}
                            className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500 px-5 py-3 text-sm font-bold text-white"
                        >
                            {isPending ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
