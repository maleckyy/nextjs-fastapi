import { auth } from '@/auth'
import LoginForm from '@/components/loginPage/LoginForm'
import { appDescription, appName } from '@/env/STATIC_NAMES'
import { redirect } from 'next/navigation'
import React from 'react'
export default async function Login() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return (
    <section className='flex justify-center items-center w-full min-h-screen px-2 md:px-0'>
      <div className='w-100'>
        <h1 className='text-4xl mb-1 text-center' data-testid="login-app-title">{appName}</h1>
        <h2 className='text-2xl mb-4 text-center' data-testid="login-app-description">{appDescription}</h2>
        <LoginForm />
      </div>
    </section>
  )
}
