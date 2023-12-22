"use client";
import { Button } from "@components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignOut() {
	const { auth } = createClientComponentClient();
	const router = useRouter();

	const handleLogout = async () => {
		await auth.signOut();
		router.refresh();
	};
	return (
		<Button variant="ghost" onClick={handleLogout}>
			SignOut
		</Button>
	);
}
