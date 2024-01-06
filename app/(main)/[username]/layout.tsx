import Sidebar from "@/components/sidebar/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="server-sidebar">
        <Sidebar type="profile" />
      </div>
      <main className="md:pl-60 h-screen">{children}</main>
    </div>
  );
}
