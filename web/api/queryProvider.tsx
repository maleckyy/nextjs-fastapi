'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function QueryProvider({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
