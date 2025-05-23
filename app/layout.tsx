import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "IT431-DL1 Project ",
	description: "Written by Madina Ea, Foundation provided by Randy Michak",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ClerkProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</ClerkProvider>
		</html>
	);
}
