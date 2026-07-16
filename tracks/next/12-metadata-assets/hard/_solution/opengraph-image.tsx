import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      Produkt: {slug}
    </div>,
    size,
  );
}
