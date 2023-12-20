import { Open_Sans } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "troupe",
	description: "troupe is an application for socializing and playing any game with new and old friends",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	);
}
