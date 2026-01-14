import { Building2, Layers, DoorOpen, Users, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/student/Header';

const buildings = [
  {
    id: 1,
    name: 'مبنى (أ) - بنين',
    floors: 5,
    rooms: 5,
    capacity: 14,
    occupancy: 0,
  },
  {
    id: 2,
    name: 'مبنى (ب) - بنات',
    floors: 4,
    rooms: 3,
    capacity: 7,
    occupancy: 0,
  },
];

const stats = [
  { label: 'إجمالي المباني', value: 2, icon: Building2, color: 'bg-purple-100 text-purple-600' },
  { label: 'إجمالي الغرف', value: 8, icon: DoorOpen, color: 'bg-green-100 text-green-600' },
  { label: 'الأسرة المتاحة', value: 21, icon: Layers, color: 'bg-yellow-100 text-yellow-600' },
  { label: 'طلاب بانتظار التسكين', value: 6, icon: Users, color: 'bg-blue-100 text-blue-600' },
];

const Housing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">إدارة السكن</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة مبنى جديد
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Buildings */}
        <div className="grid gap-6 md:grid-cols-2">
          {buildings.map((building) => (
            <Card key={building.id}>
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {building.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-4 w-4" />
                    عدد الطوابق
                  </div>
                  <span className="font-medium">{building.floors} طوابق</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DoorOpen className="h-4 w-4" />
                    إجمالي الغرف
                  </div>
                  <span className="font-medium">{building.rooms} غرفة</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    السعة الاستيعابية
                  </div>
                  <span className="font-medium">{building.capacity} طالب</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">نسبة الإشغال</span>
                    <span className="text-primary font-medium">{building.occupancy}%</span>
                  </div>
                  <Progress value={building.occupancy} className="h-2" />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  عرض التفاصيل
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Housing;
