import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Manga } from "@/types/manga";

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "manga.json");

// Helper function to read courses from the JSON file
const readManga = (): Manga[] => {
	try {
		const jsonData = fs.readFileSync(dataFilePath, "utf-8");
		return JSON.parse(jsonData) as Manga[];
	} catch (error) {
		console.error("Error reading courses file:", error);
		return [];
	}
};

// Helper function to write courses to the JSON file
const writeManga = (courses: Manga[]) => {
	try {
		fs.writeFileSync(dataFilePath, JSON.stringify(courses, null, 2), "utf-8");
	} catch (error) {
		console.error("Error writing to courses file:", error);
	}
};

// GET: Retrieve all courses
export async function GET() {
	try {
		const courses = readManga();
		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		console.error("Error retrieving courses:", error);
		return NextResponse.json(
			{ error: "Failed to retrieve courses." },
			{ status: 500 }
		);
	}
}

// POST: Add a new course
export async function POST(request: Request) {
	try {
		const newManga: Manga = await request.json();
		const mangaList = readManga();

		newManga.id = mangaList.length ? mangaList[mangaList.length - 1].id + 1 : 1;
		mangaList.push(newManga);
		writeManga(mangaList);

		return NextResponse.json(newManga, { status: 201 });
	} catch (error) {
		console.error("Error adding course:", error);
		return NextResponse.json(
			{ error: "Failed to add course." },
			{ status: 500 }
		);
	}
}
