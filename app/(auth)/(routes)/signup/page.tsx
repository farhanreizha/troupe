import type { Database } from "@lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import SignUp from "@components/auth/SignUp";
import { cookies } from "next/headers";

export default async function page() {
	const { auth } = createServerComponentClient<Database>({ cookies });
	const {
		data: { session },
	} = await auth.getSession();

	return <SignUp session={session} />;
}
