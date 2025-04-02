import Link from "next/link";
import { Manga } from "@/models/mangaModel";

interface MangaCardProps {
	manga: Manga;
}

export default function MangaCard({ manga }: MangaCardProps) {
	return (
		<Link
			href={`/manga/${manga.id}`}
			className="block bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-80 mx-auto"
		>
			<img
				alt={manga.title}
				src={manga.imageUrl || "https://via.placeholder.com/400"}
				className="w-full h-72 object-cover"
			/>
			<div className="p-3 text-center">
				<h3 className="text-xl font-bold text-gray-900">{manga.title}</h3>
				<p className="text-gray-700 text-sm mt-1">
					{manga.rating} | 📚 {manga.volume} Volumes
				</p>
				<p className="text-gray-600 text-xs mt-2">{manga.review}</p>
			</div>
		</Link>
	);
}
