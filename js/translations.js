const translations = {
    de: {
        nav: {
            home: 'Startseite',
            emailAnonymizer: 'E-Mail Anonymisierer',
            language: 'Sprache'
        },
        index: {
            title: 'dataduce - Tools für die Datenverarbeitung',
            welcome: 'Willkommen bei dataduce',
            subtitle: 'Ihre Tools für die Datenverarbeitung',
            openTool: 'Tool öffnen'
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
            description: 'Anonymisieren Sie E-Mail-Adressen in Texten mit verschiedenen Methoden.',
            inputLabel: 'Eingabetext',
            inputPlaceholder: 'Fügen Sie hier Ihren Text ein...',
            methodLabel: 'Anonymisierungsmethode (am Beispiel von max.mustermann@example.com)',
            methods: {
                local: 'f2ijr9foer1fj@example.com - nur lokaler Teil',
                full: 'f2ijr9foer1fj@greig42.com - Ganze E-Mail (außer TLD)',
                preserve: 'f2i.jr9foer1fj@greig42.com - Lokaler Teil mit Sonderzeichen'
            },
            outputLabel: 'Anonymisierter Text',
            resetButton: 'Zurücksetzen',
            copyButton: 'Kopieren',
            explanation: {
                title: 'Wie funktioniert der E-Mail Anonymisierer?',
                description: 'Der E-Mail Anonymisierer ist ein Tool, das E-Mail-Adressen in Ihren Texten automatisch anonymisiert. Dies ist besonders nützlich, wenn Sie Dokumente oder Texte veröffentlichen möchten, ohne persönliche E-Mail-Adressen preiszugeben.',
                methodsTitle: 'Verfügbare Anonymisierungsmethoden:',
                methods: {
                    local: {
                        title: 'Nur lokaler Teil (vor @):',
                        description: 'Nur der Teil vor dem @-Zeichen wird anonymisiert. Die Domain bleibt erhalten.'
                    },
                    full: {
                        title: 'Ganze E-Mail (außer TLD):',
                        description: 'Die komplette E-Mail-Adresse wird anonymisiert, nur die Top-Level-Domain (z.B. .com, .de) bleibt erhalten.'
                    },
                    preserve: {
                        title: 'Lokaler Teil mit Punkten und Minus:',
                        description: 'Der Teil vor dem @ wird anonymisiert, wobei die Struktur (Punkte und Minuszeichen) erhalten bleibt.'
                    }
                },
                example: {
                    title: 'Beispiel:',
                    text: 'max.mustermann@example.com → abc.defghijklm@example.com'
                },
                privacy: 'Hinweis: Die Anonymisierung erfolgt clientseitig in Ihrem Browser. Ihre Daten werden nicht an unseren Server gesendet.'
            }
        },
        footer: {
            copyright: '© 2024 dataduce. Alle Rechte vorbehalten.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            emailAnonymizer: 'Email Anonymizer',
            language: 'Language'
        },
        index: {
            title: 'dataduce - Data Processing Tools',
            welcome: 'Welcome to dataduce',
            subtitle: 'Your tools for data processing',
            openTool: 'Open Tool'
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
            inputLabel: 'Input Text',
            inputPlaceholder: 'Enter your text here...',
            methodLabel: 'Anonymization Method (example: max.mustermann@example.com)',
            methods: {
                local: 'f2ijr9foer1fj@example.com - local part only',
                full: 'f2ijr9foer1fj@greig42.com - full email (except TLD)',
                preserve: 'f2i.jr9foer1fj@greig42.com - local part with special characters'
            },
            outputLabel: 'Anonymized Text',
            resetButton: 'Reset',
            copyButton: 'Copy',
            explanation: {
                title: 'How does the Email Anonymizer work?',
                description: 'The Email Anonymizer is a tool that automatically anonymizes email addresses in your texts. This is particularly useful when you want to publish documents or texts without revealing personal email addresses.',
                methodsTitle: 'Available Anonymization Methods:',
                methods: {
                    local: {
                        title: 'Local Part Only (before @):',
                        description: 'Only the part before the @ symbol is anonymized. The domain remains unchanged.'
                    },
                    full: {
                        title: 'Full Email (except TLD):',
                        description: 'The entire email address is anonymized, only the top-level domain (e.g., .com, .de) remains unchanged.'
                    },
                    preserve: {
                        title: 'Local Part with Dots and Minus:',
                        description: 'The part before @ is anonymized while preserving the structure (dots and minus signs).'
                    }
                },
                example: {
                    title: 'Example:',
                    text: 'max.mustermann@example.com → abc.defghijklm@example.com'
                },
                privacy: 'Note: Anonymization is performed client-side in your browser. Your data is not sent to our server.'
            }
        },
        footer: {
            copyright: '© 2024 dataduce. All rights reserved.'
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