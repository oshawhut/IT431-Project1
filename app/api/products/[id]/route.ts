import { NextResponse } from "next/server";
import { Manga } from "@/types/manga";
import clientPromise from "@/lib/mongodb";

// import fs from "fs";
// import path from "path";

// // Define the path to the JSON file
// const dataFilePath = path.join(process.cwd(), "data", "manga.json");

// // Helper function to read manga
// const readManga = (): Manga[] => {
// 	try {
// 		const jsonData = fs.readFileSync(dataFilePath, "utf-8");
// 		return JSON.parse(jsonData) as Manga[];
// 	} catch (error) {
// 		console.error("Error reading mangaList file:", error);
// 		return [];
// 	}
// };

// // Helper function to write manga
// const writeManga = (courses: Manga[]) => {
// 	try {
// 		fs.writeFileSync(dataFilePath, JSON.stringify(courses, null, 2), "utf-8");
// 	} catch (error) {
// 		console.error("Error writing to manga file:", error);
// 	}
// };

// GET: Retrieve a manga by ID
export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> } // Await params
) {
	try {
		const { id } = await context.params; // Await params before accessing
		const mangaId = parseInt(id, 10);

		// if (isNaN(mangaId)) {
		// 	return NextResponse.json({ error: "Invalid manga ID." }, { status: 400 });
		// }

		// const courses = readManga();
		// const course = courses.find((m) => m.id === mangaId);

		// if (!course) {
		// 	return NextResponse.json({ error: "Course not found." }, { status: 404 });
		// }

		const client = await clientPromise;
		const db = client.db("it431project");
		const course = await db.collection("manga").findOne({ id: mangaId }, {});

		return NextResponse.json(course, { status: 200 });
	} catch (error) {
		console.error("Error retrieving manga:", error);
		return NextResponse.json(
			{ error: "Failed to retrieve manga." },
			{ status: 500 }
		);
	}
}

// PUT: Update a manga by ID
export async function PUT(
	request: Request,
	context: { params: Promise<{ id: string }> } // Await params
) {
	try {
		const { id } = await context.params; // Await params before accessing
		const mangaId = parseInt(id, 10);
		if (isNaN(mangaId)) {
			return NextResponse.json({ error: "Invalid manga ID." }, { status: 400 });
		}

		const updatedManga: Partial<Manga> = await request.json();

		const client = await clientPromise;
		const db = client.db("it431project");
		const manga = await db.collection("manga").findOneAndUpdate(
			{ id: mangaId },
			{
				$set: {
					title: updatedManga.title,
					rating: updatedManga.rating,
					volume: updatedManga.volume,
					review: updatedManga.review,
					imageUrl: updatedManga.imageUrl,
				},
			}
		);

		if (!manga) {
			return NextResponse.json({ error: "Course not found." }, { status: 404 });
		}

		// const mangaList = readManga();
		// const index = mangaList.findIndex((m) => m.id === mangaId);

		// if (index === -1) {
		// 	return NextResponse.json({ error: "Manga not found." }, { status: 404 });
		// }

		// mangaList[index] = { ...mangaList[index], ...updatedManga, id: mangaId };

		// writeManga(mangaList);

		return NextResponse.json(manga, { status: 200 });
	} catch (error) {
		console.error("Error updating manga:", error);
		return NextResponse.json(
			{ error: "Failed to update manga." },
			{ status: 500 }
		);
	}
}

// DELETE: Remove a manga by ID
export async function DELETE(
	request: Request,
	context: { params: Promise<{ id: string }> } // Await params
) {
	try {
		const { id } = await context.params; // Await params before accessing
		const mangaId = parseInt(id, 10);
		if (isNaN(mangaId)) {
			return NextResponse.json({ error: "Invalid manga ID." }, { status: 400 });
		}

		// let mangaList = readManga();
		// const initialLength = mangaList.length;
		// mangaList = mangaList.filter((m) => m.id !== mangaId);

		// if (mangaList.length === initialLength) {
		// 	return NextResponse.json({ error: "Manga not found." }, { status: 404 });
		// }

		// writeManga(mangaList);

		const client = await clientPromise;
		const db = client.db("it431project");
		const manga = await db.collection("manga").deleteOne({ id: mangaId });

		return NextResponse.json(manga, { status: 200 });
	} catch (error) {
		console.error("Error deleting manga:", error);
		return NextResponse.json(
			{ error: "Failed to delete manga." },
			{ status: 500 }
		);
	}
}
