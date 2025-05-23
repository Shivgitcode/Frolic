import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectContent,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/videoupload")({
	beforeLoad: ({ context, location }) => {
		console.log("hello", context.auth?.user);
		if (!context.auth?.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: VideoUploadPage,
});

function VideoUploadPage() {
	const navigate = Route.useNavigate();
	const { user } = useAuth();
	const [uploading, setUploading] = useState(false);
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [visibility, setVisibility] = useState("public");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setVideoFile(file);
			// Create a preview URL for the video
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const clearSelectedFile = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		setVideoFile(null);
		setPreviewUrl(null);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!videoFile) {
			toast.error("Please select a video to upload");
			return;
		}

		if (!title.trim()) {
			toast.error("Please enter a title for your video");
			return;
		}

		if (!user) {
			toast.error("You must be logged in to upload a video");
			return;
		}

		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("video", videoFile);
			formData.append("name", title.trim());
			formData.append("description", description.trim());
			formData.append("category", category.toLowerCase());
			formData.append("visibility", visibility);
			formData.append("userId", user.id);

			const response = await api.post("/uploads", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			});

			if (response.status !== 201) {
				throw new Error("Upload failed");
			}

			// Show success message
			toast.success(
				"Video uploaded successfully! Processing will begin shortly.",
			);

			// Navigate to home
			navigate({ to: "/home" });
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Failed to upload video. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	const categories = [
		"Entertainment",
		"Music",
		"Education",
		"Gaming",
		"Science & Technology",
		"Sports",
		"Travel & Events",
		"Film & Animation",
		"News & Politics",
		"Howto & Style",
	];

	return (
		<div className="container mx-auto py-8 max-w-4xl">
			<h1 className="text-2xl font-bold mb-6">Upload Video</h1>

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
					<div className="lg:col-span-3">
						<Card>
							<CardHeader>
								<CardTitle>Video File</CardTitle>
							</CardHeader>
							<CardContent>
								{!videoFile ? (
									<button
										type="button"
										className="w-full border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer"
										onClick={() =>
											document.getElementById("video-upload")?.click()
										}
									>
										<Film className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
										<h3 className="text-lg font-medium mb-2">
											Select video to upload
										</h3>
										<p className="text-sm text-muted-foreground mb-4">
											or drag and drop a file
										</p>
										<Button type="button" variant="outline" className="mx-auto">
											<Upload className="h-4 w-4 mr-2" /> Select File
										</Button>
										<input
											type="file"
											id="video-upload"
											className="hidden"
											accept="video/*"
											onChange={handleFileChange}
										/>
										<p className="text-xs text-muted-foreground mt-4">
											MP4, MOV, or WebM • Up to 10 minutes • Less than 2 GB
										</p>
									</button>
								) : (
									<div className="relative">
										<Button
											type="button"
											variant="outline"
											size="icon"
											className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
											onClick={clearSelectedFile}
										>
											<X className="h-4 w-4" />
										</Button>

										<div className="aspect-video rounded-lg overflow-hidden bg-secondary">
											{previewUrl && (
												<video
													src={previewUrl}
													controls
													className="w-full h-full object-contain"
												>
													<track
														kind="captions"
														src="captions.vtt"
														srcLang="en"
														label="English"
													/>
												</video>
											)}
										</div>

										<div className="mt-2 text-sm">
											<p className="font-medium">{videoFile.name}</p>
											<p className="text-muted-foreground">
												{(videoFile.size / (1024 * 1024)).toFixed(2)} MB
											</p>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Right column: Video details */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle>Video Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="title">Title</Label>
									<Input
										id="title"
										placeholder="Enter video title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										placeholder="Tell viewers about your video"
										rows={5}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select value={category} onValueChange={setCategory}>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((cat) => (
												<SelectItem key={cat} value={cat.toLowerCase()}>
													{cat}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="visibility">Visibility</Label>
									<Select
										defaultValue="public"
										value={visibility}
										onValueChange={setVisibility}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select visibility" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="public">Public</SelectItem>
											<SelectItem value="unlisted">Unlisted</SelectItem>
											<SelectItem value="private">Private</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>

							<CardFooter className="flex justify-end space-x-2">
								<Button
									variant="outline"
									type="button"
									onClick={() => navigate({ to: "/home" })}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={uploading}>
									{uploading ? "Uploading..." : "Upload Video"}
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</form>
		</div>
	);
}
