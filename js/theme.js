/* ============================================
   THEME SYSTEM
   Dark/Light mode with localStorage persistence
   ============================================ */

const ThemeManager = {
    STORAGE_KEY: 'portfolio-theme',

    init() {
        this.toggle = document.getElementById('theme-toggle');
        if (!this.toggle) return;

        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.set(saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.set('dark');
        }

        this.toggle.addEventListener('click', () => this.toggleTheme());

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.set(e.matches ? 'dark' : 'light');
            }
        });
    },

    get() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },

    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateIcon(theme);
    },

    toggleTheme() {
        const current = this.get();
        const next = current === 'dark' ? 'light' : 'dark';
        this.set(next);
    },

    updateIcon(theme) {
        if (!this.toggle) return;
        this.toggle.textContent = theme === 'dark' ? '☀' : '☾';
        this.toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
};
