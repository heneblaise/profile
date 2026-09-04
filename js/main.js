/* ============================================
   MAIN JAVASCRIPT
   Navigation, Projects, Modals, Forms, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    Navigation.init();
    HeroRotator.init();
    ProjectsEngine.init();
    ProjectExplorer.init();
    ExperimentsRenderer.init();
    CurrentlyBuildingRenderer.init();
    ContactForm.init();
    AnimationManager.init();
    AnimationManager.animateCounters();
    FooterYear.init();
});

/* --- Navigation --- */
const Navigation = {
    navbar: null,
    hamburger: null,
    mobileMenu: null,
    links: [],

    init() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.links = document.querySelectorAll('.nav-links a, .mobile-menu a');

        if (!this.navbar) return;

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.onScroll();

        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        this.links.forEach((link) => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });

        document.addEventListener('click', (e) => {
            if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
                if (!this.mobileMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                    this.closeMenu();
                }
            }
        });

        this.setActiveLink();
        window.addEventListener('scroll', () => this.setActiveLink(), { passive: true });
    },

    onScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    toggleMenu() {
        const isOpen = this.mobileMenu.classList.contains('open');
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    },

    openMenu() {
        this.mobileMenu.classList.add('open');
        this.hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.hamburger.setAttribute('aria-expanded', 'true');
    },

    closeMenu() {
        this.mobileMenu.classList.remove('open');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
        this.hamburger.setAttribute('aria-expanded', 'false');
    },

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                this.links.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* --- Hero Title Rotator --- */
const HeroRotator = {
    titles: ['Web Developer', 'Frontend Developer', 'UI Designer', 'Creator'],
    index: 0,
    element: null,

    init() {
        this.element = document.getElementById('hero-title');
        if (!this.element) return;

        this.element.textContent = this.titles[0];
        setInterval(() => this.rotate(), 2500);
    },

    rotate() {
        this.index = (this.index + 1) % this.titles.length;
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            this.element.textContent = this.titles[this.index];
            this.element.style.opacity = '1';
            this.element.style.transform = 'translateY(0)';
        }, 300);
    }
};

/* --- Projects Engine --- */
const ProjectsEngine = {
    container: null,

    init() {
        this.container = document.getElementById('featured-projects-grid');
        if (!this.container) return;
        this.renderFeatured();
    },

    renderFeatured() {
        const featured = projects.filter((p) => p.featured);
        this.container.innerHTML = featured.map((p) => this.cardHTML(p)).join('');
    },

    cardHTML(project) {
        const statusClass = project.status.replace(/\s+/g, '-').toLowerCase();
        const techTags = project.technologies.map((t) => `<span class="tag">${t}</span>`).join('');

        return `
            <article class="project-card animate-on-scroll animate-fade-up" data-id="${project.id}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title} screenshot" loading="lazy" onerror="this.style.display='none'">
                </div>
                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-status ${statusClass}">${this.formatStatus(project.status)}</span>
                        <span class="project-year">${project.year}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">${techTags}</div>
                    <div class="project-links">
                        <a href="${project.liveDemo}" class="btn btn-primary btn-sm" target="_blank" rel="noopener" aria-label="Live demo of ${project.title}">Live Demo</a>
                        <a href="${project.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener" aria-label="GitHub repository of ${project.title}">GitHub</a>
                    </div>
                </div>
            </article>
        `;
    },

    formatStatus(status) {
        return status.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
};

/* --- Project Explorer --- */
const ProjectExplorer = {
    grid: null,
    filters: [],
    searchInput: null,
    countEl: null,
    activeFilter: 'all',

    init() {
        this.grid = document.getElementById('explorer-grid');
        this.searchInput = document.getElementById('project-search');
        this.countEl = document.getElementById('projects-count');
        this.filters = document.querySelectorAll('.explorer-filters .filter-btn');

        if (!this.grid) return;

        this.renderAll();

        this.filters.forEach((btn) => {
            btn.addEventListener('click', () => {
                this.filters.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeFilter = btn.dataset.filter;
                this.renderAll();
            });
        });

        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.renderAll());
        }
    },

    getFiltered() {
        let list = [...projects];
        if (this.activeFilter !== 'all') {
            list = list.filter((p) => p.category === this.activeFilter);
        }
        const query = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';
        if (query) {
            list = list.filter((p) =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.technologies.some((t) => t.toLowerCase().includes(query))
            );
        }
        return list;
    },

    renderAll() {
        const filtered = this.getFiltered();
        if (this.countEl) {
            this.countEl.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`;
        }
        this.grid.innerHTML = filtered.map((p) => ProjectsEngine.cardHTML(p)).join('');

        if (!filtered.length) {
            this.grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:var(--spacing-3xl) 0;">No projects found matching your criteria.</p>`;
        }

        AnimationManager.init();
    }
};

