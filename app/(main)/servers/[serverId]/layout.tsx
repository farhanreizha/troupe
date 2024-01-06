import Sidebar from "@/components/sidebar/sidebar";

export default function ServerIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="server-sidebar">
        <Sidebar type="server" />
      </div>
      <main className="md:pl-60 h-screen">{children}</main>
    </div>
  );
}
