import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Loader2, Building, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/student/Header';
import { useAuth } from '@/hooks/useAuth';
import { studentService } from '@/services/api';
import { StudentProfileDetailsDto, StudentAssignmentDto } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, role } = useAuth();
  const [profile, setProfile] = useState<StudentProfileDetailsDto | null>(null);
  const [assignments, setAssignments] = useState<StudentAssignmentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      // Only fetch student profile if user is a student
      if (role === 'Student' || role === 'student') {
        const [profileRes, assignmentsRes] = await Promise.all([
          studentService.getMyDetails(),
          studentService.getMyAssignments(),
        ]);

        if (profileRes.error) {
          toast({
            title: 'خطأ في جلب البيانات',
            description: profileRes.error,
            variant: 'destructive',
          });
        } else if (profileRes.data) {
          setProfile(profileRes.data);
        }

        if (assignmentsRes.data) {
          setAssignments(assignmentsRes.data);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Admin profile view
  if (role === 'Admin' || role === 'admin' || role === 'SuperAdmin' || role === 'super_admin') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">الملف الشخصي</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  معلومات الحساب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">اسم المستخدم:</span>
                  <span className="font-medium" dir="ltr">{user?.email || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الدور:</span>
                  <span className="font-medium">
                    {role === 'SuperAdmin' || role === 'super_admin' ? 'مسؤول رئيسي' : 'مسؤول'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">حالة الحساب:</span>
                  <span className="text-green-600 font-medium">نشط</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Student profile view
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">الملف الشخصي</h1>
        
        {!profile ? (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد بيانات متاحة</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.student.fullName || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span dir="ltr">{profile.student.email || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span dir="ltr">{profile.student.phone || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.student.governorate}, {profile.student.city}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأكاديمية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الكلية:</span>
                  <span className="font-medium">{profile.student.faculty || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">القسم:</span>
                  <span className="font-medium">{profile.student.department || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المستوى:</span>
                  <span className="font-medium">{profile.student.level || 'غير محدد'}</span>
                </div>
                {profile.academicEducation && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المعدل التراكمي:</span>
                    <span className="font-medium">{profile.academicEducation.currentGPA}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {assignments.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    السكن الحالي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {assignments.map((assignment) => (
                      <div key={assignment.assignmentId} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-primary" />
                          <span className="font-medium">{assignment.buildingName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Bed className="h-4 w-4" />
                          <span>غرفة {assignment.roomNumber}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          تم التسكين: {new Date(assignment.assignedAt).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
