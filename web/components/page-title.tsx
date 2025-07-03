import React from 'react'

type PropsType = {
    title: string
}

export default function PageTitle({ title }: PropsType) {
  return (
    <section>
      <h2 className='pb-4 text-2xl'>{title}</h2>
    </section>
  )
}
