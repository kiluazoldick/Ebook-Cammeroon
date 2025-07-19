import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 transition-all">{children}</main>
    </div>
  );
}
