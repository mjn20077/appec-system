// ============================================================
// APPEC TSS College Web System - Mock Data Store
// ============================================================
// In a real production system, this data would be stored in a
// secure database (e.g. PostgreSQL, MySQL) with:
//   - Properly hashed passwords (bcrypt/argon2)
//   - Role-based access control at the API level
//   - Audit logging for all sensitive operations
//
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
  FeeStructure,
  FeePayment,
  LibraryBook,
  LibraryBorrowing,
  AuditLog,
  SystemSetting,
} from "./types";

// ============================================================
// USERS (Staff Accounts)
// ============================================================
// NOTE: In production, replace passwordHash with bcrypt/argon2 hashes.
// Credentials are distributed privately to each staff member.
// ============================================================

export const USERS: User[] = [
  // --- Administrative Staff ---
  {
    id: "u1",
    name: "Mrs. Amina Bello",
    email: "secretary@appec.edu",
    role: "secretary",
    passwordHash: "Sec@APPEC#2024!Bello",
    phone: "+234-801-111-2222",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-05",
  },
  {
    id: "u2",
    name: "Dr. Emmanuel Okafor",
    email: "dos@appec.edu",
    role: "dos",
    passwordHash: "D0S@APPEC#2024!Okafor",
    phone: "+234-802-222-3333",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-05",
  },
  {
    id: "u3",
    name: "Mr. Samuel Nkemdirim",
    email: "dod@appec.edu",
    role: "dod",
    passwordHash: "D0D@APPEC#2024!Nkemdirim",
    phone: "+234-803-333-4444",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-04",
  },
  {
    id: "u4",
    name: "Prof. Grace Adeyemi",
    email: "hod@appec.edu",
    role: "hod",
    passwordHash: "H0D@APPEC#2024!Adeyemi",
    phone: "+234-804-444-5555",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-05",
  },
  // --- Professional Level Roles ---
  {
    id: "u7",
    name: "Rev. Dr. Chukwudi Obiora",
    email: "principal@appec.edu",
    role: "principal",
    passwordHash: "Pr1nc@APPEC#2024!Obiora",
    phone: "+234-807-777-8888",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-05",
  },
  {
    id: "u8",
    name: "Mr. Tunde Adesanya",
    email: "bursar@appec.edu",
    role: "bursar",
    passwordHash: "Burs@APPEC#2024!Adesanya",
    phone: "+234-808-888-9999",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-04",
  },
  {
    id: "u9",
    name: "Miss Chidinma Eze",
    email: "librarian@appec.edu",
    role: "librarian",
    passwordHash: "L1br@APPEC#2024!Eze",
    phone: "+234-809-999-0000",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-03",
  },
  {
    id: "u10",
    name: "Mr. Babatunde Ogundimu",
    email: "itadmin@appec.edu",
    role: "it_admin",
    passwordHash: "1T@APPEC#2024!Ogundimu",
    phone: "+234-810-000-1111",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-05",
  },
  // --- Teachers ---
  {
    id: "u5",
    name: "Mr. John Eze",
    email: "teacher1@appec.edu",
    role: "teacher",
    passwordHash: "Tch@APPEC#2024!Eze",
    phone: "+234-805-555-6666",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-05",
  },
  {
    id: "u6",
    name: "Mrs. Fatima Musa",
    email: "teacher2@appec.edu",
    role: "teacher",
    passwordHash: "Tch@APPEC#2024!Musa",
    phone: "+234-806-666-7777",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-04",
  },
  {
    id: "u11",
    name: "Mr. Emeka Obi",
    email: "teacher3@appec.edu",
    role: "teacher",
    passwordHash: "Tch@APPEC#2024!Obi",
    phone: "+234-811-111-2222",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-03",
  },
  {
    id: "u12",
    name: "Mrs. Ngozi Ike",
    email: "teacher4@appec.edu",
    role: "teacher",
    passwordHash: "Tch@APPEC#2024!Ike",
    phone: "+234-812-222-3333",
    isActive: true,
    createdAt: "2024-09-01",
    lastLoginAt: "2026-03-02",
  },
];

// ============================================================
// CLASSES
// ============================================================

