import LoginForm from '@/components/loginPage/LoginForm'
import React from 'react'

export default async function Login() {
  return (
    <section className='flex justify-center items-center w-full min-h-screen px-2 md:px-0'>
      <div className='w-100'>
        <h1 className='text-4xl mb-4 text-center'>LOGO</h1>
        <LoginForm />
      </div>
    </section>
  )
}
