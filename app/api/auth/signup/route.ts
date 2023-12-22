import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db } from "@lib/db";

import type { Database } from "@lib/database.types";

export async function POST(req: Request) {
	try {
		const url = new URL(req.url);
		const supabase = createRouteHandlerClient<Database>({ cookies });
		const { username, email, password } = await req.json();
		const existUsername = await db.profile.findUnique({ where: { username } });
		const existEmail = await db.profile.findUnique({ where: { email } });

		if (existUsername) return new NextResponse("Username already exist", { status: 208 });
		if (existEmail) return new NextResponse("Email already exist", { status: 208 });

		await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${url.origin}/api/auth/callback` } });

		const profile = await db.profile.create({
			data: { displayName: username, username, email, imageUrl: "" },
		});

		return NextResponse.json(profile);
	} catch (error) {
		console.log("[SIGNUP_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
