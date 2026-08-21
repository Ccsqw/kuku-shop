import { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kuku Shop",
  description: "Kuku Shop is a shop for kuku",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">{children}</body>
    </html>
  );
}
