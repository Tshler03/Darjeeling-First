"use client";

import { useEffect, useRef, useState } from "react";

interface ScreenLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // ms — loader shows for at least this long even if site is ready
}

export default function ScreenLoader({
  onComplete,
  minDuration = 4800,
}: ScreenLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);

  // Animate SVG paths on mount
  useEffect(() => {
    const ridges = document.querySelectorAll<SVGPathElement>(".df-ridge");
    const mists = document.querySelectorAll<SVGPathElement>(".df-mist");

    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    function animatePath(
      el: SVGPathElement,
      duration: number,
      delay: number
    ) {
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);

      setTimeout(() => {
        let start: number | null = null;
        function step(ts: number) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          el.style.strokeDashoffset = String(len * (1 - ease(progress)));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }, delay);
    }

    ridges.forEach((r, i) => animatePath(r, 2200 + i * 300, 200 + i * 400));
    mists.forEach((m, i) => animatePath(m, 1800, 2800 + i * 300));

    // Wordmark fade-in
    const wordmark = document.getElementById("df-wordmark");
    if (wordmark) {
      setTimeout(() => {
        wordmark.style.transition = "opacity 1.4s ease";
        wordmark.style.opacity = "1";
      }, 3600);
    }
  }, []);

  // Exit: wait for minDuration + window load, then zoom-dissolve
  useEffect(() => {
    let siteReady = false;
    let timerDone = false;

    function tryExit() {
      if (!siteReady || !timerDone) return;
      setExiting(true);
      setTimeout(() => onComplete?.(), 900);
    }

    const timer = setTimeout(() => {
      timerDone = true;
      tryExit();
    }, minDuration);

    if (document.readyState === "complete") {
      siteReady = true;
    } else {
      window.addEventListener("load", () => {
        siteReady = true;
        tryExit();
      });
    }

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0804",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: exiting
          ? "transform 0.85s cubic-bezier(0.4,0,0.2,1), opacity 0.85s ease"
          : "none",
        transform: exiting ? "scale(1.18)" : "scale(1)",
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Mountain SVG */}
      <div style={{ width: "min(520px, 88vw)" }}>
        <svg
          viewBox="0 0 520 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Back ridge — faintest */}
          <path
            className="df-ridge"
            d="M0,170 C20,165 40,158 60,148 C80,138 90,130 110,118 C130,106 140,100 158,94 C176,88 182,86 196,80 C210,74 220,68 240,60 C260,52 272,58 286,66 C300,74 312,78 328,86 C344,94 354,100 372,110 C390,120 400,128 420,138 C440,148 460,156 480,163 C500,170 510,172 520,174"
            fill="none"
            stroke="rgba(180,145,55,0.18)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mid ridge */}
          <path
            className="df-ridge"
            d="M0,180 C30,174 55,165 80,152 C105,139 115,130 135,119 C155,108 168,102 185,95 C202,88 210,84 224,76 C238,68 250,60 268,50 C286,40 298,46 312,56 C326,66 336,74 354,84 C372,94 382,102 400,114 C418,126 432,136 455,148 C478,160 495,166 520,174"
            fill="none"
            stroke="rgba(180,145,55,0.38)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Front ridge */}
          <path
            className="df-ridge"
            d="M0,188 C25,182 50,173 75,160 C100,147 112,138 132,126 C152,114 165,106 182,98 C199,90 208,86 222,78 C236,70 246,64 262,53 C278,42 286,36 300,28 C314,20 326,26 338,36 C350,46 360,56 376,68 C392,80 404,90 422,102 C440,114 454,124 474,138 C494,152 506,160 520,168"
            fill="none"
            stroke="rgba(200,165,75,0.72)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Peak — brightest gold */}
          <path
            className="df-ridge"
            d="M220,90 C228,84 236,76 250,62 C264,48 272,38 284,28 C296,18 304,14 316,22 C328,30 336,40 350,54 C364,68 370,78 382,88"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mist layers */}
          <path
            className="df-mist"
            d="M0,155 C40,150 90,148 140,150 C190,152 220,154 270,152 C320,150 370,148 420,150 C470,152 500,154 520,155"
            fill="none"
            stroke="rgba(240,236,228,0.06)"
            strokeWidth="1"
          />
          <path
            className="df-mist"
            d="M0,165 C50,160 100,158 160,161 C220,164 260,163 310,161 C360,159 410,160 470,162 C490,163 510,163 520,163"
            fill="none"
            stroke="rgba(240,236,228,0.06)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div
        id="df-wordmark"
        style={{
          marginTop: "32px",
          textAlign: "center",
          opacity: 0,
          fontFamily: "Georgia, serif",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "clamp(12px, 3vw, 15px)",
            color: "rgba(200,168,76,0.85)",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.38em",
          }}
        >
          Darjeeling First
        </span>
        <span
          style={{
            display: "block",
            fontSize: "clamp(8px, 2vw, 10px)",
            color: "rgba(240,236,228,0.28)",
            letterSpacing: "0.65em",
            marginTop: "7px",
            textTransform: "uppercase",
          }}
        >
          Every Sunday
        </span>
      </div>
    </div>
  );
}
