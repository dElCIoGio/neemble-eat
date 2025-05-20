
export type CookieConsent = {
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
    [key: string]: boolean; // Allows for future categories
};


export function setCookieConsent(consent: CookieConsent): void {
    const cookieValue = encodeURIComponent(JSON.stringify(consent));
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year

    document.cookie = `cookie_consent=${cookieValue}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax; Secure`;
}

export function getCookieConsent(): CookieConsent | null {
    const name = "cookie_consent=";
    const cookies = decodeURIComponent(document.cookie).split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name)) {
            try {
                return JSON.parse(cookie.substring(name.length)) as CookieConsent;
            } catch (error) {
                console.error("Failed to parse cookie_consent:", error);
                return null;
            }
        }
    }
    return null;
}

export function hasConsentFor(category: keyof CookieConsent): boolean {
    const consent = getCookieConsent();
    return consent?.[category] ?? false;
}