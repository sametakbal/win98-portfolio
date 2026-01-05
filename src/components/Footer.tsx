import { createSignal, Show } from 'solid-js'
import type { Component, Accessor, Setter } from 'solid-js'
import type { WindowType } from '../App'
import './Footer.css'

interface FooterProps {
    openWindow: Accessor<WindowType>
    setOpenWindow: Setter<WindowType>
}

const Footer: Component<FooterProps> = (props) => {
    const [time, setTime] = createSignal(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))

    setInterval(() => {
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }, 60000)

    const getWindowTitle = () => {
        const win = props.openWindow()
        if (win === 'about') return '📋 About - Samet Akbal'
        if (win === 'projects') return '📁 My Projects'
        if (win === 'articles') return '📝 Yazılar & Videolar'
        return null
    }

    return (
        <footer class="footer">
            <button class="start-button">
                <span class="start-icon">🪟</span>
                <span>Başlat</span>
            </button>
            <div class="taskbar-items">
                <Show when={props.openWindow()}>
                    <div class="taskbar-item active">
                        {getWindowTitle()}
                    </div>
                </Show>
            </div>
            <div class="system-tray">
                <span class="tray-icon">🔊</span>
                <span class="clock">{time()}</span>
            </div>
        </footer>
    )
}

export default Footer
