"use client";

import axios from "axios";
import * as z from "zod";
import { Session } from "@supabase/auth-helpers-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Link from "next/link";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, {
		message: "Password minimal 6 character",
	}),
});

export default function SignIn({ session }: { session: Session | null }) {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			await axios.post("/api/auth/signin", values);

			form.reset;
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	if (session) return redirect("/");

	return (
		<Card className="w-[420px] bg-foreground/5">
			<CardHeader className="flex-center">
				<CardTitle className="uppercase">Sign in</CardTitle>
				<CardDescription>Welcome back! Please enter your details.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="uppercase small-bold text-white">Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="example@example.com" {...field} className="shad-input" />
									</FormControl>
									<FormMessage className="text-rose-500" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="uppercase small-bold text-white">Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="******" {...field} className="shad-input" />
									</FormControl>
									<FormMessage className="text-rose-500" />
								</FormItem>
							)}
						/>

						<div className="flex w-full justify-end">
							<Button type="submit">Sign in</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex-col gap-y-2">
				<span className="flex gap-x-1">
					Don&apos;t have an account ?
					<Link href="/signup" className="">
						sign up
					</Link>
				</span>
			</CardFooter>
		</Card>
	);
}
