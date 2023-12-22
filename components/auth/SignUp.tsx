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
	username: z.string().min(4, { message: "Username minimal 3 character" }),
	email: z.string().email(),
	password: z.string().min(6, { message: "Password minimal 6 character" }),
});

export default function SignUp({ session }: { session: Session | null }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { username: "", email: "", password: "" },
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			await axios.post("/api/auth/signup", values);

			form.reset;
		} catch (error) {
			console.log(error);
		}
	};

	if (session) return redirect("/");

	return (
		<Card className="w-[420px] bg-foreground/5">
			<CardHeader className="flex-center">
				<CardTitle className="uppercase">Create a new account</CardTitle>
				<CardDescription>To use troupe, Please enter your details</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="uppercase small-bold text-white">Username</FormLabel>
									<FormControl>
										<Input placeholder="enter your username" {...field} className="shad-input" />
									</FormControl>
									<FormMessage className="text-rose-500" />
								</FormItem>
							)}
						/>
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
							<Button type="submit">Sign up</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex-col gap-y-2">
				<span className="flex gap-x-1">
					Already have an account?
					<Link href="/signin" className="">
						sign in
					</Link>
				</span>
			</CardFooter>
		</Card>
	);
}
