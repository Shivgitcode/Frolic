import { authClient } from "@/lib/auth-client";
import type { LoginProp } from "@/validations/validation";

export const Login = async (data: LoginProp) => {
	try {
		await authClient.signIn.email(data);
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
