import { Avatar } from "./Avatar";

const stories = [
  ["Your story", "Maya", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"],
  ["Aisha", "Aisha", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"],
  ["Nico", "Nico", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"],
  ["Sara", "Sara", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"],
  ["Leo", "Leo", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"],
];

export function StoryStrip() {
  return <div className="flex gap-4 overflow-x-auto pb-2">{stories.map(([label, name, image], index) => <button key={label} className="grid min-w-16 place-items-center gap-2 text-center"><Avatar name={name} image={image} size="lg" ring={index !== 0} /><span className="max-w-16 truncate text-xs font-semibold text-slate-600">{label}</span></button>)}</div>;
}
