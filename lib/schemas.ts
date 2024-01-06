import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignUpSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateServerSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." }),
});
