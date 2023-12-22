import SignOut from "@components/auth/SignOut";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
	const { auth } = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await auth.getSession();

	if (!session) return redirect("/signin");

	return (
		<div>
			<SignOut />
		</div>
	);
}
