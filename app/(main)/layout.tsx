export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full">
			<div className="sidebar">
				<div>Sidebar Navigation</div>
			</div>
			<main className="md:pl-[72px] h-full">{children}</main>
		</div>
	);
}
