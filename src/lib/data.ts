// ============================================================
// APPEC TSS College Web System - Mock Data Store
// In a real system, this would be replaced with a secure database
// with properly hashed passwords (bcrypt/argon2).
// Credentials are NOT exposed in the UI — staff must know them.
// ============================================================

import type {
  User,
  ExamCode,
  Class,
  Course,
  Teacher,
  Student,
  AcademicMark,
  DisciplineMark,
  ResultPublication,
  TeacherCourseAssignment,
} from "./types";

// ============================================================
// Users (Admin Staff)
// ============================================================

// NOTE: In production, replace passwordHash with bcrypt/argon2 hashes.
// Credentials are distributed privately to each staff member by the administrator.
export const USERS: User[] = [
  {
    id: "u1",
    name: "Mrs. Amina Bello",
    email: "secretary@appec.edu",
    role: "secretary",
    passwordHash: "Sec@APPEC#2024!Bello",
    createdAt: "2024-09-01",
  },
  {
    id: "u2",
    name: "Dr. Emmanuel Okafor",
    email: "dos@appec.edu",
    role: "dos",
    passwordHash: "D0S@APPEC#2024!Okafor",
    createdAt: "2024-09-01",
  },
  {
    id: "u3",
    name: "Mr. Samuel Nkemdirim",
    email: "dod@appec.edu",
    role: "dod",
    passwordHash: "D0D@APPEC#2024!Nkemdirim",
    createdAt: "2024-09-01",
  },
  {
    id: "u4",
    name: "Prof. Grace Adeyemi",
    email: "hod@appec.edu",
    role: "hod",
    passwordHash: "H0D@APPEC#2024!Adeyemi",
    createdAt: "2024-09-01",
  },
  {
    id: "u5",
    name: "Mr. John Eze",
    email: "teacher1@appec.edu",
    role: "teacher",
    passwordHash: "Tch@APPEC#2024!Eze",
    createdAt: "2024-09-01",
  },
  {
    id: "u6",
    name: "Mrs. Fatima Musa",
    email: "teacher2@appec.edu",
    role: "teacher",
    passwordHash: "Tch@APPEC#2024!Musa",
    createdAt: "2024-09-01",
  },
];

// ============================================================
// Classes
// ============================================================

export const CLASSES: Class[] = [
  { id: "c1", name: "Form 1A - Science", level: "Form 1", department: "Science", academicYear: "2024/2025" },
  { id: "c2", name: "Form 2A - Science", level: "Form 2", department: "Science", academicYear: "2024/2025" },
  { id: "c3", name: "Form 3A - Arts", level: "Form 3", department: "Arts", academicYear: "2024/2025" },
  { id: "c4", name: "Form 4A - Commerce", level: "Form 4", department: "Commerce", academicYear: "2024/2025" },
  { id: "c5", name: "Form 5A - Technical", level: "Form 5", department: "Technical", academicYear: "2024/2025" },
];

// ============================================================
// Courses
// ============================================================

export const COURSES: Course[] = [
  { id: "co1", name: "Mathematics", code: "MTH101", department: "Science", level: "Form 1", credits: 4 },
  { id: "co2", name: "Physics", code: "PHY101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co3", name: "Chemistry", code: "CHM101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co4", name: "Biology", code: "BIO101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co5", name: "English Language", code: "ENG101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co6", name: "Mathematics", code: "MTH201", department: "Science", level: "Form 2", credits: 4 },
  { id: "co7", name: "Physics", code: "PHY201", department: "Science", level: "Form 2", credits: 3 },
  { id: "co8", name: "Literature in English", code: "LIT301", department: "Arts", level: "Form 3", credits: 3 },
  { id: "co9", name: "Economics", code: "ECO401", department: "Commerce", level: "Form 4", credits: 3 },
  { id: "co10", name: "Technical Drawing", code: "TEC501", department: "Technical", level: "Form 5", credits: 3 },
];

// ============================================================
// Teachers
// ============================================================

export const TEACHERS: Teacher[] = [
  {
    id: "t1",
    userId: "u5",
    name: "Mr. John Eze",
    email: "teacher1@appec.edu",
    phone: "+234-801-234-5678",
    specialization: "Mathematics & Physics",
    assignedCourses: [
      {
        id: "ta1",
        teacherId: "t1",
        courseId: "co1",
        classId: "c1",
        level: "Form 1",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: false,
      },
      {
        id: "ta2",
        teacherId: "t1",
        courseId: "co2",
        classId: "c1",
        level: "Form 1",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: false,
        marksSubmitted: false,
      },
    ],
    createdAt: "2024-09-01",
  },
  {
    id: "t2",
    userId: "u6",
    name: "Mrs. Fatima Musa",
    email: "teacher2@appec.edu",
    phone: "+234-802-345-6789",
    specialization: "English & Literature",
    assignedCourses: [
      {
        id: "ta3",
        teacherId: "t2",
        courseId: "co5",
        classId: "c1",
        level: "Form 1",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: true,
      },
    ],
    createdAt: "2024-09-01",
  },
];

// ============================================================
// Examination Codes
// ============================================================

