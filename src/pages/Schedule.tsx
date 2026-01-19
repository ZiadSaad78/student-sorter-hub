import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/student/Header';
import { applicationService } from '@/services/api';
import { ApplicationWindowDto } from '@/types/api';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const getWindowStatus = (startDate: string, endDate: string): string => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'active';
};

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
  const [windows, setWindows] = useState<ApplicationWindowDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const { toast } = useToast();

  const fetchWindows = async () => {
    setLoading(true);
    const response = await applicationService.getWindows();
    
    if (response.error) {
      toast({
        title: 'خطأ في جلب البيانات',
        description: response.error,
        variant: 'destructive',
      });
    } else if (response.data) {
      setWindows(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWindows();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const response = await applicationService.createWindow({
      title: formData.title,
      description: formData.description,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    });

    if (response.error) {
      toast({
        title: 'خطأ في إنشاء الفترة',
        description: response.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'تم إنشاء الفترة بنجاح',
        description: 'تم إضافة فترة التقديم الجديدة',
      });
      setDialogOpen(false);
      setFormData({ title: '', description: '', startDate: '', endDate: '' });
      fetchWindows();
    }

    setIsCreating(false);
  };

  const handleDelete = async (windowId: number) => {
    const response = await applicationService.deleteWindow(windowId);
    
    if (response.error) {
      toast({
        title: 'خطأ في حذف الفترة',
        description: response.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'تم حذف الفترة',
        description: 'تم حذف فترة التقديم بنجاح',
      });
      fetchWindows();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">مواعيد التقدم</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                إضافة فترة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة فترة تقديم جديدة</DialogTitle>
                <DialogDescription>
                  أدخل بيانات فترة التقديم الجديدة
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الفترة</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="فترة التقدم للسكن - الفصل الأول"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف الفترة..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">تاريخ البدء</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">تاريخ الانتهاء</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating ? 'جاري الإنشاء...' : 'إنشاء الفترة'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {windows.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد فترات تقديم مسجلة</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {windows.map((window) => {
              const status = getWindowStatus(window.startDate, window.endDate);
              return (
                <Card key={window.windowId} className={status === 'active' ? 'border-primary border-2' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {window.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(status)}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(window.windowId)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {window.description && (
                      <p className="text-muted-foreground mb-4">{window.description}</p>
                    )}
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">تاريخ البدء:</span>
                        <span className="font-medium">{formatDate(window.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                        <span className="font-medium">{formatDate(window.endDate)}</span>
                      </div>
                    </div>
                    {status === 'active' && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <span>فترة التقديم مفتوحة حالياً</span>
                      </div>
                    )}
                    {status === 'upcoming' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2 text-blue-700">
                        <AlertCircle className="h-5 w-5" />
                        <span>سيتم فتح التقديم قريباً</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Schedule;
