import { Nav, Footer } from '@/components/darjeeling/NavFooter'
import Hero       from '@/components/darjeeling/Hero'
import Reality    from '@/components/darjeeling/Reality'
import Beginning  from '@/components/darjeeling/Beginning'
import Work       from '@/components/darjeeling/Work'
import Proof      from '@/components/darjeeling/Proof'
import People     from '@/components/darjeeling/People'
import Invitation from '@/components/darjeeling/Invitation'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Reality />
      <Beginning />
      <Work />
      <Proof />
      <People />
      <Invitation />
      <Footer />
    </main>
  )
}
