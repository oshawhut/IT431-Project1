"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function AddMangaPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		rating: "",
		volume: 0,
		review: "",
		imageUrl: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Format the rating to include "⭐"
			const dataToSubmit = {
				...formData,
				rating: formData.rating ? `${formData.rating} ⭐` : undefined,
			};

			const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
			const response = await fetch(`${baseUrl}/api/products`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSubmit),
			});

			if (!response.ok) {
				throw new Error("Failed to add manga");
			}

			// Redirect to home page after successful creation
			router.push("/");
			router.refresh(); // Refresh the page data
		} catch (error) {
			console.error("Error adding manga:", error);
			alert("Failed to add manga. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Header />
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold">Add New Manga</h1>
						<Link href="/">
							<Button variant="outline">Back to My List</Button>
						</Link>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-6 bg-white p-6 rounded-lg shadow"
					>
						<div className="space-y-2">
							<label htmlFor="title" className="block font-medium">
								Manga Title <span className="text-red-500">*</span>
							</label>
							<input
								id="title"
								name="title"
								type="text"
								required
								value={formData.title}
								onChange={handleChange}
								className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter manga title"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="rating" className="block font-medium">
								Rating (Out of 10 ⭐) <span className="text-red-500">*</span>
							</label>
							<input
								id="rating"
								name="rating"
								type="number"
								value={formData.rating}
								onChange={handleChange}
								className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter your rating"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="volume" className="block font-medium">
								Volume #
							</label>
							<input
								id="volume"
								name="volume"
								type="number"
								value={formData.volume}
								onChange={handleChange}
								className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter volume you're currently on"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="review" className="block font-medium">
								Review
							</label>
							<input
								id="review"
								name="review"
								type="text"
								value={formData.review}
								onChange={handleChange}
								className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter your review on the manga"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="imageUrl" className="block font-medium">
								Image URL
							</label>
							<input
								id="imageUrl"
								name="imageUrl"
								type="text"
								value={formData.imageUrl}
								onChange={handleChange}
								className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Provide a URL to the manga cover art"
							/>
						</div>

						<div className="pt-4">
							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
								disabled={loading}
							>
								{loading ? "Adding Manga..." : "Add Manga"}
							</Button>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
}
