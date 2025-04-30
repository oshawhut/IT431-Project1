import { NextResponse } from "next/server";
import { Manga } from "@/types/manga";
import clientPromise from "@/lib/mongodb";

// import fs from "fs";
// import path from "path";

// // Define the path to the JSON file
// const dataFilePath = path.join(process.cwd(), "data", "manga.json");

// // Helper function to read manga from the JSON file
// const readManga = (): Manga[] => {
// 	try {
// 		const jsonData = fs.readFileSync(dataFilePath, "utf-8");
// 		return JSON.parse(jsonData) as Manga[];
// 	} catch (error) {
// 		console.error("Error reading manga file:", error);
// 		return [];
// 	}
// };

// // Helper function to write manga to the JSON file
// const writeManga = (manga: Manga[]) => {
// 	try {
// 		fs.writeFileSync(dataFilePath, JSON.stringify(manga, null, 2), "utf-8");
// 	} catch (error) {
// 		console.error("Error writing to manga file:", error);
// 	}
// };

// GET: Retrieve all manga
export async function GET() {
	try {
		//const manga = readManga();

		const client = await clientPromise;
		const db = client.db("it431project");
		const manga = await db.collection("manga").find({}).toArray();

		return NextResponse.json(manga, { status: 200 });
	} catch (error) {
		console.error("Error retrieving manga:", error);
		return NextResponse.json(
			{ error: "Failed to retrieve manga." },
			{ status: 500 }
		);
	}
}

// POST: Add a new manga
export async function POST(request: Request) {
	try {
		// const newManga: Manga = await request.json();
		// const mangaList = readManga();

		// newManga.id = mangaList.length ? mangaList[mangaList.length - 1].id + 1 : 1;
		// mangaList.push(newManga);
		// writeManga(mangaList);

		const newManga: Omit<Manga, "id"> = await request.json();
		const client = await clientPromise;
		const db = client.db("it431project");

		//Get the next ID
		const lastManga = await db
			.collection("manga")
			.findOne({}, { sort: { id: -1 } });
		const nextId: number = lastManga ? lastManga.id + 1 : 1;

		const mangaToInsert = { ...newManga, id: nextId };

		const result = await db.collection("manga").insertOne(mangaToInsert);

		if (!result.acknowledged) {
			throw new Error("Failed to insert manga");
		}

		return NextResponse.json(newManga, { status: 201 });
	} catch (error) {
		console.error("Error adding manga:", error);
		return NextResponse.json(
			{ error: "Failed to add manga." },
			{ status: 500 }
		);
	}
}
