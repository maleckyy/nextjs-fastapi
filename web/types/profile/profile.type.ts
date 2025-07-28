
export type UserDetails = {
  address: string
  country: string
  description: string
  phone_number: string
  first_name: string
  last_name: string
}

export type UserDetailsOutput = {
  username: string
  id: string
  email: string
  created_at: string
  details: UserDetails
}