/* --- Modal --- */
const Modal = {
    overlay: null,

    init() {
        this.overlay = document.getElementById('modal-overlay');
        if (!this.overlay) return;

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('open')) {
                this.close();
            }
        });
    },

    open(projectId) {
        const project = projects.find((p) => p.id === projectId);
        if (!project || !this.overlay) return;

        const modal = this.overlay.querySelector('.modal');
        const statusClass = project.status.replace(/\s+/g, '-').toLowerCase();

        modal.innerHTML = `
            <button class="modal-close" aria-label="Close modal" onclick="Modal.close()">✕</button>
            <div class="modal-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
            </div>
            <div class="modal-body">
                <div class="project-meta" style="margin-bottom:0.75rem">
                    <span class="project-status ${statusClass}">${ProjectsEngine.formatStatus(project.status)}</span>
                    <span class="project-year">${project.year}</span>
                </div>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="modal-technologies">
                    ${project.technologies.map((t) => `<span class="tag">${t}</span>`).join('')}
                </div>
                ${project.features ? `
                <div class="modal-features">
                    <h3>Features</h3>
                    <ul>
                        ${project.features.map((f) => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                <div class="modal-actions">
                    <a href="${project.liveDemo}" class="btn btn-primary" target="_blank" rel="noopener">Live Demo</a>
                    <a href="${project.github}" class="btn btn-outline" target="_blank" rel="noopener">GitHub</a>
                </div>
            </div>
        `;

        this.overlay.classList.add('open');
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    },

    close() {
        if (!this.overlay) return;
        this.overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
};

document.addEventListener('DOMContentLoaded', () => Modal.init());

/* --- Experiments Renderer --- */
const ExperimentsRenderer = {
    init() {
        const container = document.getElementById('experiments-grid');
        if (!container) return;

        container.innerHTML = experiments.map((exp) => `
            <a href="${exp.link}" class="experiment-card animate-on-scroll animate-fade-up" target="_blank" rel="noopener">
                <div class="experiment-icon">${exp.icon}</div>
                <div class="experiment-info">
                    <div class="experiment-name">${exp.name}</div>
                    <div class="experiment-desc">${exp.description}</div>
                </div>
                <span class="experiment-arrow">→</span>
            </a>
        `).join('');
    }
};

/* --- Currently Building Renderer --- */
const CurrentlyBuildingRenderer = {
    init() {
        const container = document.getElementById('currently-building');
        if (!container) return;

        const data = currentlyBuilding;
        container.innerHTML = `
            <div class="building-card animate-on-scroll animate-fade-up">
                <div class="building-header">
                    <div>
                        <span class="building-badge">In Development</span>
                        <h3 class="building-title">${data.title}</h3>
                    </div>
                </div>
                <div class="building-progress">
                    <div class="progress-bar-wrapper">
                        <div class="progress-bar" style="width: ${data.progress}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>Progress</span>
                        <span>${data.progress}%</span>
                    </div>
                </div>
                <div class="building-tasks">
                    <h4>Current: ${data.currentTask}</h4>
                    <div class="task-list">
                        ${data.tasks.map((t) => `
                            <div class="task-item ${t.done ? 'done' : ''}">
                                <span class="task-check">${t.done ? '✓' : ''}</span>
                                <span>${t.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};

/* --- Contact Form --- */
const ContactForm = {
    form: null,

    init() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.form.querySelectorAll('input, textarea').forEach((field) => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                const group = field.closest('.form-group');
                if (group && group.classList.contains('error')) {
                    this.validateField(field);
                }
            });
        });
    },

    validateField(field) {
        const group = field.closest('.form-group');
        const errorEl = group ? group.querySelector('.form-error') : null;
        let valid = true;
        let message = '';

        if (!field.value.trim()) {
            valid = false;
            message = 'This field is required.';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            valid = false;
            message = 'Please enter a valid email address.';
        }

        if (group) {
            group.classList.toggle('error', !valid);
        }
        if (errorEl) {
            errorEl.textContent = message;
        }

        return valid;
    },

    handleSubmit(e) {
        e.preventDefault();

        const fields = this.form.querySelectorAll('input, textarea');
        let allValid = true;

        fields.forEach((field) => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });

        if (!allValid) return;

        const statusEl = this.form.querySelector('.form-status');
        const submitBtn = this.form.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            this.form.reset();

            if (statusEl) {
                statusEl.className = 'form-status success';
                statusEl.textContent = '✓ Message sent successfully!';
                setTimeout(() => {
                    statusEl.className = 'form-status';
                    statusEl.textContent = '';
                }, 5000);
            }
        }, 1500);
    }
};

/* --- Footer Year --- */
const FooterYear = {
    init() {
        const el = document.getElementById('current-year');
        if (el) el.textContent = new Date().getFullYear();
    }
};
