import { PostCard } from "../components/PostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../actions/fetch/script";
import { AuthContext } from "../contexts";
import { useContext, useEffect, useRef } from "react";
import { formatLongDate } from "../utils/index";
import { Link } from "react-router";
export default function HomePage() {
    const { auth } = useContext(AuthContext);
    const user = auth?.user;
    const pageSize = user ? 5 : 3;
    const audience = user?._id ?? "guest";
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteQuery({
        queryKey: ["posts", audience, pageSize],
        queryFn: ({ pageParam }) =>
            fetchPosts({ page: pageParam, limit: pageSize }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _pages, lastPageParam) =>
            user && lastPage.hasMore ? lastPageParam + 1 : undefined,
    });
    const posts = data?.pages.flatMap((page) => page.posts ?? []) ?? [];

    useEffect(() => {
        const target = loadMoreRef.current;
        if (!target || !hasNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetchingNextPage) {
                    void fetchNextPage();
                }
            },
            { rootMargin: "300px 0px", threshold: 0 },
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isPending) return <div>Loading posts...</div>;
    if (error) return <div>Unable to load posts.</div>;
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
                {/* <div className="mb-7 rounded-3xl border border-white bg-white/60 p-5 shadow-sm">
                    <StoryStrip />
                </div> */}
                <div className="space-y-7">
                    {posts?.map((post) => (
                        <PostCard key={post?._id} post={post} />
                    ))}
                    {hasNextPage && (
                        <div
                            ref={loadMoreRef}
                            className="py-4 text-center text-sm text-slate-400"
                        >
                            {isFetchingNextPage && "Loading more posts..."}
                        </div>
                    )}
                </div>
                {!user && (
                    <p className="mt-8 text-center text-sm text-slate-500">
                        <Link
                            to="/login"
                            className="font-semibold text-fuchsia-600 hover:underline"
                        >
                            Login to see more posts
                        </Link>
                    </p>
                )}
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
