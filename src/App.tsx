import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

export type WindowType = 'about' | 'projects' | 'articles' | 'minesweeper' | 'internet'

const App: Component = () => {
  const [openWindows, setOpenWindows] = createSignal<WindowType[]>([])

  return (
    <LanguageProvider>
      <div class="app">
        <Hero openWindows={openWindows} setOpenWindows={setOpenWindows} />
        <Footer openWindows={openWindows} setOpenWindows={setOpenWindows} />
      </div>
    </LanguageProvider>
  )
}

export default App
