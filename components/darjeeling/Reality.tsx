'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 7 polluted Darjeeling placeholder images — swap these for real photos
const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    location: 'Mall Road, Darjeeling',
  },
  {
    src: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=1600&q=80',
    location: 'Chowrasta Square',
  },
  {
    src: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80',
    location: 'Lebong Valley',
  },
  {
    src: 'https://images.unsplash.com/photo-1567870729671-f8c16e2ab5e5?w=1600&q=80',
    location: 'Tiger Hill Road',
  },
  {
    src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&q=80',
    location: 'Ghoom Monastery Road',
  },
  {
    src: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=1600&q=80',
    location: 'Batasia Loop Area',
  },
  {
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80',
    location: 'Singamari Forest Trail',
  },
]

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
      // Total scroll length:
      // 7 images × 1 viewport each + 1 viewport for zoom-out reveal
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

      // --- Phase 1: Flashcards ---
      // Each image occupies 1 "unit" of scroll
      const unit = 1 / (IMAGES.length + 1.5)

      IMAGES.forEach((_, i) => {
        const el = imagesRef.current[i]
        if (!el) return

        const start = i * unit
        const end = (i + 1) * unit

        if (i === 0) {
          // First image starts visible
          gsap.set(el, { opacity: 1 })
        } else {
          // All others start invisible
          gsap.set(el, { opacity: 0 })
          // Fade in
          tl.to(el, { opacity: 1, duration: 0.4 }, start)
        }

        // Fade out — except the last image, which zooms out instead
        if (i < IMAGES.length - 1) {
          tl.to(el, { opacity: 0, duration: 0.4 }, end - 0.05)
        }
      })

      // --- Phase 2: Last image zooms out ---
      const lastImg = lastImageRef.current
      const revealEl = revealRef.current
      const headlineEl = headlineRef.current

      if (lastImg && revealEl && headlineEl) {
        const zoomStart = (IMAGES.length - 1) * unit
        const zoomEnd = IMAGES.length * unit
        const revealStart = zoomEnd
        const revealEnd = revealStart + unit * 0.8

        // Zoom out the last image
        tl.to(
          lastImg,
          {
            scale: 0.55,
            opacity: 0.18,
            filter: 'blur(6px)',
            duration: 0.6,
            ease: 'power2.inOut',
          },
          zoomStart
        )

        // Reveal text overlay fades in
        tl.to(
          revealEl,
          {
            opacity: 1,
            duration: 0.5,
          },
          zoomStart + 0.3
        )

        // Headline comes up from below
        tl.fromTo(
          headlineEl.querySelectorAll('.line'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power3.out',
          },
          revealStart
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reality"
      style={{ position: 'relative' }}
    >
      {/* Sticky viewport — stays pinned while scroll happens */}
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
        {/* ── Flashcard images stacked, all position:absolute ── */}
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
              {/* Image */}
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

              {/* Dark vignette overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Location label — bottom left */}
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
                <div
                  style={{
                    width: '2rem',
                    height: '1px',
                    background: '#c9a84c',
                    opacity: 0.8,
                  }}
                />
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

              {/* Image counter — top right */}
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

        {/* ── Text reveal overlay — fades in after zoom out ── */}
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
            {/* Big bold headline */}
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
              <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>
                disappearing.
              </span>
            </div>

            {/* Gold rule */}
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

            {/* Small description */}
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
              <span style={{ color: 'rgba(201, 168, 76, 0.8)' }}>
                One Sunday at a time, we take it back.
              </span>
            </div>
          </div>
        </div>

        {/* Scroll progress bar — thin gold line at bottom */}
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
            style={{
              height: '100%',
              width: '0%',
              background: '#c9a84c',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </section>
  )
}
