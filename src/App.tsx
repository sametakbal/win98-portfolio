import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'
import Hero from './components/Hero'
import Footer from './components/Footer'
import './App.css'

export type WindowType = 'about' | 'projects' | 'articles' | null

const App: Component = () => {
  const [openWindow, setOpenWindow] = createSignal<WindowType>(null)

  return (
    <div class="app">
      <Hero openWindow={openWindow} setOpenWindow={setOpenWindow} />
      <Footer openWindow={openWindow} setOpenWindow={setOpenWindow} />
    </div>
  )
}

export default App
