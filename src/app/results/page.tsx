"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  STUDENTS,
  ACADEMIC_MARKS,
  DISCIPLINE_MARKS,
  CLASSES,
  COURSES,
  isResultPublished,
} from "@/lib/data";
import { getGrade, getGradeColor } from "@/lib/data";
import type { Student, AcademicMark, DisciplineMark } from "@/lib/types";

function ResultsContent() {
  const searchParams = useSearchParams();
  const regParam = searchParams.get("reg") ?? "";

  const [regNumber, setRegNumber] = useState(regParam);
  const [student, setStudent] = useState<Student | null>(null);
  const [marks, setMarks] = useState<AcademicMark[]>([]);
  const [discipline, setDiscipline] = useState<DisciplineMark | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<"First" | "Second">("First");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearched(true);

    const found = STUDENTS.find(
      (s) => s.registrationNumber === regNumber.trim()
    );

    if (!found) {
      setError("No student found with this registration number.");
      setStudent(null);
      setMarks([]);
      setDiscipline(null);
      return;
    }

    setStudent(found);

    // Check if results are published
    const published = isResultPublished(found.classId, selectedSemester, found.academicYear);
    if (!published) {
      setMarks([]);
      setDiscipline(null);
      return;
    }

    const studentMarks = ACADEMIC_MARKS.filter(
      (m) => m.studentId === found.id && m.semester === selectedSemester && m.published
    );
    setMarks(studentMarks);

    const disc = DISCIPLINE_MARKS.find(
      (d) => d.studentId === found.id && d.semester === selectedSemester
    );
    setDiscipline(disc ?? null);
  };

  const getCourseName = (courseId: string) => {
    return COURSES.find((c) => c.id === courseId)?.name ?? courseId;
  };

  const getCourseCode = (courseId: string) => {
    return COURSES.find((c) => c.id === courseId)?.code ?? courseId;
  };

  const getClassName = (classId: string) => {
    return CLASSES.find((c) => c.id === classId)?.name ?? classId;
  };

  const totalAcademic = marks.reduce((sum, m) => sum + m.total, 0);
  const averageScore = marks.length > 0 ? (totalAcademic / marks.length).toFixed(1) : "0";
  const overallGrade = marks.length > 0 ? getGrade(parseFloat(averageScore)) : "-";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-4">
            A
          </div>
          <h1 className="text-white font-bold text-2xl">APPEC TSS College</h1>
          <p className="text-blue-200 text-sm mt-1">Student Results Portal</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-gray-800 font-bold text-lg mb-4">Check Your Results</h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Enter Registration Number (e.g. APPEC/2024/001)"
              required
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value as "First" | "Second")}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="First">First Semester</option>
              <option value="Second">Second Semester</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          {error && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <p className="text-gray-400 text-xs mt-3">
            Demo: Try registration number <strong>APPEC/2024/001</strong>
          </p>
        </div>

        {/* Results */}
        {student && searched && (
          <div className="space-y-4">
            {/* Student Info Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xl">{student.firstName} {student.lastName}</h3>
                    <p className="text-blue-200 text-sm mt-1">Reg. No: <strong>{student.registrationNumber}</strong></p>
                  </div>
                  <div className="text-right">
                    <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                      {selectedSemester} Semester
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Program", value: student.program },
                  { label: "Department", value: student.department },
                  { label: "Level", value: student.level },
                  { label: "Class", value: getClassName(student.classId) },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-gray-800 font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results not published */}
            {!isResultPublished(student.classId, selectedSemester, student.academicYear) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-yellow-800 font-bold text-lg mb-2">Results Not Yet Published</h3>
                <p className="text-yellow-700 text-sm">
                  The {selectedSemester} Semester results for your class have not been published yet.
                  Please check back later.
                </p>
              </div>
            )}

            {/* Academic Marks */}
            {marks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-gray-800 font-bold text-lg">Academic Results</h3>
                  <p className="text-gray-500 text-sm">{selectedSemester} Semester — {student.academicYear}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Course</th>
                        <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">CA (40)</th>
                        <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Exam (60)</th>
                        <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Total (100)</th>
                        <th className="text-center px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Grade</th>
                        <th className="text-left px-4 py-3 text-gray-600 font-semibold text-xs uppercase">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {marks.map((mark) => (
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
                    <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                      <tr>
                        <td className="px-4 py-3 font-bold text-blue-900">Summary</td>
                        <td colSpan={2} className="px-4 py-3 text-center text-blue-700 text-xs">
                          {marks.length} subjects
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-blue-900">{averageScore}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold text-lg ${getGradeColor(overallGrade)}`}>
                            {overallGrade}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-blue-700 text-xs">Average Score</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Discipline Marks */}
            {discipline && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-gray-800 font-bold text-lg">Discipline Assessment</h3>
                  <p className="text-gray-500 text-sm">{selectedSemester} Semester — {student.academicYear}</p>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                    {[
                      { label: "Attendance", value: discipline.attendance, max: 20 },
                      { label: "Conduct", value: discipline.conduct, max: 20 },
                      { label: "Punctuality", value: discipline.punctuality, max: 20 },
                      { label: "Participation", value: discipline.participation, max: 20 },
                      { label: "Neatness", value: discipline.neatness, max: 20 },
                    ].map((item) => (
                      <div key={item.label} className="text-center bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                        <p className="text-xs text-gray-400">/ {item.max}</p>
                        <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${(item.value / item.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
                    <div>
                      <p className="text-blue-700 text-sm font-medium">Total Discipline Score</p>
                      <p className="text-blue-500 text-xs">{discipline.remarks}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-900 font-bold text-3xl">{discipline.total}</p>
                      <p className="text-blue-500 text-xs">/ 100</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/" className="text-blue-200 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
