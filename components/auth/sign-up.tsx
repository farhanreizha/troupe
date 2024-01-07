"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/lib/schemas";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    await axios
      .post("/api/auth/signup", values)
      .then((response) => {
        toast.success(response.data, {
          unstyled: true,
          className: "toaster-success",
        });
      })
      .catch((error) =>
        toast.error(error.response.data, {
          unstyled: true,
          className: "toaster-error",
        })
      );

    form.reset();
    router.refresh();
  };

  return (
    <Card className="w-[420px] border-none">
      <CardHeader className="flex justify-center items-center">
        <CardTitle className="capitalize">Create a new account</CardTitle>
        <CardDescription>
          To use troupe, Please enter your details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase small-bold text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your username"
                      {...field}
                      className="shad-input"
                      disabled={isLoading}
                    />
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
                  <FormLabel className="uppercase small-bold text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                      className="shad-input"
                      disabled={isLoading}
                    />
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
                  <FormLabel className="uppercase small-bold text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="shad-input"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={isLoading}>
                sign up
                {isLoading && (
                  <Loader2 className="animate-spin h-4 w-4 text-foreground/70 ml-2" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
