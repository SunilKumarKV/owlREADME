/**
 * Encodes an object state to a URL-safe Base64 string.
 * Uses TextEncoder for safe unicode handling (replaces deprecated unescape/escape).
 */
export function encodeShareData(data: any): string {
  try {
    const json = JSON.stringify(data);
    const bytes = new TextEncoder().encode(json);
    const binary = Array.from(bytes).map((b) => String.fromCharCode(b)).join('');
    return btoa(binary);
  } catch (e) {
    console.error('Failed to encode share data:', e);
    return '';
  }
}

/**
 * Decodes a URL-safe Base64 string back to its original object.
 * Uses TextDecoder for safe unicode handling (replaces deprecated escape/unescape).
 */
export function decodeShareData<T>(base64: string): T | null {
  try {
    if (!base64) return null;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as T;
  } catch (e) {
    console.error('Failed to decode share data:', e);
    return null;
  }
}


/**
 * Generates an absolute share URL for the public README or Roadmap.
 */
export function generateShareUrl(type: 'readme' | 'roadmap', state: any, theme: string): string {
  if (typeof window === 'undefined') return '';
  const data = encodeShareData(state);
  const baseUrl = window.location.origin;
  return `${baseUrl}/share/${type}?data=${encodeURIComponent(data)}&theme=${encodeURIComponent(theme)}`;
}

