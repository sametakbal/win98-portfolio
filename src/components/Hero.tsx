import { Show, For, createSignal } from 'solid-js'
import type { Component, Accessor, Setter } from 'solid-js'
import type { WindowType } from '../App'
import { useLanguage } from '../contexts/LanguageContext'
import './Hero.css'
import './Projects.css'
import './Articles.css'

interface HeroProps {
    openWindow: Accessor<WindowType>
    setOpenWindow: Setter<WindowType>
}

interface WindowPosition {
    x: number
    y: number
}

interface Project {
    id: number
    title: string
    description: string
    tags: string[]
    year: string
}

interface Article {
    id: number
    title: string
    excerpt: string
    date: string
    readTime: string
    link: string
    platform: 'medium' | 'youtube'
}

const Hero: Component<HeroProps> = (props) => {
    const [aboutPosition, setAboutPosition] = createSignal<WindowPosition>({ x: 20, y: 20 })
    const [projectsPosition, setProjectsPosition] = createSignal<WindowPosition>({ x: 20, y: 20 })
    const [articlesPosition, setArticlesPosition] = createSignal<WindowPosition>({ x: 20, y: 20 })
    const [dragging, setDragging] = createSignal<WindowType>(null)
    const [dragStart, setDragStart] = createSignal<{ x: number; y: number } | null>(null)
    const { t } = useLanguage()

    const projects: Project[] = [
        {
            id: 1,
            title: 'Microservices E-Commerce',
            description: 'Yüksek performanslı e-ticaret sistemi (Spring Boot, gRPC)',
            tags: ['Java', 'Spring Boot', 'gRPC', 'PostgreSQL'],
            year: '2024',
        },
        {
            id: 2,
            title: 'API Gateway & Service Mesh',
            description: 'Mikroservis iletişimi için kapsamlı gateway çözümü',
            tags: ['Spring Cloud', 'Consul', 'OAuth2'],
            year: '2024',
        },
        {
            id: 3,
            title: 'Real-time Analytics Dashboard',
            description: 'WebSocket ile gerçek zamanlı veri görselleştirme platformu',
            tags: ['Spring Boot', 'WebSocket', 'React'],
            year: '2023',
        },
        {
            id: 4,
            title: 'Event-Driven Architecture',
            description: 'Apache Kafka ve event sourcing ile asenkron mesajlaşma',
            tags: ['Apache Kafka', 'Spring Cloud', 'CQRS'],
            year: '2023',
        },
    ]

    const articles: Article[] = [
        {
            id: 1,
            title: 'Spring Boot ile Mikroservis Mimarisine Giriş',
            excerpt: 'Modern yazılım geliştirmede mikroservis mimarisinin temellerini, Spring Boot ekosistemiyle nasıl uygulanacağını ve best practice\'leri detaylı bir şekilde inceliyoruz.',
            date: '2024',
            readTime: '12 dk',
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
        {
            id: 2,
            title: 'gRPC vs REST: Performans Karşılaştırması',
            excerpt: 'gRPC ve REST API\'ların avantajları, dezavantajları ve gerçek dünya senaryolarında performans karşılaştırmaları.',
            date: '2024',
            readTime: '15 dk',
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
        {
            id: 3,
            title: 'Java Spring Boot Tutorial - Başlangıçtan İleri Seviyeye',
            excerpt: 'Spring Boot framework\'ünü sıfırdan öğrenmek isteyenler için kapsamlı video eğitim serisi.',
            date: '2024',
            readTime: '2 saat',
            link: 'https://www.youtube.com/@SametAkbal',
            platform: 'youtube',
        },
        {
            id: 4,
            title: 'Docker ve Kubernetes ile Container Orchestration',
            excerpt: 'Container teknolojileri ve Kubernetes ile mikroservislerin nasıl yönetileceği hakkında detaylı rehber.',
            date: '2024',
            readTime: '18 dk',
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
    ]

    const startDrag = (windowType: WindowType, e: MouseEvent) => {
        e.preventDefault()
        setDragging(windowType)
        setDragStart({ x: e.clientX, y: e.clientY })
    }

    const onDrag = (e: MouseEvent) => {
        if (!dragging() || !dragStart()) return

        const deltaX = e.clientX - dragStart()!.x
        const deltaY = e.clientY - dragStart()!.y

        if (dragging() === 'about') {
            const current = aboutPosition()
            setAboutPosition({ x: current.x + deltaX, y: current.y + deltaY })
        } else if (dragging() === 'projects') {
            const current = projectsPosition()
            setProjectsPosition({ x: current.x + deltaX, y: current.y + deltaY })
        } else if (dragging() === 'articles') {
            const current = articlesPosition()
            setArticlesPosition({ x: current.x + deltaX, y: current.y + deltaY })
        }

        setDragStart({ x: e.clientX, y: e.clientY })
    }

    const stopDrag = () => {
        setDragging(null)
        setDragStart(null)
    }

    const openWindowHandler = (window: WindowType) => {
        props.setOpenWindow(window)
    }

    const closeWindow = () => {
        props.setOpenWindow(null)
    }

    return (
        <section class="hero" onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
            <div class="hero-content">
                <div class="desktop-icon" onClick={() => openWindowHandler('about')} onDblClick={() => openWindowHandler('about')}>
                    <div class="icon-image">💻</div>
                    <div class="icon-label">{t('about')}</div>
                </div>
                <div class="desktop-icon" onClick={() => openWindowHandler('projects')} onDblClick={() => openWindowHandler('projects')}>
                    <div class="icon-image">📁</div>
                    <div class="icon-label">{t('projects')}</div>
                </div>
                <div class="desktop-icon" onClick={() => openWindowHandler('articles')} onDblClick={() => openWindowHandler('articles')}>
                    <div class="icon-image">📝</div>
                    <div class="icon-label">{t('articles')}</div>
                </div>
                <div class="desktop-icon" onClick={() => window.open('https://github.com/sametakbal', '_blank')} onDblClick={() => window.open('https://github.com/sametakbal', '_blank')}>
                    <div class="icon-image">🌐</div>
                    <div class="icon-label">Internet</div>
                </div>
            </div>
            <Show when={props.openWindow() === 'about'}>
                <div class="window about-window" style={{ position: 'absolute', left: `${aboutPosition().x}px`, top: `${aboutPosition().y}px` }}>
                    <div class="window-titlebar" onMouseDown={(e) => startDrag('about', e)} style={{ cursor: 'move' }}>
                        <span>{t('aboutTitle')}</span>
                        <div class="titlebar-buttons">
                            <button class="titlebar-button">_</button>
                            <button class="titlebar-button">□</button>
                            <button class="titlebar-button" onClick={closeWindow}>×</button>
                        </div>
                    </div>
                    <div class="window-body">
                        <h2>Samet Akbal</h2>
                        <p><strong>Title:</strong> Software Engineer & Content Creator</p>
                        <p><strong>Experience:</strong> 5+ years</p>
                        <p><strong>Specialization:</strong> Java, Spring Boot, Microservices, gRPC</p>
                        <hr />
                        <p>Building scalable backend systems and sharing knowledge through educational content.</p>
                        <div class="hero-social">
                            <a href="https://github.com/sametakbal" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/sametakbal" target="_blank" rel="noopener noreferrer" class="social-link">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@SametAkbal" target="_blank" rel="noopener noreferrer" class="social-link">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                            <a href="https://sametakbal.medium.com/" target="_blank" rel="noopener noreferrer" class="social-link">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                                </svg>
                            </a>
                            <a href="https://x.com/akbaldev" target="_blank" rel="noopener noreferrer" class="social-link">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </Show>
            <Show when={props.openWindow() === 'projects'}>
                <div class="window projects-window" style={{ position: 'absolute', left: `${projectsPosition().x}px`, top: `${projectsPosition().y}px` }}>
                    <div class="window-titlebar" onMouseDown={(e) => startDrag('projects', e)} style={{ cursor: 'move' }}>
                        <span>{t('projectsTitle')}</span>
                        <div class="titlebar-buttons">
                            <button class="titlebar-button">_</button>
                            <button class="titlebar-button">□</button>
                            <button class="titlebar-button" onClick={closeWindow}>×</button>
                        </div>
                    </div>
                    <div class="toolbar">
                        <span>File</span>
                        <span>Edit</span>
                        <span>View</span>
                        <span>Help</span>
                    </div>
                    <div class="window-body">
                        <div class="projects-list">
                            <For each={projects}>
                                {(project) => (
                                    <div class="project-item">
                                        <div class="project-icon">📂</div>
                                        <div class="project-info">
                                            <div class="project-header">
                                                <h3 class="project-title">{project.title}</h3>
                                                <span class="project-year">{project.year}</span>
                                            </div>
                                            <p class="project-description">{project.description}</p>
                                            <div class="project-tags">
                                                <For each={project.tags}>
                                                    {(tag) => <span class="tag">{tag}</span>}
                                                </For>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </Show>
            <Show when={props.openWindow() === 'articles'}>
                <div class="window articles-window" style={{ position: 'absolute', left: `${articlesPosition().x}px`, top: `${articlesPosition().y}px` }}>
                    <div class="window-titlebar" onMouseDown={(e) => startDrag('articles', e)} style={{ cursor: 'move' }}>
                        <span>{t('articlesTitle')}</span>
                        <div class="titlebar-buttons">
                            <button class="titlebar-button">_</button>
                            <button class="titlebar-button">□</button>
                            <button class="titlebar-button" onClick={closeWindow}>×</button>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="articles-list">
                            <For each={articles}>
                                {(article) => (
                                    <a href={article.link} target="_blank" rel="noopener noreferrer" class="article-item">
                                        <div class="article-icon">
                                            {article.platform === 'medium' ? '📄' : '▶️'}
                                        </div>
                                        <div class="article-content">
                                            <div class="article-meta">
                                                <span class="article-platform">{article.platform}</span>
                                                <span class="article-date">{article.date}</span>
                                                <span class="article-read-time">• {article.readTime}</span>
                                            </div>
                                            <h3 class="article-title">{article.title}</h3>
                                            <p class="article-excerpt">{article.excerpt}</p>
                                        </div>
                                    </a>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </Show>
        </section>
    )
}

export default Hero
