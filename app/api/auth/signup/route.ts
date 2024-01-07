import { db } from "@/lib/db";
import { serverCreateClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await serverCreateClient(cookies());
    const { username, email, password } = await request.json();

    const existUsername = await db.profile.findUnique({ where: { username } });
    const existEmail = await db.profile.findUnique({ where: { email } });

    if (existUsername) {
      return new NextResponse("Username already exists", { status: 208 });
    } else if (existEmail) {
      return new NextResponse("Email already exists", { status: 208 });
    }

    const { data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, displayName: username, imageUrl: "" },
      },
    });

    await db.profile.create({
      data: {
        userId: data.user?.id as string,
        username: data.user?.user_metadata.username,
        name: data.user?.user_metadata.displayName,
        email: data.user?.email as string,
        imageUrl: data.user?.user_metadata.imageUrl,
      },
    });

    return new NextResponse("Successfully sign up", { status: 200 });
  } catch (error) {
    console.log(`[SIGNUP_POST]: ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
