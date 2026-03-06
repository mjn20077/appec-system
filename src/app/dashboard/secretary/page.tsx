"use client";

import { useState } from "react";
import DashboardLayout, { StatCard, DataTable, Badge } from "@/components/DashboardLayout";
import {
  TEACHERS,
  CLASSES,
  COURSES,
  STUDENTS,
  USERS,
} from "@/lib/data";
import type { Teacher } from "@/lib/types";

type ActiveTab = "overview" | "teachers" | "courses" | "assignments" | "students";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/secretary",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function SecretaryDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>(TEACHERS);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
  });

  const [assignment, setAssignment] = useState({
    teacherId: "",
    courseId: "",
    classId: "",
    semester: "First" as "First" | "Second",
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher: Teacher = {
      id: `t${teachers.length + 1}`,
      userId: `u${USERS.length + 1}`,
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      specialization: newTeacher.specialization,
      assignedCourses: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTeachers([...teachers, teacher]);
    TEACHERS.push(teacher);
    setNewTeacher({ name: "", email: "", phone: "", specialization: "" });
    setShowAddTeacher(false);
  };

  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find((t) => t.id === assignment.teacherId);
    if (!teacher) return;

    const newAssignment = {
      id: `ta${Date.now()}`,
      teacherId: assignment.teacherId,
      courseId: assignment.courseId,
      classId: assignment.classId,
      level: CLASSES.find((c) => c.id === assignment.classId)?.level ?? "Form 1",
      semester: assignment.semester,
      academicYear: "2024/2025",
      marksEntryAuthorized: false,
      marksSubmitted: false,
    };

    teacher.assignedCourses.push(newAssignment);
    setTeachers([...teachers]);
    setShowAssignCourse(false);
    setAssignment({ teacherId: "", courseId: "", classId: "", semester: "First" });
  };

  const getCourseName = (id: string) => COURSES.find((c) => c.id === id)?.name ?? id;
  const getClassName = (id: string) => CLASSES.find((c) => c.id === id)?.name ?? id;

  return (
    <DashboardLayout
      navItems={navItems}
      title="Secretary Dashboard"
      roleLabel="Secretary"
      roleColor="bg-yellow-500"
    >
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(["overview", "teachers", "courses", "assignments", "students"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Teachers"
              value={teachers.length}
              color="bg-yellow-100"
              subtitle="Registered staff"
              icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <StatCard
              title="Total Courses"
              value={COURSES.length}
              color="bg-blue-100"
              subtitle="Across all departments"
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <StatCard
              title="Total Classes"
              value={CLASSES.length}
              color="bg-green-100"
              subtitle="Active classes"
              icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
            <StatCard
              title="Registered Students"
              value={STUDENTS.length}
              color="bg-purple-100"
              subtitle="Current enrollment"
              icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-gray-800 font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => { setActiveTab("teachers"); setShowAddTeacher(true); }}
                className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-xl transition-colors text-left"
              >
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Register Teacher</p>
                  <p className="text-gray-500 text-xs">Add new teaching staff</p>
                </div>
              </button>
              <button
                onClick={() => { setActiveTab("assignments"); setShowAssignCourse(true); }}
                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Assign Course</p>
                  <p className="text-gray-500 text-xs">Link teacher to course</p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Verify Students</p>
                  <p className="text-gray-500 text-xs">Review registrations</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teachers Tab */}
      {activeTab === "teachers" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 font-bold text-lg">Teaching Staff</h2>
            <button
              onClick={() => setShowAddTeacher(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Register Teacher
            </button>
          </div>

          {/* Add Teacher Modal */}
          {showAddTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-gray-800 font-bold text-lg mb-4">Register New Teacher</h3>
                <form onSubmit={handleAddTeacher} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                    <input
                      type="text"
                      value={newTeacher.specialization}
                      onChange={(e) => setNewTeacher({ ...newTeacher, specialization: e.target.value })}
                      required
                      placeholder="e.g. Mathematics & Physics"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTeacher(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <DataTable headers={["Teacher", "Email", "Phone", "Specialization", "Courses", "Actions"]}>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{teacher.name}</p>
                  <p className="text-xs text-gray-400">ID: {teacher.id}</p>
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">{teacher.email}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{teacher.phone}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{teacher.specialization}</td>
                <td className="px-4 py-3">
                  <Badge color="blue">{teacher.assignedCourses.length} courses</Badge>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => { setSelectedTeacher(teacher); setActiveTab("assignments"); }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    View Assignments
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Course Catalog</h2>
          <DataTable headers={["Course", "Code", "Department", "Level", "Credits"]}>
            {COURSES.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{course.name}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{course.code}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge color="blue">{course.department}</Badge>
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">{course.level}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{course.credits}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 font-bold text-lg">
              {selectedTeacher ? `Assignments: ${selectedTeacher.name}` : "Course Assignments"}
            </h2>
            <div className="flex gap-2">
              {selectedTeacher && (
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Show All
                </button>
              )}
              <button
                onClick={() => setShowAssignCourse(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Assign Course
              </button>
            </div>
          </div>

          {/* Assign Course Modal */}
          {showAssignCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-gray-800 font-bold text-lg mb-4">Assign Course to Teacher</h3>
                <form onSubmit={handleAssignCourse} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teacher *</label>
                    <select
                      value={assignment.teacherId}
                      onChange={(e) => setAssignment({ ...assignment, teacherId: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select teacher</option>
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                    <select
                      value={assignment.courseId}
                      onChange={(e) => setAssignment({ ...assignment, courseId: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select course</option>
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                    <select
                      value={assignment.classId}
                      onChange={(e) => setAssignment({ ...assignment, classId: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select class</option>
                      {CLASSES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                    <select
                      value={assignment.semester}
                      onChange={(e) => setAssignment({ ...assignment, semester: e.target.value as "First" | "Second" })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="First">First Semester</option>
                      <option value="Second">Second Semester</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAssignCourse(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <DataTable headers={["Teacher", "Course", "Class", "Semester", "Status"]}>
            {teachers
              .filter((t) => !selectedTeacher || t.id === selectedTeacher.id)
              .flatMap((teacher) =>
                teacher.assignedCourses.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800 text-sm">{teacher.name}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{getCourseName(assignment.courseId)}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(assignment.classId)}</td>
                    <td className="px-4 py-3">
                      <Badge color="blue">{assignment.semester}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {assignment.marksSubmitted ? (
                        <Badge color="green">Marks Submitted</Badge>
                      ) : assignment.marksEntryAuthorized ? (
                        <Badge color="yellow">Authorized</Badge>
                      ) : (
                        <Badge color="gray">Pending Auth</Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
          </DataTable>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <h2 className="text-gray-800 font-bold text-lg">Student Registration Records</h2>
          <DataTable headers={["Reg. Number", "Name", "Program", "Level", "Class", "Registered"]}>
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
                <td className="px-4 py-3">
                  <Badge color="blue">{student.level}</Badge>
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">{getClassName(student.classId)}</td>
                <td className="px-4 py-3 text-gray-500 text-sm">{student.registeredAt}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}
    </DashboardLayout>
  );
}
