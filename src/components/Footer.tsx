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
                <svg class="start-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="6" height="6" fill="#FF0000" />
                    <rect x="9" y="1" width="6" height="6" fill="#00FF00" />
                    <rect x="1" y="9" width="6" height="6" fill="#0000FF" />
                    <rect x="9" y="9" width="6" height="6" fill="#FFFF00" />
                </svg>
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
