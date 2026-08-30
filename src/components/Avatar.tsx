type AvatarProps = {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: boolean;
};

const sizes = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm", lg: "h-16 w-16 text-lg", xl: "h-28 w-28 text-3xl" };

export function Avatar({ name, image, size = "md", ring = false }: AvatarProps) {
  return (
    <div className={`shrink-0 rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-400 to-amber-300 p-[2px] ${ring ? "" : "bg-none p-0"}`}>
      {image ? (
        <img className={`${sizes[size]} rounded-full object-cover ${ring ? "border-2 border-white" : ""}`} src={image} alt={name} />
      ) : (
        <span className={`${sizes[size]} grid place-items-center rounded-full bg-violet-600 font-bold text-white`}>{name.slice(0, 1)}</span>
      )}
    </div>
  );
}
