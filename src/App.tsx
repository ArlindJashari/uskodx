import { useCallback, useState } from 'react'
import { Nav } from './components/Nav'
import { MenuOverlay } from './components/MenuOverlay'
import { Hero } from './components/Hero'
import { WhyChapters } from './components/WhyChapters'
import { PlaceStrip } from './components/PlaceStrip'
import { PracticeIndex } from './components/PracticeIndex'
import { Statement } from './components/Statement'
import { Mosaic } from './components/Mosaic'
import { Capability } from './components/Capability'
import { Footer } from './components/Footer'
import { useMaskLines, usePageMotion, useReveal, useSmoothScroll } from './hooks/useMotion'
import './App.css'

export default function App() {
  const [open, setOpen] = useState(false)
  useSmoothScroll()
  useReveal()
  useMaskLines()
  usePageMotion()

  const toggle = useCallback(() => setOpen((v) => !v), [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className="app">
      <Nav onToggle={toggle} open={open} />
      <MenuOverlay open={open} onClose={close} />
      <main>
        <Hero />
        <WhyChapters />
        <PlaceStrip />
        <PracticeIndex />
        <Statement />
        <Mosaic />
        <Capability />
      </main>
      <Footer />
    </div>
  )
}
