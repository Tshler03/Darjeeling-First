type FooterProps = {
  theme: "dark" | "light";
};

export default function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`px-6 py-6 text-sm
        ${isDark ? "bg-black text-zinc-400" : "bg-white text-zinc-600"}
      `}
    >
      © {new Date().getFullYear()} Mingma
    </footer>
  );
}
