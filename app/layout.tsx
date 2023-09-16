
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'FakeStore',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 min-h-screen p-8 shadow-lg">
       
      < Navbar />
        {children}
           
        </body>
    </html>
  )
}