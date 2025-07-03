import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function requireAuth() {
    const cookieStorage = cookies()
    const token = cookieStorage.get("auth_token")?.value;

    if (!token) {
        redirect("/login");
    }

    return token;
}