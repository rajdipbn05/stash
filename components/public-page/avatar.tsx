import Image from "next/image";

// Round profile photo. Shows the first letter of the name if there's no photo.
export function Avatar({
  name,
  url,
  size = 96,
}: {
  name: string;
  url: string | null;
  size?: number;
}) {
  if (!url) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-(--btn-bg) text-(--btn-text) font-semibold"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-hidden="true"
      >
        {name.trim().charAt(0).toUpperCase() || "?"}
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={name}
      width={size}
      height={size}
      // Our sample pictures are SVG drawings, which don't need resizing.
      unoptimized={url.endsWith(".svg")}
      className="rounded-full object-cover shadow-sm"
      style={{ width: size, height: size }}
      priority
    />
  );
}
