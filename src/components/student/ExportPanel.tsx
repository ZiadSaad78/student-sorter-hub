import { FileSpreadsheet, FileDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/student';
import * as XLSX from 'xlsx';

interface ExportPanelProps {
  students: Student[];
  acceptedCount: number;
  pendingCount: number;
  rejectedCount: number;
}

const ExportPanel = ({
  students,
  acceptedCount,
  pendingCount,
  rejectedCount,
}: ExportPanelProps) => {
  const acceptedStudents = students.filter((s) => s.status === 'accepted');

  const exportToExcel = () => {
    if (acceptedStudents.length === 0) {
      alert('لا يوجد طلاب مقبولين للتصدير');
      return;
    }

    const data = acceptedStudents.map((student) => ({
      الاسم: student.name,
      'الرقم القومي': student.nationalId,
      'تاريخ الميلاد': student.dateOfBirth,
      المحافظة: student.governorate,
      الكلية: student.college,
      المستوى: student.level,
      الهاتف: student.phone,
      'البريد الإلكتروني': student.email,
      'تاريخ التقديم': student.applicationDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'الطلاب المقبولين');
    XLSX.writeFile(workbook, 'accepted_students.xlsx');
  };

  const exportToCSV = () => {
    if (acceptedStudents.length === 0) {
      alert('لا يوجد طلاب مقبولين للتصدير');
      return;
    }

    const headers = [
      'الاسم',
      'الرقم القومي',
      'تاريخ الميلاد',
      'المحافظة',
      'الكلية',
      'المستوى',
      'الهاتف',
      'البريد الإلكتروني',
      'تاريخ التقديم',
    ];

    const csvContent = [
      headers.join(','),
      ...acceptedStudents.map((student) =>
        [
          student.name,
          student.nationalId,
          student.dateOfBirth,
          student.governorate,
          student.college,
          student.level,
          student.phone,
          student.email,
          student.applicationDate,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'accepted_students.csv';
    link.click();
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-slide-up">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
              <p className="text-xl font-bold text-card-foreground">
                {students.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-success/5">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <span className="text-success font-bold">{acceptedCount}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">مقبول</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-warning/5">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <span className="text-warning font-bold">{pendingCount}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">قيد المراجعة</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/5">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive font-bold">{rejectedCount}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">مرفوض</p>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={exportToExcel}
            className="gap-2 gradient-primary text-primary-foreground hover:opacity-90"
          >
            <FileSpreadsheet className="w-5 h-5" />
            تصدير Excel
          </Button>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <FileDown className="w-5 h-5" />
            تصدير CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
