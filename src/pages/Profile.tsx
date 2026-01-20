import { User, Mail, Phone, MapPin, Building, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/student/Header';
import { mockProfileData, mockAssignmentsData } from '@/data/staticData';

const Profile = () => {
  const profile = mockProfileData;
  const assignments = mockAssignmentsData;
  
  // Demo mode - show as admin
  const role: 'Admin' | 'SuperAdmin' | 'Student' = 'Admin';

  // Admin profile view
  if (role === 'Admin' || role === 'SuperAdmin') {
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
                  <span className="font-medium" dir="ltr">admin@demo.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الدور:</span>
                  <span className="font-medium">
                    {role === 'SuperAdmin' ? 'مسؤول رئيسي' : 'مسؤول'}
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
