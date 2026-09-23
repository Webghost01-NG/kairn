export function requireSecret(request: Request) { const secret = process.env.KAIRN_API_SECRET; return !secret || request.headers.get('x-kairn-secret') === secret; }
