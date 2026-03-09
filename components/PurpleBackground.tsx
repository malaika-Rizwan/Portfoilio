"use client";

export default function PurpleBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-500/15 blur-3xl" />
      <div className="absolute top-[60%] right-[10%] w-80 h-80 rounded-full bg-purple-600/12 blur-3xl" />
      <div className="absolute bottom-[20%] left-[20%] w-48 h-48 rounded-full bg-purple-400/10 blur-3xl" />
      <div className="absolute top-[30%] right-[30%] w-40 h-40 rounded-full bg-purple-500/10 blur-2xl" />
      <div className="absolute top-[70%] left-[40%] w-56 h-56 rounded-full bg-purple-600/8 blur-3xl" />
    </div>
  );
}
