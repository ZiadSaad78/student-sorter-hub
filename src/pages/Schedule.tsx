import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/student/Header';

const schedules = [
  {
    id: 1,
    title: 'فترة التقدم للسكن - الفصل الأول',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    status: 'completed',
  },
  {
    id: 2,
    title: 'فترة التقدم للسكن - الفصل الثاني',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    status: 'active',
  },
  {
    id: 3,
    title: 'فترة التقدم للسكن الصيفي',
    startDate: '2025-05-01',
    endDate: '2025-05-15',
    status: 'upcoming',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700">جاري</Badge>;
    case 'completed':
      return <Badge variant="secondary">منتهي</Badge>;
    case 'upcoming':
      return <Badge className="bg-blue-100 text-blue-700">قادم</Badge>;
    default:
      return null;
  }
};

const Schedule = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">مواعيد التقدم</h1>
        
        <div className="grid gap-6">
          {schedules.map((schedule) => (
            <Card key={schedule.id} className={schedule.status === 'active' ? 'border-primary border-2' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {schedule.title}
                  </CardTitle>
                  {getStatusBadge(schedule.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">تاريخ البدء:</span>
                    <span className="font-medium">{schedule.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                    <span className="font-medium">{schedule.endDate}</span>
                  </div>
                </div>
                {schedule.status === 'active' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>فترة التقديم مفتوحة حالياً</span>
                  </div>
                )}
                {schedule.status === 'upcoming' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2 text-blue-700">
                    <AlertCircle className="h-5 w-5" />
                    <span>سيتم فتح التقديم قريباً</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Schedule;
