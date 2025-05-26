'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Auto Care</span> Perfected
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your trusted partner for automotive excellence since 1998
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
            Explore Services
          </button>
        </motion.div>
      </div>
    </section>
  )
}