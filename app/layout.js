import { Inter,Kanit } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body>{children}</body>
    </html>
    </ClerkProvider>
  )
}
