
export type UserDetails = {
  address?: string | undefined
  country?: string | undefined
  description?: string | undefined
  phone_number?: string | undefined
}

export type UserDetailsOutput = {
  username: string
  id: string
  email: string
  details: UserDetails
}