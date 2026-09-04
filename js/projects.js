/* ============================================
   PROJECT DATA
   Edit this file to update your portfolio.
   ============================================ */

const projects = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A full-featured admin dashboard with real-time analytics, inventory management, and responsive data visualizations built from scratch.",
        category: "web-app",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-01.webp",
        year: "2026",
        status: "completed",
        featured: true,
        liveDemo: "#",
        github: "#",
        features: [
            "Real-time analytics dashboard",
            "Inventory management system",
            "Responsive data tables",
            "Dark mode support",
            "Export to CSV functionality"
        ]
    },
    {
        id: 2,
        title: "Weather Application",
        description: "A clean, minimal weather app that fetches real-time weather data and displays forecasts with beautiful weather icons.",
        category: "web-app",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-02.webp",
        year: "2026",
        status: "completed",
        featured: true,
        liveDemo: "#",
        github: "#",
        features: [
            "Geolocation-based weather",
            "5-day forecast",
            "Hourly temperature charts",
            "Search by city",
            "Unit conversion (C/F)"
        ]
    },
    {
        id: 3,
        title: "Pixel Dungeon",
        description: "A retro-styled roguelike dungeon crawler with procedurally generated levels, pixel art aesthetics, and turn-based combat.",
        category: "game",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-03.webp",
        year: "2025",
        status: "completed",
        featured: true,
        liveDemo: "#",
        github: "#",
        features: [
            "Procedural level generation",
            "Turn-based combat system",
            "Inventory & item system",
            "Pixel art animations",
            "Progressive difficulty"
        ]
    },
    {
        id: 4,
        title: "Markdown Editor",
        description: "A live markdown editor with preview, syntax highlighting, and export capabilities for writers and developers.",
        category: "tool",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-04.webp",
        year: "2026",
        status: "completed",
        featured: false,
        liveDemo: "#",
        github: "#",
        features: [
            "Live preview",
            "Syntax highlighting",
            "Export to HTML/PDF",
            "Auto-save",
            "Custom themes"
        ]
    },
    {
        id: 5,
        title: "Portfolio Generator",
        description: "A static site generator that creates portfolio websites from JSON configuration files.",
        category: "tool",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-05.webp",
        year: "2025",
        status: "completed",
        featured: false,
        liveDemo: "#",
        github: "#",
        features: [
            "JSON-based configuration",
            "Multiple themes",
            "Responsive output",
            "SEO optimized",
            "One-click deploy"
        ]
    },
    {
        id: 6,
        title: "Snake Game",
        description: "A modern take on the classic Snake game with smooth animations, score tracking, and multiple difficulty levels.",
        category: "game",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-06.webp",
        year: "2025",
        status: "completed",
        featured: false,
        liveDemo: "#",
        github: "#",
        features: [
            "Smooth CSS animations",
            "High score tracking",
            "3 difficulty levels",
            "Mobile touch controls",
            "Local storage persistence"
        ]
    },
    {
        id: 7,
        title: "Task Manager Pro",
        description: "A productivity-focused task management application with drag-and-drop, categories, and progress tracking.",
        category: "web-app",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-07.webp",
        year: "2026",
        status: "in-development",
        featured: true,
        liveDemo: "#",
        github: "#",
        features: [
            "Drag-and-drop interface",
            "Priority levels",
            "Due date tracking",
            "Category management",
            "Progress statistics"
        ]
    },
    {
        id: 8,
        title: "Landing Page Template",
        description: "A clean, conversion-focused landing page template with animated sections and contact form integration.",
        category: "website",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "assets/images/project-08.webp",
        year: "2025",
        status: "completed",
        featured: false,
        liveDemo: "#",
        github: "#",
        features: [
            "Fully responsive",
            "Animated sections",
            "Contact form",
            "Performance optimized",
            "Cross-browser tested"
        ]
    }
];

const experiments = [
    {
        name: "Canvas Particles",
        description: "Interactive particle system on HTML5 Canvas",
        icon: "✦",
        link: "#"
    },
    {
        name: "CSS Art Gallery",
        description: "Pure CSS illustrations and animations",
        icon: "◈",
        link: "#"
    },
    {
        name: "Music Visualizer",
        description: "Audio-reactive visual patterns",
        icon: "♫",
        link: "#"
    },
    {
        name: "Color Palette Gen",
        description: "Generate harmonious color schemes",
        icon: "◆",
        link: "#"
    },
    {
        name: "Typing Speed Test",
        description: "Measure your words-per-minute",
        icon: "⌨",
        link: "#"
    },
    {
        name: "Memory Match",
        description: "Card matching memory game",
        icon: "🃏",
        link: "#"
    }
];

const currentlyBuilding = {
    title: "Real-Time Quiz Battle",
    progress: 75,
    currentTask: "Multiplayer synchronization",
    tasks: [
        { text: "Quiz database system", done: true },
        { text: "Real-time question sync", done: true },
        { text: "Multiplayer system", done: false },
        { text: "Scoring & leaderboard", done: false }
    ]
};
