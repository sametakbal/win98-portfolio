# Windows 98 Portfolio 🪟

A nostalgic Windows 98-themed personal portfolio website built with SolidJS and TypeScript. Perfect for developers who want to showcase their work with a retro aesthetic!

![Windows 98 Portfolio](./public/screenshot.png)

## ✨ Features

- 🪟 **Authentic Windows 98 UI** - Classic window styling, taskbar, and start menu
- 🎮 **Interactive Minesweeper** - Fully functional game just like the original
- 🌐 **Internet Explorer Window** - Browse vintage web pages in nostalgic IE style
- 🌍 **Multilingual Support** - Built-in Turkish and English translations
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 💻 **Multiple Windows** - Open several windows simultaneously
- 🎨 **Customizable** - Easy to personalize with your own information
- 🖱️ **Draggable Windows** - Classic Windows 98 window management
- 📋 **About Section** - Personal information and social links
- 📁 **Projects Showcase** - Display your work with tags and descriptions
- 📝 **Articles & Videos** - Share your content from Medium, YouTube, etc.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/sametakbal/sametakbal-dev.git
cd sametakbal-dev
```

1. Install dependencies

```bash
npm install
```

1. Start the development server

```bash
npm run dev
```

1. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready to be deployed!

## 🎨 Customization Guide

### Personal Information

Edit `src/components/Hero.tsx` to update your personal information in the About window:

```tsx
// About section (around line 200)
<h2>Your Name</h2>
<p><strong>Title:</strong> Your Job Title</p>
<p><strong>Experience:</strong> X+ years</p>
<p><strong>Specialization:</strong> Your Skills</p>
<p>Your bio description...</p>
```

### Projects

Update your projects array in `src/components/Hero.tsx`:

```tsx
const projects: Project[] = [
    {
        id: 1,
        title: 'Project Name',
        description: 'Project description in Turkish or your language',
        tags: ['Tech1', 'Tech2', 'Tech3'],
        year: '2024',
    },
    // Add more projects...
]
```

### Articles & Videos

Customize your articles in `src/components/Hero.tsx`:

```tsx
const articles: Article[] = [
    {
        id: 1,
        title: 'Article Title',
        excerpt: 'Brief description of your article',
        date: '2024',
        readTime: '10 dk', // or '10 min'
        link: 'https://your-article-link.com',
        platform: 'medium', // or 'youtube'
    },
    // Add more articles...
]
```

### Social Media Links

Update social media links in the About window (`src/components/Hero.tsx`, around line 220):

```tsx
<a href="https://github.com/yourusername" target="_blank">
<a href="https://linkedin.com/in/yourusername" target="_blank">
<a href="https://youtube.com/@yourchannel" target="_blank">
<a href="https://yourmedium.medium.com/" target="_blank">
<a href="https://twitter.com/yourusername" target="_blank">
```

### Language Translations

Add or modify translations in `src/contexts/LanguageContext.tsx`:

```tsx
const translations = {
    tr: {
        start: 'Başlat',
        about: 'Hakkımda',
        // ... add more Turkish translations
    },
    en: {
        start: 'Start',
        about: 'About',
        // ... add more English translations
    }
}
```

You can also add more languages by extending this object!

### Background Image

Replace the background image:

1. Add your image to `public/` folder (e.g., `my-background.jpg`)
2. Update the path in `src/index.css`:

```css
body {
  background: #008080 url('/my-background.jpg') center center / cover no-repeat;
}
```

Or use the classic Windows 98 cloud gradient (already included)!

### Desktop Icons

Customize or add desktop icons in `src/components/Hero.tsx`:

```tsx
<div class="desktop-icon" onClick={() => openWindowHandler('yourwindow')}>
    <div class="icon-image">🎯</div>
    <div class="icon-label">{t('yourLabel')}</div>
</div>
```

### Internet Explorer Start URL

Change the vintage webpage URL in `src/components/Hero.tsx` (Internet Explorer window section):

```tsx
<iframe 
    src="https://your-favorite-vintage-url.com"
    class="ie-iframe"
    title="Internet Explorer"
/>
```

## 🛠️ Built With

- **[SolidJS](https://www.solidjs.com/)** - Reactive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **CSS3** - Authentic Windows 98 styling

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── About.css/tsx         # About window styles
│   │   ├── Articles.css/tsx      # Articles window
│   │   ├── Footer.css/tsx        # Taskbar and start menu
│   │   ├── Hero.css/tsx          # Main desktop and windows
│   │   ├── Minesweeper.css/tsx   # Minesweeper game
│   │   └── Projects.css/tsx      # Projects window
│   ├── contexts/
│   │   └── LanguageContext.tsx   # Internationalization
│   ├── App.css/tsx               # Main app component
│   ├── index.css                 # Global styles and Windows 98 theme
│   └── index.tsx                 # Application entry point
├── public/
│   ├── windows98wallpaper.jpg    # Background image
│   └── cursor.png                # Custom cursor (optional)
└── README.md
```

## 🎮 Features in Detail

### Draggable Windows

All windows can be dragged around the screen by clicking and holding the title bar - just like in Windows 98!

### Minesweeper Game

A fully functional Minesweeper game featuring:

- 9x9 grid with 10 mines
- Left click to reveal cells
- Right click to place/remove flags
- Automatic cascade reveal for empty cells
- Win/lose detection with emoji feedback
- Reset button to start a new game
- Mine counter

### Internet Explorer Window

Browse the web in style with an authentic IE-style window:

- Classic menu bar (File, Edit, View, Favorites, Tools, Help)
- Address bar with URL display
- Go button
- Embedded iframe for web content
- Defaults to 1999 Google from Web Archive

### Start Menu

Access system features through the classic Windows 98 start menu:

- Language selection (Turkish/English)
- Windows 98 sidebar branding
- Hover effects and submenus

### Taskbar

Bottom taskbar shows:

- Start button with Windows logo
- Open window indicators
- System tray with volume and clock
- Active window highlighting

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sametakbal/sametakbal-dev/issues).

### How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by the nostalgic Windows 98 operating system
- Microsoft for the iconic Windows 98 design
- Web Archive for preserving internet history
- The Solid.js team for an amazing framework

## 👤 Author

**Samet Akbal**

- Website: [sametakbal.com](https://www.sametakbal.com/)
- GitHub: [@sametakbal](https://github.com/sametakbal)
- LinkedIn: [@sametakbal](https://www.linkedin.com/in/sametakbal)
- YouTube: [@SametAkbal](https://www.youtube.com/@SametAkbal)
- Medium: [@sametakbal](https://sametakbal.medium.com/)
- Twitter: [@akbaldev](https://x.com/akbaldev)

## 💡 Use Cases

This template is perfect for:

- Software developers wanting a unique portfolio
- Retro computing enthusiasts
- 90s nostalgia lovers
- Anyone who wants to stand out with a memorable design
- Educational projects about web development
- Fun side projects

## 🚀 Deployment

This site can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Cloudflare Pages**: Connect your repository

Learn more about [deploying Vite apps](https://vitejs.dev/guide/static-deploy.html)

---

Made with ❤️ and nostalgia for the 90s

⭐ If you like this project, please give it a star on GitHub!
