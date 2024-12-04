export function getToken() {
  return localStorage.getItem('token')
    ? JSON.parse(localStorage?.getItem('token') ?? '')
    : null;
}
