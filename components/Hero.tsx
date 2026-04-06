"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  theme: "dark" | "light";
};

export default function Hero({ theme }: Props) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const total = rect.height - vh;
      const current = Math.min(Math.max(-rect.top, 0), total);

      setProgress(current / total);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[200vh]
        ${isDark ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center">
        <div className="relative space-y-4">
          {/* LINE 1 */}
          <LineReveal
            text="Creative websites are the"
            progress={progress}
            isDark={isDark}
          />

          {/* LINE 2 */}
          <LineReveal
            text="intersection of creativity"
            progress={progress}
            isDark={isDark}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- */

function LineReveal({
  text,
  progress,
  isDark,
}: {
  text: string;
  progress: number;
  isDark: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* TEXT */}
      <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-medium leading-tight">
        {text}
      </h1>

      {/* MASK */}
      <div
        className={`absolute inset-0
          ${isDark ? "bg-zinc-800" : "bg-zinc-200"}
        `}
        style={{
          transform: `translateX(${progress * 110}%)`,
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
}
