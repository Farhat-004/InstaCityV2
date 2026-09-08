import { Link, useParams } from "react-router";
import { Avatar } from "../components/Avatar";
import { useQuery } from "@tanstack/react-query";
import useFetchData from "../hooks/useFetchData";
import { AuthContext } from "../contexts";
import { useContext } from "react";

const photos = [
    "photo-1497250681960-ef046c08a56e",
    "photo-1500534623283-312aade485b7",
    "photo-1470770841072-f978cf4d019e",
    "photo-1510414842594-a61c69b5ae57",
    "photo-1473445361085-b9a07f55608b",
    "photo-1523413651479-597eb2da0ad6",
];

export function ProfileLayout() {
    const { userId } = useParams();
    const { fetchCurrentUser } = useFetchData();
    const { auth } = useContext(AuthContext);

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchCurrentUser(userId!),
    });
    return (
        <div className="mx-auto max-w-5xl">
            <section className="rounded-3xl border border-white bg-white/75 p-6 shadow-sm sm:p-9">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <Avatar
                        name={user?.name || "User Name"}
                        userId={user?._id}
                        image={
                            user?.avatar ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                        }
                        size="xl"
                    />
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="font-serif text-3xl font-bold">
                                {user?.name || "User Name"}
                            </h1>
                        </div>
                        {/* <p className="mt-1 text-sm text-slate-400">
                            {user?.username || "@aishajournal"}
                        </p> */}
                        <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">
                            {user?.bio || "Users Bio"}
                        </p>
                        <div className="mt-5 flex gap-6 text-sm">
                            <span>
                                <b>{user?.posts?.length || 0}</b> posts
                            </span>
                            <span>
                                <b>0</b> followers
                            </span>
                            <span>
                                <b>0</b> following
                            </span>
                        </div>
                    </div>
                    {/* <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">
                        Following
                    </button> */}
                    {auth?.user?._id == userId && (
                        <Link
                            to="/settings"
                            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
                        >
                            Edit Profile
                        </Link>
                    )}
                </div>
            </section>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo) => (
                    <img
                        key={photo}
                        className="aspect-square rounded-2xl object-cover shadow-sm"
                        src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=600&q=80`}
                        alt="Aisha's post"
                    />
                ))}
            </div>
        </div>
    );
}
