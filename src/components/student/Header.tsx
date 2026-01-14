import { GraduationCap } from 'lucide-react';

const Header = () => {
  return (
    <header className="gradient-header shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-card">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sidebar-foreground">
                نظام إدارة الإسكان الطلابي
              </h1>
              <p className="text-sidebar-foreground/70 text-sm mt-1">
                إدارة طلبات السكن الجامعي
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sidebar-foreground/80">
            <span className="text-sm">الفصل الدراسي: الأول 2024/2025</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
