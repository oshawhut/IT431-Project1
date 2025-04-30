import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MangaCard from "@/components/MangaCard";

interface Manga {
	id: number;
	title: string;
	rating: number;
	volume: number;
	review: string;
	imageUrl: string;
}

// This is a Server Component that fetches data
async function getManga(): Promise<Manga[]> {
	try {
		// Use relative URL for API routes in the same Next.js app
		const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
		const res = await fetch(`${baseUrl}/api/products`, {
			cache: "no-store", // Disable caching for this request
		});

		// if (!res.ok) {
		// 	console.error("API response error:", await res.text());
		// 	throw new Error(`Failed to fetch manga: ${res.status}`);
		// }

		return res.json();
	} catch (error) {
		console.error("Error fetching manga:", error);
		return []; // Return empty array on error to prevent UI from breaking
	}
}

const Home: FC = async () => {
	const mangaList = await getManga();
	return (
		<div>
			<main className="container mx-auto px-16 py-8 pt-30 pb-20">
				<div className="flex justify-between items-center mb-8 px-8">
					<h1 className="text-3xl font-bold text-center">My List</h1>
					<Link href="/manga/add">
						<Button className="bg-gradient-to-r bg-teal-600 hover:from-teal-600 hover:to-teal-800">
							Add New Manga
						</Button>
					</Link>
				</div>

				{mangaList.length === 0 ? (
					<p className="text-center text-gray-500">
						Start your manga journey here today!
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mangaList.map((manga) => (
							<MangaCard key={manga.id} manga={manga} />
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
