import { createContext, useContext, createSignal } from 'solid-js'
import type { Accessor, Setter, ParentComponent } from 'solid-js'

export type Language = 'tr' | 'en'

interface LanguageContextType {
    language: Accessor<Language>
    setLanguage: Setter<Language>
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>()

const translations = {
    tr: {
        start: 'Başlat',
        about: 'Hakkımda',
        projects: 'Projeler',
        articles: 'Yazılar & Videolar',
        minesweeper: 'Mayın Tarlası',
        language: 'Dil',
        turkish: 'Türkçe',
        english: 'English',
        aboutTitle: '📋 Hakkımda - Samet Akbal',
        projectsTitle: '📁 Projelerim',
        articlesTitle: '📝 Yazılar & Videolar',
        minesweeperTitle: '💣 Mayın Tarlası',
    },
    en: {
        start: 'Start',
        about: 'About',
        projects: 'Projects',
        articles: 'Articles & Videos',
        minesweeper: 'Minesweeper',
        language: 'Language',
        turkish: 'Türkçe',
        english: 'English',
        aboutTitle: '📋 About - Samet Akbal',
        projectsTitle: '📁 My Projects',
        articlesTitle: '📝 Articles & Videos',
        minesweeperTitle: '💣 Minesweeper',
    }
}

export const LanguageProvider: ParentComponent = (props) => {
    const [language, setLanguage] = createSignal<Language>('tr')

    const t = (key: string): string => {
        return translations[language()][key as keyof typeof translations.tr] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
