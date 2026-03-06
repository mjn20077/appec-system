"use client";

// ============================================================
// Principal / Rector Dashboard
// ============================================================
// The Principal has the highest authority in the system.
// This dashboard provides:
//   - Full institutional overview and statistics
//   - Staff management visibility
//   - Academic performance overview
//   - Policy and announcement management
//   - Financial summary (from Bursar data)
//   - Discipline overview
// ============================================================

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  STUDENTS,
  TEACHERS,
  CLASSES,
  COURSES,
  ACADEMIC_MARKS,
  DISCIPLINE_MARKS,
  RESULT_PUBLICATIONS,
  FEE_PAYMENTS,
  USERS,
  AUDIT_LOGS,
  formatNaira,
} from "@/lib/data";

// ---- Navigation items for the Principal sidebar ----
const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard/principal",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Staff Directory",
    href: "/dashboard/principal#staff",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Academic Overview",
    href: "/dashboard/principal#academic",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Financial Summary",
    href: "/dashboard/principal#finance",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Recent Activity",
    href: "/dashboard/principal#activity",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

// ---- Role color for the Principal ----
const ROLE_COLOR = "bg-rose-700";

export default function PrincipalDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "staff" | "academic" | "finance" | "activity">("overview");
  const [staffSearch, setStaffSearch] = useState("");

  // ---- Computed statistics ----
  const totalStudents = STUDENTS.length;
  const totalTeachers = TEACHERS.length;
  const totalStaff = USERS.filter((u) => u.role !== "student").length;
  const totalClasses = CLASSES.length;
  const totalCourses = COURSES.length;
  const publishedResults = RESULT_PUBLICATIONS.filter((r) => r.isPublished).length;

  // Financial stats
  const totalRevenue = FEE_PAYMENTS.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalOutstanding = FEE_PAYMENTS.reduce((sum, p) => sum + p.balance, 0);
  const paidStudents = FEE_PAYMENTS.filter((p) => p.status === "Paid").length;
  const unpaidStudents = FEE_PAYMENTS.filter((p) => p.status === "Unpaid").length;

  // Academic stats
  const avgScore =
    ACADEMIC_MARKS.length > 0
      ? Math.round(ACADEMIC_MARKS.reduce((sum, m) => sum + m.total, 0) / ACADEMIC_MARKS.length)
      : 0;
  const gradeACount = ACADEMIC_MARKS.filter((m) => m.grade === "A").length;
  const failCount = ACADEMIC_MARKS.filter((m) => m.grade === "F").length;

  // Discipline stats
  const avgDiscipline =
    DISCIPLINE_MARKS.length > 0
      ? Math.round(DISCIPLINE_MARKS.reduce((sum, d) => sum + d.total, 0) / DISCIPLINE_MARKS.length)
      : 0;

  // Filtered staff list
  const filteredStaff = USERS.filter(
    (u) =>
      u.role !== "student" &&
      (u.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(staffSearch.toLowerCase()) ||
        u.role.toLowerCase().includes(staffSearch.toLowerCase()))
  );

  // Role display labels
  const ROLE_LABELS: Record<string, string> = {
    secretary: "Secretary",
    dos: "Director of Studies",
    dod: "Director of Discipline",
    hod: "HOD / Supervisor",
    principal: "Principal",
    bursar: "Bursar",
    librarian: "Librarian",
    it_admin: "IT Administrator",
    teacher: "Teacher",
    student: "Student",
  };

  const ROLE_BADGE_COLORS: Record<string, string> = {
    principal: "bg-rose-100 text-rose-700",
    secretary: "bg-yellow-100 text-yellow-700",
    dos: "bg-blue-100 text-blue-700",
    dod: "bg-red-100 text-red-700",
    hod: "bg-purple-100 text-purple-700",
    bursar: "bg-emerald-100 text-emerald-700",
    librarian: "bg-teal-100 text-teal-700",
    it_admin: "bg-gray-100 text-gray-700",
    teacher: "bg-green-100 text-green-700",
    student: "bg-orange-100 text-orange-700",
  };

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      title="Principal Dashboard"
      roleLabel="Principal / Rector"
      roleColor={ROLE_COLOR}
    >
      <div className="p-6 space-y-6">

        {/* ---- Page Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Principal Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Institutional overview — Academic Year 2024/2025
            </p>
          </div>
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-rose-700 text-sm font-medium">First Semester Active</span>
          </div>
        </div>

        {/* ---- Tab Navigation ---- */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {(["overview", "staff", "academic", "finance", "activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-white text-rose-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "activity" ? "Recent Activity" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* TAB: Overview                                                 */}
        {/* ============================================================ */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Students",   value: totalStudents,   icon: "👨‍🎓", color: "bg-blue-50 border-blue-200",   text: "text-blue-700" },
                { label: "Teaching Staff",   value: totalTeachers,   icon: "👨‍🏫", color: "bg-green-50 border-green-200", text: "text-green-700" },
                { label: "Total Classes",    value: totalClasses,    icon: "🏫", color: "bg-purple-50 border-purple-200", text: "text-purple-700" },
                { label: "Total Courses",    value: totalCourses,    icon: "📚", color: "bg-yellow-50 border-yellow-200", text: "text-yellow-700" },
                { label: "All Staff",        value: totalStaff,      icon: "👥", color: "bg-rose-50 border-rose-200",    text: "text-rose-700" },
                { label: "Published Results",value: publishedResults, icon: "📋", color: "bg-teal-50 border-teal-200",   text: "text-teal-700" },
                { label: "Avg. Score",       value: `${avgScore}%`,  icon: "📊", color: "bg-indigo-50 border-indigo-200", text: "text-indigo-700" },
                { label: "Avg. Discipline",  value: `${avgDiscipline}%`, icon: "⭐", color: "bg-orange-50 border-orange-200", text: "text-orange-700" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Financial Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-600">💰</span> Financial Snapshot
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-emerald-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Collected</p>
                  <p className="text-emerald-700 text-xl font-bold">{formatNaira(totalRevenue)}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">Outstanding</p>
                  <p className="text-red-700 text-xl font-bold">{formatNaira(totalOutstanding)}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Fee Compliance</p>
                  <p className="text-blue-700 text-xl font-bold">
                    {totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0}%
                  </p>
                  <p className="text-blue-500 text-xs">{paidStudents} paid / {unpaidStudents} unpaid</p>
                </div>
              </div>
            </div>

            {/* Academic Performance Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📊</span> Academic Performance Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-3xl font-bold text-green-700">{gradeACount}</p>
                  <p className="text-green-600 text-sm font-medium">Grade A Results</p>
                  <p className="text-green-500 text-xs">Excellent performance</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-3xl font-bold text-blue-700">{avgScore}%</p>
                  <p className="text-blue-600 text-sm font-medium">Average Score</p>
                  <p className="text-blue-500 text-xs">Across all subjects</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-3xl font-bold text-red-700">{failCount}</p>
                  <p className="text-red-600 text-sm font-medium">Failing Grades</p>
                  <p className="text-red-500 text-xs">Requires attention</p>
                </div>
              </div>
            </div>

            {/* Classes Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Classes Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Class</th>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Level</th>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Department</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Capacity</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Enrolled</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLASSES.map((cls) => {
                      const enrolled = STUDENTS.filter((s) => s.classId === cls.id).length;
                      const hasResults = RESULT_PUBLICATIONS.some(
                        (r) => r.classId === cls.id && r.isPublished
                      );
                      return (
                        <tr key={cls.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2.5 px-3 font-medium text-gray-800">{cls.name}</td>
                          <td className="py-2.5 px-3 text-gray-600">{cls.level}</td>
                          <td className="py-2.5 px-3 text-gray-600">{cls.department}</td>
                          <td className="py-2.5 px-3 text-center text-gray-600">{cls.capacity}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`font-semibold ${enrolled > 0 ? "text-blue-600" : "text-gray-400"}`}>
                              {enrolled}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              hasResults
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}>
                              {hasResults ? "Published" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Staff Directory                                          */}
        {/* ============================================================ */}
        {activeTab === "staff" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search staff by name, email, or role..."
                value={staffSearch}
                onChange={(e) => setStaffSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="text-sm text-gray-500 flex items-center">
                {filteredStaff.length} staff member{filteredStaff.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Phone</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600 text-xs">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE_COLORS[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                          {ROLE_LABELS[user.role] ?? user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{user.phone ?? "—"}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {user.lastLoginAt ?? "Never"}
                      </td>
                    </tr>
                  ))}
                  {filteredStaff.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        No staff members found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Academic Overview                                        */}
        {/* ============================================================ */}
        {activeTab === "academic" && (
          <div className="space-y-6">

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Grade Distribution (All Classes)</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {["A", "B", "C", "D", "E", "F"].map((grade) => {
                  const count = ACADEMIC_MARKS.filter((m) => m.grade === grade).length;
                  const pct = ACADEMIC_MARKS.length > 0
                    ? Math.round((count / ACADEMIC_MARKS.length) * 100)
                    : 0;
                  const colors: Record<string, string> = {
                    A: "bg-green-100 border-green-300 text-green-700",
                    B: "bg-blue-100 border-blue-300 text-blue-700",
                    C: "bg-yellow-100 border-yellow-300 text-yellow-700",
                    D: "bg-orange-100 border-orange-300 text-orange-700",
                    E: "bg-red-100 border-red-300 text-red-600",
                    F: "bg-red-200 border-red-400 text-red-800",
                  };
                  return (
                    <div key={grade} className={`${colors[grade]} border rounded-xl p-4 text-center`}>
                      <p className="text-2xl font-bold">{grade}</p>
                      <p className="text-lg font-semibold">{count}</p>
                      <p className="text-xs opacity-75">{pct}%</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Performance Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Student Performance Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Student</th>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Reg. No.</th>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Class</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Subjects</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Avg. Score</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Discipline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS.map((student) => {
                      const marks = ACADEMIC_MARKS.filter((m) => m.studentId === student.id);
                      const avg = marks.length > 0
                        ? Math.round(marks.reduce((s, m) => s + m.total, 0) / marks.length)
                        : null;
                      const discipline = DISCIPLINE_MARKS.find((d) => d.studentId === student.id);
                      const cls = CLASSES.find((c) => c.id === student.classId);
                      return (
                        <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2.5 px-3 font-medium text-gray-800">
                            {student.firstName} {student.lastName}
                          </td>
                          <td className="py-2.5 px-3 text-gray-500 text-xs font-mono">
                            {student.registrationNumber}
                          </td>
                          <td className="py-2.5 px-3 text-gray-600 text-xs">
                            {cls?.name ?? student.classId}
                          </td>
                          <td className="py-2.5 px-3 text-center text-gray-600">{marks.length}</td>
                          <td className="py-2.5 px-3 text-center">
                            {avg !== null ? (
                              <span className={`font-bold ${avg >= 70 ? "text-green-600" : avg >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                                {avg}%
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {discipline ? (
                              <span className={`font-bold ${discipline.total >= 80 ? "text-green-600" : discipline.total >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                                {discipline.total}%
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Financial Summary                                        */}
        {/* ============================================================ */}
        {activeTab === "finance" && (
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="text-emerald-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Revenue Collected</p>
                <p className="text-emerald-700 text-2xl font-bold">{formatNaira(totalRevenue)}</p>
                <p className="text-emerald-500 text-xs mt-1">Academic Year 2024/2025</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Outstanding</p>
                <p className="text-red-700 text-2xl font-bold">{formatNaira(totalOutstanding)}</p>
                <p className="text-red-500 text-xs mt-1">{unpaidStudents} student(s) with unpaid fees</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Collection Rate</p>
                <p className="text-blue-700 text-2xl font-bold">
                  {totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0}%
                </p>
                <p className="text-blue-500 text-xs mt-1">{paidStudents} of {totalStudents} students fully paid</p>
              </div>
            </div>

            {/* Fee payment details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Student Fee Status</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Student</th>
                      <th className="text-left py-2 px-3 text-gray-500 font-medium">Reg. No.</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Total Fee</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Paid</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Balance</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEE_PAYMENTS.map((payment) => {
                      const student = STUDENTS.find((s) => s.id === payment.studentId);
                      return (
                        <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2.5 px-3 font-medium text-gray-800">
                            {student ? `${student.firstName} ${student.lastName}` : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-gray-500 text-xs font-mono">
                            {payment.registrationNumber}
                          </td>
                          <td className="py-2.5 px-3 text-right text-gray-700">
                            {formatNaira(payment.totalFee)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-green-600 font-medium">
                            {formatNaira(payment.amountPaid)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-red-600 font-medium">
                            {formatNaira(payment.balance)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              payment.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : payment.status === "Partial"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Recent Activity                                          */}
        {/* ============================================================ */}
        {activeTab === "activity" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">System Activity Log</h3>
              <div className="space-y-3">
                {AUDIT_LOGS.slice().reverse().map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                      {log.userRole === "dos" ? "📋" :
                       log.userRole === "teacher" ? "✏️" :
                       log.userRole === "dod" ? "⚖️" :
                       log.userRole === "secretary" ? "📝" :
                       log.userRole === "bursar" ? "💰" :
                       log.userRole === "librarian" ? "📚" :
                       log.userRole === "it_admin" ? "🔧" : "👤"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-800 text-sm">{log.userName}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${ROLE_BADGE_COLORS[log.userRole] ?? "bg-gray-100 text-gray-600"}`}>
                          {ROLE_LABELS[log.userRole] ?? log.userRole}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">
                          {log.action}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mt-0.5">{log.details}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {new Date(log.timestamp).toLocaleString("en-GB")}
                        {log.ipAddress && ` · ${log.ipAddress}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
