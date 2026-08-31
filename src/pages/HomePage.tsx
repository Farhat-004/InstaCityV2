import { PostCard, type Post } from "../components/PostCard";
import { StoryStrip } from "../components/StoryStrip";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../actions/fetch/script";
import { AuthContext } from "../contexts";
import { useContext } from "react";
import { Link } from "react-router";
import ForceLogin from "../components/ForceLogin";
import { formatLongDate } from "../actions/index";
const demoPosts: Post[] = [
    {
        author: "Aisha Rahman",
        handle: "@aishajournal",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85",
        caption: "A little corner of green makes the whole room exhale. 🌿",
        likes: "1,284",
        time: "32 minutes ago",
    },
    {
        author: "Nico Alvarez",
        handle: "@nico.sees",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1000&q=85",
        caption: "Find me where the map gets a little quieter.",
        likes: "824",
        time: "2 hours ago",
    },
];

export default function HomePage() {
    const { user: userData } = useContext(AuthContext);

    if (!userData) {
        return <ForceLogin />;
    }
    const user = userData.user;
    const {
        isPending,
        error,
        data: posts,
        isFetching,
        isLoading,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPosts(),
    });
    console.log("user", user);
    return (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,680px)_300px]">
            <section>
                <header className="mb-7 flex items-end justify-between">
                    <div>
                        <p className="text-sm font-semibold text-fuchsia-600">
                            {formatLongDate()}
                        </p>
                        <h1 className="font-serif text-3xl font-bold">
                            Good morning, {user?.name || "Friend"} ✦
                        </h1>
                    </div>
                    <button className="rounded-2xl bg-white px-4 py-2 text-sm font-bold shadow-sm">
                        ⌕ Search
                    </button>
                </header>
                <div className="mb-7 rounded-3xl border border-white bg-white/60 p-5 shadow-sm">
                    <StoryStrip />
                </div>
                <div className="space-y-7">
                    {demoPosts.map((post) => (
                        <PostCard key={post.author} post={post} />
                    ))}
                </div>
            </section>
            <HomeAside />
        </div>
    );
}

const HomeAside = () => {
    return (
        <aside className="hidden xl:block">
            <div className="sticky top-8 space-y-6">
                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
                    <p className="text-sm text-violet-200">
                        Your weekly moodboard
                    </p>
                    <p className="mt-2 font-serif text-2xl font-bold">
                        Make room for wonder.
                    </p>
                    <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900">
                        Explore picks
                    </button>
                </div>
                <div className="rounded-3xl border border-white bg-white/75 p-5">
                    <div className="mb-4 flex justify-between">
                        <h2 className="font-bold">Trending now</h2>
                        <button className="text-xs font-bold text-fuchsia-600">
                            See all
                        </button>
                    </div>
                    {["#slowmornings", "#madebyhand", "#urbanescape"].map(
                        (tag, i) => (
                            <div
                                key={tag}
                                className="flex justify-between py-3 text-sm"
                            >
                                <span className="font-semibold">{tag}</span>
                                <span className="text-slate-400">
                                    {24 - i * 3 + "k posts"}
                                </span>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </aside>
    );
};
