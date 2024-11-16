export default function getOrganization() {
    const user = JSON.parse(localStorage.getItem('org'));
    if (user) {
        return { 'orgId': user.id };
    } else {
        return {};
    }
}