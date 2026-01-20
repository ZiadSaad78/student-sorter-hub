import { useState, useMemo } from 'react';
import Header from '@/components/student/Header';
import FilterPanel from '@/components/student/FilterPanel';
import StudentTable from '@/components/student/StudentTable';
import ExportPanel from '@/components/student/ExportPanel';
import { Student, FilterState } from '@/types/student';
import { useToast } from '@/hooks/use-toast';
import { mockStudentsData } from '@/data/staticData';

const initialFilters: FilterState = {
  governorate: 'all',
  college: 'all',
  level: 'all',
  dateOfBirthFrom: '',
  dateOfBirthTo: '',
  status: 'all',
};

const Index = () => {
  const [students, setStudents] = useState<Student[]>(mockStudentsData);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          student.name.toLowerCase().includes(query) ||
          student.nationalId.includes(query);
        if (!matchesSearch) return false;
      }

      // Governorate filter
      if (filters.governorate !== 'all' && student.governorate !== filters.governorate) {
        return false;
      }

      // College filter
      if (filters.college !== 'all' && student.college !== filters.college) {
        return false;
      }

      // Level filter
      if (filters.level !== 'all' && student.level !== filters.level) {
        return false;
      }

      // Date of birth range filter
      if (filters.dateOfBirthFrom) {
        const studentDob = new Date(student.dateOfBirth);
        const fromDate = new Date(filters.dateOfBirthFrom);
        if (studentDob < fromDate) return false;
      }

      if (filters.dateOfBirthTo) {
        const studentDob = new Date(student.dateOfBirth);
        const toDate = new Date(filters.dateOfBirthTo);
        if (studentDob > toDate) return false;
      }

      // Status filter
      if (filters.status !== 'all' && student.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [students, filters, searchQuery]);

  const handleAccept = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: 'accepted' as const } : student
      )
    );
    toast({
      title: 'تم قبول الطالب',
      description: 'تم قبول طلب الطالب بنجاح',
    });
  };

  const handleReject = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: 'rejected' as const } : student
      )
    );
    toast({
      title: 'تم رفض الطالب',
      description: 'تم رفض طلب الطالب',
      variant: 'destructive',
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  const stats = useMemo(() => {
    return {
      accepted: students.filter((s) => s.status === 'accepted').length,
      pending: students.filter((s) => s.status === 'pending').length,
      rejected: students.filter((s) => s.status === 'rejected').length,
    };
  }, [students]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <ExportPanel
          students={students}
          acceptedCount={stats.accepted}
          pendingCount={stats.pending}
          rejectedCount={stats.rejected}
        />

        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              قائمة الطلاب ({filteredStudents.length})
            </h2>
          </div>
          <StudentTable
            students={filteredStudents}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
