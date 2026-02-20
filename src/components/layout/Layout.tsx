import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Scene } from '../three/Scene'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import Grainient from '../Grainient'
import TargetCursor from '../TargetCursor'
import Chatbot from '../Chatbot'

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    const animate = (time: number) => {
      lenisRef.current?.raf(time)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [location.pathname])

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden bg-black">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <Scene />

      {/* Global Grainient Background — visible on all pages */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Grainient
          color1="#000000"
          color2="#005c43"
          color3="#000000"
          timeSpeed={0.95}
          colorBalance={0}
          warpStrength={1.75}
          warpFrequency={6.8}
          warpSpeed={2.9}
          warpAmplitude={58}
          blendAngle={-8}
          blendSoftness={0.08}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={0.55}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative z-10"
        >
          {children}
          <Footer />
        </motion.main>
      </AnimatePresence>
      <Chatbot />
    </div>
  )
}

