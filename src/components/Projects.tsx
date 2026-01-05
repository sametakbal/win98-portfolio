import { For } from 'solid-js'
import type { Component } from 'solid-js'
import './Projects.css'

interface Project {
    id: number
    title: string
    description: string,
    technologies?: string[],
    featured?: string,
    tags: string[]
    year: string
}

const Projects: Component = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: 'Microservices E-Commerce',
            description: 'High-performance e-commerce system built with Spring Boot and gRPC.',
            technologies: ['Java', 'Spring Boot', 'gRPC', 'PostgreSQL'],
            featured: 'Yüksek performanslı e- ticaret sistemi(Spring Boot, gRPC)',
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

    return (
        <section class="projects" id="projects" >
            <div class="container">
                <div class="window">
                    <div class="window-titlebar">
                        <span>📁 My Projects - Windows Explorer</span>
                        <div class="titlebar-buttons">
                            <button class="titlebar-button">_</button>
                            <button class="titlebar-button">□</button>
                            <button class="titlebar-button">×</button>
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
            </div>
        </section >
    )
}

export default Projects
