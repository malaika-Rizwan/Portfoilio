import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import PurpleBackground from "@/components/PurpleBackground";
import { LenisProvider } from "@/components/LenisProvider";
import GitHubCornerIcon from "@/components/GitHubCornerIcon";
import ScrollIndicator from "@/components/ScrollIndicator";

export const metadata: Metadata = {
  title: "Malaika Rizwan | Full Stack Developer",
  description:
    "Full Stack Developer specializing in Next.js & MERN. I build scalable, production-ready web applications with authentication, payment systems, and admin dashboards.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "MERN",
    "Malaika Rizwan",
    "Web Developer",
    "React",
    "MongoDB",
  ],
  openGraph: {
    title: "Malaika Rizwan | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js & MERN. Production-ready web applications.",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="min-h-screen font-sans relative bg-black">
        <LenisProvider>
          <PurpleBackground />
          <Header />
          <main className="relative z-10">{children}</main>
          <ScrollIndicator />
          <GitHubCornerIcon />
        </LenisProvider>
      </body>
    </html>
  );
}
