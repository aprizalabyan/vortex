import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const c = await cookies();
  c.delete("accessToken");
  return NextResponse.json({ ok: true });
}