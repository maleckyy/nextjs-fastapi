
export type UserDetails = {
  address: string
  country: string
  description: string
  phone_number: string
}

export type UserDetailsOutput = {
  username: string
  id: string
  email: string
  details: UserDetails
}