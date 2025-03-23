import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	Card,
	CardHeader,
	CardTitle,
	CardFooter,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupSchema, type SignupProps } from "@/validations/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Signup from "@/actions/Signup";
import { toast } from "sonner";
export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm<SignupProps>({
		resolver: zodResolver(SignupSchema),
	});
	const navigate = Route.useNavigate();
	const { mutateAsync: signUp } = useMutation({
		mutationFn: Signup,
		onMutate: () => {
			toast.loading("signing up", { id: "sign-up" });
		},
		onSuccess: async () => {
			toast.success("signed up successfully");
			toast.dismiss("sign-up");
			navigate({
				to: "/login",
			});
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("sign-up");
		},
	});

	const onSubmit = (data: SignupProps) => {
		console.log(data);
		signUp(data);
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
