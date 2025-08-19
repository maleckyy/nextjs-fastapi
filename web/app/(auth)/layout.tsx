import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  return (<>{children}</>)
}
