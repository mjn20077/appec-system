"use client";

import { useState } from "react";
import DashboardLayout, { StatCard, DataTable, Badge } from "@/components/DashboardLayout";
import {
  STUDENTS,
  TEACHERS,
  CLASSES,
  COURSES,
  ACADEMIC_MARKS,
  DISCIPLINE_MARKS,
  RESULT_PUBLICATIONS,
  EXAM_CODES,
} from "@/lib/data";
import { getGradeColor } from "@/lib/data";

type ActiveTab = "overview" | "admissions" | "students" | "teachers" | "marks" | "discipline" | "publications";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/hod",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function HODDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  const getCourseName = (id: string) => COURSES.find((c) => c.id === id)?.name ?? id;
  const getClassName = (id: string) => CLASSES.find((c) => c.id === id)?.name ?? id;
  const getTeacherName = (id: string) => TEACHERS.find((t) => t.id === id)?.name ?? id;

  const getStudentName = (id: string) => {
    const s = STUDENTS.find((st) => st.id === id);
    return s ? `${s.firstName} ${s.lastName}` : id;
  };

  const totalAssignments = TEACHERS.reduce((sum, t) => sum + t.assignedCourses.length, 0);
  const authorizedAssignments = TEACHERS.reduce(
    (sum, t) => sum + t.assignedCourses.filter((a) => a.marksEntryAuthorized).length,
    0
  );
  const submittedMarks = ACADEMIC_MARKS.length;
  const publishedResults = RESULT_PUBLICATIONS.filter((p) => p.isPublished).length;
  const confirmedAdmissions = EXAM_CODES.filter((e) => e.admissionLetterConfirmed).length;
  const usedCodes = EXAM_CODES.filter((e) => e.isUsed).length;

  return (
    <DashboardLayout
      navItems={navItems}
      title="HOD / Academic Supervisor Dashboard"
      roleLabel="HOD"
      roleColor="bg-purple-600"
    >
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 flex-wrap">
        {(["overview", "admissions", "students", "teachers", "marks", "discipline", "publications"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-purple-800 text-sm">
              <strong>Full Oversight Mode:</strong> As HOD/Academic Supervisor, you have read-only access to all system activities
              for monitoring, transparency, and accountability purposes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <StatCard
              title="Exam Codes Issued"
              value={EXAM_CODES.length}
              color="bg-yellow-100"
              subtitle={`${confirmedAdmissions} confirmed`}
              icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>}
            />
            <StatCard
              title="Registered Students"
              value={STUDENTS.length}
              color="bg-blue-100"
              subtitle={`${usedCodes} codes used`}
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            <StatCard
              title="Teaching Staff"
              value={TEACHERS.length}
              color="bg-green-100"
              subtitle={`${totalAssignments} assignments`}
              icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <StatCard
              title="Authorized Marks"
              value={authorizedAssignments}
              color="bg-orange-100"
              subtitle={`of ${totalAssignments} assignments`}
              icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            />
            <StatCard
              title="Marks Submitted"
              value={submittedMarks}
              color="bg-purple-100"
              subtitle="Academic records"
              icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
            />
            <StatCard
              title="Discipline Records"
              value={DISCIPLINE_MARKS.length}
              color="bg-red-100"
              subtitle="DOD assessments"
              icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
              title="Published Results"
              value={publishedResults}
              color="bg-teal-100"
              subtitle="Class result sets"
              icon={<svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
            />
            <StatCard
              title="Total Classes"
              value={CLASSES.length}
              color="bg-indigo-100"
              subtitle="Active classes"
              icon={<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
          </div>

          {/* System Activity Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-gray-800 font-bold mb-4">System Activity Summary</h3>
            <div className="space-y-3">
              {[
                { label: "Admission letters confirmed", value: confirmedAdmissions, total: EXAM_CODES.length, color: "bg-yellow-500" },
                { label: "Students registered", value: STUDENTS.length, total: confirmedAdmissions, color: "bg-blue-500" },
                { label: "Marks entry authorized", value: authorizedAssignments, total: totalAssignments, color: "bg-green-500" },
                { label: "Marks submitted", value: submittedMarks, total: STUDENTS.length * 2, color: "bg-purple-500" },
                { label: "Results published", value: publishedResults, total: CLASSES.length * 2, color: "bg-teal-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <p className="text-sm text-gray-600 w-52 flex-shrink-0">{item.label}</p>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{ width: `${Math.min(100, (item.value / Math.max(item.total, 1)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 w-16 text-right">
                    {item.value}/{item.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Admissions Tab */}
      {activeTab === "admissions" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Admission Letter Activity</h2>
          <DataTable headers={["Exam Code", "Candidate Name", "Program", "Level", "Letter Confirmed", "Registered"]}>
            {EXAM_CODES.map((ec) => (
              <tr key={ec.code} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{ec.code}</span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 text-sm">{ec.candidateName}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{ec.program}</td>
                <td className="px-4 py-3"><Badge color="blue">{ec.level}</Badge></td>
                <td className="px-4 py-3">
                  {ec.admissionLetterConfirmed ? (
                    <Badge color="green">Confirmed</Badge>
                  ) : (
                    <Badge color="gray">Pending</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {ec.isUsed ? (
                    <Badge color="green">Registered</Badge>
                  ) : (
                    <Badge color="yellow">Not Yet</Badge>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">All Registered Students</h2>
          <DataTable headers={["Reg. Number", "Name", "Program", "Department", "Level", "Class", "Registered"]}>
            {STUDENTS.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {student.registrationNumber}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">{student.program}</td>
                <td className="px-4 py-3"><Badge color="purple">{student.department}</Badge></td>
                <td className="px-4 py-3"><Badge color="blue">{student.level}</Badge></td>
                <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(student.classId)}</td>
                <td className="px-4 py-3 text-gray-500 text-sm">{student.registeredAt}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Teachers Tab */}
      {activeTab === "teachers" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Teaching Staff & Assignments</h2>
          {TEACHERS.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">{teacher.name}</p>
                  <p className="text-gray-500 text-xs">{teacher.email} | {teacher.specialization}</p>
                </div>
                <Badge color="green">{teacher.assignedCourses.length} courses</Badge>
              </div>
              {teacher.assignedCourses.length > 0 ? (
                <DataTable headers={["Course", "Class", "Semester", "Authorization", "Marks Status"]}>
                  {teacher.assignedCourses.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{getCourseName(a.courseId)}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(a.classId)}</td>
                      <td className="px-4 py-3"><Badge color="blue">{a.semester}</Badge></td>
                      <td className="px-4 py-3">
                        {a.marksEntryAuthorized ? <Badge color="green">Authorized</Badge> : <Badge color="gray">Pending</Badge>}
                      </td>
                      <td className="px-4 py-3">
                        {a.marksSubmitted ? <Badge color="green">Submitted</Badge> : <Badge color="yellow">In Progress</Badge>}
                      </td>
                    </tr>
                  ))}
                </DataTable>
              ) : (
                <p className="px-4 py-3 text-gray-400 text-sm">No course assignments yet.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Marks Tab */}
      {activeTab === "marks" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Academic Marks Records</h2>
          <DataTable headers={["Student", "Course", "Teacher", "Class", "Semester", "CA", "Exam", "Total", "Grade", "Published"]}>
            {ACADEMIC_MARKS.map((mark) => (
              <tr key={mark.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 text-sm">{getStudentName(mark.studentId)}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{getCourseName(mark.courseId)}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{getTeacherName(mark.teacherId)}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(mark.classId)}</td>
                <td className="px-4 py-3"><Badge color="blue">{mark.semester}</Badge></td>
                <td className="px-4 py-3 text-center text-gray-700">{mark.continuousAssessment}</td>
                <td className="px-4 py-3 text-center text-gray-700">{mark.examScore}</td>
                <td className="px-4 py-3 text-center font-bold text-gray-800">{mark.total}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${getGradeColor(mark.grade)}`}>{mark.grade}</span>
                </td>
                <td className="px-4 py-3">
                  {mark.published ? <Badge color="green">Published</Badge> : <Badge color="yellow">Pending</Badge>}
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Discipline Tab */}
      {activeTab === "discipline" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Discipline Assessment Records</h2>
          <DataTable headers={["Student", "Semester", "Attendance", "Conduct", "Punctuality", "Participation", "Neatness", "Total", "Remarks"]}>
            {DISCIPLINE_MARKS.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 text-sm">{getStudentName(record.studentId)}</td>
                <td className="px-4 py-3"><Badge color="blue">{record.semester}</Badge></td>
                <td className="px-4 py-3 text-center text-gray-700">{record.attendance}/20</td>
                <td className="px-4 py-3 text-center text-gray-700">{record.conduct}/20</td>
                <td className="px-4 py-3 text-center text-gray-700">{record.punctuality}/20</td>
                <td className="px-4 py-3 text-center text-gray-700">{record.participation}/20</td>
                <td className="px-4 py-3 text-center text-gray-700">{record.neatness}/20</td>
                <td className="px-4 py-3 text-center font-bold text-gray-800">{record.total}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{record.remarks}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Publications Tab */}
      {activeTab === "publications" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Result Publication History</h2>
          <DataTable headers={["Class", "Semester", "Academic Year", "Published By", "Published At", "Status"]}>
            {RESULT_PUBLICATIONS.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 text-sm">{getClassName(pub.classId)}</td>
                <td className="px-4 py-3"><Badge color="blue">{pub.semester}</Badge></td>
                <td className="px-4 py-3 text-gray-600 text-sm">{pub.academicYear}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">Director of Studies</td>
                <td className="px-4 py-3 text-gray-500 text-sm">{pub.publishedAt}</td>
                <td className="px-4 py-3">
                  {pub.isPublished ? (
                    <Badge color="green">Published</Badge>
                  ) : (
                    <Badge color="gray">Unpublished</Badge>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>

          {RESULT_PUBLICATIONS.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No results have been published yet.</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
