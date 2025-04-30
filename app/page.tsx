import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 mt-0">
				<div className="max-w-2xl w-full mx-auto">
					<h1 className="text-4xl font-bold mb-4">Welcome to MangaBox</h1>
					<p className="text-lg mb-6 text-gray-600">
						Your personal manga collection manager
					</p>

					<div className="flex justify-center items-center mb-6">
						<Image
							src="/images/microsoft-ai-banner.jpeg"
							alt="MangaBox banner"
							width={800}
							height={400}
							className="w-full h-auto rounded-2xl shadow-lg"
							priority
						/>
					</div>

					<Link href="/manga">
						<Button className="px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700">
							Browse your List
						</Button>
					</Link>
				</div>
			</main>

			<Footer />
		</div>
	);
}
