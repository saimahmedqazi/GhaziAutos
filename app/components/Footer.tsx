'use client'

import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Ghazi Autos</h2>
          <p className="text-sm text-gray-300">
            Your trusted partner for automotive excellence in Karachi.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link href="/products" className="hover:text-orange-400">Products</Link></li>
            <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-orange-400">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info + Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Gulzar-e-Hijri, Karachi</p>
          <p className="text-sm">+92 317 8351197</p>
          <p className="text-sm">info@ghaziautos.com</p>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://facebook.com" target="_blank" className="hover:text-orange-400"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" className="hover:text-orange-400"><FaInstagram /></a>
            <a href="https://wa.me/923001234567" target="_blank" className="hover:text-orange-400"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Ghazi Autos. All rights reserved.
      </div>
    </footer>
  )
}
