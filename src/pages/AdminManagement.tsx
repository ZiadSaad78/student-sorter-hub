import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2, Shield, ShieldCheck, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AdminUser {
  id: string;
  user_id: string;
  role: 'super_admin' | 'admin';
  created_at: string;
  profile: {
    email: string;
    full_name: string | null;
  } | null;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAdmins = async () => {
    setLoading(true);
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (rolesError) {
      console.error('Error fetching admins:', rolesError);
      setLoading(false);
      return;
    }

    // Fetch profiles for each admin
    const adminsWithProfiles: AdminUser[] = [];
    for (const role of rolesData || []) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('user_id', role.user_id)
        .maybeSingle();

      adminsWithProfiles.push({
        ...role,
        profile: profileData,
      });
    }

    setAdmins(adminsWithProfiles);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // First, create the user account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: newAdminEmail,
      password: newAdminPassword,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: newAdminName,
        },
      },
    });

    if (signUpError) {
      toast({
        title: 'خطأ في إنشاء الحساب',
        description: signUpError.message,
        variant: 'destructive',
      });
      setIsCreating(false);
      return;
    }

    if (!signUpData.user) {
      toast({
        title: 'خطأ',
        description: 'فشل في إنشاء المستخدم',
        variant: 'destructive',
      });
      setIsCreating(false);
      return;
    }

    // Add admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: signUpData.user.id,
        role: 'admin',
      });

    if (roleError) {
      toast({
        title: 'خطأ في تعيين الصلاحية',
        description: roleError.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'تم إنشاء المسؤول بنجاح',
        description: `تم إضافة ${newAdminName} كمسؤول جديد`,
      });
      setDialogOpen(false);
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminName('');
      fetchAdmins();
    }

    setIsCreating(false);
  };

  const handleRemoveAdmin = async (roleId: string, adminUserId: string) => {
    if (adminUserId === user?.id) {
      toast({
        title: 'خطأ',
        description: 'لا يمكنك حذف صلاحياتك الخاصة',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      toast({
        title: 'خطأ في حذف المسؤول',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'تم حذف المسؤول',
        description: 'تم إزالة صلاحيات المسؤول بنجاح',
      });
      fetchAdmins();
    }
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
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="admin@university.edu"
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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : admins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا يوجد مسؤولين مسجلين
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">الصلاحية</TableHead>
                  <TableHead className="text-right">تاريخ الإضافة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      {admin.profile?.full_name || 'غير محدد'}
                    </TableCell>
                    <TableCell dir="ltr" className="text-left">
                      {admin.profile?.email || 'غير متوفر'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={admin.role === 'super_admin' ? 'default' : 'secondary'}
                        className="gap-1"
                      >
                        {admin.role === 'super_admin' ? (
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
                      {new Date(admin.created_at).toLocaleDateString('ar-EG')}
                    </TableCell>
                    <TableCell>
                      {admin.role !== 'super_admin' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAdmin(admin.id, admin.user_id)}
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
