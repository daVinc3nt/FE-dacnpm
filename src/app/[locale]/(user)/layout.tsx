import "../../globals.css";
import { FloatingNav } from "@/components/Navbar/FloatingNavbar";
import { SessionProvider } from "@/providers/SessionProvider";
import SidebarProvider from "@/providers/SidebarProvider";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section className="no-scrollbar hide-scrollbar">
        <SidebarProvider>
            <FloatingNav />
            <Sidebar />
              {children} 
              <FloatingNav />
        </SidebarProvider> 
      </section>
  );
}
