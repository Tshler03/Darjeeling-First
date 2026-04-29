'use client'

import { useState } from 'react'
import ScreenLoader from '@/components/darjeeling/ScreenLoader'
import { Nav, Footer } from '@/components/darjeeling/NavFooter'
import Hero       from '@/components/darjeeling/Hero'
import Reality    from '@/components/darjeeling/Reality'
import Beginning  from '@/components/darjeeling/Beginning'
import Work       from '@/components/darjeeling/Work'
import Proof      from '@/components/darjeeling/Proof'
import ImpactMap  from '@/components/darjeeling/ImpactMap'
import People     from '@/components/darjeeling/People'
import Invitation from '@/components/darjeeling/Invitation'
import Chatbot    from '@/components/darjeeling/Chatbot'

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <main>
      <ScreenLoader onComplete={() => setLoaderDone(true)} />
      <Nav />
      <Hero shouldPlay={loaderDone} />
      <Reality />
      <Beginning />
      <Work />
      <Proof />
      <ImpactMap />
      <People />
      <Invitation />
      <Footer />
      <Chatbot />
    </main>
  )
}
