import { createSignal, Show, For } from 'solid-js'
import type { Component, Accessor, Setter } from 'solid-js'
import type { WindowType } from '../App'
import { useLanguage } from '../contexts/LanguageContext'
import './Footer.css'

interface FooterProps {
    openWindows: Accessor<WindowType[]>
    setOpenWindows: Setter<WindowType[]>
}

const Footer: Component<FooterProps> = (props) => {
    const [time, setTime] = createSignal(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    const [startMenuOpen, setStartMenuOpen] = createSignal(false)
    const { language, setLanguage, t } = useLanguage()

    setInterval(() => {
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }, 60000)

    // Close start menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('.start-section')) {
            setStartMenuOpen(false)
        }
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('click', handleClickOutside)
    }

    const getWindowTitle = (win: WindowType) => {
        if (win === 'about') return t('aboutTitle')
        if (win === 'projects') return t('projectsTitle')
        if (win === 'articles') return t('articlesTitle')
        if (win === 'minesweeper') return t('minesweeperTitle')
        if (win === 'internet') return t('internetTitle')
        if (win === 'paint') return 'Paint'
        return ''
    }

    const toggleStartMenu = () => {
        setStartMenuOpen(!startMenuOpen())
    }

    const handleLanguageChange = (lang: 'tr' | 'en') => {
        setLanguage(lang)
        setStartMenuOpen(false)
    }

    const windowIcons: Record<WindowType, string> = {
        about: '💻',
        projects: '📁',
        articles: '📝',
        minesweeper: '💣',
        internet: '🌐',
        paint: '🎨'
    }

    const getWindowIcon = (win: WindowType) => windowIcons[win] || ''

    return (
        <footer class="footer">
            <div class="start-section">
                <button class="start-button" onClick={toggleStartMenu}>
                    <svg class="start-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="6" height="6" fill="#FF0000" />
                        <rect x="9" y="1" width="6" height="6" fill="#00FF00" />
                        <rect x="1" y="9" width="6" height="6" fill="#0000FF" />
                        <rect x="9" y="9" width="6" height="6" fill="#FFFF00" />
                    </svg>
                    <span>{t('start')}</span>
                </button>
                <Show when={startMenuOpen()}>
                    <div class="start-menu">
                        <div class="start-menu-sidebar">
                            <span class="sidebar-text">Windows 98</span>
                        </div>
                        <div class="start-menu-content">
                            <div class="menu-item language-menu">
                                <span>🌐 {t('language')}</span>
                                <span class="menu-arrow">▶</span>
                                <div class="submenu">
                                    <div
                                        class={`menu-item ${language() === 'tr' ? 'active' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleLanguageChange('tr')}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLanguageChange('tr')}
                                    >
                                        🇹🇷 {t('turkish')}
                                    </div>
                                    <div
                                        class={`menu-item ${language() === 'en' ? 'active' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleLanguageChange('en')}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLanguageChange('en')}
                                    >
                                        🇬🇧 {t('english')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Show>
            </div>
            <div class="taskbar-items">
                <For each={props.openWindows()}>
                    {(window) => (
                        <div class="taskbar-item active">
                            <span>{getWindowIcon(window)}</span>
                            <span>{getWindowTitle(window)}</span>
                        </div>
                    )}
                </For>
            </div>
            <div class="system-tray">
                <span class="tray-icon">🔊</span>
                <span class="clock">{time()}</span>
            </div>
        </footer>
    )
}

export default Footer
