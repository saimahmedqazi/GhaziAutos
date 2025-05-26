import { MotionDiv } from './components/Motion'
import { Hero } from './components/Hero'


export default async function Home() {
  return (
    <>
      <Hero />
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        
      </MotionDiv>
    </>
  )
}