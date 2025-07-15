'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const images = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg'
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  // Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000) // change every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[90vh] w-full overflow-hidden pt-[5.8125rem] min-h-5/6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Auto Care</span> Perfected
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Your trusted partner for automotive excellence since 1998
          </p>
          <Link href="/products">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-full hover:bg-blue-800  transition-colors hover:cursor-pointer">
            Explore Products
          </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
