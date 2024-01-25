import { Inter,Kanit } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Script from 'next/script'
import Head from 'next/head'


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>


     
    <html lang="en">
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body>{children}</body>
    </html>
    </ClerkProvider>
  )
}
