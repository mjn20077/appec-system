"use client";

import { useState, useEffect } from "react";
import DashboardLayout, { StatCard, DataTable, Badge } from "@/components/DashboardLayout";
import {
  TEACHERS,
  STUDENTS,
  CLASSES,
  COURSES,
  ACADEMIC_MARKS,
} from "@/lib/data";
import { getGrade, getGradeColor } from "@/lib/data";
import type { Teacher, AcademicMark, TeacherCourseAssignment } from "@/lib/types";
import type { User } from "@/lib/types";

type ActiveTab = "overview" | "assignments" | "marks";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/teacher",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<TeacherCourseAssignment | null>(null);
  const [marks, setMarks] = useState<AcademicMark[]>(ACADEMIC_MARKS);
  const [successMsg, setSuccessMsg] = useState("");

  const [markForm, setMarkForm] = useState({
    studentId: "",
    ca: 0,
    exam: 0,
    remarks: "",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("currentUser");
    if (stored) {
      const user: User = JSON.parse(stored);
      const found = TEACHERS.find((t) => t.userId === user.id);
      queueMicrotask(() => setTeacher(found ?? null));
    }
  }, []);

  const getCourseName = (id: string) => COURSES.find((c) => c.id === id)?.name ?? id;
  const getCourseCode = (id: string) => COURSES.find((c) => c.id === id)?.code ?? id;
  const getClassName = (id: string) => CLASSES.find((c) => c.id === id)?.name ?? id;

  const getStudentName = (id: string) => {
    const s = STUDENTS.find((st) => st.id === id);
    return s ? `${s.firstName} ${s.lastName}` : id;
  };

  const getStudentsForAssignment = (assignment: TeacherCourseAssignment) => {
    return STUDENTS.filter((s) => s.classId === assignment.classId);
  };

  const getExistingMark = (studentId: string, assignment: TeacherCourseAssignment) => {
    return marks.find(
      (m) =>
        m.studentId === studentId &&
        m.courseId === assignment.courseId &&
        m.classId === assignment.classId &&
        m.semester === assignment.semester
    );
  };

  const handleSaveMark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !teacher) return;

    const total = markForm.ca + markForm.exam;
    const grade = getGrade(total);

    const existing = getExistingMark(markForm.studentId, selectedAssignment);

    if (existing) {
      setMarks((prev) =>
        prev.map((m) =>
          m.id === existing.id
            ? { ...m, continuousAssessment: markForm.ca, examScore: markForm.exam, total, grade, remarks: markForm.remarks }
            : m
        )
      );
    } else {
      const newMark: AcademicMark = {
        id: `am${Date.now()}`,
        studentId: markForm.studentId,
        courseId: selectedAssignment.courseId,
        teacherId: teacher.id,
        classId: selectedAssignment.classId,
        semester: selectedAssignment.semester,
        academicYear: "2024/2025",
        continuousAssessment: markForm.ca,
        examScore: markForm.exam,
        total,
        grade,
        remarks: markForm.remarks,
        submittedAt: new Date().toISOString().split("T")[0],
        published: false,
      };
      setMarks((prev) => [...prev, newMark]);
      ACADEMIC_MARKS.push(newMark);
    }

    setMarkForm({ studentId: "", ca: 0, exam: 0, remarks: "" });
    setSuccessMsg("Mark saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSelectStudent = (studentId: string) => {
    if (!selectedAssignment) return;
    const existing = getExistingMark(studentId, selectedAssignment);
    if (existing) {
      setMarkForm({
        studentId,
        ca: existing.continuousAssessment,
        exam: existing.examScore,
        remarks: existing.remarks,
      });
    } else {
      setMarkForm({ studentId, ca: 0, exam: 0, remarks: "" });
    }
  };

  if (!teacher) {
    return (
      <DashboardLayout navItems={navItems} title="Teacher Dashboard" roleLabel="Teacher" roleColor="bg-green-600">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading teacher profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  const authorizedAssignments = teacher.assignedCourses.filter((a) => a.marksEntryAuthorized);
  const submittedAssignments = teacher.assignedCourses.filter((a) => a.marksSubmitted);
  const myMarks = marks.filter((m) => m.teacherId === teacher.id);

  return (
    <DashboardLayout
      navItems={navItems}
      title="Teacher Dashboard"
      roleLabel="Teacher"
      roleColor="bg-green-600"
    >
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✓ {successMsg}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(["overview", "assignments", "marks"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab === "marks" ? "Enter Marks" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Teacher Profile */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl flex-shrink-0">
              {teacher.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-gray-800 font-bold text-lg">{teacher.name}</h2>
              <p className="text-gray-500 text-sm">{teacher.email}</p>
              <p className="text-gray-500 text-sm">{teacher.phone}</p>
              <Badge color="green">{teacher.specialization}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Assigned Courses"
              value={teacher.assignedCourses.length}
              color="bg-green-100"
              subtitle="Total assignments"
              icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <StatCard
              title="Authorized"
              value={authorizedAssignments.length}
              color="bg-yellow-100"
              subtitle="Can enter marks"
              icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            />
            <StatCard
              title="Marks Entered"
              value={myMarks.length}
              color="bg-blue-100"
              subtitle="Student records"
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
            />
          </div>

          {/* Authorization Status */}
          {authorizedAssignments.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-yellow-800 font-semibold text-sm">No marks entry authorization yet</p>
                <p className="text-yellow-700 text-xs mt-1">
                  Please wait for the Director of Studies to authorize marks entry for your courses.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">My Course Assignments</h2>
          <DataTable headers={["Course", "Class", "Semester", "Students", "Authorization", "Marks Status", "Actions"]}>
            {teacher.assignedCourses.map((assignment) => {
              const students = getStudentsForAssignment(assignment);
              const enteredMarks = marks.filter(
                (m) => m.courseId === assignment.courseId && m.classId === assignment.classId && m.semester === assignment.semester
              );
              return (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 text-sm">{getCourseName(assignment.courseId)}</p>
                    <p className="text-xs text-gray-400">{getCourseCode(assignment.courseId)}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(assignment.classId)}</td>
                  <td className="px-4 py-3"><Badge color="blue">{assignment.semester}</Badge></td>
                  <td className="px-4 py-3 text-center text-gray-700 text-sm">{students.length}</td>
                  <td className="px-4 py-3">
                    {assignment.marksEntryAuthorized ? (
                      <Badge color="green">Authorized</Badge>
                    ) : (
                      <Badge color="gray">Pending</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">
                      {enteredMarks.length}/{students.length}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {assignment.marksEntryAuthorized && (
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setActiveTab("marks");
                        }}
                        className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-medium px-3 py-1 rounded-lg transition-colors"
                      >
                        Enter Marks
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </DataTable>
        </div>
      )}

      {/* Enter Marks Tab */}
      {activeTab === "marks" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Enter Academic Marks</h2>

          {/* Select Assignment */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course Assignment</label>
            <select
              value={selectedAssignment?.id ?? ""}
              onChange={(e) => {
                const found = teacher.assignedCourses.find((a) => a.id === e.target.value);
                setSelectedAssignment(found ?? null);
                setMarkForm({ studentId: "", ca: 0, exam: 0, remarks: "" });
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a course...</option>
              {teacher.assignedCourses
                .filter((a) => a.marksEntryAuthorized)
                .map((a) => (
                  <option key={a.id} value={a.id}>
                    {getCourseName(a.courseId)} — {getClassName(a.classId)} ({a.semester} Semester)
                  </option>
                ))}
            </select>
            {teacher.assignedCourses.filter((a) => a.marksEntryAuthorized).length === 0 && (
              <p className="text-yellow-600 text-xs mt-2">
                No authorized assignments. Contact the Director of Studies for authorization.
              </p>
            )}
          </div>

          {selectedAssignment && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Student List */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    Students — {getClassName(selectedAssignment.classId)}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {getStudentsForAssignment(selectedAssignment).map((student) => {
                    const existing = getExistingMark(student.id, selectedAssignment);
                    const isSelected = markForm.studentId === student.id;
                    return (
                      <button
                        key={student.id}
                        onClick={() => handleSelectStudent(student.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                          isSelected ? "bg-green-50 border-l-4 border-green-500" : "hover:bg-gray-50"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{student.registrationNumber}</p>
                        </div>
                        {existing ? (
                          <div className="text-right">
                            <p className={`font-bold text-sm ${getGradeColor(existing.grade)}`}>
                              {existing.grade}
                            </p>
                            <p className="text-xs text-gray-400">{existing.total}/100</p>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">No marks</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mark Entry Form */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-4">
                  {markForm.studentId
                    ? `Marks for: ${getStudentName(markForm.studentId)}`
                    : "Select a student to enter marks"}
                </h3>

                {markForm.studentId ? (
                  <form onSubmit={handleSaveMark} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Continuous Assessment (0-40)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={markForm.ca}
                        onChange={(e) => setMarkForm({ ...markForm, ca: Math.min(40, Math.max(0, parseInt(e.target.value) || 0)) })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Examination Score (0-60)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={60}
                        value={markForm.exam}
                        onChange={(e) => setMarkForm({ ...markForm, exam: Math.min(60, Math.max(0, parseInt(e.target.value) || 0)) })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {/* Live Score Preview */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <p className="text-green-700 text-sm font-medium">Total Score</p>
                        <p className={`text-xs font-medium ${getGradeColor(getGrade(markForm.ca + markForm.exam))}`}>
                          Grade: {getGrade(markForm.ca + markForm.exam)}
                        </p>
                      </div>
                      <p className="text-green-900 font-bold text-2xl">
                        {markForm.ca + markForm.exam}<span className="text-green-400 text-sm">/100</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                      <input
                        type="text"
                        value={markForm.remarks}
                        onChange={(e) => setMarkForm({ ...markForm, remarks: e.target.value })}
                        placeholder="Optional remarks..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
                    >
                      Save Mark
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <p className="text-sm">Click on a student to enter their marks</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Marks Summary */}
          {selectedAssignment && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">Marks Summary</h3>
              </div>
              <DataTable headers={["Student", "CA (40)", "Exam (60)", "Total", "Grade", "Remarks"]}>
                {getStudentsForAssignment(selectedAssignment).map((student) => {
                  const mark = getExistingMark(student.id, selectedAssignment);
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                        {student.firstName} {student.lastName}
                      </td>
                      {mark ? (
                        <>
                          <td className="px-4 py-3 text-center text-gray-700">{mark.continuousAssessment}</td>
                          <td className="px-4 py-3 text-center text-gray-700">{mark.examScore}</td>
                          <td className="px-4 py-3 text-center font-bold text-gray-800">{mark.total}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-bold ${getGradeColor(mark.grade)}`}>{mark.grade}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{mark.remarks}</td>
                        </>
                      ) : (
                        <td colSpan={5} className="px-4 py-3 text-center text-gray-400 text-sm">
                          No marks entered
                        </td>
                      )}
                    </tr>
                  );
                })}
              </DataTable>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
