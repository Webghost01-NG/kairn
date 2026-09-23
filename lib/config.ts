export function requireSecret(request: Request) { const secret = process.env.KAIRN_API_SECRET; return Boolean(secret) && request.headers.get('x-kairn-secret') === secret; }
export function validateConfig() { if (!process.env.KAIRN_API_SECRET) throw new Error('KAIRN_API_SECRET is required'); }
