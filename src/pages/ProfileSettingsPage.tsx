import { useContext } from "react";
import { Avatar } from "../components/Avatar";
import { PageHeader } from "../components/PageHeader";
import { AuthContext } from "../contexts/index";
import useAxios from "../hooks/useAxios";
import { uploadImageToCloudinary } from "../utils";
import { useMutation } from "@tanstack/react-query";
export function ProfileSettingsPage() {
    const { auth } = useContext(AuthContext);
    const api = useAxios();
    const user = auth?.user;
    // const queryClient = useMutation();
    const handleSubmit = async (formData: FormData) => {
        const newData = {
            name: formData.get("name"),
            bio: formData.get("bio"),
            website: "not implemented yet",
            gender: "not implemented yet",
        };
        try {
            const data = await api.patch(
                `${import.meta.env.VITE_BACKEND_URL}/users/me`,
                newData,
            );
            if (data) {
                alert("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    const { mutate } = useMutation({
        mutationFn: (formData: FormData) => handleSubmit(formData),
        onSuccess: () => {
            alert("Profile updated successfully");
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
        },
    });
    // handlers
    const handleImageChange = async (
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
        if (
            !confirm(
                `Are you sure you want to change your profile picture to ${fileData.name}?`,
            )
        ) {
            return;
        }
        //upload to cloudinary
        const result = await uploadImageToCloudinary(fileData);
        // update user profile with new image url
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_BACKEND_URL}/users/me/avatar`,
                { avatar: result },
            );
            if (response.status == 200) {
                alert("Your avatar has been updated");
                // setUserAvatar(response?.data?.user?.avatar);
                // toast.success("Your avatar has been updated", {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: false,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     transition: Bounce,
                // });
            }
        } catch (error) {
            console.error("Error updating avatar:", error);
            // toast.error(error?.response?.data?.message, {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //     transition: Bounce,
            // });
        }
    };
    return (
        <div className="mx-auto max-w-3xl rounded-[32px] bg-gradient-to-br from-violet-50 via-white to-sky-50 p-4 sm:p-6">
            <PageHeader
                eyebrow="Account"
                title="Profile settings"
                description="Make your corner of Mosaic feel like home."
            />
            <section className="overflow-hidden rounded-[28px] border border-violet-100 bg-white/90 p-5 shadow-[0_20px_60px_-30px_rgba(124,58,237,0.4)] sm:p-8">
                <div className="flex items-center gap-5 border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-sky-50 px-2 pb-7 pt-1">
                    <Avatar
                        name={user?.name || "User"}
                        userId={user?._id}
                        image={
                            user?.avatar ||
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
                        }
                        size="xl"
                    />
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {user?.name || "User"}
                        </h2>
                        <p className="text-sm text-violet-500">
                            {user?.name || "@user"}
                        </p>
                        {/* Input for image change */}
                        <input type="file" accept="image/*" hidden={true} />
                        <button
                            onClick={handleImageChange}
                            className="mt-3 rounded-xl bg-gradient-to-r from-violet-100 to-fuchsia-100 px-4 py-2 text-sm font-bold text-violet-700 transition hover:from-violet-200 hover:to-fuchsia-200"
                        >
                            Change photo
                        </button>
                    </div>
                </div>
                {/* form starts here */}
                <form
                    className="space-y-5 py-7"
                    action={() =>
                        mutate(new FormData(document.querySelector("form")!))
                    }
                >
                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-violet-700">
                            Name
                        </span>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.name || "User"}
                            className="w-full rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50/70 via-white to-sky-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-violet-700">
                            Bio
                        </span>
                        <textarea
                            rows={4}
                            name="bio"
                            defaultValue={user?.bio || ""}
                            placeholder="Tell us a little about yourself"
                            className="w-full resize-none rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50/70 via-white to-sky-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                    </label>
                    {/* button */}
                    <div className="flex justify-end gap-3 rounded-2xl bg-gradient-to-r from-slate-50 via-violet-50 to-sky-50 px-3 py-3">
                        <button
                            type="submit"
                            className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:brightness-110"
                        >
                            Save changes
                        </button>
                    </div>
                    {/* <label className="block">
                        <span className="mb-2 block text-sm font-bold text-violet-700">
                            Password
                        </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            className="w-full rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50/70 via-white to-sky-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                    </label>
// changing password will be implemented later
                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-violet-700">
                            Confirm password
                        </span>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            className="w-full rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50/70 via-white to-sky-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                    </label> */}
                </form>
            </section>
        </div>
    );
}

// image handler reference: https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle
// saving for future need