export const CLASSES: Class[] = [
  { id: "c1", name: "Form 1A - Science",    level: "Form 1", department: "Science",    academicYear: "2024/2025", capacity: 40 },
  { id: "c2", name: "Form 2A - Science",    level: "Form 2", department: "Science",    academicYear: "2024/2025", capacity: 40 },
  { id: "c3", name: "Form 3A - Arts",       level: "Form 3", department: "Arts",       academicYear: "2024/2025", capacity: 35 },
  { id: "c4", name: "Form 4A - Commerce",   level: "Form 4", department: "Commerce",   academicYear: "2024/2025", capacity: 35 },
  { id: "c5", name: "Form 5A - Technical",  level: "Form 5", department: "Technical",  academicYear: "2024/2025", capacity: 30 },
  { id: "c6", name: "Form 1B - Science",    level: "Form 1", department: "Science",    academicYear: "2024/2025", capacity: 40 },
  { id: "c7", name: "Form 2B - Arts",       level: "Form 2", department: "Arts",       academicYear: "2024/2025", capacity: 35 },
  { id: "c8", name: "Form 3B - Commerce",   level: "Form 3", department: "Commerce",   academicYear: "2024/2025", capacity: 35 },
  { id: "c9", name: "Form 4B - Vocational", level: "Form 4", department: "Vocational", academicYear: "2024/2025", capacity: 30 },
  { id: "c10", name: "Form 5B - Arts",      level: "Form 5", department: "Arts",       academicYear: "2024/2025", capacity: 30 },
];

// ============================================================
// COURSES
// ============================================================

export const COURSES: Course[] = [
  // Form 1 - Science
  { id: "co1",  name: "Mathematics",          code: "MTH101", department: "Science",    level: "Form 1", credits: 4, description: "Algebra, geometry, and arithmetic fundamentals" },
  { id: "co2",  name: "Physics",              code: "PHY101", department: "Science",    level: "Form 1", credits: 3, description: "Introduction to mechanics and energy" },
  { id: "co3",  name: "Chemistry",            code: "CHM101", department: "Science",    level: "Form 1", credits: 3, description: "Basic chemical reactions and periodic table" },
  { id: "co4",  name: "Biology",              code: "BIO101", department: "Science",    level: "Form 1", credits: 3, description: "Cell biology and basic life sciences" },
  { id: "co5",  name: "English Language",     code: "ENG101", department: "Science",    level: "Form 1", credits: 3, description: "Grammar, comprehension, and composition" },
  { id: "co6",  name: "French Language",      code: "FRN101", department: "Science",    level: "Form 1", credits: 2, description: "Basic French communication skills" },
  { id: "co7",  name: "Computer Studies",     code: "CST101", department: "Science",    level: "Form 1", credits: 2, description: "Introduction to computing and ICT" },
  // Form 2 - Science
  { id: "co8",  name: "Mathematics",          code: "MTH201", department: "Science",    level: "Form 2", credits: 4, description: "Advanced algebra and trigonometry" },
  { id: "co9",  name: "Physics",              code: "PHY201", department: "Science",    level: "Form 2", credits: 3, description: "Waves, optics, and electricity" },
  { id: "co10", name: "Chemistry",            code: "CHM201", department: "Science",    level: "Form 2", credits: 3, description: "Organic chemistry and stoichiometry" },
  { id: "co11", name: "Biology",              code: "BIO201", department: "Science",    level: "Form 2", credits: 3, description: "Genetics and ecology" },
  { id: "co12", name: "English Language",     code: "ENG201", department: "Science",    level: "Form 2", credits: 3, description: "Advanced grammar and essay writing" },
  // Form 3 - Arts
  { id: "co13", name: "Literature in English",code: "LIT301", department: "Arts",       level: "Form 3", credits: 3, description: "Poetry, prose, and drama analysis" },
  { id: "co14", name: "History",              code: "HIS301", department: "Arts",       level: "Form 3", credits: 3, description: "African and world history" },
  { id: "co15", name: "Government",           code: "GOV301", department: "Arts",       level: "Form 3", credits: 3, description: "Political systems and governance" },
  { id: "co16", name: "Christian Religious Studies", code: "CRS301", department: "Arts", level: "Form 3", credits: 2, description: "Biblical studies and Christian ethics" },
  { id: "co17", name: "English Language",     code: "ENG301", department: "Arts",       level: "Form 3", credits: 3, description: "Advanced composition and oral skills" },
  // Form 4 - Commerce
  { id: "co18", name: "Economics",            code: "ECO401", department: "Commerce",   level: "Form 4", credits: 3, description: "Micro and macroeconomics principles" },
  { id: "co19", name: "Accounting",           code: "ACC401", department: "Commerce",   level: "Form 4", credits: 4, description: "Financial accounting and bookkeeping" },
  { id: "co20", name: "Commerce",             code: "COM401", department: "Commerce",   level: "Form 4", credits: 3, description: "Trade, business, and commercial activities" },
  { id: "co21", name: "Business Studies",     code: "BUS401", department: "Commerce",   level: "Form 4", credits: 3, description: "Entrepreneurship and business management" },
  { id: "co22", name: "Mathematics",          code: "MTH401", department: "Commerce",   level: "Form 4", credits: 3, description: "Commercial mathematics and statistics" },
  // Form 5 - Technical
  { id: "co23", name: "Technical Drawing",    code: "TEC501", department: "Technical",  level: "Form 5", credits: 3, description: "Engineering drawing and design" },
  { id: "co24", name: "Auto Mechanics",       code: "AUT501", department: "Technical",  level: "Form 5", credits: 4, description: "Vehicle maintenance and repair" },
  { id: "co25", name: "Electrical Installation", code: "ELE501", department: "Technical", level: "Form 5", credits: 4, description: "Wiring, circuits, and electrical safety" },
  { id: "co26", name: "Building Construction",code: "BLD501", department: "Technical",  level: "Form 5", credits: 3, description: "Construction techniques and materials" },
  { id: "co27", name: "Mathematics",          code: "MTH501", department: "Technical",  level: "Form 5", credits: 3, description: "Applied mathematics for technical fields" },
];

