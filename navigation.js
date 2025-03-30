// Lade die Navigation
fetch('/navigation.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navigation-container').innerHTML = html;
        
        // Setze aktiven Menüpunkt basierend auf der aktuellen URL
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.nav-link');
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('text-blue-600');
            }
        });

        // Event-Listener für das mobile Menü
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Event-Listener für die Sprachauswahl
        const languageButton = document.getElementById('language-button');
        const languageDropdown = document.getElementById('language-dropdown');
        const languageLinks = document.querySelectorAll('.language-link');

        if (languageButton && languageDropdown) {
            // Toggle Dropdown
            languageButton.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('hidden');
            });

            // Schließe Dropdown bei Klick außerhalb
            document.addEventListener('click', (e) => {
                if (!languageDropdown.contains(e.target) && !languageButton.contains(e.target)) {
                    languageDropdown.classList.add('hidden');
                }
            });

            // Event-Listener für die Sprachauswahl
            languageLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = link.getAttribute('data-lang');
                    localStorage.setItem('selectedLanguage', lang);
                    
                    // Aktualisiere die UI
                    updateLanguageUI();
                    
                    // Schließe das Dropdown
                    languageDropdown.classList.add('hidden');
                    
                    // Löse das languageChanged Event aus
                    document.dispatchEvent(new Event('languageChanged'));
                });
            });
        }

        // Initialisiere die Sprachauswahl
        updateLanguageUI();
    })
    .catch(error => console.error('Fehler beim Laden der Navigation:', error));

// Funktion zum Aktualisieren der Sprachauswahl-UI
function updateLanguageUI() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'de';
    const languageButton = document.getElementById('language-button');
    const languageLinks = document.querySelectorAll('.language-link');
    
    if (languageButton) {
        // Aktualisiere das Emoji basierend auf der ausgewählten Sprache
        const emoji = currentLang === 'de' ? '🇩🇪' : '🇬🇧';
        languageButton.querySelector('span').textContent = emoji;
    }
    
    // Aktualisiere die aktive Sprache in der Dropdown-Liste
    languageLinks.forEach(link => {
        if (link.getAttribute('data-lang') === currentLang) {
            link.classList.add('bg-gray-100');
        } else {
            link.classList.remove('bg-gray-100');
        }
    });
} 