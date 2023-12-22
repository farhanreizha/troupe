import { db } from "@lib/db";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@lib/database.types";

export async function POST(req: Request) {
	try {
		const supabase = createRouteHandlerClient<Database>({ cookies });
		const { email, password } = await req.json();

		if (!email) {
			return new NextResponse("Email not exist", { status: 404 });
		}

		const profile = await db.profile.findFirst({
			where: { email },
		});

		await supabase.auth.signInWithPassword({ email, password });

		return NextResponse.json(profile);
	} catch (error) {
		console.log("[SIGNIN_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
