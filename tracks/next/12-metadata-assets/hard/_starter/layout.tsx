import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Script src="https://analytics.example/a.js" />
      </body>
    </html>
  );
}
