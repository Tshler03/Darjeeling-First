'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── SWAP WITH REAL PHOTOS WHEN ASSETS ARRIVE ────────────────────────────────
const BG_IMG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90'

const LETTER_PHOTOS = [
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=85',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
  'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=85',
  'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=85',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85',
  'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=85',
  'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=800&q=85',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=85',
]
// ────────────────────────────────────────────────────────────────────────────

const DARJEELING = 'DARJEELING'
const FIRST = 'FIRST.'

export default function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const bgRef         = useRef<HTMLDivElement>(null)
  const bgImgRef      = useRef<HTMLImageElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const darjRowRef    = useRef<HTMLDivElement>(null)
  const firstRowRef   = useRef<HTMLDivElement>(null)
  const ruleRef       = useRef<HTMLDivElement>(null)
  const taglineRef    = useRef<HTMLParagraphElement>(null)
  const scrollCueRef  = useRef<HTMLDivElement>(null)
  const letterRefs    = useRef<(HTMLSpanElement | null)[]>([])
  const imgRefs       = useRef<(HTMLImageElement | null)[]>([])
  const fadeTimers    = useRef<(ReturnType<typeof setTimeout> | null)[]>([])
  const mouseRef      = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const rafRef        = useRef<number>(0)
  // ── Track scroll progress for combined transform ─────────────────────────
  const scrollProgressRef = useRef(0)

  // ── Preload letter photos ────────────────────────────────────────────────
  useEffect(() => {
    LETTER_PHOTOS.forEach(src => { const i = new Image(); i.src = src })
  }, [])

  // ── Mouse tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
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

  // ── Canvas: floating elements + bg parallax ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const elements = [
      { type: 'ring',    x: 0.10, y: 0.19, z: 0.5,  speed: 0.0006, phase: 0.5,  r: 26 },
      { type: 'ring',    x: 0.89, y: 0.71, z: 0.4,  speed: 0.0009, phase: 2.1,  r: 17 },
      { type: 'ring',    x: 0.80, y: 0.16, z: 0.6,  speed: 0.0007, phase: 3.3,  r: 21 },
      { type: 'ring',    x: 0.93, y: 0.43, z: 0.35, speed: 0.0011, phase: 1.8,  r: 13 },
      { type: 'line',    x: 0.07, y: 0.57, z: 0.3,  speed: 0.001,  phase: 1.0,  angle: -35 },
      { type: 'line',    x: 0.93, y: 0.32, z: 0.35, speed: 0.0008, phase: 2.5,  angle: 35  },
      { type: 'diamond', x: 0.20, y: 0.82, z: 0.45, speed: 0.0011, phase: 0.8  },
      { type: 'diamond', x: 0.77, y: 0.86, z: 0.55, speed: 0.0007, phase: 1.6  },
      { type: 'diamond', x: 0.33, y: 0.10, z: 0.38, speed: 0.0013, phase: 3.0  },
      { type: 'diamond', x: 0.63, y: 0.13, z: 0.42, speed: 0.0009, phase: 2.2  },
    ]

    let gAlpha = 0, tAlpha = 0
    ;(canvas as any).__show = () => { tAlpha = 1 }
    let t = 0

    const drawRing = (cx: number, cy: number, r: number, sc: number, a: number, bob: number) => {
      ctx.save(); ctx.globalAlpha = a * 0.38; ctx.strokeStyle = '#b8922a'
      ctx.lineWidth = 1.0 * sc
      ctx.beginPath(); ctx.arc(cx, cy + bob, r * sc, 0, Math.PI * 2); ctx.stroke()
      ctx.globalAlpha = a * 0.55; ctx.fillStyle = '#c9a84c'
      ctx.beginPath(); ctx.arc(cx, cy + bob, 2.2 * sc, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
    const drawLine = (cx: number, cy: number, sc: number, a: number, angle: number, bob: number) => {
      const len = 48 * sc, rad = (angle * Math.PI) / 180
      ctx.save(); ctx.globalAlpha = a * 0.28; ctx.strokeStyle = '#a07820'
      ctx.lineWidth = 0.9 * sc; ctx.translate(cx, cy + bob); ctx.rotate(rad)
      ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.lineTo(len / 2, 0); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-len / 2, -4 * sc); ctx.lineTo(-len / 2, 4 * sc)
      ctx.moveTo(len / 2, -4 * sc);  ctx.lineTo(len / 2, 4 * sc)
      ctx.stroke(); ctx.restore()
    }
    const drawDiamond = (cx: number, cy: number, sc: number, a: number, bob: number) => {
      const s = 5.5 * sc
      ctx.save(); ctx.globalAlpha = a * 0.42; ctx.strokeStyle = '#b8922a'
      ctx.lineWidth = 0.9 * sc
      ctx.beginPath()
      ctx.moveTo(cx, cy + bob - s); ctx.lineTo(cx + s, cy + bob)
      ctx.lineTo(cx, cy + bob + s); ctx.lineTo(cx - s, cy + bob)
      ctx.closePath(); ctx.stroke(); ctx.restore()
    }

    const render = () => {
      rafRef.current = requestAnimationFrame(render); t++

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.04
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.04

      gAlpha += (tAlpha - gAlpha) * 0.022
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── 4D BG PARALLAX ───────────────────────────────────────────────────
      // Mountains drift opposite to mouse — slow, weighty, like looking through a window
      // scale(1.10) gives enough bleed room to never show edges at max offset
      if (bgImgRef.current) {
        const mx = mouseRef.current.x   // -1 to +1
        const my = mouseRef.current.y   // -1 to +1
        const p  = scrollProgressRef.current
        const scrollScale = 1.10 + p * 0.06   // Ken Burns during scroll-out
        const tx = mx * -20              // ±20px horizontal — mountains shift left/right
        const ty = my * -9              // ±9px vertical — subtle, sky doesn't bounce
        bgImgRef.current.style.transform = `scale(${scrollScale}) translate(${tx}px, ${ty}px)`
      }
      // ─────────────────────────────────────────────────────────────────────

      if (gAlpha < 0.01) return
      const mx = mouseRef.current.x, my = mouseRef.current.y
      const W = canvas.width, H = canvas.height
      elements.forEach(el => {
        const px  = (el.x + mx * 0.030 * el.z) * W
        const py  = (el.y + my * 0.018 * el.z) * H
        const bob = Math.sin(t * el.speed * 1000 + el.phase) * 4.5 * el.z
        const sc  = 0.5 + el.z * 0.65
        const a   = gAlpha * (0.4 + el.z * 0.5)
        if (el.type === 'ring')    drawRing(px, py, (el as any).r || 20, sc, a, bob)
        if (el.type === 'line')    drawLine(px, py, sc, a, (el as any).angle || 0, bob)
        if (el.type === 'diamond') drawDiamond(px, py, sc, a, bob)
      })
    }
    render()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  // ── Scroll: 3D depth pullback ────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container, start: 'top top', end: 'bottom top', scrub: 1.2,
        onUpdate(self) {
          const p = self.progress
          // Store scroll progress — the render loop reads this to combine with mouse
          scrollProgressRef.current = p
          if (darjRowRef.current) gsap.set(darjRowRef.current, { rotateX: p * 18, z: -p * 120, opacity: 1 - p * 1.5 })
          if (firstRowRef.current) gsap.set(firstRowRef.current, { rotateX: p * 22, z: -p * 155, opacity: 1 - p * 1.7 })
          if (taglineRef.current)  gsap.set(taglineRef.current,  { opacity: 1 - p * 2.2 })
          if (ruleRef.current)     gsap.set(ruleRef.current,     { opacity: (1 - p * 2.5) * 0.5 })
          // NOTE: bgImgRef transform is now owned by the render loop — no gsap.set here
        },
      })
    }, container)
    return () => ctx.revert()
  }, [])

  // ── Entrance — premium slow luminous reveal ──────────────────────────────
  useEffect(() => {
    const bg       = bgRef.current
    const darjRow  = darjRowRef.current
    const firstRow = firstRowRef.current
    const rule     = ruleRef.current
    const tagline  = taglineRef.current
    const scrollCue = scrollCueRef.current
    const canvas   = canvasRef.current
    if (!bg || !darjRow || !firstRow || !rule || !tagline || !scrollCue) return

    const darjChars  = Array.from(darjRow.querySelectorAll('.ch'))
    const firstChars = Array.from(firstRow.querySelectorAll('.ch'))

    gsap.set(bg,         { opacity: 0 })
    gsap.set(darjChars,  { opacity: 0, y: 22, filter: 'blur(3px)' })
    gsap.set(firstChars, { opacity: 0, y: 18, filter: 'blur(3px)' })
    gsap.set(rule,       { scaleX: 0, opacity: 0 })
    gsap.set(tagline,    { opacity: 0 })
    gsap.set(scrollCue,  { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.2 })

    tl.to(bg, { opacity: 1, duration: 2.0, ease: 'power1.inOut' })
    tl.call(() => { (canvas as any).__show?.() }, [], '-=1.0')
    tl.to(darjChars, {
      opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1,
      stagger: { amount: 0.7, ease: 'power2.in' },
      ease: 'power2.out',
    }, '-=0.6')
    tl.to({}, { duration: 0.15 })
    tl.to(firstChars, {
      opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9,
      stagger: { amount: 0.4, ease: 'power1.in' },
      ease: 'power2.out',
    })
    tl.to(rule, { scaleX: 1, opacity: 0.5, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    tl.to(tagline, { opacity: 1, duration: 1.0, ease: 'power1.out' }, '-=0.4')
    tl.to(scrollCue, { opacity: 1, duration: 0.6, ease: 'power1.out' }, '-=0.3')

    return () => { tl.kill() }
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

  // ── Render letter with image clip ────────────────────────────────────────
  const renderLetter = (char: string, gi: number, isFirst: boolean) => {
    const photoSrc = LETTER_PHOTOS[gi % LETTER_PHOTOS.length]
    return (
      <span
        key={gi}
        ref={el => { letterRefs.current[gi] = el }}
        onMouseEnter={() => handleLetterEnter(gi)}
        onMouseLeave={() => handleLetterLeave(gi)}
        style={{ position: 'relative', display: 'inline-block', cursor: 'default', willChange: 'transform, opacity, filter' }}
      >
        <span style={{
          position: 'relative', zIndex: 2, display: 'block',
          color: isFirst ? '#c9a84c' : '#f0ece4',
          textShadow: isFirst
            ? [
                '1px 1px 0 #8a5a0a',
                '2px 2px 0 #7a4f08',
                '3px 3px 0 #6b4407',
                '4px 4px 0 #5c3a06',
                '5px 5px 0 #4e3005',
                '6px 6px 0 #3f2604',
                '7px 7px 12px rgba(0,0,0,0.7)',
                '0 0 55px rgba(201,168,76,0.18)',
                '0 -1px 0 rgba(255,220,120,0.3)',
              ].join(', ')
            : [
                '1px 1px 0 rgba(180,145,55,0.85)',
                '2px 2px 0 rgba(160,125,40,0.75)',
                '3px 3px 0 rgba(140,105,28,0.65)',
                '4px 4px 0 rgba(120,88,18,0.52)',
                '5px 5px 0 rgba(100,70,10,0.38)',
                '6px 6px 0 rgba(80,55,5,0.25)',
                '7px 7px 0 rgba(60,38,0,0.15)',
                '8px 8px 16px rgba(0,0,0,0.65)',
                '0 0 70px rgba(201,168,76,0.08)',
                '0 -1px 0 rgba(255,255,255,0.12)',
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
              mixBlendMode: 'luminosity',
              filter: 'saturate(1.5) brightness(1.15)',
              willChange: 'opacity, transform',
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
      {/* ── Background ───────────────────────────────────────────────── */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          ref={bgImgRef}
          src={BG_IMG}
          alt="Darjeeling hills"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.38) saturate(1.2) contrast(1.05)',
            transformOrigin: 'center center',
            // willChange tells the GPU to promote this to its own layer
            // so the rAF transform writes are composited without layout/paint
            willChange: 'transform',
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

      {/* ── Canvas ───────────────────────────────────────────────────── */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />

      {/* ── Text ─────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        perspective: '1000px', perspectiveOrigin: '50% 48%',
      }}>
        <div
          ref={darjRowRef}
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(3rem, 9.5vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {DARJEELING.split('').map((ch, i) => renderLetter(ch, i, false))}
        </div>

        <div
          ref={firstRowRef}
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(3rem, 9.5vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            fontStyle: 'italic',
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
            marginTop: '0.05em',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {FIRST.split('').map((ch, i) => renderLetter(ch, DARJEELING.length + i, true))}
        </div>

        <div
          ref={ruleRef}
          style={{
            width: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 20%, rgba(220,185,90,0.9) 50%, rgba(201,168,76,0.4) 80%, transparent 100%)',
            margin: 'clamp(1rem, 2.2vw, 1.7rem) 0',
            transformOrigin: 'center',
            willChange: 'transform, opacity',
          }}
        />

        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(0.62rem, 1.2vw, 0.85rem)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(240,230,210,0.42)',
            margin: 0, textAlign: 'center',
            willChange: 'opacity',
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
              willChange: 'transform, opacity',
            }} />
          </div>
        </div>
      </div>

      {/* ── Location label ───────────────────────────────────────────── */}
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
