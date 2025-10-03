import { NextResponse } from "next/server";
import { signOut } from "@/auth";

export async function POST() {
  await signOut({ redirect: false });
  return new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Clear-Site-Data": "\"cookies, storage\"",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "Set-Cookie": "next-auth.session-token=; Max-Age=0; Secure; HttpOnly;",
    },
  });
}
