import { StudentDto } from "@/types/api";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, Phone, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: StudentDto;
  onAssign?: (studentId: number) => void;
  onRemove?: (studentId: number) => void;
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
  const isMale = student.gender?.toLowerCase() === "male" || student.gender === "ذكر";

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{student.fullName}</p>
            <p className="text-xs text-muted-foreground">{student.faculty}</p>
          </div>
        </div>
        {showRemove && onRemove && (
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(student.studentId)}
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
            isMale ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
          )}>
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">{student.fullName}</h4>
            <p className="text-sm text-muted-foreground">{student.nationalId}</p>
          </div>
        </div>

        {showAssign && onAssign && (
          <Button
            size="sm"
            className="gradient-primary text-primary-foreground"
            onClick={() => onAssign(student.studentId)}
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
        {student.level && (
          <span className="text-muted-foreground">
            المستوى: {student.level}
          </span>
        )}
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
