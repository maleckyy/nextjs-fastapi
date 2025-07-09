import RegisterForm from '@/components/registerPage/registerForm'
import React from 'react'

export default function Register() {
  return (
    <section className='flex justify-center items-center w-full min-h-screen'>
          <div className='w-100'>
            <h1 className='text-4xl mb-2 text-center'>LOGO</h1>
            <h2 className='text-center mb-4'>Załóż nowe konto</h2>
            <RegisterForm />
          </div>
        </section>
  )
}
