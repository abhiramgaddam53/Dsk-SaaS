import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token, role, uid } = await request.json();
  const expiresIn = 60 * 60 * 24 * 7; // 7 days is plenty — this only controls cookie lifetime, not the Firebase token's own 1hr expiry

  const cookieStore = await cookies();
  cookieStore.set("session", token, { maxAge: expiresIn, httpOnly: true, secure: true });

  // Only touch userRole/userId if the caller actually sent them.
  // On a silent token refresh we only have {token, uid} — we must NOT
  // overwrite the existing userRole cookie with a wrong/default value.
  if (role) {
    cookieStore.set("userRole", role, { maxAge: expiresIn, httpOnly: true, secure: true });
  }
  if (uid) {
    cookieStore.set("userId", uid, { maxAge: expiresIn, httpOnly: true, secure: true });
  }

  return NextResponse.json({ status: "success" });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("userRole");
  cookieStore.delete("userId");
  
  return NextResponse.json({ status: "success" });
}