"use client";

import { useState } from "react";
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

const navItems = [
  {
    label: "My Results",
    href: "/dashboard/student",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

export default function StudentDashboard() {
  const [regNumber, setRegNumber] = useState("");
  const [student, setStudent] = useState(STUDENTS[0] ?? null); // Default to first student for demo
  const [selectedSemester, setSelectedSemester] = useState<"First" | "Second">("First");

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

  return (
    <DashboardLayout
      navItems={navItems}
      title="Student Portal"
      roleLabel="Student"
      roleColor="bg-orange-500"
    >
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
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-gray-800 font-bold">Academic Results</h3>
                    <p className="text-gray-500 text-xs">{selectedSemester} Semester — {student.academicYear}</p>
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
    </DashboardLayout>
  );
}
