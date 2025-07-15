'use client'

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Genuine Brands',
      description: 'We only stock 100% authentic auto parts, lubricants, and fluids from trusted manufacturers.',
      icon: '🛠️',
    },
    {
      title: 'Expert Support',
      description: 'Our mechanics are ready to help you choose the right product for your vehicle.',
      icon: '📞',
    },
    {
      title: 'Quick Delivery',
      description: 'Fast, reliable delivery across Karachi — get what you need when you need it.',
      icon: '🚚',
    },
    {
      title: 'Best Prices',
      description: 'We offer competitive prices without compromising quality, with regular deals for you.',
      icon: '💸',
    },
  ]

  return (
    <section className="py-8 bg-blue-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-12">Why Choose Us</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

