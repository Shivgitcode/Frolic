import { authClient } from "@/lib/auth-client";
import type { SignupProps } from "@/validations/validation";

const Signup = async (data: SignupProps) => {
	try {
		await authClient.signUp.email(data);
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};

export default Signup;
