export type AuthUser = {
  id: string
  username: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
  tokenExpiresTime: number
}