// ============================================================
// TEACHERS
// ============================================================

export const TEACHERS: Teacher[] = [
  {
    id: "t1",
    userId: "u5",
    name: "Mr. John Eze",
    email: "teacher1@appec.edu",
    phone: "+234-805-555-6666",
    specialization: "Mathematics & Physics",
    qualification: "B.Sc. Mathematics (University of Lagos)",
    assignedCourses: [
      {
        id: "ta1",
        teacherId: "t1",
        courseId: "co1",   // Mathematics Form 1
        classId: "c1",
        level: "Form 1",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: true,
        authorizedAt: "2024-11-01",
        submittedAt: "2024-12-10",
      },
      {
        id: "ta2",
        teacherId: "t1",
        courseId: "co2",   // Physics Form 1
        classId: "c1",
        level: "Form 1",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: false,
        authorizedAt: "2024-11-01",
      },
      {
        id: "ta3",
        teacherId: "t1",
        courseId: "co8",   // Mathematics Form 2
        classId: "c2",
        level: "Form 2",
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
    phone: "+234-806-666-7777",
    specialization: "English Language & Literature",
    qualification: "M.A. English (Ahmadu Bello University)",
    assignedCourses: [
      {
        id: "ta4",
        teacherId: "t2",
        courseId: "co5",   // English Form 1
        classId: "c1",
        level: "Form 1",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: true,
        authorizedAt: "2024-11-01",
        submittedAt: "2024-12-10",
      },
      {
        id: "ta5",
        teacherId: "t2",
        courseId: "co13",  // Literature Form 3
        classId: "c3",
        level: "Form 3",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: false,
        authorizedAt: "2024-11-15",
      },
      {
        id: "ta6",
        teacherId: "t2",
        courseId: "co17",  // English Form 3
        classId: "c3",
        level: "Form 3",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: false,
        marksSubmitted: false,
      },
    ],
    createdAt: "2024-09-01",
  },
  {
    id: "t3",
    userId: "u11",
    name: "Mr. Emeka Obi",
    email: "teacher3@appec.edu",
    phone: "+234-811-111-2222",
    specialization: "Economics & Commerce",
    qualification: "B.Sc. Economics (University of Nigeria, Nsukka)",
    assignedCourses: [
      {
        id: "ta7",
        teacherId: "t3",
        courseId: "co18",  // Economics Form 4
        classId: "c4",
        level: "Form 4",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: true,
        authorizedAt: "2024-11-01",
        submittedAt: "2024-12-12",
      },
      {
        id: "ta8",
        teacherId: "t3",
        courseId: "co20",  // Commerce Form 4
        classId: "c4",
        level: "Form 4",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: false,
        authorizedAt: "2024-11-01",
      },
    ],
    createdAt: "2024-09-01",
  },
  {
    id: "t4",
    userId: "u12",
    name: "Mrs. Ngozi Ike",
    email: "teacher4@appec.edu",
    phone: "+234-812-222-3333",
    specialization: "Technical Drawing & Auto Mechanics",
    qualification: "B.Tech. Mechanical Engineering (Federal University of Technology)",
    assignedCourses: [
      {
        id: "ta9",
        teacherId: "t4",
        courseId: "co23",  // Technical Drawing Form 5
        classId: "c5",
        level: "Form 5",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: true,
        marksSubmitted: false,
        authorizedAt: "2024-11-15",
      },
      {
        id: "ta10",
        teacherId: "t4",
        courseId: "co24",  // Auto Mechanics Form 5
        classId: "c5",
        level: "Form 5",
        semester: "First",
        academicYear: "2024/2025",
        marksEntryAuthorized: false,
        marksSubmitted: false,
      },
    ],
    createdAt: "2024-09-01",
  },
];

// ============================================================
// EXAMINATION CODES
// ============================================================
// These codes are issued to candidates who pass the entry exam.
// Students use these codes to access the admission letter portal.
// ============================================================

export const EXAM_CODES: ExamCode[] = [
  // Already used (registered students)
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
    code: "APPEC-2024-006",
    candidateName: "Adaeze Okonkwo",
    program: "General Science",
    department: "Science",
    level: "Form 1",
    classId: "c1",
    isUsed: true,
    admissionLetterConfirmed: true,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-007",
    candidateName: "Yusuf Abdullahi",
    program: "Commerce",
    department: "Commerce",
    level: "Form 4",
    classId: "c4",
    isUsed: true,
    admissionLetterConfirmed: true,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-008",
    candidateName: "Chioma Nwosu",
    program: "Arts",
    department: "Arts",
    level: "Form 3",
    classId: "c3",
    isUsed: true,
    admissionLetterConfirmed: true,
    createdAt: "2024-08-01",
  },
  // Admission confirmed but not yet registered
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
  // Not yet accessed
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
  {
    code: "APPEC-2024-009",
    candidateName: "Oluwaseun Adebayo",
    program: "General Science",
    department: "Science",
    level: "Form 2",
    classId: "c2",
    isUsed: false,
    admissionLetterConfirmed: false,
    createdAt: "2024-08-01",
  },
  {
    code: "APPEC-2024-010",
    candidateName: "Miriam Yakubu",
    program: "Vocational",
    department: "Vocational",
    level: "Form 4",
    classId: "c9",
    isUsed: false,
    admissionLetterConfirmed: false,
    createdAt: "2024-08-01",
  },
];

// ============================================================
// STUDENTS
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
    feeStatus: "Paid",
    libraryCardNumber: "LIB-2024-001",
  },
  {
    id: "s2",
    registrationNumber: "APPEC/2024/002",
    examCode: "APPEC-2024-006",
    firstName: "Adaeze",
    lastName: "Okonkwo",
    dateOfBirth: "2008-07-22",
    gender: "Female",
    phone: "+234-804-567-8901",
    email: "okonkwo.a@student.appec.edu",
    address: "45 Enugu Street, Onitsha",
    guardianName: "Mrs. Patricia Okonkwo",
    guardianPhone: "+234-804-567-8902",
    program: "General Science",
    department: "Science",
    level: "Form 1",
    classId: "c1",
    academicYear: "2024/2025",
    registeredAt: "2024-09-06",
    admissionLetterConfirmed: true,
    feeStatus: "Partial",
    libraryCardNumber: "LIB-2024-002",
  },
  {
    id: "s3",
    registrationNumber: "APPEC/2024/003",
    examCode: "APPEC-2024-007",
    firstName: "Yusuf",
    lastName: "Abdullahi",
    dateOfBirth: "2006-11-10",
    gender: "Male",
    phone: "+234-805-678-9012",
    email: "abdullahi.y@student.appec.edu",
    address: "78 Kano Road, Kaduna",
    guardianName: "Alhaji Musa Abdullahi",
    guardianPhone: "+234-805-678-9013",
    program: "Commerce",
    department: "Commerce",
    level: "Form 4",
    classId: "c4",
    academicYear: "2024/2025",
    registeredAt: "2024-09-07",
    admissionLetterConfirmed: true,
    feeStatus: "Paid",
    libraryCardNumber: "LIB-2024-003",
  },
  {
    id: "s4",
    registrationNumber: "APPEC/2024/004",
    examCode: "APPEC-2024-008",
    firstName: "Chioma",
    lastName: "Nwosu",
    dateOfBirth: "2007-05-18",
    gender: "Female",
    phone: "+234-806-789-0123",
    email: "nwosu.c@student.appec.edu",
    address: "23 Owerri Road, Imo State",
    guardianName: "Dr. Emeka Nwosu",
    guardianPhone: "+234-806-789-0124",
    program: "Arts",
    department: "Arts",
    level: "Form 3",
    classId: "c3",
    academicYear: "2024/2025",
    registeredAt: "2024-09-08",
    admissionLetterConfirmed: true,
    feeStatus: "Unpaid",
    libraryCardNumber: "LIB-2024-004",
  },
];

