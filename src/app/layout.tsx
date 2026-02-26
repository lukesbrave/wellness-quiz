import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wellness Assessment',
  description: 'Discover your wellness profile and get personalized recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
