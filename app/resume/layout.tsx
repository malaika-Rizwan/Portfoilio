import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résumé | Malaika Rizwan",
  description:
    "Résumé of Malaika Rizwan — Full-Stack Web Developer, BS Computer Science, Northern University Nowshera.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
