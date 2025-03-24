import { cn } from "@/lib/utils";

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

const FeatureCard = ({
	icon,
	title,
	description,
	className,
}: FeatureCardProps) => {
	return (
		<div
			className={cn(
				"bg-card hover:bg-card/80 border border-border p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]",
				className,
			)}
		>
			<div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
				{icon}
			</div>
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground">{description}</p>
		</div>
	);
};

export default FeatureCard;
