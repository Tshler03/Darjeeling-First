'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LETTER_PHOTOS = [
  'https://images.pexels.com/photos/36778192/pexels-photo-36778192.jpeg',
  'https://images.pexels.com/photos/36778193/pexels-photo-36778193.jpeg',
  'https://images.pexels.com/photos/31477804/pexels-photo-31477804.jpeg',
  'https://images.pexels.com/photos/103875/pexels-photo-103875.jpeg',
  'https://images.pexels.com/photos/35151735/pexels-photo-35151735.jpeg',
  'https://images.pexels.com/photos/634754/pexels-photo-634754.jpeg',
  'https://images.pexels.com/photos/33263641/pexels-photo-33263641.jpeg',
  'https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg',
]

const DARJEELING = 'DARJEELING'
const FIRST = 'FIRST.'

interface HeroProps {
  shouldPlay?: boolean
}

export default function Hero({ shouldPlay = false }: HeroProps) {
  const containerRef      = useRef<HTMLDivElement>(null)
  const bgVideoRef        = useRef<HTMLVideoElement>(null)
  const darjRowRef        = useRef<HTMLDivElement>(null)
  const firstRowRef       = useRef<HTMLDivElement>(null)
  const ruleRef           = useRef<HTMLDivElement>(null)
  const taglineRef        = useRef<HTMLParagraphElement>(null)
  const scrollCueRef      = useRef<HTMLDivElement>(null)
  const letterRefs        = useRef<(HTMLSpanElement | null)[]>([])
  const imgRefs           = useRef<(HTMLImageElement | null)[]>([])
  const fadeTimers        = useRef<(ReturnType<typeof setTimeout> | null)[]>([])
  const mouseRef          = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const rafRef            = useRef<number>(0)
  const scrollProgressRef = useRef(0)

  // ── Preload letter photos ────────────────────────────────────────────────
  useEffect(() => {
    LETTER_PHOTOS.forEach(src => { const i = new Image(); i.src = src })
  }, [])

  // ── Play video when loader done ──────────────────────────────────────────
  useEffect(() => {
    if (!shouldPlay) return
    bgVideoRef.current?.play().catch(() => {})
  }, [shouldPlay])

  // ── When video ends: freeze + animate text in ───────────────────────────
  useEffect(() => {
    const video = bgVideoRef.current
    if (!video) return

    const onEnded = () => {
      video.pause()

      const darjLetters  = letterRefs.current.slice(0, DARJEELING.length).filter(Boolean)
      const firstLetters = letterRefs.current.slice(DARJEELING.length).filter(Boolean)
      const rule      = ruleRef.current
      const tagline   = taglineRef.current
      const scrollCue = scrollCueRef.current
      if (!rule || !tagline || !scrollCue) return

      gsap.set(darjLetters,  { opacity: 0, y: 22, filter: 'blur(3px)', force3D: true })
      gsap.set(firstLetters, { opacity: 0, y: 18, filter: 'blur(3px)', force3D: true })
      gsap.set(rule,         { scaleX: 0, opacity: 0 })
      gsap.set(tagline,      { opacity: 0 })
      gsap.set(scrollCue,    { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(darjLetters, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.1, force3D: true,
        stagger: { amount: 0.7, ease: 'power2.in' },
        ease: 'power2.out',
      })
      tl.to({}, { duration: 0.15 })
      tl.to(firstLetters, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.9, force3D: true,
        stagger: { amount: 0.4, ease: 'power1.in' },
        ease: 'power2.out',
      })
      tl.to(rule,      { scaleX: 1, opacity: 0.5, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      tl.to(tagline,   { opacity: 1, duration: 1.0, ease: 'power1.out' }, '-=0.4')
      tl.to(scrollCue, { opacity: 1, duration: 0.6, ease: 'power1.out' }, '-=0.3')

      startParallax()
    }

    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [])

  // ── Mouse + touch tracking ──────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return
      mouseRef.current.tx = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.ty = (e.touches[0].clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [])

  // ── Parallax rAF — only video transform, no canvas ──────────────────────
  const startParallax = useCallback(() => {
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      const m = mouseRef.current
      m.x += (m.tx - m.x) * 0.04
      m.y += (m.ty - m.y) * 0.04
      const video = bgVideoRef.current
      if (video) {
        const p  = scrollProgressRef.current
        const sc = 1.10 + p * 0.06
        video.style.transform = `scale(${sc}) translate(${m.x * -20}px, ${m.y * -9}px)`
      }
    }
    loop()
  }, [])

  // ── Letter hover ─────────────────────────────────────────────────────────
  const handleLetterEnter = useCallback((i: number) => {
    const img = imgRefs.current[i]
    if (!img) return
    if (fadeTimers.current[i]) { clearTimeout(fadeTimers.current[i]!); fadeTimers.current[i] = null }
    gsap.to(img, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
  }, [])

  const handleLetterLeave = useCallback((i: number) => {
    const img = imgRefs.current[i]
    if (!img) return
    fadeTimers.current[i] = setTimeout(() => {
      gsap.to(img, { opacity: 0, scale: 1.06, duration: 0.7, ease: 'power2.in' })
    }, 200)
  }, [])

  // ── Start parallax on mount, cleanup on unmount ─────────────────────────
  useEffect(() => {
    startParallax()
    return () => { cancelAnimationFrame(rafRef.current) }
  }, [startParallax])

  // ── Scroll: 3D depth pullback ────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container, start: 'top top', end: 'bottom top', scrub: 1.2,
        onUpdate(self) {
          const p = self.progress
          scrollProgressRef.current = p
          if (darjRowRef.current)  gsap.set(darjRowRef.current,  { rotateX: p * 18, z: -p * 120, opacity: 1 - p * 1.5 })
          if (firstRowRef.current) gsap.set(firstRowRef.current, { rotateX: p * 22, z: -p * 155, opacity: 1 - p * 1.7 })
          if (taglineRef.current)  gsap.set(taglineRef.current,  { opacity: 1 - p * 2.2 })
          if (ruleRef.current)     gsap.set(ruleRef.current,     { opacity: (1 - p * 2.5) * 0.5 })
        },
      })
    }, container)
    return () => ctx.revert()
  }, [])

  // ── Looping scroll cue ───────────────────────────────────────────────────
  useEffect(() => {
    const line = scrollCueRef.current?.querySelector('.scroll-line') as HTMLElement
    if (!line) return
    const loop = gsap.fromTo(line,
      { scaleY: 0, transformOrigin: 'top center', opacity: 0.9 },
      { scaleY: 1, opacity: 0, transformOrigin: 'top center', duration: 1.3, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.5, delay: 3.5 }
    )
    return () => { loop.kill() }
  }, [])

  // ── Render letter ────────────────────────────────────────────────────────
  const renderLetter = (char: string, gi: number, isFirst: boolean) => {
    const photoSrc = LETTER_PHOTOS[gi % LETTER_PHOTOS.length]
    return (
      <span
        key={gi}
        ref={el => { letterRefs.current[gi] = el }}
        onMouseEnter={() => handleLetterEnter(gi)}
        onMouseLeave={() => handleLetterLeave(gi)}
        style={{ position: 'relative', display: 'inline-block', cursor: 'default', opacity: 0 }}
      >
        <span style={{
          position: 'relative', zIndex: 2, display: 'block',
          color: isFirst ? '#c9a84c' : '#f0ece4',
          textShadow: isFirst
            ? [
                '1px 1px 0 #8a5a0a', '2px 2px 0 #7a4f08', '3px 3px 0 #6b4407',
                '4px 4px 0 #5c3a06', '5px 5px 0 #4e3005', '6px 6px 0 #3f2604',
                '7px 7px 12px rgba(0,0,0,0.7)', '0 0 55px rgba(201,168,76,0.18)',
              ].join(', ')
            : [
                '1px 1px 0 rgba(180,145,55,0.85)', '2px 2px 0 rgba(160,125,40,0.75)',
                '3px 3px 0 rgba(140,105,28,0.65)', '4px 4px 0 rgba(120,88,18,0.52)',
                '5px 5px 0 rgba(100,70,10,0.38)',  '6px 6px 0 rgba(80,55,5,0.25)',
                '7px 7px 0 rgba(60,38,0,0.15)',    '8px 8px 16px rgba(0,0,0,0.65)',
              ].join(', '),
          userSelect: 'none',
        }}>
          {char}
        </span>
        <span style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'block', overflow: 'hidden', pointerEvents: 'none' }}>
          <img
            ref={el => { imgRefs.current[gi] = el }}
            src={photoSrc}
            alt=""
            style={{
              position: 'absolute', top: '-20%', left: '-20%',
              width: '140%', height: '140%',
              objectFit: 'cover', opacity: 0,
              filter: 'saturate(1.2) brightness(1.1) contrast(1.05)',
            }}
          />
        </span>
      </span>
    )
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: '#030301' }}
    >
      {/* Background video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <video
          ref={bgVideoRef}
          src="/video6.mp4"
          muted playsInline preload="auto"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.38) saturate(1.2) contrast(1.05)',
            transformOrigin: 'center center', willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 75% 65% at 50% 38%, transparent 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.82) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.88) 100%)',
        }} />
      </div>

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        perspective: '1000px', perspectiveOrigin: '50% 48%',
      }}>
        <div
          ref={darjRowRef}
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(3rem, 9.5vw, 9rem)', fontWeight: 900,
            letterSpacing: '-0.02em', lineHeight: 0.9, textTransform: 'uppercase',
            transformStyle: 'preserve-3d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {DARJEELING.split('').map((ch, i) => renderLetter(ch, i, false))}
        </div>

        <div
          ref={firstRowRef}
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(3rem, 9.5vw, 9rem)', fontWeight: 900,
            letterSpacing: '-0.02em', lineHeight: 0.9, textTransform: 'uppercase',
            fontStyle: 'italic', transformStyle: 'preserve-3d', marginTop: '0.05em',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {FIRST.split('').map((ch, i) => renderLetter(ch, DARJEELING.length + i, true))}
        </div>

        <div
          ref={ruleRef}
          style={{
            width: 'clamp(2.5rem, 5.5vw, 4.5rem)', height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 20%, rgba(220,185,90,0.9) 50%, rgba(201,168,76,0.4) 80%, transparent 100%)',
            margin: 'clamp(1rem, 2.2vw, 1.7rem) 0',
            transformOrigin: 'center', opacity: 0,
          }}
        />

        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(0.62rem, 1.2vw, 0.85rem)', letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(240,230,210,0.42)',
            margin: 0, textAlign: 'center', opacity: 0,
          }}
        >
          There&apos;s a reason for that name.
        </p>

        <div
          ref={scrollCueRef}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            opacity: 0,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.52rem',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'rgba(240,220,180,0.18)',
          }}>
            scroll
          </span>
          <div style={{ width: '1px', height: '3rem', background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
            <div className="scroll-line" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
              background: 'linear-gradient(to bottom, rgba(201,168,76,0.9) 0%, rgba(201,168,76,0.05) 100%)',
            }} />
          </div>
        </div>
      </div>

      {/* Location label */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '1.8rem', zIndex: 5,
        fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.58rem',
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: 'rgba(220,205,175,0.25)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{ width: '1.4rem', height: '1px', background: 'rgba(201,168,76,0.45)' }} />
        Darjeeling, West Bengal
      </div>
    </section>
  )
}
