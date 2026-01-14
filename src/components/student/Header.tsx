import universityLogo from '@/assets/logo.png';

const Header = () => {
  return (
    <header className="gradient-header shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={universityLogo} 
              alt="جامعة الغردقة" 
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-sidebar-foreground">
                جامعة الغردقة - نظام إدارة الإسكان الطلابي
              </h1>
              <p className="text-sidebar-foreground/70 text-sm mt-1">
                Hurghada University - Student Housing Management System
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
