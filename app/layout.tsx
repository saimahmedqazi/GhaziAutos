import { Navbar } from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Navbar/>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}