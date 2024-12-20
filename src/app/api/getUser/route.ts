import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: 'not authed'}, {status: 400})
  }
  return NextResponse.json({success: session}, {status: 200})
}