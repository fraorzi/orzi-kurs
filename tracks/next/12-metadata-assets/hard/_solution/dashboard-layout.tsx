import Script from "next/script";

export default function DashboardLayout({ children }: { readonly children: React.ReactNode }) {
  return <><section>{children}</section><Script
    id="dashboard-analytics"
    src="https://analytics.example/a.js"
    strategy="lazyOnload"
  /></>;
}
