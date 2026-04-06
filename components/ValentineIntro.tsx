"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  emoji: string;
};

const EMOJIS = ["💗", "💖", "🐱", "🐶", "🐰"];

export default function ValentineIntro({ onYes }: { onYes: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    setParticles(
      Array.from({ length: 28 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: -0.04,
        size: Math.random() * 24 + 44,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }))
    );
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const tick = () => {
      setParticles((prev) =>
        prev.map((p) => {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;

          if (d < 160) {
            p.vx += (dx / d) * 0.1;
            p.vy += (dy / d) * 0.1;
          }

          p.x += p.vx;
          p.y += p.vy - 0.03;

          p.vx *= 0.92;
          p.vy *= 0.92;

          if (p.y < -80) p.y = window.innerHeight + 80;
          if (p.x < -80) p.x = window.innerWidth + 80;
          if (p.x > window.innerWidth + 80) p.x = -80;

          return { ...p };
        })
      );

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#ffd6ea 0%,#ff9ecb 50%,#ff6fa8 100%)",
      }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            fontSize: p.size,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 6px white)",
          }}
        >
          {p.emoji}
        </span>
      ))}

      <div style={{ textAlign: "center", zIndex: 10 }}>

        <div style={{ marginBottom: 40 }} className="animate-float">
          <RedPanda3D />
        </div>

        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: 800,
            color: "white",
            textShadow: "0 8px 30px rgba(255,105,180,.9)",
            marginBottom: 32,
          }}
        >
          Will you be my Valentine? 💗
        </h1>

        <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>

          <button
            onClick={onYes}
            style={{
              padding: "14px 40px",
              borderRadius: 999,
              border: "none",
              fontSize: 18,
              fontWeight: 600,
              background: "white",
              color: "#ec4899",
              boxShadow: "0 10px 30px rgba(255,105,180,.6)",
              cursor: "pointer",
              transition: ".3s",
            }}
          >
            Yes 🥰
          </button>

          <NoButton />

        </div>
      </div>
    </main>
  );
}

function NoButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <button
      onMouseEnter={() =>
        setPos({
          x: Math.random() * 220 - 110,
          y: Math.random() * 160 - 80,
        })
      }
      style={{
        transform: `translate(${pos.x}px,${pos.y}px)`,
        padding: "14px 40px",
        borderRadius: 999,
        border: "none",
        fontSize: 18,
        fontWeight: 600,
        background: "#ec4899",
        color: "white",
        boxShadow: "0 10px 30px rgba(255,105,180,.6)",
        cursor: "pointer",
      }}
    >
      No 😢
    </button>
  );
}

function RedPanda3D() {
  return (
    <div className="panda3d">
      <div className="ear3d left"></div>
      <div className="ear3d right"></div>

      <div className="face3d">
        <div className="eye3d left"></div>
        <div className="eye3d right"></div>
        <div className="nose3d"></div>
      </div>

      <div className="shine"></div>
    </div>
  );
}
