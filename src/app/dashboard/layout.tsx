import Sidebar from "@/components/Sidebar/Sidebar";
import Script from "next/script";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 transition-all">{children}</main>

      {/* Scripts pour le chatbot Botpress */}
      {/* <Script
        src="https://cdn.botpress.cloud/webchat/v3.2/inject.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2025/07/22/14/20250722141018-76CPQJT5.js"
        strategy="afterInteractive"
      /> */}
    </div>
  );
}
