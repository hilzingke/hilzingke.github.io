const translations = {
    de: {
        nav: {
            home: 'Startseite',
            emailAnonymizer: 'E-Mail Anonymisierer',
            language: 'Sprache'
        },
        home: {
            title: 'Willkommen bei Hilzingke Tools',
            description: 'Entdecken Sie unsere nützlichen Online-Tools für verschiedene Aufgaben.',
            tools: {
                emailAnonymizer: {
                    title: 'E-Mail Anonymisierer',
                    description: 'Anonymisieren Sie E-Mail-Adressen in Ihren Texten mit verschiedenen Methoden.'
                }
            }
        },
        emailAnonymizer: {
            title: 'E-Mail Anonymisierer',
            description: 'Anonymisieren Sie E-Mail-Adressen in Ihren Texten mit verschiedenen Methoden.',
            inputLabel: 'Eingabetext:',
            inputPlaceholder: 'Geben Sie hier Ihren Text ein...',
            methodLabel: 'Anonymisierungsmethode:',
            methods: {
                hashLocal: 'Hash des lokalen Teils',
                hashFull: 'Hash der gesamten E-Mail (ohne TLD)',
                preserve: 'Format erhalten'
            },
            anonymizeButton: 'Anonymisieren',
            outputLabel: 'Ergebnis:',
            copyButton: 'Kopieren',
            copiedButton: 'Kopiert!'
        },
        footer: {
            copyright: '© 2024 Hilzingke Tools. Alle Rechte vorbehalten.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            emailAnonymizer: 'Email Anonymizer',
            language: 'Language'
        },
        home: {
            title: 'Welcome to Hilzingke Tools',
            description: 'Discover our useful online tools for various tasks.',
            tools: {
                emailAnonymizer: {
                    title: 'Email Anonymizer',
                    description: 'Anonymize email addresses in your texts using various methods.'
                }
            }
        },
        emailAnonymizer: {
            title: 'Email Anonymizer',
            description: 'Anonymize email addresses in your texts using various methods.',
            inputLabel: 'Input text:',
            inputPlaceholder: 'Enter your text here...',
            methodLabel: 'Anonymization method:',
            methods: {
                hashLocal: 'Hash local part',
                hashFull: 'Hash full email (without TLD)',
                preserve: 'Preserve format'
            },
            anonymizeButton: 'Anonymize',
            outputLabel: 'Result:',
            copyButton: 'Copy',
            copiedButton: 'Copied!'
        },
        footer: {
            copyright: '© 2024 Hilzingke Tools. All rights reserved.'
        }
    }
};

// Funktion zum Abrufen der Übersetzung
function translate(key) {
    const currentLang = localStorage.getItem('selectedLanguage') || 'de';
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
        value = value[k];
        if (!value) return key;
    }
    
    return value;
}

// Funktion zum Aktualisieren aller Übersetzungen auf der Seite
function updatePageTranslations() {
    // Aktualisiere Texte mit data-translate Attribut
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key);
    });

    // Aktualisiere Placeholder mit data-translate-placeholder Attribut
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key);
    });
} 