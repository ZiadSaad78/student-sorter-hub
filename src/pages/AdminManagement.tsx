import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2, Shield, ShieldCheck, Loader2 } from 'lucide-react';
import { mockAdminsData } from '@/data/staticData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AdminUser {
  id: number;
  userName: string;
  role: string;
  createdAt?: string;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdminsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Mock create - add to local state
    const newAdmin: AdminUser = {
      id: admins.length + 1,
      userName: newAdminUsername,
      role: 'Admin',
      createdAt: new Date().toISOString(),
    };

    setAdmins([...admins, newAdmin]);
    toast({
      title: 'تم إنشاء المسؤول بنجاح',
      description: `تم إضافة ${newAdminUsername} كمسؤول جديد`,
    });
    setDialogOpen(false);
    setNewAdminUsername('');
    setNewAdminPassword('');
    setIsCreating(false);
  };

  const handleRemoveAdmin = (adminId: number) => {
    const admin = admins.find(a => a.id === adminId);
    if (admin?.role === 'SuperAdmin') {
      toast({
        title: 'خطأ',
        description: 'لا يمكن حذف المسؤول الرئيسي',
        variant: 'destructive',
      });
      return;
    }

    setAdmins(admins.filter(a => a.id !== adminId));
    toast({
      title: 'تم حذف المسؤول',
      description: 'تم إزالة المسؤول بنجاح',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المسؤولين</h1>
          <p className="text-muted-foreground">إضافة وإدارة صلاحيات المسؤولين في النظام</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 ml-2" />
              إضافة مسؤول جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مسؤول جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات المسؤول الجديد لإنشاء حساب له
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  placeholder="أدخل اسم المستخدم"
                  required
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  dir="ltr"
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : (
                  'إنشاء المسؤول'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المسؤولين</CardTitle>
          <CardDescription>جميع المسؤولين المسجلين في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          {admins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا يوجد مسؤولين مسجلين</p>
              <p className="text-sm mt-2">استخدم زر "إضافة مسؤول جديد" لإضافة مسؤول</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم المستخدم</TableHead>
                  <TableHead className="text-right">الصلاحية</TableHead>
                  <TableHead className="text-right">تاريخ الإضافة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium" dir="ltr">
                      {admin.userName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={admin.role === 'SuperAdmin' ? 'default' : 'secondary'}
                        className="gap-1"
                      >
                        {admin.role === 'SuperAdmin' ? (
                          <>
                            <ShieldCheck className="w-3 h-3" />
                            مسؤول رئيسي
                          </>
                        ) : (
                          <>
                            <Shield className="w-3 h-3" />
                            مسؤول
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('ar-EG') : '-'}
                    </TableCell>
                    <TableCell>
                      {admin.role !== 'SuperAdmin' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAdmin(admin.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
