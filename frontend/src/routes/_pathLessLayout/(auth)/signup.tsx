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
import { authClient } from "@/lib/auth-client";
import { type SignupProps, SignupSchema } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export const Route = createFileRoute("/_pathLessLayout/(auth)/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm<SignupProps>({
		resolver: zodResolver(SignupSchema),
	});
	const navigate = Route.useNavigate();

	const onSubmit = async (data: SignupProps) => {
		console.log(data);
		await authClient.signUp.email(data, {
			onRequest: () => {
				toast.loading("logging In", { id: "sign-in" });
			},
			onSuccess: () => {
				toast.success("signed up successfully");
				toast.dismiss("sign-in");
				navigate({
					to: "/login",
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
				<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
				<CardDescription>
					Enter your details to create a new account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="johndoe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full bg-accent hover:bg-accent/90"
						>
							Create account
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link to="/login" className="text-accent hover:underline font-medium">
						Login
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
