import { z } from "zod";

export const formSchema = z.object({
	name: z.string().min(1, "Title is required"),
	video: z.instanceof(File),
	description: z.string().optional(),
	category: z.string().optional(),
	visibility: z.enum(["public", "unlisted", "private"]).default("public"),
	userId: z.string().optional(), // Optional because we'll get it from the session
});

export const SignUpForm = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});
