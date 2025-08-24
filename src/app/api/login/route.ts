import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password, expiresInMins = 60 } = await req.json();

  const res = await fetch("https://dummyjson.com/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json(
      { message: "Login gagal", error },
      { status: res.status }
    );
  }

  const data = await res.json();
  const { accessToken, ...user } = data;

  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  const expires = new Date(Date.now() + expiresInMins * 60 * 1000);

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    expires,
  });

  return NextResponse.json({ user });
}
