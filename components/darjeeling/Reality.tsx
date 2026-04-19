'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── SWAP WITH REAL PHOTOS WHEN ASSETS ARRIVE ────────────────────────────────
// All 5 verified real Darjeeling trash/pollution images — hotlink confirmed
// Slots 6 & 7 repeat strongest shots until Mingma sends more
const IMAGES = [
  {
    src: 'https://thedarjeelingchronicle.com/wp-content/uploads/2019/08/Darjeeling_Dumpyard1-1024x768.jpeg',
    location: 'Sookhiapokhri Dumpyard',
  },
  {
    src: 'https://thedarjeelingchronicle.com/wp-content/uploads/2019/08/Darjeeling_Dumpyard2.jpeg',
    location: 'Hillside, Darjeeling',
  },
  {
    src: 'https://thedarjeelingchronicle.com/wp-content/uploads/2020/10/Trash-Talking-Plastic-Waste.jpeg',
    location: 'Waste Ground, Lower Darjeeling',
  },
  {
    src: 'https://assets.telegraphindia.com/telegraph/2024/Sep/1725513081_new-project-13.jpg',
    location: 'Toy Train Track, Darjeeling',
  },
  {
    src: 'https://tse2.mm.bing.net/th/id/OIP.9ELXw98q0ieQFBmHo2owCgHaEo?pid=Api&P=0&h=180',
    location: 'Himalayan Slope, Darjeeling',
  },
  {
    src: 'https://thedarjeelingchronicle.com/wp-content/uploads/2020/10/Trash-Talking-Plastic-Waste.jpeg',
    location: 'Valley Dump, Darjeeling',
  },
  {
    src: 'https://thedarjeelingchronicle.com/wp-content/uploads/2019/08/Darjeeling_Dumpyard1-1024x768.jpeg',
    location: 'Dumpyard Outskirts, Darjeeling',
  },
]
// ────────────────────────────────────────────────────────────────────────────

export default function Reality() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const lastImageRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    const ctx = gsap.context(() => {
      const totalScrollLength = window.innerHeight * (IMAGES.length + 1.5)
      section.style.height = `${totalScrollLength}px`

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScrollLength}`,
          scrub: 1.2,
          pin: sticky,
        },
      })

      const unit = 1 / (IMAGES.length + 1.5)

      IMAGES.forEach((_, i) => {
        const el = imagesRef.current[i]
        if (!el) return
        const start = i * unit
        const end = (i + 1) * unit
        if (i === 0) {
          gsap.set(el, { opacity: 1 })
        } else {
          gsap.set(el, { opacity: 0 })
          tl.to(el, { opacity: 1, duration: 0.4 }, start)
        }
        if (i < IMAGES.length - 1) {
          tl.to(el, { opacity: 0, duration: 0.4 }, end - 0.05)
        }
      })

      const lastImg = lastImageRef.current
      const revealEl = revealRef.current
      const headlineEl = headlineRef.current

      if (lastImg && revealEl && headlineEl) {
        const zoomStart = (IMAGES.length - 1) * unit
        const zoomEnd = IMAGES.length * unit
        const revealStart = zoomEnd

        tl.to(
          lastImg,
          { scale: 0.55, opacity: 0.18, filter: 'blur(6px)', duration: 0.6, ease: 'power2.inOut' },
          zoomStart
        )
        tl.to(revealEl, { opacity: 1, duration: 0.5 }, zoomStart + 0.3)
        tl.fromTo(
          headlineEl.querySelectorAll('.line'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out' },
          revealStart
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="reality" style={{ position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#0a0a08',
        }}
      >
        {IMAGES.map((img, i) => {
          const isLast = i === IMAGES.length - 1
          return (
            <div
              key={i}
              ref={isLast ? lastImageRef : (el) => { imagesRef.current[i] = el }}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === 0 ? 1 : 0,
                willChange: 'opacity, transform',
              }}
            >
              <img
                src={img.src}
                alt={img.location}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(85%) brightness(0.55) contrast(1.1)',
                  transformOrigin: 'center center',
                  display: 'block',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '2.5rem',
                  left: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{ width: '2rem', height: '1px', background: '#c9a84c', opacity: 0.8 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {img.location}
                </span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2.5rem',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                }}
              >
                {String(i + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
              </div>
            </div>
          )
        })}

        {/* ── Text reveal — fires after last image zooms out ── */}
        <div
          ref={revealRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            padding: '2rem',
            zIndex: 10,
            background: 'rgba(0,0,0,0.45)',
          }}
        >
          <div ref={headlineRef} style={{ textAlign: 'center', maxWidth: '800px' }}>
            <div
              className="line"
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '0.2em',
              }}
            >
              The place you love
            </div>
            <div
              className="line"
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
              }}
            >
              is{' '}
              <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>disappearing.</span>
            </div>

            <div
              className="line"
              style={{
                width: '3rem',
                height: '2px',
                background: '#c9a84c',
                margin: '0 auto 1.8rem',
                opacity: 0.7,
              }}
            />

            <div
              className="line"
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                letterSpacing: '0.01em',
              }}
            >
              One plastic bag at a time.
              <br />
              <span style={{ color: 'rgba(201,168,76,0.8)' }}>
                One Sunday at a time, we take it back.
              </span>
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'rgba(255,255,255,0.06)',
            zIndex: 20,
          }}
        >
          <div
            id="reality-progress"
            style={{ height: '100%', width: '0%', background: '#c9a84c', transition: 'width 0.1s linear' }}
          />
        </div>
      </div>
    </section>
  )
}
