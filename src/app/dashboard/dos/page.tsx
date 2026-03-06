"use client";

import { useState } from "react";
import DashboardLayout, { StatCard, DataTable, Badge } from "@/components/DashboardLayout";
import {
  STUDENTS,
  TEACHERS,
  CLASSES,
  COURSES,
  ACADEMIC_MARKS,
  RESULT_PUBLICATIONS,
} from "@/lib/data";
import { getGrade, getGradeColor } from "@/lib/data";

type ActiveTab = "overview" | "students" | "marks" | "publish";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/dos",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function DOSDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [filterClass, setFilterClass] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [teachers, setTeachers] = useState(TEACHERS);
  const [publications, setPublications] = useState(RESULT_PUBLICATIONS);
  const [successMsg, setSuccessMsg] = useState("");

  const getCourseName = (id: string) => COURSES.find((c) => c.id === id)?.name ?? id;
  const getClassName = (id: string) => CLASSES.find((c) => c.id === id)?.name ?? id;

  const filteredStudents = STUDENTS.filter((s) => {
    if (filterClass && s.classId !== filterClass) return false;
    if (filterLevel && s.level !== filterLevel) return false;
    if (filterDept && s.department !== filterDept) return false;
    return true;
  });

  const pendingAuth = teachers.flatMap((t) =>
    t.assignedCourses.filter((a) => !a.marksEntryAuthorized && !a.marksSubmitted)
  );

  const handleAuthorize = (teacherId: string, assignmentId: string, authorize: boolean) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id !== teacherId) return t;
        return {
          ...t,
          assignedCourses: t.assignedCourses.map((a) =>
            a.id === assignmentId ? { ...a, marksEntryAuthorized: authorize } : a
          ),
        };
      })
    );
    setSuccessMsg(authorize ? "Marks entry authorized!" : "Authorization revoked.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handlePublish = (classId: string, semester: "First" | "Second") => {
    const existing = publications.find(
      (p) => p.classId === classId && p.semester === semester
    );
    if (existing) {
      setPublications((prev) =>
        prev.map((p) =>
          p.classId === classId && p.semester === semester
            ? { ...p, isPublished: true, publishedAt: new Date().toISOString().split("T")[0] }
            : p
        )
      );
    } else {
      setPublications((prev) => [
        ...prev,
        {
          id: `rp${Date.now()}`,
          classId,
          semester,
          academicYear: "2024/2025",
          publishedBy: "u2",
          publishedAt: new Date().toISOString().split("T")[0],
          isPublished: true,
        },
      ]);
    }
    setSuccessMsg(`Results published for ${getClassName(classId)} — ${semester} Semester!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const isPublished = (classId: string, semester: string) =>
    publications.some((p) => p.classId === classId && p.semester === semester && p.isPublished);

  return (
    <DashboardLayout
      navItems={navItems}
      title="Director of Studies Dashboard"
      roleLabel="DOS"
      roleColor="bg-blue-600"
    >
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✓ {successMsg}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(["overview", "students", "marks", "publish"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab === "marks" ? "Marks Authorization" : tab === "publish" ? "Publish Results" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Students"
              value={STUDENTS.length}
              color="bg-blue-100"
              subtitle="Enrolled students"
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            <StatCard
              title="Total Teachers"
              value={TEACHERS.length}
              color="bg-green-100"
              subtitle="Teaching staff"
              icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <StatCard
              title="Pending Authorization"
              value={pendingAuth.length}
              color="bg-yellow-100"
              subtitle="Marks entry requests"
              icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
              title="Published Results"
              value={publications.filter((p) => p.isPublished).length}
              color="bg-purple-100"
              subtitle="Class result sets"
              icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          </div>

          {/* Pending Authorizations Alert */}
          {pendingAuth.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-yellow-800 font-semibold text-sm">
                  {pendingAuth.length} marks entry authorization(s) pending
                </p>
                <button
                  onClick={() => setActiveTab("marks")}
                  className="text-yellow-700 text-xs underline mt-1"
                >
                  Review now →
                </button>
              </div>
            </div>
          )}

          {/* Classes Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-gray-800 font-bold mb-4">Classes Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CLASSES.map((cls) => {
                const classStudents = STUDENTS.filter((s) => s.classId === cls.id);
                const firstPublished = isPublished(cls.id, "First");
                const secondPublished = isPublished(cls.id, "Second");
                return (
                  <div key={cls.id} className="border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 text-sm">{cls.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{classStudents.length} students</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${firstPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        1st: {firstPublished ? "Published" : "Pending"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${secondPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        2nd: {secondPublished ? "Published" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <h2 className="text-gray-800 font-bold text-lg flex-1">All Students</h2>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              {CLASSES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              {["Form 1", "Form 2", "Form 3", "Form 4", "Form 5"].map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {["Science", "Arts", "Commerce", "Technical", "Vocational"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <p className="text-gray-500 text-sm">{filteredStudents.length} student(s) found</p>

          <DataTable headers={["Reg. Number", "Name", "Program", "Level", "Department", "Class", "Registered"]}>
            {filteredStudents.map((student) => (
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
                <td className="px-4 py-3"><Badge color="blue">{student.level}</Badge></td>
                <td className="px-4 py-3"><Badge color="purple">{student.department}</Badge></td>
                <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(student.classId)}</td>
                <td className="px-4 py-3 text-gray-500 text-sm">{student.registeredAt}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Marks Authorization Tab */}
      {activeTab === "marks" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Marks Entry Authorization</h2>
          <p className="text-gray-500 text-sm">
            Authorize or revoke teachers&apos; permission to enter academic marks for their assigned courses.
          </p>

          <DataTable headers={["Teacher", "Course", "Class", "Semester", "Status", "Actions"]}>
            {teachers.flatMap((teacher) =>
              teacher.assignedCourses.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800 text-sm">{teacher.name}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{getCourseName(assignment.courseId)}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(assignment.classId)}</td>
                  <td className="px-4 py-3"><Badge color="blue">{assignment.semester}</Badge></td>
                  <td className="px-4 py-3">
                    {assignment.marksSubmitted ? (
                      <Badge color="green">Submitted</Badge>
                    ) : assignment.marksEntryAuthorized ? (
                      <Badge color="yellow">Authorized</Badge>
                    ) : (
                      <Badge color="gray">Not Authorized</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!assignment.marksSubmitted && (
                      <div className="flex gap-2">
                        {!assignment.marksEntryAuthorized ? (
                          <button
                            onClick={() => handleAuthorize(teacher.id, assignment.id, true)}
                            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-medium px-3 py-1 rounded-lg transition-colors"
                          >
                            Authorize
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAuthorize(teacher.id, assignment.id, false)}
                            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-1 rounded-lg transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </DataTable>

          {/* Submitted Marks Review */}
          <div className="mt-6">
            <h3 className="text-gray-800 font-bold text-base mb-3">Submitted Marks Review</h3>
            <DataTable headers={["Student", "Course", "CA (40)", "Exam (60)", "Total", "Grade", "Remarks"]}>
              {ACADEMIC_MARKS.map((mark) => {
                const student = STUDENTS.find((s) => s.id === mark.studentId);
                return (
                  <tr key={mark.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {student ? `${student.firstName} ${student.lastName}` : mark.studentId}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{getCourseName(mark.courseId)}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{mark.continuousAssessment}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{mark.examScore}</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-800">{mark.total}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${getGradeColor(mark.grade)}`}>{mark.grade}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{mark.remarks}</td>
                  </tr>
                );
              })}
            </DataTable>
          </div>
        </div>
      )}

      {/* Publish Results Tab */}
      {activeTab === "publish" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Publish Examination Results</h2>
          <p className="text-gray-500 text-sm">
            After verifying all submitted marks, publish results to make them visible to students.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLASSES.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-800 mb-1">{cls.name}</h3>
                <p className="text-gray-500 text-xs mb-4">
                  {STUDENTS.filter((s) => s.classId === cls.id).length} students |{" "}
                  {ACADEMIC_MARKS.filter((m) => m.classId === cls.id).length} mark records
                </p>

                <div className="space-y-2">
                  {(["First", "Second"] as const).map((semester) => {
                    const published = isPublished(cls.id, semester);
                    const marksCount = ACADEMIC_MARKS.filter(
                      (m) => m.classId === cls.id && m.semester === semester
                    ).length;
                    return (
                      <div key={semester} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-700">{semester} Semester</p>
                          <p className="text-xs text-gray-400">{marksCount} mark records</p>
                        </div>
                        {published ? (
                          <Badge color="green">Published</Badge>
                        ) : (
                          <button
                            onClick={() => handlePublish(cls.id, semester)}
                            disabled={marksCount === 0}
                            className="text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
