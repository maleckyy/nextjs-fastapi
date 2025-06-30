import LoginForm from '@/components/loginPage/LoginForm'
import React from 'react'

export default function Login() {
  return (
    <section className='flex justify-center items-center w-full min-h-screen'>
      <div className='w-100'>

        <h1 className='text-4xl mb-4 text-center'>LOGOOO</h1>
        <LoginForm />
      </div>

    </section>
  )
}
