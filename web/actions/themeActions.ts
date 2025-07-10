'use server'
import { cookies } from "next/headers"

export type ThemeType = "dark" | "light" | "system"

export async function createThemeCookie(value: ThemeType) {
  const cookie = await cookies()
  cookie.set({
    name: "theme",
    value: value,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 10 * 365 * 24 * 60 * 60
  });
}