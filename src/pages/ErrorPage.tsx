import { useEffect } from "react";

export default function ErrorPage() {
    useEffect(() => {
        document.title = "Page not found | InstaCity";
    }, []);

    const goBack = () => {
        if (window.history.length > 1) window.history.back();
        else window.location.assign("/");
    };

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-indigo-950/40 backdrop-blur-xl sm:p-14">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

                    <div className="relative mx-auto max-w-xl">
                        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-3xl font-black shadow-lg shadow-indigo-500/25">
                            !
                        </div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                            Error 404
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            This page took a wrong turn.
                        </h1>
                        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-300">
                            The page you’re looking for may have moved, been
                            removed, or never existed in the first place.
                        </p>
                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => window.location.assign("/")}
                                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
                            >
                                Go to homepage
                            </button>
                            <button
                                type="button"
                                onClick={goBack}
                                className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                            >
                                Go back
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
