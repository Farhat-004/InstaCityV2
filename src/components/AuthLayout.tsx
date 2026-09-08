import type { ReactNode } from "react";

export function AuthLayout({
    children,
    title,
    subtitle,
}: {
    children: ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <main className="grid min-h-screen place-items-center overflow-hidden bg-[#f8f4ff] px-4 py-10 text-slate-800">
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-fuchsia-300/50 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-200/60 blur-3xl" />
            <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-2xl shadow-violet-200/50 backdrop-blur-lg md:grid-cols-[.9fr_1.1fr]">
                <div className="hidden min-h-[620px] flex-col justify-between bg-gradient-to-br from-slate-950 via-violet-950 to-fuchsia-800 p-10 text-white md:flex">
                    <div>
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-xl">
                            ✦
                        </span>
                        <p className="mt-8 max-w-xs font-serif text-4xl font-bold leading-tight">
                            A more colorful way to keep in touch.
                        </p>
                    </div>
                    <div>
                        <div className="flex -space-x-3">
                            {["🌺", "☀️", "🌿", "🎨"].map((item) => (
                                <span
                                    key={item}
                                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-violet-900 bg-white text-lg"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-violet-100">
                            Share the details that make up your every day, with
                            people who get it.
                        </p>
                    </div>
                </div>
                <div className="p-7 sm:p-12">
                    <div className="mb-10 flex items-center gap-3 md:hidden">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-orange-400 text-white">
                            ✦
                        </span>
                        <span className="font-serif text-2xl font-bold">
                            mosaic
                        </span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-600">
                        Welcome to mosaic
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-bold">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
                    {children}
                </div>
            </section>
        </main>
    );
}