// ============================================================
// ACADEMIC MARKS
// ============================================================

export const ACADEMIC_MARKS: AcademicMark[] = [
  // Student 1 (Chukwuemeka Daniel) - Form 1A Science
  {
    id: "am1",
    studentId: "s1",
    courseId: "co1",   // Mathematics
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
    courseId: "co5",   // English Language
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
  {
    id: "am3",
    studentId: "s1",
    courseId: "co3",   // Chemistry
    teacherId: "t1",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 28,
    examScore: 40,
    total: 68,
    grade: "C",
    remarks: "Satisfactory",
    submittedAt: "2024-12-10",
    published: true,
  },
  {
    id: "am4",
    studentId: "s1",
    courseId: "co4",   // Biology
    teacherId: "t1",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 32,
    examScore: 50,
    total: 82,
    grade: "A",
    remarks: "Very good",
    submittedAt: "2024-12-10",
    published: true,
  },
  // Student 2 (Adaeze Okonkwo) - Form 1A Science
  {
    id: "am5",
    studentId: "s2",
    courseId: "co1",   // Mathematics
    teacherId: "t1",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 38,
    examScore: 55,
    total: 93,
    grade: "A",
    remarks: "Outstanding performance",
    submittedAt: "2024-12-10",
    published: true,
  },
  {
    id: "am6",
    studentId: "s2",
    courseId: "co5",   // English Language
    teacherId: "t2",
    classId: "c1",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 36,
    examScore: 52,
    total: 88,
    grade: "A",
    remarks: "Excellent",
    submittedAt: "2024-12-10",
    published: true,
  },
  // Student 3 (Yusuf Abdullahi) - Form 4A Commerce
  {
    id: "am7",
    studentId: "s3",
    courseId: "co18",  // Economics
    teacherId: "t3",
    classId: "c4",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 25,
    examScore: 38,
    total: 63,
    grade: "C",
    remarks: "Needs improvement",
    submittedAt: "2024-12-12",
    published: true,
  },
  {
    id: "am8",
    studentId: "s3",
    courseId: "co19",  // Accounting
    teacherId: "t3",
    classId: "c4",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 30,
    examScore: 44,
    total: 74,
    grade: "B",
    remarks: "Good",
    submittedAt: "2024-12-12",
    published: true,
  },
  // Student 4 (Chioma Nwosu) - Form 3A Arts
  {
    id: "am9",
    studentId: "s4",
    courseId: "co13",  // Literature
    teacherId: "t2",
    classId: "c3",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 33,
    examScore: 48,
    total: 81,
    grade: "A",
    remarks: "Excellent literary analysis",
    submittedAt: "2024-12-11",
    published: true,
  },
  {
    id: "am10",
    studentId: "s4",
    courseId: "co14",  // History
    teacherId: "t2",
    classId: "c3",
    semester: "First",
    academicYear: "2024/2025",
    continuousAssessment: 29,
    examScore: 42,
    total: 71,
    grade: "B",
    remarks: "Good historical knowledge",
    submittedAt: "2024-12-11",
    published: true,
  },
];

// ============================================================
// DISCIPLINE MARKS
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
    remarks: "Very disciplined student. Consistent attendance and good conduct.",
    enteredBy: "u3",
    updatedAt: "2024-12-10",
  },
  {
    id: "dm2",
    studentId: "s2",
    semester: "First",
    academicYear: "2024/2025",
    attendance: 20,
    conduct: 19,
    punctuality: 20,
    participation: 18,
    neatness: 20,
    total: 97,
    remarks: "Exemplary student. Perfect attendance and outstanding conduct.",
    enteredBy: "u3",
    updatedAt: "2024-12-10",
  },
  {
    id: "dm3",
    studentId: "s3",
    semester: "First",
    academicYear: "2024/2025",
    attendance: 15,
    conduct: 14,
    punctuality: 13,
    participation: 12,
    neatness: 16,
    total: 70,
    remarks: "Needs improvement in punctuality and participation.",
    enteredBy: "u3",
    updatedAt: "2024-12-12",
  },
  {
    id: "dm4",
    studentId: "s4",
    semester: "First",
    academicYear: "2024/2025",
    attendance: 17,
    conduct: 18,
    punctuality: 16,
    participation: 19,
    neatness: 17,
    total: 87,
    remarks: "Active participant in class activities. Good overall conduct.",
    enteredBy: "u3",
    updatedAt: "2024-12-11",
  },
];

