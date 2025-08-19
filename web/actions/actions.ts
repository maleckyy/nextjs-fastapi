"use server";
import { cookies } from "next/headers";

export async function createTokenCookie(value: string, age: number) {
  if (value === "") return;
  const cookie = await cookies()
  cookie.set({
    name: "auth_token",
    value: value,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: age
  });
}
