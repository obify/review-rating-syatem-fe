export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('org'));
    if (user && user.apiKey) {
        return { 'X-API-KEY': user.apiKey, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}