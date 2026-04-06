"use client";

type Props = {
  theme: "dark" | "light";
};

export default function Work({ theme }: Props) {
  const isDark = theme === "dark";

  return (
    <section
      className={`py-32 transition-colors
        ${isDark ? "bg-black text-white" : "bg-white text-zinc-900"}
      `}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <h2 className="text-[clamp(3rem,8vw,8rem)] font-medium leading-none">
          Selected Work
        </h2>

        {/* Grid */}
        <div className="mt-20 grid gap-16 md:grid-cols-2 items-start">
          {/* LEFT IMAGE */}
          <div
            className="
              group
              relative
              h-[420px]
              overflow-hidden
              transition-all
              duration-300
              ease-out
              hover:-translate-y-1
              hover:scale-[1.015]
              hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)]
            "
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/11/16/16/41/web-1045994_1280.jpg"
              alt="Project 1"
              className="
                h-full
                w-full
                object-cover
                object-center
                transition-transform
                duration-300
                ease-out
                group-hover:scale-[1.03]
              "
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-10">
            <p
              className={`max-w-sm text-lg leading-relaxed
                ${isDark ? "text-zinc-300" : "text-zinc-600"}
              `}
            >
              This project is dedicated to the methodology behind crafting
              websites that push boundaries through curiosity, iteration, and
              experimentation.
            </p>

            <div
              className="
                group
                relative
                h-[420px]
                overflow-hidden
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1
                hover:scale-[1.015]
                hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)]
              "
            >
              <img
                src="https://i.pinimg.com/1200x/55/46/fe/5546feaf1958337ff0782baf18a73f0f.jpg"
                alt="Project 2"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-[1.03]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
