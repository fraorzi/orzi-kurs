import Image from "next/image";

export function ProductHero({ src, alt }: { readonly src: string; readonly alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
