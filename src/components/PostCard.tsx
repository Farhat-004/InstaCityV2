import { Avatar } from "./Avatar";

export type Post = { author: string; handle: string; avatar: string; image: string; caption: string; likes: string; time: string; };

export function PostCard({ post }: { post: Post }) {
  return <article className="overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-sm backdrop-blur"><header className="flex items-center gap-3 px-5 py-4"><Avatar name={post.author} image={post.avatar} size="sm" /><div className="min-w-0"><p className="truncate text-sm font-bold">{post.author} <span className="font-normal text-slate-400">{post.handle}</span></p><p className="text-xs text-slate-400">{post.time}</p></div><button className="ml-auto text-xl text-slate-400">•••</button></header><img src={post.image} alt="Post visual" className="aspect-[4/3] w-full object-cover" /><div className="px-5 py-4"><div className="flex items-center gap-3 text-xl"><button>♡</button><button>◌</button><button>↗</button><button className="ml-auto">♧</button></div><p className="mt-3 text-sm font-bold">{post.likes} likes</p><p className="mt-1 text-sm leading-6"><span className="font-bold">{post.author}</span> {post.caption}</p><button className="mt-2 text-sm text-slate-400">View all comments</button></div></article>;
}
