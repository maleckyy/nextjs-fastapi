import { UserDetails } from '@/types/profile/profile.type'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import SingleDetailElement from './SingleDetailElement'

type PropsType = {
  details: UserDetails,
  email: string
}

export default function DetailsCard({ details, email }: PropsType) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2'>
      <SingleDetailElement text={email} node={<Mail size={18} />} />
      <SingleDetailElement text={details.phone_number} node={<Phone size={18} />} />
      <SingleDetailElement text={details.country} node={<Globe size={18} />} />
      <SingleDetailElement text={details.address} node={<MapPin size={18} />} />
    </div>
  )
}
