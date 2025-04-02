// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<main className="flex-1 flex flex-col items-center justify-center text-center p-4">
				<div className="max-w-md mx-auto">
					<h1 className="text-4xl font-bold mb-4">Welcome to MangaBox</h1>
					<p className="text-lg mb-8 text-gray-600">
						Your personal manga collection manager
					</p>
					<Link href="/manga">
						<Button className="px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700">
							Browse your List
						</Button>
					</Link>
				</div>
			</main>

			<footer className="py-6 text-center text-gray-500 text-sm">
				© {new Date().getFullYear()} MangaBox (For educational purposes)
			</footer>
		</div>
	);
}
