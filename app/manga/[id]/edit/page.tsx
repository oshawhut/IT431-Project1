"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Manga } from "@/types/manga";

interface EditMangaPageProps {
	params: {
		id: string;
	};
}

export default function EditMangaPage({ params }: EditMangaPageProps) {
	const router = useRouter();
	// Note: On client components, we don't need to await params since they're already resolved
	const mangaId = parseInt(params.id, 10);

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<Partial<Manga>>({
		title: "",
		rating: "",
		volume: 0,
		review: "",
		imageUrl: "",
	});

	// Fetch manga data
	useEffect(() => {
		const fetchManga = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/products/${mangaId}`);

				if (!response.ok) {
					throw new Error("Failed to fetch manga");
				}

				const manga: Manga = await response.json();

				let star = manga.rating;
				if (star && star.includes(" ⭐")) {
					star = star.replace(" ⭐", "");
				}

				setFormData({
					...manga,
					rating: star,
				});
				setError(null);
			} catch (err) {
				console.error("Error fetching manga:", err);
				setError("Failed to load manga. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		if (mangaId) {
			fetchManga();
		}
	}, [mangaId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			// Format the estimatedTime to include "hours"
			const dataToSubmit = {
				...formData,
				id: mangaId,
				rating: formData.rating ? `${formData.rating} ⭐` : "",
			};

			const response = await fetch(`/api/products/${mangaId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSubmit),
			});

			if (!response.ok) {
				throw new Error("Failed to update manga");
			}

			// Redirect to manga details page after successful update
			router.push(`/manga/${mangaId}`);
			router.refresh(); // Refresh the page data
		} catch (error) {
			console.error("Error updating manga:", error);
			setError("Failed to update manga. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div>
				<Header />
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-2xl mx-auto text-center">
						<p>Loading manga information...</p>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div>
			<Header />
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold">Edit Manga Information</h1>
						<Link href={`/manga/${mangaId}`}>
							<Button variant="outline">Cancel</Button>
						</Link>
					</div>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}

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
								className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
								className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
								className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
								className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
								className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
								placeholder="Provide a URL to the manga cover art"
							/>
						</div>

						<div className="pt-4">
							<Button
								type="submit"
								className="w-full bg-gradient-to-r bg-teal-600 hover:from-teal-600 hover:to-teal-800"
								disabled={saving}
							>
								{saving ? "Saving Changes..." : "Save Changes"}
							</Button>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
}
