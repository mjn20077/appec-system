"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout, { Badge } from "@/components/DashboardLayout";
import {
  STUDENTS,
  CLASSES,
  COURSES,
  ACADEMIC_MARKS,
  DISCIPLINE_MARKS,
  isResultPublished,
} from "@/lib/data";
import { getGradeColor } from "@/lib/data";

// Announcements for students
const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Second Semester Examination Notice",
    content: "Second semester examinations will commence on March 15, 2025. All students are advised to prepare adequately.",
    date: "2025-03-01",
    type: "exam",
  },
  {
    id: 2,
    title: "Fee Payment Deadline Extended",
    content: "The deadline for second term fee payment has been extended to March 10, 2025. Please make payments at the bursary.",
    date: "2025-02-28",
    type: "finance",
  },
  {
    id: 3,
    title: "Inter-House Sports Competition",
    content: "The annual inter-house sports competition holds on March 20, 2025. All students are encouraged to participate.",
    date: "2025-02-25",
    type: "sports",
  },
];

const navItems = [
  {
    label: "My Dashboard",
    href: "/dashboard/student",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "My Results",
    href: "/results",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

export default function StudentDashboard() {
  const [regNumber, setRegNumber] = useState("");
  const [student, setStudent] = useState<typeof STUDENTS[0] | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<"First" | "Second">("First");
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<"results" | "announcements">("results");

  // Auto-login simulation for demo
  useEffect(() => {
    if (STUDENTS.length > 0) {
      setStudent(STUDENTS[0]);
    }
  }, []);

  const getClassName = (id: string) => CLASSES.find((c) => c.id === id)?.name ?? id;
  const getCourseName = (id: string) => COURSES.find((c) => c.id === id)?.name ?? id;
  const getCourseCode = (id: string) => COURSES.find((c) => c.id === id)?.code ?? id;

  const myMarks = student
    ? ACADEMIC_MARKS.filter(
        (m) =>
          m.studentId === student.id &&
          m.semester === selectedSemester &&
          m.published &&
          isResultPublished(student.classId, selectedSemester, student.academicYear)
      )
    : [];

  const myDiscipline = student
    ? DISCIPLINE_MARKS.find(
        (d) => d.studentId === student.id && d.semester === selectedSemester
      )
    : null;

  const resultsPublished = student
    ? isResultPublished(student.classId, selectedSemester, student.academicYear)
    : false;

  const totalScore = myMarks.reduce((sum, m) => sum + m.total, 0);
  const avgScore = myMarks.length > 0 ? (totalScore / myMarks.length).toFixed(1) : "0";

  // Calculate grade trend
  const getGradeTrend = () => {
    if (!student) return "N/A";
    const firstSemMarks = ACADEMIC_MARKS.filter(
      (m) => m.studentId === student.id && m.semester === "First" && m.published
    );
    const secondSemMarks = ACADEMIC_MARKS.filter(
      (m) => m.studentId === student.id && m.semester === "Second" && m.published
    );
    if (firstSemMarks.length === 0 || secondSemMarks.length === 0) return "N/A";
    const firstAvg = firstSemMarks.reduce((s, m) => s + m.total, 0) / firstSemMarks.length;
    const secondAvg = secondSemMarks.reduce((s, m) => s + m.total, 0) / secondSemMarks.length;
    if (secondAvg > firstAvg) return "📈 Improving";
    if (secondAvg < firstAvg) return "📉 Declining";
    return "➡️ Stable";
  };

  return (
    <DashboardLayout
      navItems={navItems}
      title="Student Portal"
      roleLabel="Student"
      roleColor="bg-orange-500"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-bold text-2xl">
              Welcome back, {student?.firstName}! 👋
            </h2>
            <p className="text-orange-100 text-sm mt-1">
              {student?.level} • {student?.department} • Academic Year {student?.academicYear}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/results"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Results
            </Link>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Student Profile Popup */}
      {showProfile && student && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-800 font-bold text-xl">My Profile</h3>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold text-2xl">
                  {student.firstName.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-lg">{student.firstName} {student.lastName}</p>
                  <p className="text-gray-500 text-sm">{student.registrationNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Program</p>
                  <p className="text-gray-800 font-medium">{student.program}</p>
                </div>
                <div>
                  <p className="text-gray-500">Department</p>
                  <p className="text-gray-800 font-medium">{student.department}</p>
                </div>
                <div>
                  <p className="text-gray-500">Level</p>
                  <p className="text-gray-800 font-medium">{student.level}</p>
                </div>
                <div>
                  <p className="text-gray-500">Class</p>
                  <p className="text-gray-800 font-medium">{getClassName(student.classId)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium">{student.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">{student.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Guardian</p>
                  <p className="text-gray-800 font-medium">{student.guardianName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Guardian Phone</p>
                  <p className="text-gray-800 font-medium">{student.guardianPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-500 text-xs">Subjects</p>
          <p className="text-gray-800 font-bold text-xl">{myMarks.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-xs">Average</p>
          <p className="text-gray-800 font-bold text-xl">{avgScore}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-xs">Discipline</p>
          <p className="text-gray-800 font-bold text-xl">{myDiscipline?.total ?? "—"}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-gray-500 text-xs">Trend</p>
          <p className="text-gray-800 font-bold text-sm">{getGradeTrend()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "results"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          📊 My Results
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "announcements"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          📢 Announcements
        </button>
      </div>

      {/* Results Tab */}
      {activeTab === "results" && (
        <div className="space-y-6">
          {/* Student Profile */}
          {student && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold text-xl flex-shrink-0">
                      {student.firstName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-bold text-lg">
                        {student.firstName} {student.lastName}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Reg. No: <strong className="font-mono">{student.registrationNumber}</strong>
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge color="blue">{student.level}</Badge>
                        <Badge color="purple">{student.department}</Badge>
                        <Badge color="orange">{student.program}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs">Class</p>
                    <p className="text-gray-800 font-semibold text-sm">{getClassName(student.classId)}</p>
                    <p className="text-gray-500 text-xs mt-1">Academic Year</p>
                    <p className="text-gray-800 font-semibold text-sm">{student.academicYear}</p>
                  </div>
                </div>
              </div>

              {/* Semester Selector */}
              <div className="flex gap-3">
                {(["First", "Second"] as const).map((sem) => (
                  <button
                    key={sem}
                    onClick={() => setSelectedSemester(sem)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedSemester === sem
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {sem} Semester
                  </button>
                ))}
              </div>

              {/* Results Not Published */}
              {!resultsPublished && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-yellow-800 font-bold text-base mb-1">Results Not Yet Published</h3>
                  <p className="text-yellow-700 text-sm">
                    {selectedSemester} Semester results are not yet available. Please check back later.
                  </p>
                </div>
              )}

              {/* Academic Results */}
              {resultsPublished && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                      <p className="text-gray-500 text-xs mb-1">Subjects</p>
                      <p className="text-gray-800 font-bold text-2xl">{myMarks.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                      <p className="text-gray-500 text-xs mb-1">Average Score</p>
                      <p className="text-gray-800 font-bold text-2xl">{avgScore}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                      <p className="text-gray-500 text-xs mb-1">Discipline Score</p>
                      <p className="text-gray-800 font-bold text-2xl">{myDiscipline?.total ?? "—"}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                      <p className="text-gray-500 text-xs mb-1">Semester</p>
                      <p className="text-gray-800 font-bold text-lg">{selectedSemester}</p>
                    </div>
                  </div>

                  {/* Academic Marks Table */}
                  {myMarks.length > 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <h3 className="text-gray-800 font-bold">Academic Results</h3>
                          <p className="text-gray-500 text-xs">{selectedSemester} Semester — {student.academicYear}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          Print
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Course</th>
                              <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">CA (40)</th>
                              <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Exam (60)</th>
                              <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Total</th>
                              <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Grade</th>
                              <th className="text-left px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Remarks</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {myMarks.map((mark) => (
                              <tr key={mark.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <p className="font-medium text-gray-800">{getCourseName(mark.courseId)}</p>
                                  <p className="text-xs text-gray-400">{getCourseCode(mark.courseId)}</p>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-700">{mark.continuousAssessment}</td>
                                <td className="px-4 py-3 text-center text-gray-700">{mark.examScore}</td>
                                <td className="px-4 py-3 text-center font-bold text-gray-800">{mark.total}</td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`font-bold text-lg ${getGradeColor(mark.grade)}`}>
                                    {mark.grade}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">{mark.remarks}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-orange-50 border-t-2 border-orange-200">
                            <tr>
                              <td className="px-4 py-3 font-bold text-orange-900">Average</td>
                              <td colSpan={2} className="px-4 py-3 text-center text-orange-600 text-xs">
                                {myMarks.length} subjects
                              </td>
                              <td className="px-4 py-3 text-center font-bold text-orange-900">{avgScore}</td>
                              <td colSpan={2}></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center text-gray-400">
                      <p>No academic marks available for this semester.</p>
                    </div>
                  )}

                  {/* Discipline Assessment */}
                  {myDiscipline && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="text-gray-800 font-bold">Discipline Assessment</h3>
                        <p className="text-gray-500 text-xs">{selectedSemester} Semester — {student.academicYear}</p>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                          {[
                            { label: "Attendance", value: myDiscipline.attendance },
                            { label: "Conduct", value: myDiscipline.conduct },
                            { label: "Punctuality", value: myDiscipline.punctuality },
                            { label: "Participation", value: myDiscipline.participation },
                            { label: "Neatness", value: myDiscipline.neatness },
                          ].map((item) => (
                            <div key={item.label} className="text-center bg-gray-50 rounded-xl p-3">
                              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                              <p className="text-xs text-gray-400">/ 20</p>
                              <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-orange-400 h-1.5 rounded-full"
                                  style={{ width: `${(item.value / 20) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between bg-orange-50 rounded-xl p-4">
                          <div>
                            <p className="text-orange-700 font-medium text-sm">Total Discipline Score</p>
                            <p className="text-orange-500 text-xs">{myDiscipline.remarks}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-900 font-bold text-3xl">{myDiscipline.total}</p>
                            <p className="text-orange-400 text-xs">/ 100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Read-only notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-700 text-sm">
                  Student access is <strong>read-only</strong>. You can view your published results here.
                  For any concerns about your marks, please contact the Director of Studies.
                </p>
              </div>
            </div>
          )}

          {!student && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No student profile found.</p>
              <Link href="/results" className="text-blue-600 hover:underline text-sm">
                Use the public results portal instead →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="space-y-4">
          {ANNOUNCEMENTS.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-xl border p-5 hover:shadow-md transition-shadow ${
                announcement.type === "exam"
                  ? "border-red-200"
                  : announcement.type === "finance"
                  ? "border-green-200"
                  : "border-blue-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      announcement.type === "exam"
                        ? "bg-red-100"
                        : announcement.type === "finance"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {announcement.type === "exam" ? (
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    ) : announcement.type === "finance" ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-bold">{announcement.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{announcement.content}</p>
                    <p className="text-gray-400 text-xs mt-2">{announcement.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
