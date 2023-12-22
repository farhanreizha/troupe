import SignIn from "@components/auth/SignIn";
import { Database } from "@lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page() {
	const { auth } = createServerComponentClient<Database>({ cookies });
	const {
		data: { session },
	} = await auth.getSession();
	return <SignIn session={session} />;
}