export const EXAM_CODES: ExamCode[] = [
  {
    code: "APPEC-2024-001",
    candidateName: "Chukwuemeka Daniel",
    program: "General Science",
    department: "Science",
    level: "Form 1",
    classId: "c1",
    isUsed: true,
    admissionLetterConfirmed: true,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-002",
    candidateName: "Ngozi Adaeze",
    program: "General Science",
    department: "Science",
    level: "Form 1",
    classId: "c1",
    isUsed: false,
    admissionLetterConfirmed: false,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-003",
    candidateName: "Ibrahim Suleiman",
    program: "Arts",
    department: "Arts",
    level: "Form 3",
    classId: "c3",
    isUsed: false,
    admissionLetterConfirmed: true,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-004",
    candidateName: "Blessing Okonkwo",
    program: "Commerce",
    department: "Commerce",
    level: "Form 4",
    classId: "c4",
    isUsed: false,
    admissionLetterConfirmed: false,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-005",
    candidateName: "Amara Chisom",
    program: "Technical",
    department: "Technical",
    level: "Form 5",
    classId: "c5",
    isUsed: false,
    admissionLetterConfirmed: false,
    createdAt: "2024-08-01",
  },
];

// ============================================================
// Students
// ============================================================

export const STUDENTS: Student[] = [
  {
    id: "s1",
    registrationNumber: "APPEC/2024/001",
    examCode: "APPEC-2024-001",
    firstName: "Chukwuemeka",
    lastName: "Daniel",
    dateOfBirth: "2008-03-15",
    gender: "Male",
    phone: "+234-803-456-7890",
    email: "daniel.c@student.appec.edu",
    address: "12 Aba Road, Port Harcourt",
    guardianName: "Mr. Daniel Chukwuemeka Sr.",
    guardianPhone: "+234-803-456-7891",
    program: "General Science",
    department: "Science",
    level: "Form 1",
    classId: "c1",
    academicYear: "2024/2025",
    registeredAt: "2024-09-05",
    admissionLetterConfirmed: true,
  },
];

// ============================================================
// Academic Marks
// ============================================================

export const ACADEMIC_MARKS: AcademicMark[] = [
  {
    id: "am1",
    studentId: "s1",
    courseId: "co1",
    teacherId: "t1",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 35,
    examScore: 52,
    total: 87,
    grade: "A",
    remarks: "Excellent performance",
    submittedAt: "2024-12-10",
    published: true,
  },
  {
    id: "am2",
    studentId: "s1",
    courseId: "co5",
    teacherId: "t2",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 30,
    examScore: 45,
    total: 75,
    grade: "B",
    remarks: "Good performance",
    submittedAt: "2024-12-10",
    published: true,
  },
];

// ============================================================
// Discipline Marks
// ============================================================

export const DISCIPLINE_MARKS: DisciplineMark[] = [
  {
    id: "dm1",
    studentId: "s1",
    semester: "First",
    academicYear: "2024/2025",
    attendance: 18,
    conduct: 17,
    punctuality: 19,
    participation: 16,
    neatness: 18,
    total: 88,
    remarks: "Very disciplined student",
    enteredBy: "u3",
    updatedAt: "2024-12-10",
  },
];

// ============================================================
// Result Publications
// ============================================================

export const RESULT_PUBLICATIONS: ResultPublication[] = [
  {
    id: "rp1",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    publishedBy: "u2",
    publishedAt: "2024-12-15",
    isPublished: true,
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getClassById(id: string): Class | undefined {
  return CLASSES.find((c) => c.id === id);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getTeacherByUserId(userId: string): Teacher | undefined {
  return TEACHERS.find((t) => t.userId === userId);
}

export function getStudentByRegNumber(regNumber: string): Student | undefined {
  return STUDENTS.find((s) => s.registrationNumber === regNumber);
}

export function getExamCode(code: string): ExamCode | undefined {
  return EXAM_CODES.find((e) => e.code === code);
}

export function getStudentMarks(studentId: string): AcademicMark[] {
  return ACADEMIC_MARKS.filter((m) => m.studentId === studentId);
}

export function getStudentDiscipline(studentId: string): DisciplineMark | undefined {
  return DISCIPLINE_MARKS.find((d) => d.studentId === studentId);
}

export function isResultPublished(classId: string, semester: string, academicYear: string): boolean {
  return RESULT_PUBLICATIONS.some(
    (rp) => rp.classId === classId && rp.semester === semester && rp.academicYear === academicYear && rp.isPublished
  );
}

export function getGrade(total: number): string {
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  if (total >= 40) return "E";
  return "F";
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case "A": return "text-green-600";
    case "B": return "text-blue-600";
    case "C": return "text-yellow-600";
    case "D": return "text-orange-600";
    case "E": return "text-red-500";
    case "F": return "text-red-700";
    default: return "text-gray-600";
  }
}

export function getTeacherAssignments(teacherId: string): TeacherCourseAssignment[] {
  const teacher = TEACHERS.find((t) => t.id === teacherId);
  return teacher?.assignedCourses ?? [];
}
