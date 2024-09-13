import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/fontawesome-free-6.5.2-web/css/all.min.css";
 
export const metadata: Metadata = {
  title: "Login page",
  description: "",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en" suppressHydrationWarning={true}>   
        {children} 
    </main>
  );
}
