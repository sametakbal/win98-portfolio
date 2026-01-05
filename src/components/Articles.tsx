import { For } from 'solid-js'
import type { Component } from 'solid-js'
import './Articles.css'

interface Article {
    id: number
    title: string
    excerpt: string
    date: string
    readTime: string
    tags: string[]
    link: string
    platform: 'medium' | 'youtube'
}

const Articles: Component = () => {
    const articles: Article[] = [
        {
            id: 1,
            title: 'Spring Boot ile Mikroservis Mimarisine Giriş',
            excerpt: 'Modern yazılım geliştirmede mikroservis mimarisinin temellerini, Spring Boot ekosistemiyle nasıl uygulanacağını ve best practice\'leri detaylı bir şekilde inceliyoruz.',
            date: '2024',
            readTime: '12 dk',
            tags: ['Spring Boot', 'Microservices', 'Java'],
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
        {
            id: 2,
            title: 'gRPC vs REST: Performans Karşılaştırması',
            excerpt: 'gRPC ve REST API\'ların avantajları, dezavantajları ve gerçek dünya senaryolarında performans karşılaştırmaları.',
            date: '2024',
            readTime: '15 dk',
            tags: ['gRPC', 'REST', 'API Design'],
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
        {
            id: 3,
            title: 'Java Spring Boot Tutorial - Başlangıçtan İleri Seviyeye',
            excerpt: 'Spring Boot framework\'ünü sıfırdan öğrenmek isteyenler için kapsamlı video eğitim serisi. Pratik örnekler ve gerçek projelerle.',
            date: '2024',
            readTime: '2 saat',
            tags: ['Spring Boot', 'Tutorial', 'Java'],
            link: 'https://www.youtube.com/@SametAkbal',
            platform: 'youtube',
        },
        {
            id: 4,
            title: 'Docker ve Kubernetes ile Container Orchestration',
            excerpt: 'Container teknolojileri ve Kubernetes ile mikroservislerin nasıl yönetileceği hakkında detaylı rehber.',
            date: '2024',
            readTime: '18 dk',
            tags: ['Docker', 'Kubernetes', 'DevOps'],
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
        {
            id: 5,
            title: 'Event-Driven Architecture ve Apache Kafka',
            excerpt: 'Olay güdümlü mimari yaklaşımı ve Apache Kafka ile gerçek zamanlı veri işleme sistemlerinin tasarımı.',
            date: '2024',
            readTime: '20 dk',
            tags: ['Kafka', 'Event-Driven', 'Architecture'],
            link: 'https://sametakbal.medium.com/',
            platform: 'medium',
        },
        {
            id: 6,
            title: 'Design Patterns ve Clean Code Prensipleri',
            excerpt: 'Yazılım geliştirmede sıkça kullanılan tasarım kalıpları ve temiz kod yazmanın püf noktaları.',
            date: '2024',
            readTime: '1.5 saat',
            tags: ['Design Patterns', 'Clean Code', 'Best Practices'],
            link: 'https://www.youtube.com/@SametAkbal',
            platform: 'youtube',
        },
    ]

    return (
        <section class="articles" id="articles">
            <div class="container">
                <div class="window">
                    <div class="window-titlebar">
                        <span>📝 Yazılar & Videolar - Internet Explorer</span>
                        <div class="titlebar-buttons">
                            <button class="titlebar-button">_</button>
                            <button class="titlebar-button">□</button>
                            <button class="titlebar-button">×</button>
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
            </div>
        </section>
    )
}

export default Articles
