import { StudentStatus } from '@/types/student';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: StudentStatus;
}

const statusConfig = {
  pending: {
    label: 'قيد المراجعة',
    className: 'bg-warning/10 text-warning border-warning/20',
    icon: Clock,
  },
  accepted: {
    label: 'مقبول',
    className: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle2,
  },
  rejected: {
    label: 'مرفوض',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: XCircle,
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border',
        config.className
      )}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

export default StatusBadge;
