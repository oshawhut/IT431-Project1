"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteMangaButtonProps {
	mangaId: number;
}

export default function DeleteMangaButton({ mangaId }: DeleteMangaButtonProps) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		setIsDeleting(true);
		setError(null);

		try {
			const response = await fetch(`/api/products/${mangaId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(`Failed to delete manga: ${response.status}`);
			}

			// Navigate back to the home page after successful deletion
			router.push("/");
			router.refresh();
		} catch (err) {
			console.error("Error deleting course:", err);
			setError("Failed to delete course. Please try again.");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive" disabled={isDeleting}>
						{isDeleting ? "Deleting..." : "Delete Manga"}
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete what you're currently reading. You
							will have to resubmit it again.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-gradient-to-r bg-red-500 hover:bg-red-800"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{error && <p className="text-red-500 mt-2">{error}</p>}
		</>
	);
}
