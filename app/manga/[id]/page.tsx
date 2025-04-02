import { FC } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import DeleteMangaButton from "@/components/DeleteMangaButton";
import { Manga } from "@/types/manga";

interface MangaPageProps {
	params: {
		id: string;
	};
}

const MangaPage: FC<MangaPageProps> = async ({ params }) => {
	// Await params before accessing its properties
	const id = (await params).id;
	const mangaId = parseInt(id, 10);

	// Check if the ID is valid
	if (isNaN(mangaId)) {
		notFound();
	}

	// Get base URL from environment variables
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

	try {
		// Fetch manga from the API with base URL
		const response = await fetch(`${baseUrl}/api/products/${mangaId}`, {
			next: { revalidate: 0 },
		});

		// If the response is not ok, show 404
		if (!response.ok) {
			notFound();
		}

		// Parse the manga data
		const manga: Manga = await response.json();

		return (
			<div>
				<Header />
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-3xl mx-auto">
						<div className="mb-6">
							<Button asChild variant="outline" className="mb-4">
								<Link href="/">← Back to My List</Link>
							</Button>

							<div className="flex justify-between items-center">
								<h1 className="text-3xl font-bold">{manga.title}</h1>
								<div className="space-x-2">
									<Button asChild variant="outline">
										<Link href={`/manga/${manga.id}/edit`}>Edit</Link>
									</Button>
									<DeleteMangaButton mangaId={manga.id} />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6 mb-6">
							<h2 className="text-xl font-semibold mb-2">Rating</h2>
							<p className="mb-4">{manga.rating}</p>

							<h2 className="text-xl font-semibold mb-2">Volume</h2>
							<p>{manga.volume}</p>

							<h2 className="text-xl font-semibold mb-2">Review</h2>
							<p>{manga.review}</p>

							<h2 className="text-xl font-semibold mb-2">Image URL</h2>
							<p>{manga.imageUrl}</p>
						</div>
					</div>
				</main>
			</div>
		);
	} catch (error) {
		console.error("Error fetching manga:", error);
		notFound();
	}
};

export default MangaPage;
