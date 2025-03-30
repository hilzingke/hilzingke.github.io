// Lade die Navigation
fetch('/navigation.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navigation-container').innerHTML = html;
        
        // Event Listener für das mobile Menü
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Event Listener für die Sprachauswahl
        const langDropdownButton = document.getElementById('lang-dropdown-button');
        const langDropdown = document.getElementById('lang-dropdown');
        const currentLangEmoji = document.getElementById('current-lang-emoji');

        if (langDropdownButton && langDropdown) {
            // Toggle Dropdown
            langDropdownButton.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('hidden');
            });

            // Schließe Dropdown bei Klick außerhalb
            document.addEventListener('click', (e) => {
                if (!langDropdown.contains(e.target) && !langDropdownButton.contains(e.target)) {
                    langDropdown.classList.add('hidden');
                }
            });

            // Sprachauswahl
            const langLinks = document.querySelectorAll('[data-lang]');
            langLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = link.getAttribute('data-lang');
                    const emoji = link.getAttribute('data-emoji');
                    
                    // Speichere die ausgewählte Sprache
                    localStorage.setItem('selectedLanguage', lang);
                    
                    // Aktualisiere die UI
                    if (currentLangEmoji) {
                        currentLangEmoji.textContent = emoji;
                    }
                    
                    // Schließe das Dropdown
                    langDropdown.classList.add('hidden');
                    
                    // Aktualisiere alle Übersetzungen
                    updatePageTranslations();
                });
            });

            // Setze die aktuelle Sprache
            const currentLang = localStorage.getItem('selectedLanguage') || 'de';
            const currentLangLink = document.querySelector(`[data-lang="${currentLang}"]`);
            if (currentLangLink) {
                const emoji = currentLangLink.getAttribute('data-emoji');
                if (currentLangEmoji) {
                    currentLangEmoji.textContent = emoji;
                }
            }
        }

        // Setze aktiven Menüpunkt basierend auf der aktuellen URL
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('border-blue-500', 'text-gray-900');
            }
        });

        // Aktualisiere alle Übersetzungen
        updatePageTranslations();
    })
    .catch(error => console.error('Fehler beim Laden der Navigation:', error));

function updateLanguageUI(lang, emoji) {
    // Aktualisiere das aktuelle Sprach-Emoji
    const currentLangEmoji = document.getElementById('current-lang-emoji');
    if (currentLangEmoji) {
        currentLangEmoji.textContent = emoji;
    }
} 