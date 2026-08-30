export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <header className="mb-7"><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-600">{eyebrow ?? "Mosaic"}</p><h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-slate-500">{description}</p>}</header>;
}
