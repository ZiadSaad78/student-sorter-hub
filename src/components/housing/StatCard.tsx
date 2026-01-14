import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  variant: "blue" | "purple" | "green";
}

const variantStyles = {
  blue: "bg-primary/10 text-primary",
  purple: "bg-purple-500/10 text-purple-500",
  green: "bg-green-500/10 text-green-500",
};

export function StatCard({ icon, label, value, variant }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm p-5 flex items-center gap-4 animate-fade-in">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${variantStyles[variant]}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-muted-foreground font-medium">{label}</h4>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      </div>
    </div>
  );
}
