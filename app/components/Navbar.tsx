'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary text-red-600">
          Ghazi Autos
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {['Home', 'Services', 'Products', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { x: 0 },
            closed: { x: '100%' }
          }}
          className="fixed inset-0 bg-white md:hidden"
        >
          <div className="p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex flex-col gap-6 mt-12">
              {['Home', 'Services', 'Products', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-xl p-4 hover:bg-red-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}