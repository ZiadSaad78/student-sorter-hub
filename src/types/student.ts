export type StudentStatus = 'pending' | 'accepted' | 'rejected';

export interface Student {
  id: string;
  name: string;
  nationalId: string;
  dateOfBirth: string;
  governorate: string;
  college: string;
  level: string;
  phone: string;
  email: string;
  status: StudentStatus;
  applicationDate: string;
}

export interface FilterState {
  governorate: string;
  college: string;
  level: string;
  dateOfBirthFrom: string;
  dateOfBirthTo: string;
  status: string;
}