// ============================================================
// RESULT PUBLICATIONS
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
  {
    id: "rp2",
    classId: "c3",
    semester: "First",
    academicYear: "2024/2025",
    publishedBy: "u2",
    publishedAt: "2024-12-16",
    isPublished: true,
  },
  {
    id: "rp3",
    classId: "c4",
    semester: "First",
    academicYear: "2024/2025",
    publishedBy: "u2",
    publishedAt: "2024-12-16",
    isPublished: true,
  },
];

// ============================================================
// FEE STRUCTURES (Bursar)
// ============================================================

export const FEE_STRUCTURES: FeeStructure[] = [
  {
    id: "fs1",
    program: "General Science",
    level: "Form 1",
    academicYear: "2024/2025",
    tuitionFee: 45000,
    developmentLevy: 5000,
    examFee: 8000,
    libraryFee: 2000,
    sportsFee: 1500,
    totalFee: 61500,
  },
  {
    id: "fs2",
    program: "General Science",
    level: "Form 2",
    academicYear: "2024/2025",
    tuitionFee: 45000,
    developmentLevy: 5000,
    examFee: 8000,
    libraryFee: 2000,
    sportsFee: 1500,
    totalFee: 61500,
  },
  {
    id: "fs3",
    program: "Arts",
    level: "Form 3",
    academicYear: "2024/2025",
    tuitionFee: 42000,
    developmentLevy: 5000,
    examFee: 8000,
    libraryFee: 2000,
    sportsFee: 1500,
    totalFee: 58500,
  },
  {
    id: "fs4",
    program: "Commerce",
    level: "Form 4",
    academicYear: "2024/2025",
    tuitionFee: 43000,
    developmentLevy: 5000,
    examFee: 10000,
    libraryFee: 2000,
    sportsFee: 1500,
    totalFee: 61500,
  },
  {
    id: "fs5",
    program: "Technical",
    level: "Form 5",
    academicYear: "2024/2025",
    tuitionFee: 55000,
    developmentLevy: 5000,
    examFee: 12000,
    libraryFee: 2000,
    sportsFee: 1500,
    totalFee: 75500,
  },
];

