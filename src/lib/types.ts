// ============================================================
// APPEC TSS College Web System - Core Type Definitions
// ============================================================
// This file defines all TypeScript interfaces and types used
// throughout the system. Keep this as the single source of truth
// for all data shapes.
// ============================================================

// ============================================================
// User Roles
// ============================================================

/**
 * All possible roles in the APPEC TSS College system.
 * Each role has a dedicated dashboard and specific permissions.
 */
export type UserRole =
  | "secretary"   // Administrative setup: teachers, courses, student verification
  | "dos"         // Director of Studies: academic oversight, marks authorization, results publication
  | "dod"         // Director of Discipline: discipline records management
  | "teacher"     // Marks entry for assigned courses (requires DOS authorization)
  | "student"     // Read-only: view published results after registration
  | "hod"         // Head of Department / Academic Supervisor: full read-only oversight
  | "principal"   // Principal / Rector: highest authority, policy management, full oversight
  | "bursar"      // Bursar / Finance Officer: fees, payments, financial records
  | "librarian"   // Librarian: library resources, student borrowing records
  | "it_admin";   // IT Administrator: user management, system settings, audit logs

// ============================================================
// Academic Enumerations
// ============================================================

export type Department = "Science" | "Arts" | "Commerce" | "Technical" | "Vocational";
export type Level = "Form 1" | "Form 2" | "Form 3" | "Form 4" | "Form 5";
export type Semester = "First" | "Second";

// ============================================================
// Users & Authentication
// ============================================================

/**
 * Represents a staff user account in the system.
 * NOTE: In production, passwordHash must be a bcrypt/argon2 hash.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string; // Store hashed passwords in production!
  phone?: string;
  department?: Department;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// ============================================================
// Examination Codes (for student admission)
// ============================================================

/**
 * Examination codes are issued to candidates who pass the entry exam.
 * Each code is unique and can only be used once for registration.
 */
export interface ExamCode {
  code: string;
  candidateName: string;
  program: string;
  department: Department;
  level: Level;
  classId: string;
  isUsed: boolean;                    // true once student completes registration
  admissionLetterConfirmed: boolean;  // true once student confirms the letter
  createdAt: string;
}

// ============================================================
// Classes & Courses
// ============================================================

/**
 * A class is a group of students at a specific level and department.
 */
export interface Class {
  id: string;
  name: string;
  level: Level;
  department: Department;
  academicYear: string;
  capacity: number;       // Maximum number of students
  classTeacherId?: string; // Assigned class teacher
}

/**
 * A course (subject) offered at a specific level and department.
 */
export interface Course {
  id: string;
  name: string;
  code: string;
  department: Department;
  level: Level;
  credits: number;
  description?: string;
}

// ============================================================
// Teachers
// ============================================================

/**
 * A teacher profile linked to a user account.
 * Teachers can be assigned to multiple courses and classes.
 */
export interface Teacher {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;   // e.g. "B.Sc. Mathematics", "M.Ed. English"
  assignedCourses: TeacherCourseAssignment[];
  createdAt: string;
}

/**
 * Links a teacher to a specific course, class, level, and semester.
 * The DOS controls marks entry authorization per assignment.
 */
export interface TeacherCourseAssignment {
  id: string;
  teacherId: string;
  courseId: string;
  classId: string;
  level: Level;
  semester: Semester;
  academicYear: string;
  marksEntryAuthorized: boolean; // DOS must authorize before teacher can enter marks
  marksSubmitted: boolean;       // true once teacher submits marks
  authorizedAt?: string;         // When DOS authorized marks entry
  submittedAt?: string;          // When teacher submitted marks
}

// ============================================================
// Students
// ============================================================

/**
 * A registered student in the system.
 * Students can only be created after confirming their admission letter.
 */
export interface Student {
  id: string;
  registrationNumber: string;   // e.g. APPEC/2024/001
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
  feeStatus?: "Paid" | "Partial" | "Unpaid"; // Managed by Bursar
  libraryCardNumber?: string;                 // Assigned by Librarian
}

// ============================================================
// Marks & Results
// ============================================================

/**
 * Academic marks for a student in a specific course and semester.
 * CA is out of 40, Exam is out of 60, Total is out of 100.
 */
export interface AcademicMark {
  id: string;
  studentId: string;
  courseId: string;
  teacherId: string;
  classId: string;
  semester: Semester;
  academicYear: string;
  continuousAssessment: number; // out of 40
  examScore: number;            // out of 60
  total: number;                // out of 100 (CA + Exam)
  grade: string;                // A, B, C, D, E, F
  remarks: string;
  submittedAt: string;
  published: boolean;           // DOS publishes results
}

/**
 * Discipline assessment records managed by the DOD.
 * Each criterion is scored out of 20, total out of 100.
 */
export interface DisciplineMark {
  id: string;
  studentId: string;
  semester: Semester;
  academicYear: string;
  attendance: number;    // out of 20
  conduct: number;       // out of 20
  punctuality: number;   // out of 20
  participation: number; // out of 20
  neatness: number;      // out of 20
  total: number;         // out of 100
  remarks: string;
  enteredBy: string;     // DOD user id
  updatedAt: string;
}

/**
 * Tracks when the DOS publishes results for a class/semester.
 * Students can only view results after publication.
 */
export interface ResultPublication {
  id: string;
  classId: string;
  semester: Semester;
  academicYear: string;
  publishedBy: string;  // DOS user id
  publishedAt: string;
  isPublished: boolean;
}

// ============================================================
// Admission Letter
// ============================================================

/**
 * Represents the admission letter generated for a candidate.
 * Must be confirmed before the student can register.
 */
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
// Finance / Bursar
// ============================================================

/**
 * Fee structure for a specific program, level, and academic year.
 */
export interface FeeStructure {
  id: string;
  program: string;
  level: Level;
  academicYear: string;
  tuitionFee: number;
  developmentLevy: number;
  examFee: number;
  libraryFee: number;
  sportsFee: number;
  totalFee: number;
}

/**
 * A payment record for a student.
 */
export interface FeePayment {
  id: string;
  studentId: string;
  registrationNumber: string;
  academicYear: string;
  semester: Semester;
  amountPaid: number;
  totalFee: number;
  balance: number;
  paymentDate: string;
  paymentMethod: "Cash" | "Bank Transfer" | "Online";
  receiptNumber: string;
  recordedBy: string; // Bursar user id
  status: "Paid" | "Partial" | "Unpaid";
}

// ============================================================
// Library
// ============================================================

/**
 * A book or resource in the college library.
 */
export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  department?: Department;
  totalCopies: number;
  availableCopies: number;
  addedAt: string;
}

/**
 * A borrowing record linking a student to a library book.
 */
export interface LibraryBorrowing {
  id: string;
  studentId: string;
  registrationNumber: string;
  bookId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: "Borrowed" | "Returned" | "Overdue";
  recordedBy: string; // Librarian user id
}

// ============================================================
// IT Administration
// ============================================================

/**
 * System audit log entry for tracking important actions.
 */
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

/**
 * System-wide settings managed by IT Admin.
 */
export interface SystemSetting {
  key: string;
  value: string;
  description: string;
  updatedBy: string;
  updatedAt: string;
}

// ============================================================
// Dashboard Statistics
// ============================================================

/**
 * Aggregated statistics for dashboard overview cards.
 */
export interface SystemStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalClasses: number;
  pendingMarksAuthorization: number;
  unpublishedResults: number;
  totalRevenue?: number;
  pendingFees?: number;
  totalBooksAvailable?: number;
  activeBorrowings?: number;
}
