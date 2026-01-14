import { Student } from "@/types/housing";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, Phone, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onAssign?: (studentId: string) => void;
  onRemove?: (studentId: string) => void;
  showAssign?: boolean;
  showRemove?: boolean;
  compact?: boolean;
}

export function StudentCard({
  student,
  onAssign,
  onRemove,
  showAssign = false,
  showRemove = false,
  compact = false
}: StudentCardProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{student.name}</p>
            <p className="text-xs text-muted-foreground">{student.faculty}</p>
          </div>
        </div>
        {showRemove && onRemove && (
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(student.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow",
      "animate-fade-in"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            student.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
          )}>
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">{student.name}</h4>
            <p className="text-sm text-muted-foreground">{student.studentId}</p>
          </div>
        </div>

        {showAssign && onAssign && (
          <Button
            size="sm"
            className="gradient-primary text-primary-foreground"
            onClick={() => onAssign(student.id)}
          >
            <Plus className="w-4 h-4 ml-1" />
            إضافة
          </Button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <GraduationCap className="w-4 h-4" />
          {student.faculty}
        </span>
        <span className="text-muted-foreground">
          السنة {student.year}
        </span>
        {student.phone && (
          <span className="flex items-center gap-1 text-muted-foreground">
            <Phone className="w-4 h-4" />
            {student.phone}
          </span>
        )}
      </div>
    </div>
  );
}
