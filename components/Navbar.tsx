type NavbarProps = {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const isDark = theme === "dark";

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4
        ${isDark ? "bg-black text-white" : "bg-white text-zinc-900"}
      `}
    >
      <span className="font-medium">Mingma</span>

      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`rounded-full px-4 py-2 text-sm transition
          ${
            isDark
              ? "bg-white text-black hover:bg-zinc-200"
              : "bg-black text-white hover:bg-zinc-800"
          }
        `}
      >
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    </nav>
  );
}
