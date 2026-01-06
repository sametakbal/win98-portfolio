import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

export type WindowType = 'about' | 'projects' | 'articles' | 'minesweeper' | 'internet' | null

const App: Component = () => {
  const [openWindow, setOpenWindow] = createSignal<WindowType>(null)

  return (
    <LanguageProvider>
      <div class="app">
        <Hero openWindow={openWindow} setOpenWindow={setOpenWindow} />
        <Footer openWindow={openWindow} setOpenWindow={setOpenWindow} />
      </div>
    </LanguageProvider>
  )
}

export default App
