"use client";

type AboutProps = {
  theme: "dark" | "light";
};

export default function About({ theme }: AboutProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`min-h-screen flex items-center transition-colors duration-300
        ${isDark ? "bg-black text-white" : "bg-white text-zinc-900"}
      `}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p
          className={`text-3xl md:text-5xl leading-tight font-medium
            ${isDark ? "text-white" : "text-zinc-900"}
          `}
        >
          This project is dedicated to the methodology behind crafting websites
          that push boundaries. Our process values curiosity, iteration, and
          experimentation. We focus on creating digital experiences that feel
          intentional, considered, and built to leave a lasting impression.
        </p>
      </div>
    </section>
  );
}