// ============================================================
// FEE PAYMENTS (Bursar)
// ============================================================

export const FEE_PAYMENTS: FeePayment[] = [
  {
    id: "fp1",
    studentId: "s1",
    registrationNumber: "APPEC/2024/001",
    academicYear: "2024/2025",
    semester: "First",
    amountPaid: 61500,
    totalFee: 61500,
    balance: 0,
    paymentDate: "2024-09-05",
    paymentMethod: "Bank Transfer",
    receiptNumber: "RCP-2024-001",
    recordedBy: "u8",
    status: "Paid",
  },
  {
    id: "fp2",
    studentId: "s2",
    registrationNumber: "APPEC/2024/002",
    academicYear: "2024/2025",
    semester: "First",
    amountPaid: 30000,
    totalFee: 61500,
    balance: 31500,
    paymentDate: "2024-09-06",
    paymentMethod: "Cash",
    receiptNumber: "RCP-2024-002",
    recordedBy: "u8",
    status: "Partial",
  },
  {
    id: "fp3",
    studentId: "s3",
    registrationNumber: "APPEC/2024/003",
    academicYear: "2024/2025",
    semester: "First",
    amountPaid: 61500,
    totalFee: 61500,
    balance: 0,
    paymentDate: "2024-09-07",
    paymentMethod: "Online",
    receiptNumber: "RCP-2024-003",
    recordedBy: "u8",
    status: "Paid",
  },
  {
    id: "fp4",
    studentId: "s4",
    registrationNumber: "APPEC/2024/004",
    academicYear: "2024/2025",
    semester: "First",
    amountPaid: 0,
    totalFee: 58500,
    balance: 58500,
    paymentDate: "2024-09-08",
    paymentMethod: "Cash",
    receiptNumber: "RCP-2024-004",
    recordedBy: "u8",
    status: "Unpaid",
  },
];

// ============================================================
// LIBRARY BOOKS
// ============================================================

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "lb1",
    title: "New General Mathematics for Senior Secondary Schools 1",
    author: "M.F. Macrae et al.",
    isbn: "978-0-582-60338-5",
    category: "Mathematics",
    department: "Science",
    totalCopies: 20,
    availableCopies: 15,
    addedAt: "2024-01-15",
  },
  {
    id: "lb2",
    title: "Comprehensive Physics for Senior Secondary Schools",
    author: "Olumuyiwa Awe",
    isbn: "978-978-175-000-0",
    category: "Physics",
    department: "Science",
    totalCopies: 15,
    availableCopies: 12,
    addedAt: "2024-01-15",
  },
  {
    id: "lb3",
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    isbn: "978-0-385-47454-2",
    category: "Literature",
    department: "Arts",
    totalCopies: 25,
    availableCopies: 18,
    addedAt: "2024-01-15",
  },
  {
    id: "lb4",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    isbn: "978-1-305-58512-6",
    category: "Economics",
    department: "Commerce",
    totalCopies: 12,
    availableCopies: 8,
    addedAt: "2024-01-15",
  },
  {
    id: "lb5",
    title: "Technical Drawing for Schools and Colleges",
    author: "F.E. Giesecke et al.",
    isbn: "978-0-13-502378-5",
    category: "Technical Drawing",
    department: "Technical",
    totalCopies: 10,
    availableCopies: 7,
    addedAt: "2024-01-15",
  },
  {
    id: "lb6",
    title: "New School Chemistry for Senior Secondary Schools",
    author: "Osei Yaw Ababio",
    isbn: "978-978-175-001-7",
    category: "Chemistry",
    department: "Science",
    totalCopies: 18,
    availableCopies: 14,
    addedAt: "2024-02-01",
  },
  {
    id: "lb7",
    title: "Financial Accounting: A Practical Approach",
    author: "Robert Libby et al.",
    isbn: "978-0-07-811100-6",
    category: "Accounting",
    department: "Commerce",
    totalCopies: 10,
    availableCopies: 6,
    addedAt: "2024-02-01",
  },
  {
    id: "lb8",
    title: "Government for Senior Secondary Schools",
    author: "Remi Anifowose",
    isbn: "978-978-175-002-4",
    category: "Government",
    department: "Arts",
    totalCopies: 15,
    availableCopies: 11,
    addedAt: "2024-02-15",
  },
];

