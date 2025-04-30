export default function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 w-full bg-white py-4 text-center text-gray-500 text-sm shadow">
			© {new Date().getFullYear()} MangaBox (For educational purposes)
		</footer>
	);
}
