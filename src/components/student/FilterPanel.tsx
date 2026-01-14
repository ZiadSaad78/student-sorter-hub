import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterState } from '@/types/student';
import { governorates, colleges, levels } from '@/data/mockStudents';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterPanel = ({
  filters,
  onFilterChange,
  onReset,
  searchQuery,
  onSearchChange,
}: FilterPanelProps) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          <Filter className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-card-foreground">فلترة الطلاب</h2>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="بحث بالاسم أو الرقم القومي..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 h-12 text-base bg-background border-border focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Governorate Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">
              المحافظة
            </Label>
            <Select
              value={filters.governorate}
              onValueChange={(value) => handleChange('governorate', value)}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder="اختر المحافظة" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                <SelectItem value="all">جميع المحافظات</SelectItem>
                {governorates.map((gov) => (
                  <SelectItem key={gov} value={gov}>
                    {gov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* College Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">
              الكلية
            </Label>
            <Select
              value={filters.college}
              onValueChange={(value) => handleChange('college', value)}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder="اختر الكلية" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                <SelectItem value="all">جميع الكليات</SelectItem>
                {colleges.map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Level Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">
              المستوى الدراسي
            </Label>
            <Select
              value={filters.level}
              onValueChange={(value) => handleChange('level', value)}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                <SelectItem value="all">جميع المستويات</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date of Birth From */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">
              تاريخ الميلاد من
            </Label>
            <Input
              type="date"
              value={filters.dateOfBirthFrom}
              onChange={(e) => handleChange('dateOfBirthFrom', e.target.value)}
              className="h-11 bg-background"
            />
          </div>

          {/* Date of Birth To */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">
              تاريخ الميلاد إلى
            </Label>
            <Input
              type="date"
              value={filters.dateOfBirthTo}
              onChange={(e) => handleChange('dateOfBirthTo', e.target.value)}
              className="h-11 bg-background"
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">
              حالة الطلب
            </Label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="accepted">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            onClick={onReset}
            className="gap-2 border-border hover:bg-secondary"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة تعيين الفلاتر
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
