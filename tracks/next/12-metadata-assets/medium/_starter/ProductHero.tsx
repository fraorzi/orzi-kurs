export function ProductHero({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return <img src={src} alt={alt} />;
}
