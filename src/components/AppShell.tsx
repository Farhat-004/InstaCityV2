import type { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";

const navigation = [
  ["⌂", "Home"], ["⌕", "Explore"], ["◉", "Reels"], ["✉", "Messages"], ["♡", "Notifications"], ["▣", "Saved"],
];

export function AppShell({ children, active = "Home" }: { children: ReactNode; active?: string }) {
  return (
    <div className="min-h-screen bg-[#f8f4ff] text-slate-800 selection:bg-fuchsia-200">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-fuchsia-200/60 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-100/90 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />
      </div>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/70 bg-white/70 px-5 py-7 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="mb-10 flex items-center gap-3 px-2"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-orange-400 text-xl text-white">✦</span><span className="font-serif text-2xl font-bold tracking-tight">mosaic</span></div>
        <nav className="space-y-2">
          {navigation.map(([icon, label]) => <button key={label} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold ${active === label ? "bg-slate-900 text-white shadow-lg shadow-slate-300" : "text-slate-600 hover:bg-white"}`}><Icon className={active === label ? "bg-white/10" : "bg-violet-50 text-violet-700"}>{icon}</Icon>{label}</button>)}
        </nav>
        <button className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-500 px-4 py-3 font-bold text-white shadow-lg shadow-rose-200">＋ Create post</button>
        <div className="mt-auto flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"><Avatar name="Maya" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" size="sm" /><div><p className="text-sm font-bold">Maya Morris</p><p className="text-xs text-slate-400">@mayamakes</p></div><span className="ml-auto text-slate-400">•••</span></div>
      </aside>
      <main className="mx-auto max-w-7xl px-4 py-5 lg:ml-64 lg:px-8 lg:py-8">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-2xl border border-white/70 bg-white/85 p-2 shadow-xl backdrop-blur-lg lg:hidden">{[["⌂", "Home"], ["⌕", "Explore"], ["＋", "Create"], ["♡", "Likes"], ["◉", "Profile"]].map(([icon, label]) => <button key={label} className="grid place-items-center gap-0.5 rounded-xl px-3 py-1 text-xs font-medium text-slate-500"><span className="text-lg">{icon}</span>{label}</button>)}</nav>
    </div>
  );
}
