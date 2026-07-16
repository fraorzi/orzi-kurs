export const size = { width: 800, height: 400 };
export const contentType = "image/jpeg";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return <div>{(await params).slug}</div>;
}
