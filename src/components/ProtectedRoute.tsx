interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // تجاوز التحقق من تسجيل الدخول للتصفح
  return <>{children}</>;
}
