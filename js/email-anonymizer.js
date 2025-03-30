document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const anonymizeBtn = document.getElementById('anonymize-btn');
    const copyBtn = document.getElementById('copy-btn');
    const methodInputs = document.getElementsByName('method');

    // Setze Standardmethode
    methodInputs[0].checked = true;

    // Event Listener für den Anonymisieren-Button
    anonymizeBtn.addEventListener('click', function() {
        const text = inputText.value;
        const selectedMethod = document.querySelector('input[name="method"]:checked').value;
        const anonymizedText = anonymizeEmails(text, selectedMethod);
        outputText.value = anonymizedText;
    });

    // Event Listener für den Kopieren-Button
    copyBtn.addEventListener('click', function() {
        outputText.select();
        document.execCommand('copy');
        showCopySuccess();
    });

    // Funktion zum Anonymisieren von E-Mail-Adressen
    function anonymizeEmails(text, method) {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        return text.replace(emailRegex, function(email) {
            switch(method) {
                case 'hash-local':
                    return hashLocalPart(email);
                case 'hash-full':
                    return hashFullEmail(email);
                case 'preserve':
                    return preserveLengthAnonymize(email);
                default:
                    return email;
            }
        });
    }

    // Funktion zum Hashen des lokalen Teils
    function hashLocalPart(email) {
        const [localPart, domain] = email.split('@');
        const hashedLocal = Array.from(localPart).reduce((acc, char) => {
            return acc + ((char.charCodeAt(0) * 7) % 36).toString(36);
        }, '');
        return hashedLocal + '@' + domain;
    }

    // Funktion zum Hashen der gesamten E-Mail (ohne TLD)
    function hashFullEmail(email) {
        const [localPart, domain] = email.split('@');
        const [domainName, tld] = domain.split('.');
        const hashedEmail = Array.from(localPart + '@' + domainName).reduce((acc, char) => {
            return acc + ((char.charCodeAt(0) * 7) % 36).toString(36);
        }, '');
        return hashedEmail + '.' + tld;
    }

    // Funktion zum Anonymisieren mit Längenerhaltung
    function preserveLengthAnonymize(email) {
        const [localPart, domain] = email.split('@');
        const [domainName, tld] = domain.split('.');
        
        // Teile den lokalen Teil an Punkten und Minuszeichen
        const parts = localPart.split(/([.-])/);
        const anonymizedParts = parts.map((part, index) => {
            if (part === '.' || part === '-') {
                return part;
            }
            
            // Generiere einen Hash für den Teil
            const hash = Array.from(part).reduce((acc, char) => {
                return acc + ((char.charCodeAt(0) * 7) % 36).toString(36);
            }, '');
            
            // Stelle sicher, dass der Hash die gleiche Länge hat
            if (hash.length < part.length) {
                return hash + generateRandomChars(part.length - hash.length);
            } else {
                return hash.substring(0, part.length);
            }
        });
        
        return anonymizedParts.join('') + '@' + domainName + '.' + tld;
    }

    // Hilfsfunktion zum Generieren zufälliger Zeichen
    function generateRandomChars(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Funktion zum Anzeigen der Kopier-Erfolgsmeldung
    function showCopySuccess() {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check mr-2"></i>' + translate('emailAnonymizer.copiedButton');
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }

    // Aktualisiere die Übersetzungen beim Laden der Seite
    updatePageTranslations();
}); 