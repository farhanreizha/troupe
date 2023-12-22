export default function ServerIdLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full">
			<div className="server-sidebar">
				<div>Server Sidebar</div>
			</div>
			<main className="md:pl-60 h-full">{children}</main>
		</div>
	);
}
