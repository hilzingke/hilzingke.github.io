const translations = {
    de: {
        // Navigation
        "nav.home": "Startseite",
        "nav.emailAnonymizer": "E-Mail Anonymisierer",
        "nav.language": "Sprache",
        
        // E-Mail Anonymisierer
        "emailAnonymizer.title": "E-Mail Anonymisierer",
        "emailAnonymizer.inputLabel": "Eingabetext",
        "emailAnonymizer.inputPlaceholder": "Fügen Sie hier Ihren Text ein...",
        "emailAnonymizer.methodLabel": "Anonymisierungsmethode",
        "emailAnonymizer.methodLocal": "Nur lokaler Teil (vor @)",
        "emailAnonymizer.methodFull": "Ganze E-Mail (außer TLD)",
        "emailAnonymizer.methodPreserve": "Lokaler Teil mit Punkten und Minus",
        "emailAnonymizer.outputLabel": "Anonymisierter Text",
        "emailAnonymizer.resetButton": "Zurücksetzen",
        "emailAnonymizer.copyButton": "Kopieren",
        "emailAnonymizer.copiedButton": "Kopiert!",
        
        // Startseite
        "home.title": "Willkommen bei Hilzingke Tools",
        "home.subtitle": "Eine Sammlung nützlicher Online-Tools für verschiedene Anwendungsfälle",
        "home.emailAnonymizer.title": "E-Mail Anonymisierer",
        "home.emailAnonymizer.description": "Anonymisieren Sie E-Mail-Adressen in Texten mit verschiedenen Methoden.",
        "home.emailAnonymizer.button": "Tool öffnen"
    },
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.emailAnonymizer": "Email Anonymizer",
        "nav.language": "Language",
        
        // E-Mail Anonymisierer
        "emailAnonymizer.title": "Email Anonymizer",
        "emailAnonymizer.inputLabel": "Input Text",
        "emailAnonymizer.inputPlaceholder": "Enter your text here...",
        "emailAnonymizer.methodLabel": "Anonymization Method",
        "emailAnonymizer.methodLocal": "Local part only (before @)",
        "emailAnonymizer.methodFull": "Full email (except TLD)",
        "emailAnonymizer.methodPreserve": "Local part with dots and minus",
        "emailAnonymizer.outputLabel": "Anonymized Text",
        "emailAnonymizer.resetButton": "Reset",
        "emailAnonymizer.copyButton": "Copy",
        "emailAnonymizer.copiedButton": "Copied!",
        
        // Startseite
        "home.title": "Welcome to Hilzingke Tools",
        "home.subtitle": "A collection of useful online tools for various use cases",
        "home.emailAnonymizer.title": "Email Anonymizer",
        "home.emailAnonymizer.description": "Anonymize email addresses in texts using various methods.",
        "home.emailAnonymizer.button": "Open Tool"
    }
};

function translate(key) {
    const currentLang = localStorage.getItem('language') || 'de';
    return translations[currentLang][key] || translations['de'][key] || key;
}

function updatePageTranslations() {
    // Übersetze alle Elemente mit data-translate Attribut
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key);
    });

    // Übersetze Placeholder
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key);
    });
} 