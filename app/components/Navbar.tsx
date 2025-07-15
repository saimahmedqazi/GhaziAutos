'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = ['Home', 'Products','Blog','Contact']

  const isActive = (item: string) => {
    const route = item === 'Home' ? '/' : `/${item.toLowerCase()}`
    return pathname === route
  }

  return (
    <nav className="fixed w-full bg-blue-900 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-4xl font-bold text-white">
          Ghazi Autos
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const route = item === 'Home' ? '/' : `/${item.toLowerCase()}`
            return (
              <Link
                key={item}
                href={route}
                className={`text-white font-bold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${
                  isActive(item)
                    ? 'after:w-1/2'
                    : 'after:w-0 hover:after:w-full'
                }`}
              >
                {item}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>

        {/* Mobile Menu */}
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { x: 0 },
            closed: { x: '100%' }
          }}
          className="fixed inset-0  md:hidden"
        >
          <div className="p-4 bg-black opacity-75 h-screen">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
            <div className="flex flex-col gap-6 mt-20">
              {navItems.map((item) => {
                const route = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                return (
                  <Link
                    key={item}
                    href={route}
                    className="text-xl text-white font-bold bg-black p-4 hover:bg-red-50 rounded-lg" 
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
