import { db } from "@/lib/db";
import { serverCreateClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await serverCreateClient(cookies());
    const { email, password } = await request.json();

    const existEmail = await db.profile.findUnique({ where: { email } });

    if (!existEmail) {
      return new NextResponse("Email not exist", { status: 404 });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return new NextResponse(error.message, { status: error.status });

    return new NextResponse("Successfully signin", { status: 200 });
  } catch (error) {
    console.log(`[SIGNUP_POST]: ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
