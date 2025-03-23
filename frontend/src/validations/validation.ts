import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email({ message: "invalid email" }),
	password: z.string().min(6, { message: "password must be min 8 length" }),
});

export type LoginProp = z.infer<typeof LoginSchema>;

export const SignupSchema = z
	.object({
		name: z.string(),
		email: z.string().email({ message: "invalid email" }),
		password: z
			.string()
			.min(6, { message: "the length of password must be at least 6" }),
		confirmPassword: z
			.string()
			.min(6, { message: "the length of password must be at least 6" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password don't match",
		path: ["confirmPassword"],
	});
export type SignupProps = z.infer<typeof SignupSchema>;