// ============================================================
// LIBRARY BORROWINGS
// ============================================================

export const LIBRARY_BORROWINGS: LibraryBorrowing[] = [
  {
    id: "bor1",
    studentId: "s1",
    registrationNumber: "APPEC/2024/001",
    bookId: "lb1",
    borrowedAt: "2024-10-01",
    dueDate: "2024-10-15",
    returnedAt: "2024-10-14",
    status: "Returned",
    recordedBy: "u9",
  },
  {
    id: "bor2",
    studentId: "s1",
    registrationNumber: "APPEC/2024/001",
    bookId: "lb2",
    borrowedAt: "2024-11-05",
    dueDate: "2024-11-19",
    status: "Borrowed",
    recordedBy: "u9",
  },
  {
    id: "bor3",
    studentId: "s2",
    registrationNumber: "APPEC/2024/002",
    bookId: "lb3",
    borrowedAt: "2024-10-10",
    dueDate: "2024-10-24",
    returnedAt: "2024-10-22",
    status: "Returned",
    recordedBy: "u9",
  },
  {
    id: "bor4",
    studentId: "s3",
    registrationNumber: "APPEC/2024/003",
    bookId: "lb4",
    borrowedAt: "2024-11-01",
    dueDate: "2024-11-15",
    status: "Overdue",
    recordedBy: "u9",
  },
  {
    id: "bor5",
    studentId: "s4",
    registrationNumber: "APPEC/2024/004",
    bookId: "lb3",
    borrowedAt: "2024-11-10",
    dueDate: "2024-11-24",
    status: "Borrowed",
    recordedBy: "u9",
  },
];

// ============================================================
// AUDIT LOGS (IT Admin)
// ============================================================

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: "al1",
    userId: "u2",
    userName: "Dr. Emmanuel Okafor",
    userRole: "dos",
    action: "PUBLISH_RESULTS",
    details: "Published First Semester results for Form 1A - Science (2024/2025)",
    ipAddress: "192.168.1.10",
    timestamp: "2024-12-15T10:30:00Z",
  },
  {
    id: "al2",
    userId: "u2",
    userName: "Dr. Emmanuel Okafor",
    userRole: "dos",
    action: "AUTHORIZE_MARKS",
    details: "Authorized marks entry for Mr. John Eze - Mathematics Form 1A",
    ipAddress: "192.168.1.10",
    timestamp: "2024-11-01T09:15:00Z",
  },
  {
    id: "al3",
    userId: "u5",
    userName: "Mr. John Eze",
    userRole: "teacher",
    action: "SUBMIT_MARKS",
    details: "Submitted Mathematics marks for Form 1A - First Semester",
    ipAddress: "192.168.1.25",
    timestamp: "2024-12-10T14:20:00Z",
  },
  {
    id: "al4",
    userId: "u3",
    userName: "Mr. Samuel Nkemdirim",
    userRole: "dod",
    action: "ENTER_DISCIPLINE",
    details: "Entered discipline marks for 4 students - First Semester 2024/2025",
    ipAddress: "192.168.1.15",
    timestamp: "2024-12-10T11:45:00Z",
  },
  {
    id: "al5",
    userId: "u1",
    userName: "Mrs. Amina Bello",
    userRole: "secretary",
    action: "REGISTER_TEACHER",
    details: "Registered new teacher: Mrs. Ngozi Ike (teacher4@appec.edu)",
    ipAddress: "192.168.1.5",
    timestamp: "2024-09-01T08:30:00Z",
  },
  {
    id: "al6",
    userId: "u8",
    userName: "Mr. Tunde Adesanya",
    userRole: "bursar",
    action: "RECORD_PAYMENT",
    details: "Recorded full payment for APPEC/2024/001 - ₦61,500",
    ipAddress: "192.168.1.20",
    timestamp: "2024-09-05T10:00:00Z",
  },
  {
    id: "al7",
    userId: "u9",
    userName: "Miss Chidinma Eze",
    userRole: "librarian",
    action: "ISSUE_BOOK",
    details: "Issued 'New General Mathematics' to APPEC/2024/001",
    ipAddress: "192.168.1.30",
    timestamp: "2024-10-01T09:00:00Z",
  },
  {
    id: "al8",
    userId: "u10",
    userName: "Mr. Babatunde Ogundimu",
    userRole: "it_admin",
    action: "RESET_PASSWORD",
    details: "Reset password for user: teacher3@appec.edu",
    ipAddress: "192.168.1.1",
    timestamp: "2024-10-15T16:00:00Z",
  },
];

// ============================================================
// SYSTEM SETTINGS (IT Admin)
// ============================================================

