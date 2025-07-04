export function isTokenExpiredISO(expirationISO: string, leewayMs = 5 * 60 * 1000): boolean {
  try {
    const expirationDate = new Date(expirationISO).getTime();
    const currentTime = Date.now();
    
    return expirationDate - leewayMs <= currentTime;
  } catch (error) {
    console.error('Błąd parsowania daty wygaśnięcia:', error);
    return true;
  }
}