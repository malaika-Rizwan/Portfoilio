"use client";

import Image from "next/image";
import Link from "next/link";

const GITHUB_URL = "https://github.com/malaika-rizwan";

export default function GitHubCornerIcon() {
  return (
    <Link
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
      aria-label="GitHub profile"
    >
      <Image
        src="/github-char.png"
        alt="GitHub"
        width={32}
        height={32}
        className="object-contain w-8 h-8 brightness-0 invert"
      />
    </Link>
  );
}
