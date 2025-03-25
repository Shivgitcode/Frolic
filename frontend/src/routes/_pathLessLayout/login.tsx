import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginProp } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
export const Route = createFileRoute("/_pathLessLayout/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm<LoginProp>({
		resolver: zodResolver(LoginSchema),
	});
	const navigate = Route.useNavigate();

	const onSubmit = async (data: LoginProp) => {
		console.log(data);
		await authClient.signIn.email(data, {
			onRequest: () => {
				toast.loading("logging In", { id: "sign-in" });
			},
			onSuccess: () => {
				toast.success("logged in successfully");

				toast.dismiss("sign-in");
				navigate({
					to: "/home",
				});
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
