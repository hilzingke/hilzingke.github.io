// E-Mail-Erkennungsregex
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Event-Listener für Eingabeänderungen
document.getElementById('input-text').addEventListener('input', anonymizeText);

// Event-Listener für Änderungen der Anonymisierungsmethode
document.querySelectorAll('input[name="anonymization"]').forEach(radio => {
    radio.addEventListener('change', anonymizeText);
});

function anonymizeText() {
    const inputText = document.getElementById('input-text').value;
    const method = document.querySelector('input[name="anonymization"]:checked').value;
    
    const anonymizedText = inputText.replace(emailRegex, (email) => {
        const [localPart, domain] = email.split('@');
        const [domainName, tld] = domain.split('.');
        
        switch(method) {
            case 'local':
                return hashString(localPart) + '@' + domain;
            case 'full':
                return hashString(localPart) + '@' + hashString(domainName) + '.' + tld;
            case 'preserve':
                return preserveLengthAnonymize(localPart) + '@' + domain;
            case 'mask':
                return maskString(localPart) + '@' + maskString(domainName) + '.' + tld;
            default:
                return email;
        }
    });
    
    document.getElementById('output-text').value = anonymizedText;
}

function hashString(str) {
    // Verwendung von SHA-256 für die Hash-Generierung
    return CryptoJS.SHA256(str).toString().substring(0, 8);
}

function preserveLengthAnonymize(str) {
    // Teile den String an Punkten und Minuszeichen
    const parts = str.split(/([.-])/);
    
    // Verarbeite jeden Teil
    return parts.map((part, index) => {
        // Wenn es ein Trennzeichen ist (Punkt oder Minus), behalte es bei
        if (part === '.' || part === '-') {
            return part;
        }
        
        // Für den Text-Teil: Generiere einen Hash mit gleicher Länge
        const hash = CryptoJS.SHA256(part).toString();
        // Verwende nur alphanumerische Zeichen
        const alphanumericHash = hash.replace(/[^a-zA-Z0-9]/g, '');
        
        // Wenn der Hash zu kurz ist, fülle mit zufälligen Zeichen auf
        if (alphanumericHash.length < part.length) {
            const randomChars = generateRandomChars(part.length - alphanumericHash.length);
            return alphanumericHash + randomChars;
        }
        
        // Wenn der Hash zu lang ist, kürze ihn
        return alphanumericHash.substring(0, part.length);
    }).join('');
}

function generateRandomChars(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function clearText() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
}

function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    outputText.select();
    document.execCommand('copy');
    
    // Visuelles Feedback
    const button = document.querySelector('button:last-child');
    const originalText = button.textContent;
    button.textContent = 'Kopiert!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Funktion zum Maskieren eines Strings mit Punkten
function maskString(str) {
    return '•'.repeat(str.length);
} 