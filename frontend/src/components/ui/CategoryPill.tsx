import { cn } from "@/lib/utils";

interface CategoryPillProps {
	label: string;
	active?: boolean;
	onClick?: () => void;
}

const CategoryPill = ({
	label,
	active = false,
	onClick,
}: CategoryPillProps) => {
	return (
		<button
			type="button"
			className={cn(
				"px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
				active
					? "bg-foreground text-background"
					: "bg-secondary text-foreground hover:bg-secondary/80",
			)}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default CategoryPill;
