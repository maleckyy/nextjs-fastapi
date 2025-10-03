export function tokenExpiresTime(exp: number) {
  const delay = 5 * 60 * 1000
  return exp * 1000 + delay
}