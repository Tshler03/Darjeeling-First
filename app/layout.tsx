import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/darjeeling/LenisProvider'

export const metadata: Metadata = {
  title: 'Darjeeling First — Every Sunday, No Excuses',
  description:
    'A community environmental movement from Darjeeling, West Bengal. A group of friends who show up every Sunday to clean the hills they call home.',
  openGraph: {
    title: 'Darjeeling First',
    description: 'Every Sunday. No excuses.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
