"use client";

import { usePathname } from "next/navigation";
import HomeHeader from "./HomeHeader";
import Navbar from "./Navbar";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return isHome ? <HomeHeader /> : <Navbar />;
}
