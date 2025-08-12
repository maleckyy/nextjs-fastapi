import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  const theme = request.cookies.get('theme')?.value
  const response = NextResponse.next()

  if (
    pathname.startsWith('/manifest.json') ||
    pathname.startsWith('/icons/')
  ) {
    return NextResponse.next();
  }

  if (!theme) {
    response.cookies.set({
      name: "theme",
      value: "system",
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 10 * 365 * 24 * 60 * 60
    })
  }

  if (theme) {
    response.cookies.set({
      name: "theme",
      value: theme,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 10 * 365 * 24 * 60 * 60
    })
  }

  if (!token && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}