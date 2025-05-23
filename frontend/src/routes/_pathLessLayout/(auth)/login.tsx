import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { Input } from "@/components/ui/input";
import { useAuth, type UserProps } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import { type LoginProp, LoginSchema } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export const Route = createFileRoute("/_pathLessLayout/(auth)/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { setUser } = useAuth();
	const form = useForm<LoginProp>({
		resolver: zodResolver(LoginSchema),
	});
	const navigate = Route.useNavigate();
	const { refetch } = useAuth();
	const router = useRouter();

	const onSubmit = async (data: LoginProp) => {
		console.log(data);
		await authClient.signIn.email(data, {
			onRequest: () => {
				toast.loading("logging In", { id: "sign-in" });
			},
			onSuccess: async (data) => {
				try {
					setUser(data.data.user as UserProps);
					toast.success("logged in successfully");
					toast.dismiss("sign-in");

					await router.navigate({ to: "/home" });
				} catch (error) {
					console.error("Navigation error:", error);
					toast.error("Error during login redirect");
				}
			},
			onError: (context) => {
				toast.error(context.error.message);
				toast.dismiss("sign-in");
			},
		});
	};
	return (
		<Card className="w-full border-accent/20 shadow-lg bg-card/90 backdrop-blur-sm">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold">Login</CardTitle>
				<CardDescription>
					Enter your credentials to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="your.email@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-accent hover:underline font-medium"
					>
						Sign up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
