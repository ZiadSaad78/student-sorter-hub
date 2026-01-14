import { useLocation } from "react-router-dom";
import { User, Users, Building2, Calendar, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import universityLogo from "@/assets/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "الملف الشخصي", url: "/profile", icon: User },
  { title: "إدارة الطلاب", url: "/", icon: Users },
  { title: "إدارة السكن", url: "/housing", icon: Building2 },
  { title: "مواعيد التقدم", url: "/schedule", icon: Calendar },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      className="border-l border-border bg-sidebar"
      collapsible="icon"
      side="right"
    >
      <SidebarContent className="py-6">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-3 px-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-sidebar-accent flex items-center justify-center p-2">
            <img
              src={universityLogo}
              alt="جامعة الغردقة"
              className="w-full h-full object-contain"
            />
          </div>
          {!collapsed && (
            <h2 className="text-lg font-bold text-sidebar-foreground text-center">
              جامعة الغردقة
            </h2>
          )}
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                      activeClassName="bg-primary text-primary-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="تسجيل الخروج"
              className="text-destructive hover:bg-destructive/10"
            >
              <button className="flex items-center gap-3 w-full px-4 py-3">
                <LogOut className="h-5 w-5" />
                {!collapsed && <span>تسجيل الخروج</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
