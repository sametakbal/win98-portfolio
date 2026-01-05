import type { Component } from 'solid-js'
import './About.css'

const About: Component = () => {
    const skills = [
        { icon: '☕', name: 'Java & Spring Boot' },
        { icon: '🏗️', name: 'Microservices Architecture' },
        { icon: '🔌', name: 'gRPC & REST APIs' },
        { icon: '💾', name: 'Database Design' },
        { icon: '☁️', name: 'Cloud Solutions' },
        { icon: '🎯', name: 'System Design' },
    ]

    return (
        <section class="about" id="about">
            <div class="container">
                <div class="window">
                    <div class="window-titlebar">
                        <span>📊 Skills and Experience</span>
                        <div class="titlebar-buttons">
                            <button class="titlebar-button">_</button>
                            <button class="titlebar-button">□</button>
                            <button class="titlebar-button">×</button>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="about-content">
                            <div class="about-text">
                                <h3>Experience</h3>
                                <p>
                                    Backend developer with 4+ years of experience building scalable systems.
                                    Specialized in Java, Spring Boot, and microservices architecture.
                                </p>
                                <p>
                                    I create educational content on YouTube and Medium, sharing software engineering
                                    principles and best practices with the community.
                                </p>
                            </div>
                            <div class="skills-list">
                                <h3>Technical Skills</h3>
                                {skills.map((skill) => (
                                    <div class="skill-card">
                                        <div class="skill-icon">{skill.icon}</div>
                                        <div class="skill-name">{skill.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
