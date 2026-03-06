// ============================================================
// APPEC TSS College Web System - Express.js Backend Server
// ============================================================
// This is a Node.js + Express.js backend that serves:
//   - Static HTML/CSS/JS frontend files
//   - RESTful API endpoints for all operations
//   - In-memory data store (would be a database in production)
// ============================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// IN-MEMORY DATA STORE
// ============================================================

// Users (Staff accounts)
const users = [
  { id: "u1", name: "Mrs. Amina Bello", email: "secretary@appec.edu", role: "secretary", password: "Sec@APPEC#2024!Bello", phone: "+234-801-111-2222", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-05" },
  { id: "u2", name: "Dr. Emmanuel Okafor", email: "dos@appec.edu", role: "dos", password: "D0S@APPEC#2024!Okafor", phone: "+234-802-222-3333", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-05" },
  { id: "u3", name: "Mr. Samuel Nkemdirim", email: "dod@appec.edu", role: "dod", password: "D0D@APPEC#2024!Nkemdirim", phone: "+234-803-333-4444", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-04" },
  { id: "u4", name: "Prof. Grace Adeyemi", email: "hod@appec.edu", role: "hod", password: "H0D@APPEC#2024!Adeyemi", phone: "+234-804-444-5555", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-05" },
  { id: "u5", name: "Mr. John Eze", email: "teacher1@appec.edu", role: "teacher", password: "Tch@APPEC#2024!Eze", phone: "+234-805-555-6666", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-05" },
  { id: "u6", name: "Mrs. Fatima Musa", email: "teacher2@appec.edu", role: "teacher", password: "Tch@APPEC#2024!Musa", phone: "+234-806-666-7777", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-04" },
  { id: "u7", name: "Rev. Dr. Chukwudi Obiora", email: "principal@appec.edu", role: "principal", password: "Pr1nc@APPEC#2024!Obiora", phone: "+234-807-777-8888", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-05" },
  { id: "u8", name: "Mr. Tunde Adesanya", email: "bursar@appec.edu", role: "bursar", password: "Burs@APPEC#2024!Adesanya", phone: "+234-808-888-9999", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-04" },
  { id: "u9", name: "Miss Chidinma Eze", email: "librarian@appec.edu", role: "librarian", password: "L1br@APPEC#2024!Eze", phone: "+234-809-999-0000", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-03" },
  { id: "u10", name: "Mr. Babatunde Ogundimu", email: "itadmin@appec.edu", role: "it_admin", password: "1T@APPEC#2024!Ogundimu", phone: "+234-810-000-1111", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-05" },
  { id: "u11", name: "Mr. Emeka Obi", email: "teacher3@appec.edu", role: "teacher", password: "Tch@APPEC#2024!Obi", phone: "+234-811-111-2222", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-03" },
  { id: "u12", name: "Mrs. Ngozi Ike", email: "teacher4@appec.edu", role: "teacher", password: "Tch@APPEC#2024!Ike", phone: "+234-812-222-3333", isActive: true, createdAt: "2024-09-01", lastLoginAt: "2026-03-02" },
];

// Classes
const classes = [
  { id: "c1", name: "Form 1A - Science", level: "Form 1", department: "Science", academicYear: "2024/2025", capacity: 40 },
  { id: "c2", name: "Form 2A - Science", level: "Form 2", department: "Science", academicYear: "2024/2025", capacity: 40 },
  { id: "c3", name: "Form 3A - Arts", level: "Form 3", department: "Arts", academicYear: "2024/2025", capacity: 35 },
  { id: "c4", name: "Form 4A - Commerce", level: "Form 4", department: "Commerce", academicYear: "2024/2025", capacity: 35 },
  { id: "c5", name: "Form 5A - Technical", level: "Form 5", department: "Technical", academicYear: "2024/2025", capacity: 30 },
];

// Courses
const courses = [
  { id: "co1", name: "Mathematics", code: "MTH101", department: "Science", level: "Form 1", credits: 4 },
  { id: "co2", name: "Physics", code: "PHY101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co3", name: "Chemistry", code: "CHM101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co4", name: "Biology", code: "BIO101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co5", name: "English Language", code: "ENG101", department: "Science", level: "Form 1", credits: 3 },
  { id: "co8", name: "Mathematics", code: "MTH201", department: "Science", level: "Form 2", credits: 4 },
  { id: "co13", name: "Literature in English", code: "LIT301", department: "Arts", level: "Form 3", credits: 3 },
  { id: "co18", name: "Economics", code: "ECO401", department: "Commerce", level: "Form 4", credits: 3 },
  { id: "co19", name: "Accounting", code: "ACC401", department: "Commerce", level: "Form 4", credits: 4 },
  { id: "co23", name: "Technical Drawing", code: "TEC501", department: "Technical", level: "Form 5", credits: 3 },
];

// Teachers
const teachers = [
  { id: "t1", userId: "u5", name: "Mr. John Eze", email: "teacher1@appec.edu", phone: "+234-805-555-6666", specialization: "Mathematics & Physics", qualification: "B.Sc. Mathematics", assignedCourses: [
    { id: "ta1", teacherId: "t1", courseId: "co1", classId: "c1", level: "Form 1", semester: "First", academicYear: "2024/2025", marksEntryAuthorized: true, marksSubmitted: true },
    { id: "ta2", teacherId: "t1", courseId: "co2", classId: "c1", level: "Form 1", semester: "First", academicYear: "2024/2025", marksEntryAuthorized: true, marksSubmitted: false },
  ]},
  { id: "t2", userId: "u6", name: "Mrs. Fatima Musa", email: "teacher2@appec.edu", phone: "+234-806-666-7777", specialization: "English & Literature", qualification: "M.A. English", assignedCourses: [
    { id: "ta3", teacherId: "t2", courseId: "co5", classId: "c1", level: "Form 1", semester: "First", academicYear: "2024/2025", marksEntryAuthorized: true, marksSubmitted: true },
  ]},
];

// Exam Codes (for student admission)
const examCodes = [
  { code: "APPEC-2024-001", candidateName: "Chukwuemeka Daniel", program: "General Science", department: "Science", level: "Form 1", classId: "c1", isUsed: true, admissionLetterConfirmed: true, createdAt: "2024-08-01" },
  { code: "APPEC-2024-002", candidateName: "Ngozi Adaeze", program: "General Science", department: "Science", level: "Form 1", classId: "c1", isUsed: false, admissionLetterConfirmed: false, createdAt: "2024-08-01" },
  { code: "APPEC-2024-003", candidateName: "Ibrahim Suleiman", program: "Arts", department: "Arts", level: "Form 3", classId: "c3", isUsed: false, admissionLetterConfirmed: true, createdAt: "2024-08-01" },
  { code: "APPEC-2024-004", candidateName: "Blessing Okonkwo", program: "Commerce", department: "Commerce", level: "Form 4", classId: "c4", isUsed: false, admissionLetterConfirmed: false, createdAt: "2024-08-01" },
  { code: "APPEC-2024-005", candidateName: "Amara Chisom", program: "Technical", department: "Technical", level: "Form 5", classId: "c5", isUsed: false, admissionLetterConfirmed: false, createdAt: "2024-08-01" },
];

// Students
const students = [
  { id: "s1", registrationNumber: "APPEC/2024/001", examCode: "APPEC-2024-001", firstName: "Chukwuemeka", lastName: "Daniel", dateOfBirth: "2008-03-15", gender: "Male", phone: "+234-803-456-7890", email: "daniel.c@student.appec.edu", address: "12 Aba Road, Port Harcourt", guardianName: "Mr. Daniel Chukwuemeka Sr.", guardianPhone: "+234-803-456-7891", program: "General Science", department: "Science", level: "Form 1", classId: "c1", academicYear: "2024/2025", registeredAt: "2024-09-05", admissionLetterConfirmed: true, feeStatus: "Paid", libraryCardNumber: "LIB-2024-001" },
  { id: "s2", registrationNumber: "APPEC/2024/002", examCode: "APPEC-2024-006", firstName: "Adaeze", lastName: "Okonkwo", dateOfBirth: "2008-07-22", gender: "Female", phone: "+234-804-567-8901", email: "okonkwo.a@student.appec.edu", address: "45 Enugu Street, Onitsha", guardianName: "Mrs. Patricia Okonkwo", guardianPhone: "+234-804-567-8902", program: "General Science", department: "Science", level: "Form 1", classId: "c1", academicYear: "2024/2025", registeredAt: "2024-09-06", admissionLetterConfirmed: true, feeStatus: "Partial", libraryCardNumber: "LIB-2024-002" },
];

// Academic Marks
const academicMarks = [
  { id: "am1", studentId: "s1", courseId: "co1", teacherId: "t1", classId: "c1", semester: "First", academicYear: "2024/2025", continuousAssessment: 35, examScore: 52, total: 87, grade: "A", remarks: "Excellent performance", submittedAt: "2024-12-10", published: true },
  { id: "am2", studentId: "s1", courseId: "co5", teacherId: "t2", classId: "c1", semester: "First", academicYear: "2024/2025", continuousAssessment: 30, examScore: 45, total: 75, grade: "B", remarks: "Good performance", submittedAt: "2024-12-10", published: true },
  { id: "am3", studentId: "s1", courseId: "co3", teacherId: "t1", classId: "c1", semester: "First", academicYear: "2024/2025", continuousAssessment: 28, examScore: 40, total: 68, grade: "C", remarks: "Satisfactory", submittedAt: "2024-12-10", published: true },
];

// Discipline Marks
const disciplineMarks = [
  { id: "dm1", studentId: "s1", semester: "First", academicYear: "2024/2025", attendance: 18, conduct: 17, punctuality: 19, participation: 16, neatness: 18, total: 88, remarks: "Very disciplined student", enteredBy: "u3", updatedAt: "2024-12-10" },
  { id: "dm2", studentId: "s2", semester: "First", academicYear: "2024/2025", attendance: 20, conduct: 19, punctuality: 20, participation: 18, neatness: 20, total: 97, remarks: "Exemplary student", enteredBy: "u3", updatedAt: "2024-12-10" },
];

// Result Publications
const resultPublications = [
  { id: "rp1", classId: "c1", semester: "First", academicYear: "2024/2025", publishedBy: "u2", publishedAt: "2024-12-15", isPublished: true },
];

// Fee Payments
const feePayments = [
  { id: "fp1", studentId: "s1", registrationNumber: "APPEC/2024/001", academicYear: "2024/2025", semester: "First", amountPaid: 61500, totalFee: 61500, balance: 0, paymentDate: "2024-09-05", paymentMethod: "Bank Transfer", receiptNumber: "RCP-2024-001", recordedBy: "u8", status: "Paid" },
  { id: "fp2", studentId: "s2", registrationNumber: "APPEC/2024/002", academicYear: "2024/2025", semester: "First", amountPaid: 30000, totalFee: 61500, balance: 31500, paymentDate: "2024-09-06", paymentMethod: "Cash", receiptNumber: "RCP-2024-002", recordedBy: "u8", status: "Partial" },
];

// Library Books
const libraryBooks = [
  { id: "lb1", title: "New General Mathematics for Senior Secondary Schools 1", author: "M.F. Macrae et al.", isbn: "978-0-582-60338-5", category: "Mathematics", department: "Science", totalCopies: 20, availableCopies: 15, addedAt: "2024-01-15" },
  { id: "lb2", title: "Comprehensive Physics for Senior Secondary Schools", author: "Olumuyiwa Awe", isbn: "978-978-175-000-0", category: "Physics", department: "Science", totalCopies: 15, availableCopies: 12, addedAt: "2024-01-15" },
  { id: "lb3", title: "Things Fall Apart", author: "Chinua Achebe", isbn: "978-0-385-47454-2", category: "Literature", department: "Arts", totalCopies: 25, availableCopies: 18, addedAt: "2024-01-15" },
];

// Library Borrowings
const libraryBorrowings = [
  { id: "bor1", studentId: "s1", registrationNumber: "APPEC/2024/001", bookId: "lb1", borrowedAt: "2024-10-01", dueDate: "2024-10-15", returnedAt: "2024-10-14", status: "Returned", recordedBy: "u9" },
  { id: "bor2", studentId: "s1", registrationNumber: "APPEC/2024/001", bookId: "lb2", borrowedAt: "2024-11-05", dueDate: "2024-11-19", status: "Borrowed", recordedBy: "u9" },
];

// Audit Logs
const auditLogs = [
  { id: "al1", userId: "u2", userName: "Dr. Emmanuel Okafor", userRole: "dos", action: "PUBLISH_RESULTS", details: "Published First Semester results for Form 1A - Science (2024/2025)", ipAddress: "192.168.1.10", timestamp: "2024-12-15T10:30:00Z" },
  { id: "al2", userId: "u5", userName: "Mr. John Eze", userRole: "teacher", action: "SUBMIT_MARKS", details: "Submitted Mathematics marks for Form 1A - First Semester", ipAddress: "192.168.1.25", timestamp: "2024-12-10T14:20:00Z" },
];

// System Settings
const systemSettings = [
  { key: "academic_year", value: "2024/2025", description: "Current academic year", updatedBy: "u10", updatedAt: "2024-09-01" },
  { key: "current_semester", value: "First", description: "Current active semester", updatedBy: "u10", updatedAt: "2024-09-01" },
  { key: "registration_open", value: "true", description: "Whether student registration is currently open", updatedBy: "u10", updatedAt: "2024-09-01" },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getGrade(total) {
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  if (total >= 40) return "E";
  return "F";
}

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

// ============================================================
// API ROUTES
// ============================================================

// ---- Authentication ----
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    user.lastLoginAt = new Date().toISOString().split('T')[0];
    // Add audit log
    auditLogs.unshift({
      id: "al" + (auditLogs.length + 1),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: "LOGIN",
      details: `User ${user.name} logged in`,
      timestamp: new Date().toISOString()
    });
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

// ---- Users ----
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ ...u, password: undefined })));
});

app.put('/api/users/:id/toggle', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    user.isActive = !user.isActive;
    res.json({ success: true, user: { ...user, password: undefined } });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// ---- Classes ----
app.get('/api/classes', (req, res) => {
  res.json(classes);
});

app.get('/api/classes/:id', (req, res) => {
  const cls = classes.find(c => c.id === req.params.id);
  if (cls) res.json(cls);
  else res.status(404).json({ message: "Class not found" });
});

// ---- Courses ----
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// ---- Teachers ----
app.get('/api/teachers', (req, res) => {
  res.json(teachers);
});

app.get('/api/teachers/:userId', (req, res) => {
  const teacher = teachers.find(t => t.userId === req.params.userId);
  if (teacher) res.json(teacher);
  else res.status(404).json({ message: "Teacher not found" });
});

// ---- Exam Codes ----
app.get('/api/exam-codes', (req, res) => {
  res.json(examCodes);
});

app.get('/api/exam-codes/:code', (req, res) => {
  const examCode = examCodes.find(ec => ec.code === req.params.code);
  if (examCode) res.json(examCode);
  else res.status(404).json({ message: "Exam code not found" });
});

app.post('/api/exam-codes/:code/confirm', (req, res) => {
  const examCode = examCodes.find(ec => ec.code === req.params.code);
  if (examCode) {
    examCode.admissionLetterConfirmed = true;
    res.json({ success: true, examCode });
  } else {
    res.status(404).json({ message: "Exam code not found" });
  }
});

// ---- Students ----
app.get('/api/students', (req, res) => {
  res.json(students);
});

app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) res.json(student);
  else res.status(404).json({ message: "Student not found" });
});

app.get('/api/students/reg/:regNumber', (req, res) => {
  const student = students.find(s => s.registrationNumber === req.params.regNumber);
  if (student) res.json(student);
  else res.status(404).json({ message: "Student not found" });
});

app.post('/api/students', (req, res) => {
  const { examCode, firstName, lastName, dateOfBirth, gender, phone, email, address, guardianName, guardianPhone } = req.body;
  
  const examCodeRecord = examCodes.find(ec => ec.code === examCode);
  if (!examCodeRecord) {
    return res.status(400).json({ success: false, message: "Invalid exam code" });
  }
  if (examCodeRecord.isUsed) {
    return res.status(400).json({ success: false, message: "Exam code already used" });
  }
  if (!examCodeRecord.admissionLetterConfirmed) {
    return res.status(400).json({ success: false, message: "Please confirm your admission letter first" });
  }

  const newStudent = {
    id: "s" + (students.length + 1),
    registrationNumber: "APPEC/2024/" + String(students.length + 1).padStart(3, '0'),
    examCode,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    phone,
    email,
    address,
    guardianName,
    guardianPhone,
    program: examCodeRecord.program,
    department: examCodeRecord.department,
    level: examCodeRecord.level,
    classId: examCodeRecord.classId,
    academicYear: "2024/2025",
    registeredAt: new Date().toISOString().split('T')[0],
    admissionLetterConfirmed: true,
    feeStatus: "Unpaid",
    libraryCardNumber: "LIB-2024-" + String(students.length + 1).padStart(3, '0')
  };

  students.push(newStudent);
  examCodeRecord.isUsed = true;

  res.json({ success: true, student: newStudent });
});

// ---- Academic Marks ----
app.get('/api/marks/academic', (req, res) => {
  res.json(academicMarks);
});

app.get('/api/marks/academic/student/:studentId', (req, res) => {
  const marks = academicMarks.filter(m => m.studentId === req.params.studentId);
  res.json(marks);
});

app.post('/api/marks/academic', (req, res) => {
  const { studentId, courseId, teacherId, classId, semester, academicYear, continuousAssessment, examScore } = req.body;
  const total = parseInt(continuousAssessment) + parseInt(examScore);
  const grade = getGrade(total);
  
  const newMark = {
    id: "am" + (academicMarks.length + 1),
    studentId,
    courseId,
    teacherId,
    classId,
    semester,
    academicYear,
    continuousAssessment: parseInt(continuousAssessment),
    examScore: parseInt(examScore),
    total,
    grade,
    remarks: grade === "A" ? "Excellent" : grade === "F" ? "Needs improvement" : "Satisfactory",
    submittedAt: new Date().toISOString().split('T')[0],
    published: false
  };
  
  academicMarks.push(newMark);
  res.json({ success: true, mark: newMark });
});

app.put('/api/marks/academic/:id/authorize', (req, res) => {
  const mark = academicMarks.find(m => m.id === req.params.id);
  if (mark) {
    mark.published = !mark.published;
    res.json({ success: true, mark });
  } else {
    res.status(404).json({ message: "Mark not found" });
  }
});

// ---- Discipline Marks ----
app.get('/api/marks/discipline', (req, res) => {
  res.json(disciplineMarks);
});

app.get('/api/marks/discipline/student/:studentId', (req, res) => {
  const mark = disciplineMarks.find(m => m.studentId === req.params.studentId);
  if (mark) res.json(mark);
  else res.json(null);
});

app.post('/api/marks/discipline', (req, res) => {
  const { studentId, semester, academicYear, attendance, conduct, punctuality, participation, neatness, remarks, enteredBy } = req.body;
  const total = parseInt(attendance) + parseInt(conduct) + parseInt(punctuation) + parseInt(participation) + parseInt(neatness);
  
  const newMark = {
    id: "dm" + (disciplineMarks.length + 1),
    studentId,
    semester,
    academicYear,
    attendance: parseInt(attendance),
    conduct: parseInt(conduct),
    punctuality: parseInt(punctuation),
    participation: parseInt(participation),
    neatness: parseInt(neatness),
    total,
    remarks,
    enteredBy,
    updatedAt: new Date().toISOString().split('T')[0]
  };
  
  disciplineMarks.push(newMark);
  res.json({ success: true, mark: newMark });
});

// ---- Result Publications ----
app.get('/api/results/publications', (req, res) => {
  res.json(resultPublications);
});

app.post('/api/results/publish', (req, res) => {
  const { classId, semester, academicYear, publishedBy } = req.body;
  
  const existing = resultPublications.find(rp => rp.classId === classId && rp.semester === semester && rp.academicYear === academicYear);
  if (existing) {
    existing.isPublished = true;
    existing.publishedAt = new Date().toISOString().split('T')[0];
    existing.publishedBy = publishedBy;
    res.json({ success: true, publication: existing });
  } else {
    const newPublication = {
      id: "rp" + (resultPublications.length + 1),
      classId,
      semester,
      academicYear,
      publishedBy,
      publishedAt: new Date().toISOString().split('T')[0],
      isPublished: true
    };
    resultPublications.push(newPublication);
    res.json({ success: true, publication: newPublication });
  }
});

// ---- Fee Payments ----
app.get('/api/fees/payments', (req, res) => {
  res.json(feePayments);
});

app.post('/api/fees/payments', (req, res) => {
  const { studentId, registrationNumber, amountPaid, paymentMethod, semester } = req.body;
  
  const existing = feePayments.find(fp => fp.studentId === studentId && fp.semester === semester);
  if (existing) {
    existing.amountPaid += parseInt(amountPaid);
    existing.balance = existing.totalFee - existing.amountPaid;
    existing.status = existing.balance === 0 ? "Paid" : "Partial";
    existing.paymentDate = new Date().toISOString().split('T')[0];
    existing.paymentMethod = paymentMethod;
    res.json({ success: true, payment: existing });
  } else {
    const totalFee = 61500;
    const newPayment = {
      id: "fp" + (feePayments.length + 1),
      studentId,
      registrationNumber,
      academicYear: "2024/2025",
      semester,
      amountPaid: parseInt(amountPaid),
      totalFee,
      balance: totalFee - parseInt(amountPaid),
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      receiptNumber: "RCP-2024-" + String(feePayments.length + 1).padStart(3, '0'),
      recordedBy: "u8",
      status: parseInt(amountPaid) >= totalFee ? "Paid" : "Partial"
    };
    feePayments.push(newPayment);
    res.json({ success: true, payment: newPayment });
  }
});

// ---- Library ----
app.get('/api/library/books', (req, res) => {
  res.json(libraryBooks);
});

app.get('/api/library/borrowings', (req, res) => {
  res.json(libraryBorrowings);
});

app.post('/api/library/borrow', (req, res) => {
  const { studentId, registrationNumber, bookId, dueDate } = req.body;
  
  const book = libraryBooks.find(b => b.id === bookId);
  if (!book || book.availableCopies <= 0) {
    return res.status(400).json({ success: false, message: "Book not available" });
  }
  
  book.availableCopies -= 1;
  
  const newBorrowing = {
    id: "bor" + (libraryBorrowings.length + 1),
    studentId,
    registrationNumber,
    bookId,
    borrowedAt: new Date().toISOString().split('T')[0],
    dueDate,
    status: "Borrowed",
    recordedBy: "u9"
  };
  
  libraryBorrowings.push(newBorrowing);
  res.json({ success: true, borrowing: newBorrowing });
});

app.put('/api/library/borrowings/:id/return', (req, res) => {
  const borrowing = libraryBorrowings.find(b => b.id === req.params.id);
  if (borrowing) {
    const book = libraryBooks.find(b => b.id === borrowing.bookId);
    if (book) book.availableCopies += 1;
    
    borrowing.status = "Returned";
    borrowing.returnedAt = new Date().toISOString().split('T')[0];
    res.json({ success: true, borrowing });
  } else {
    res.status(404).json({ message: "Borrowing not found" });
  }
});

// ---- System Settings ----
app.get('/api/settings', (req, res) => {
  res.json(systemSettings);
});

app.put('/api/settings/:key', (req, res) => {
  const setting = systemSettings.find(s => s.key === req.params.key);
  if (setting) {
    setting.value = req.body.value;
    setting.updatedAt = new Date().toISOString().split('T')[0];
    res.json({ success: true, setting });
  } else {
    res.status(404).json({ message: "Setting not found" });
  }
});

// ---- Audit Logs ----
app.get('/api/audit-logs', (req, res) => {
  res.json(auditLogs);
});

// ---- Dashboard Stats ----
app.get('/api/stats', (req, res) => {
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalCourses = courses.length;
  const publishedResults = resultPublications.filter(r => r.isPublished).length;
  const totalRevenue = feePayments.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalOutstanding = feePayments.reduce((sum, p) => sum + p.balance, 0);
  
  const marks = academicMarks.filter(m => m.published);
  const avgScore = marks.length > 0 ? Math.round(marks.reduce((s, m) => s + m.total, 0) / marks.length) : 0;
  const avgDiscipline = disciplineMarks.length > 0 ? Math.round(disciplineMarks.reduce((s, m) => s + m.total, 0) / disciplineMarks.length) : 0;
  
  res.json({
    totalStudents,
    totalTeachers,
    totalClasses,
    totalCourses,
    pendingMarksAuthorization: 0,
    publishedResults,
    totalRevenue,
    totalOutstanding,
    avgScore,
    avgDiscipline,
    totalBooks: libraryBooks.reduce((s, b) => s + b.totalCopies, 0),
    availableBooks: libraryBooks.reduce((s, b) => s + b.availableCopies, 0),
    activeBorrowings: libraryBorrowings.filter(b => b.status === "Borrowed").length
  });
});

// ============================================================
// FRONTEND - Serve HTML files
// ============================================================

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`\n🎓 APPEC TSS College Web System`);
  console.log(`   Server running at: http://localhost:${PORT}`);
  console.log(`   ==================================\n`);
});
