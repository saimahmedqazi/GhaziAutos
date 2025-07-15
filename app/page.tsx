import { MotionDiv } from './components/Motion'
import { Hero } from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import WhyChooseUs from './components/WhyChooseUs'
import Footer from './components/Footer'
import BlogSection from './components/BlogSection'
import StatsSection from './components/StatsSection'
import { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Ghazi Autos',
  description: 'Authentic auto parts, lubricants, and fluids from trusted manufacturers',
};



export default async function Home() {
  return (
    <>
      
      
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      <FeaturedProducts/>
      <StatsSection/>
      <BlogSection/>
      <WhyChooseUs />
      <Footer/>
      </MotionDiv>
      <SpeedInsights/>
    </>
  )
}