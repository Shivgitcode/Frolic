import { z } from "zod";
export const formSchema = z.object({
	email: z.string(),
	name: z.string(),
	video: z.instanceof(File),
});

export const SignUpForm = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});
