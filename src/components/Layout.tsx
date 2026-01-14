import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 bg-background">
          {/* Mobile trigger */}
          <div className="md:hidden p-4 border-b border-border">
            <SidebarTrigger />
          </div>
          
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