export const SYSTEM_SETTINGS: SystemSetting[] = [
  {
    key: "academic_year",
    value: "2024/2025",
    description: "Current academic year",
    updatedBy: "u10",
    updatedAt: "2024-09-01",
  },
  {
    key: "current_semester",
    value: "First",
    description: "Current active semester",
    updatedBy: "u10",
    updatedAt: "2024-09-01",
  },
  {
    key: "registration_open",
    value: "true",
    description: "Whether student registration is currently open",
    updatedBy: "u10",
    updatedAt: "2024-09-01",
  },
  {
    key: "results_portal_open",
    value: "true",
    description: "Whether the public results portal is accessible",
    updatedBy: "u10",
    updatedAt: "2024-12-15",
  },
  {
    key: "max_login_attempts",
    value: "5",
    description: "Maximum failed login attempts before account lockout",
    updatedBy: "u10",
    updatedAt: "2024-09-01",
  },
  {
    key: "session_timeout_minutes",
    value: "60",
    description: "Session timeout in minutes for staff accounts",
    updatedBy: "u10",
    updatedAt: "2024-09-01",
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/** Get a class by its ID */
export function getClassById(id: string): Class | undefined {
  return CLASSES.find((c) => c.id === id);
}

/** Get a course by its ID */
export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

/** Get a teacher by their linked user ID */
export function getTeacherByUserId(userId: string): Teacher | undefined {
  return TEACHERS.find((t) => t.userId === userId);
}

/** Get a student by their registration number */
export function getStudentByRegNumber(regNumber: string): Student | undefined {
  return STUDENTS.find((s) => s.registrationNumber === regNumber);
}

/** Get an exam code record by code string */
export function getExamCode(code: string): ExamCode | undefined {
  return EXAM_CODES.find((e) => e.code === code);
}

/** Get all academic marks for a specific student */
export function getStudentMarks(studentId: string): AcademicMark[] {
  return ACADEMIC_MARKS.filter((m) => m.studentId === studentId);
}

/** Get the discipline record for a specific student */
export function getStudentDiscipline(studentId: string): DisciplineMark | undefined {
  return DISCIPLINE_MARKS.find((d) => d.studentId === studentId);
}

/** Check if results have been published for a class/semester/year */
export function isResultPublished(classId: string, semester: string, academicYear: string): boolean {
  return RESULT_PUBLICATIONS.some(
    (rp) =>
      rp.classId === classId &&
      rp.semester === semester &&
      rp.academicYear === academicYear &&
      rp.isPublished
  );
}

/** Get all course assignments for a specific teacher */
export function getTeacherAssignments(teacherId: string): TeacherCourseAssignment[] {
  const teacher = TEACHERS.find((t) => t.id === teacherId);
  return teacher?.assignedCourses ?? [];
}

/** Get fee payment record for a student */
export function getStudentPayment(studentId: string): FeePayment | undefined {
  return FEE_PAYMENTS.find((fp) => fp.studentId === studentId);
}

/** Get all borrowing records for a student */
export function getStudentBorrowings(studentId: string): LibraryBorrowing[] {
  return LIBRARY_BORROWINGS.filter((b) => b.studentId === studentId);
}

// ============================================================
// GRADE CALCULATION HELPERS
// ============================================================

/**
 * Calculate letter grade from total score (out of 100).
 * A: 80-100, B: 70-79, C: 60-69, D: 50-59, E: 40-49, F: 0-39
 */
export function getGrade(total: number): string {
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  if (total >= 40) return "E";
  return "F";
}

/** Get Tailwind CSS color class for a grade */
export function getGradeColor(grade: string): string {
  switch (grade) {
    case "A": return "text-green-600";
    case "B": return "text-blue-600";
    case "C": return "text-yellow-600";
    case "D": return "text-orange-600";
    case "E": return "text-red-500";
    case "F": return "text-red-700";
    default:  return "text-gray-600";
  }
}

/** Get Tailwind CSS badge color classes for a grade */
export function getGradeBadgeColor(grade: string): string {
  switch (grade) {
    case "A": return "bg-green-100 text-green-700";
    case "B": return "bg-blue-100 text-blue-700";
    case "C": return "bg-yellow-100 text-yellow-700";
    case "D": return "bg-orange-100 text-orange-700";
    case "E": return "bg-red-100 text-red-600";
    case "F": return "bg-red-200 text-red-800";
    default:  return "bg-gray-100 text-gray-600";
  }
}

/** Get Tailwind CSS badge color for fee payment status */
export function getFeeStatusColor(status: string): string {
  switch (status) {
    case "Paid":    return "bg-green-100 text-green-700";
    case "Partial": return "bg-yellow-100 text-yellow-700";
    case "Unpaid":  return "bg-red-100 text-red-700";
    default:        return "bg-gray-100 text-gray-600";
  }
}

/** Format a number as Nigerian Naira currency */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
