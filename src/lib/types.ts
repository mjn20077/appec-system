// ============================================================
// APPEC TSS College Web System - Core Types
// ============================================================

export type UserRole = "secretary" | "dos" | "dod" | "teacher" | "student" | "hod";

export type Department = "Science" | "Arts" | "Commerce" | "Technical" | "Vocational";
export type Level = "Form 1" | "Form 2" | "Form 3" | "Form 4" | "Form 5";
export type Semester = "First" | "Second";

// ============================================================
// Users & Authentication
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

// ============================================================
// Examination Codes (for student admission)
// ============================================================

export interface ExamCode {
  code: string;
  candidateName: string;
  program: string;
  department: Department;
  level: Level;
  classId: string;
  isUsed: boolean;
  admissionLetterConfirmed: boolean;
  createdAt: string;
}

// ============================================================
// Classes & Courses
// ============================================================

export interface Class {
  id: string;
  name: string;
  level: Level;
  department: Department;
  academicYear: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: Department;
  level: Level;
  credits: number;
}

// ============================================================
// Teachers
// ============================================================

export interface Teacher {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  assignedCourses: TeacherCourseAssignment[];
  createdAt: string;
}

export interface TeacherCourseAssignment {
  id: string;
  teacherId: string;
  courseId: string;
  classId: string;
  level: Level;
  semester: Semester;
  academicYear: string;
  marksEntryAuthorized: boolean;
  marksSubmitted: boolean;
}

// ============================================================
// Students
// ============================================================

export interface Student {
  id: string;
  registrationNumber: string;
  examCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  program: string;
  department: Department;
  level: Level;
  classId: string;
  academicYear: string;
  registeredAt: string;
  admissionLetterConfirmed: boolean;
}

// ============================================================
// Marks & Results
// ============================================================

export interface AcademicMark {
  id: string;
  studentId: string;
  courseId: string;
  teacherId: string;
  classId: string;
  semester: Semester;
  academicYear: string;
  continuousAssessment: number; // out of 40
  examScore: number; // out of 60
  total: number; // out of 100
  grade: string;
  remarks: string;
  submittedAt: string;
  published: boolean;
}

export interface DisciplineMark {
  id: string;
  studentId: string;
  semester: Semester;
  academicYear: string;
  attendance: number; // out of 20
  conduct: number; // out of 20
  punctuality: number; // out of 20
  participation: number; // out of 20
  neatness: number; // out of 20
  total: number; // out of 100
  remarks: string;
  enteredBy: string; // DOD user id
  updatedAt: string;
}

export interface ResultPublication {
  id: string;
  classId: string;
  semester: Semester;
  academicYear: string;
  publishedBy: string; // DOS user id
  publishedAt: string;
  isPublished: boolean;
}

// ============================================================
// Admission Letter
// ============================================================

export interface AdmissionLetter {
  examCode: string;
  candidateName: string;
  program: string;
  department: Department;
  level: Level;
  className: string;
  academicYear: string;
  reportDate: string;
  issuedAt: string;
  confirmed: boolean;
  confirmedAt?: string;
}

// ============================================================
// Dashboard Stats
// ============================================================

export interface SystemStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalClasses: number;
  pendingMarksAuthorization: number;
  unpublishedResults: number;
}
