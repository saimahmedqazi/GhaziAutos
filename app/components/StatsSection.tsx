'use client'

import { useEffect, useState } from 'react'

type Stat = {
  label: string
  value: number
  suffix?: string
}

const stats: Stat[] = [
  { label: 'Happy Customers', value: 27000, suffix: '+' },
  { label: 'Years of Experience', value: 25 },
  { label: 'Products Available', value: 2000, suffix: '+' },
]

function CountUp({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16)
    const interval = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(interval)
  }, [target, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function StatsSection() {
  return (
    <section className="bg-blue-100 py-12 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">About us</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-blue-900 rounded-xl shadow p-6">
              <p className="text-4xl font-extrabold text-white mb-2">
                <CountUp target={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-white font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
