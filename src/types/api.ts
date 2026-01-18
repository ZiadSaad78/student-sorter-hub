// API DTOs matching the Swagger schema

// Enums
export enum StudentTypeEnum {
  New = 0,
  Returning = 1,
}

// Auth DTOs
export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiration?: string;
  userId?: number;
  role?: string;
}

export interface RegisterDto {
  userName: string;
  password: string;
  role: string;
  studentId?: number | null;
}

// Student DTOs
export interface StudentDto {
  studentId: number;
  nationalId: string | null;
  fullName: string | null;
  studentType: StudentTypeEnum;
  birthDate: string;
  birthPlace: string | null;
  gender: string | null;
  religion: string | null;
  governorate: string | null;
  city: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  faculty: string | null;
  department: string | null;
  level: string | null;
  fatherContactId: number;
  guardianContactId: number;
  userId: number;
}

// Family Contact DTOs
export interface FamilyContactDto {
  contactId: number;
  fullName: string | null;
  nationalId: string | null;
  relation: string | null;
  job: string | null;
  phoneNumber: string | null;
  address: string | null;
}

// Education DTOs
export interface AcademicEducationDto {
  studentId: number;
  universityName?: string | null;
  collegeName?: string | null;
  departmentName?: string | null;
  gpa?: number;
  academicYear?: string | null;
}

export interface SecondaryEducationDto {
  studentId: number;
  secondaryStream: string | null;
  totalScore: number;
  percentage: number;
  grade: string | null;
}

// Building DTOs
export interface BuildingDto {
  buildingId: number;
  buildingName: string | null;
  gender: string | null;
  numberOfFloors: number;
  status: string | null;
}

export interface BuildingCreateDto {
  buildingName: string;
  gender: string;
  numberOfFloors: number;
  status?: string;
}

// Room DTOs
export interface RoomDto {
  roomId: number;
  roomNumber: string | null;
  capacity: number;
  currentOccupancy: number;
  buildingId: number;
  apartmentName: string | null;
  status: number;
}

export interface RoomCreateDto {
  roomNumber: string;
  capacity: number;
  buildingId: number;
  apartmentName?: string;
  status?: number;
}

// Room Assignment DTOs
export interface RoomAssignmentDto {
  studentId: number;
  roomId: number;
}

// Application DTOs
export interface ApplicationStatusDto {
  statusId: number;
  statusName: string | null;
  description: string | null;
}

export interface ApplicationWindowDto {
  windowId: number;
  windowName: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface ApplicationDetailsDto {
  applicationId: number;
  studentId: number;
  studentName: string | null;
  nationalId: string | null;
  faculty: string | null;
  level: string | null;
  governorate: string | null;
  gender: string | null;
  status: string | null;
  applicationDate: string;
  email?: string | null;
  phone?: string | null;
}

// Fees DTOs
export interface FeesDto {
  feeId: number;
  amount: number;
  feeType: string | null;
  status: string | null;
  createdAt: string;
  studentId: number;
  userId: number;
  assignmentId: number | null;
}

export interface FeePaymentDto {
  studentId: number;
  transactionCode: string | null;
  receiptFilePath: string | null;
}

// Notification DTOs
export interface NotificationDto {
  notificationId: number;
  title: string | null;
  message: string | null;
  createdAt: string;
  isRead: boolean;
  studentId: number;
  userId: number | null;
  applicationId: number | null;
}

// Complaint DTOs
export interface SubmitComplaintDto {
  title: string;
  message: string;
}

export interface ResolveComplaintDto {
  resolutionMessage: string;
}

export interface ComplaintDto {
  complaintId: number;
  title: string | null;
  message: string | null;
  status: string | null;
  createdAt: string;
  studentId: number;
  studentName?: string | null;
  resolutionMessage?: string | null;
  resolvedAt?: string | null;
}

// Full Form DTO (for student registration)
export interface FullFormDto {
  studentType: StudentTypeEnum;
  studentInfo: StudentDto;
  fatherInfo: FamilyContactDto;
  selectedGuardianRelation: string | null;
  otherGuardianInfo: FamilyContactDto;
  secondaryInfo: SecondaryEducationDto;
  academicInfo: AcademicEducationDto;
}

// Reports
export interface ReportsSummaryDto {
  totalStudents: number;
  totalBuildings: number;
  totalRooms: number;
  occupiedBeds: number;
  availableBeds: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}
