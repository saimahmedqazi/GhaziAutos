'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    phone: '',
    message: ''
  })
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value })
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  console.log('Form submitted:', form)
}

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen pt-[10rem] ">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-blue-50 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-6 text-blue-800">Contact Information</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <Mail className="text-blue-600" size={18} />
              <span>Email: jamse@example.com</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-blue-600" size={18} />
              <span>Phone: 1234 567890</span>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-blue-600" size={18} />
              <span>
                Address: 7398 Smoke Ranch Road<br />
                Las Vegas, Nevada 89128
              </span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Deo"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Type your subject"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message"
              rows={4}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
