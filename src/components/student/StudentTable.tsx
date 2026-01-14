import { Student } from '@/types/student';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, XCircle, User, Calendar, MapPin, GraduationCap, Layers } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const StudentTable = ({ students, onAccept, onReject }: StudentTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (students.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-card p-12 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          لا يوجد طلاب
        </h3>
        <p className="text-muted-foreground">
          لم يتم العثور على طلاب مطابقين لمعايير البحث
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden animate-slide-up">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold text-card-foreground text-right">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  الطالب
                </div>
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-right">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  تاريخ الميلاد
                </div>
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-right">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  المحافظة
                </div>
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-right">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  الكلية
                </div>
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-right">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  المستوى
                </div>
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-right">
                الحالة
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-center">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow
                key={student.id}
                className="hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-sm">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {student.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.nationalId}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-card-foreground">
                  {formatDate(student.dateOfBirth)}
                </TableCell>
                <TableCell className="text-card-foreground">
                  {student.governorate}
                </TableCell>
                <TableCell className="text-card-foreground">
                  {student.college}
                </TableCell>
                <TableCell className="text-card-foreground">
                  {student.level}
                </TableCell>
                <TableCell>
                  <StatusBadge status={student.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {student.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => onAccept(student.id)}
                          className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          قبول
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onReject(student.id)}
                          className="gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض
                        </Button>
                      </>
                    )}
                    {student.status !== 'pending' && (
                      <span className="text-sm text-muted-foreground">
                        تم اتخاذ إجراء
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentTable;
