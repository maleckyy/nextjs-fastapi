import { cookies } from "next/headers";

export const cookieStore = await cookies()

export async function setCookies(key: string, value: string) {
    cookieStore.set(key, value)
}

export async function  getCookies() {
    return cookieStore.getAll().map((cookie) => {
        console.log(cookie)
    })
}