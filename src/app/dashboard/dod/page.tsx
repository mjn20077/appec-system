"use client";

import { useState } from "react";
import DashboardLayout, { StatCard, DataTable, Badge } from "@/components/DashboardLayout";
import { STUDENTS, DISCIPLINE_MARKS, CLASSES } from "@/lib/data";
import type { DisciplineMark } from "@/lib/types";

type ActiveTab = "overview" | "records" | "enter";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/dod",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function DODDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [disciplineMarks, setDisciplineMarks] = useState<DisciplineMark[]>(DISCIPLINE_MARKS);
  const [successMsg, setSuccessMsg] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    studentId: "",
    semester: "First" as "First" | "Second",
    attendance: 0,
    conduct: 0,
    punctuality: 0,
    participation: 0,
    neatness: 0,
    remarks: "",
  });

  const getClassName = (classId: string) => CLASSES.find((c) => c.id === classId)?.name ?? classId;

  const getStudentName = (studentId: string) => {
    const s = STUDENTS.find((st) => st.id === studentId);
    return s ? `${s.firstName} ${s.lastName}` : studentId;
  };

  const getTotal = () =>
    form.attendance + form.conduct + form.punctuality + form.participation + form.neatness;

  const getDisciplineGrade = (total: number) => {
    if (total >= 90) return { label: "Excellent", color: "text-green-600" };
    if (total >= 75) return { label: "Very Good", color: "text-blue-600" };
    if (total >= 60) return { label: "Good", color: "text-yellow-600" };
    if (total >= 50) return { label: "Fair", color: "text-orange-600" };
    return { label: "Poor", color: "text-red-600" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = getTotal();

    if (editingId) {
      setDisciplineMarks((prev) =>
        prev.map((d) =>
          d.id === editingId
            ? {
                ...d,
                ...form,
                total,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : d
        )
      );
      setSuccessMsg("Discipline record updated successfully!");
      setEditingId(null);
    } else {
      const newRecord: DisciplineMark = {
        id: `dm${Date.now()}`,
        studentId: form.studentId,
        semester: form.semester,
        academicYear: "2024/2025",
        attendance: form.attendance,
        conduct: form.conduct,
        punctuality: form.punctuality,
        participation: form.participation,
        neatness: form.neatness,
        total,
        remarks: form.remarks,
        enteredBy: "u3",
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setDisciplineMarks((prev) => [...prev, newRecord]);
      DISCIPLINE_MARKS.push(newRecord);
      setSuccessMsg("Discipline record saved successfully!");
    }

    setForm({
      studentId: "",
      semester: "First",
      attendance: 0,
      conduct: 0,
      punctuality: 0,
      participation: 0,
      neatness: 0,
      remarks: "",
    });
    setActiveTab("records");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleEdit = (record: DisciplineMark) => {
    setForm({
      studentId: record.studentId,
      semester: record.semester,
      attendance: record.attendance,
      conduct: record.conduct,
      punctuality: record.punctuality,
      participation: record.participation,
      neatness: record.neatness,
      remarks: record.remarks,
    });
    setEditingId(record.id);
    setActiveTab("enter");
  };

  const avgDiscipline =
    disciplineMarks.length > 0
      ? (disciplineMarks.reduce((sum, d) => sum + d.total, 0) / disciplineMarks.length).toFixed(1)
      : "0";

  return (
    <DashboardLayout
      navItems={navItems}
      title="Director of Discipline Dashboard"
      roleLabel="DOD"
      roleColor="bg-red-600"
    >
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✓ {successMsg}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(["overview", "records", "enter"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab !== "enter") setEditingId(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab === "enter" ? (editingId ? "Edit Record" : "Enter Marks") : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Total Students"
              value={STUDENTS.length}
              color="bg-red-100"
              subtitle="Under discipline oversight"
              icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            <StatCard
              title="Records Entered"
              value={disciplineMarks.length}
              color="bg-orange-100"
              subtitle="Discipline assessments"
              icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            />
            <StatCard
              title="Average Score"
              value={avgDiscipline}
              color="bg-yellow-100"
              subtitle="Out of 100"
              icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
          </div>

          {/* Students without discipline records */}
          {STUDENTS.filter((s) => !disciplineMarks.some((d) => d.studentId === s.id)).length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-orange-800 font-semibold text-sm mb-2">
                Students without discipline records:
              </p>
              <div className="space-y-1">
                {STUDENTS.filter((s) => !disciplineMarks.some((d) => d.studentId === s.id)).map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <p className="text-orange-700 text-sm">{s.firstName} {s.lastName} — {s.registrationNumber}</p>
                    <button
                      onClick={() => {
                        setForm({ ...form, studentId: s.id });
                        setActiveTab("enter");
                      }}
                      className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors"
                    >
                      Enter Marks
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discipline Score Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-gray-800 font-bold mb-4">Discipline Score Distribution</h3>
            <div className="space-y-3">
              {[
                { label: "Excellent (90-100)", min: 90, max: 100, color: "bg-green-500" },
                { label: "Very Good (75-89)", min: 75, max: 89, color: "bg-blue-500" },
                { label: "Good (60-74)", min: 60, max: 74, color: "bg-yellow-500" },
                { label: "Fair (50-59)", min: 50, max: 59, color: "bg-orange-500" },
                { label: "Poor (0-49)", min: 0, max: 49, color: "bg-red-500" },
              ].map((range) => {
                const count = disciplineMarks.filter(
                  (d) => d.total >= range.min && d.total <= range.max
                ).length;
                const pct = disciplineMarks.length > 0 ? (count / disciplineMarks.length) * 100 : 0;
                return (
                  <div key={range.label} className="flex items-center gap-3">
                    <p className="text-sm text-gray-600 w-40 flex-shrink-0">{range.label}</p>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`${range.color} h-3 rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 w-8 text-right">{count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Records Tab */}
      {activeTab === "records" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 font-bold text-lg">Discipline Records</h2>
            <button
              onClick={() => setActiveTab("enter")}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Enter New Record
            </button>
          </div>

          <DataTable headers={["Student", "Semester", "Attendance", "Conduct", "Punctuality", "Participation", "Neatness", "Total", "Grade", "Actions"]}>
            {disciplineMarks.map((record) => {
              const grade = getDisciplineGrade(record.total);
              return (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                    {getStudentName(record.studentId)}
                  </td>
                  <td className="px-4 py-3"><Badge color="blue">{record.semester}</Badge></td>
                  <td className="px-4 py-3 text-center text-gray-700">{record.attendance}/20</td>
                  <td className="px-4 py-3 text-center text-gray-700">{record.conduct}/20</td>
                  <td className="px-4 py-3 text-center text-gray-700">{record.punctuality}/20</td>
                  <td className="px-4 py-3 text-center text-gray-700">{record.participation}/20</td>
                  <td className="px-4 py-3 text-center text-gray-700">{record.neatness}/20</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-800">{record.total}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold text-sm ${grade.color}`}>{grade.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(record)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-3 py-1 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </DataTable>
        </div>
      )}

      {/* Enter Marks Tab */}
      {activeTab === "enter" && (
        <div className="max-w-2xl">
          <h2 className="text-gray-800 font-bold text-lg mb-4">
            {editingId ? "Edit Discipline Record" : "Enter Discipline Marks"}
          </h2>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
                  <select
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    required
                    disabled={!!editingId}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  >
                    <option value="">Select student</option>
                    {STUDENTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName} ({s.registrationNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                  <select
                    value={form.semester}
                    onChange={(e) => setForm({ ...form, semester: e.target.value as "First" | "Second" })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="First">First Semester</option>
                    <option value="Second">Second Semester</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                  Discipline Scores (each out of 20)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "attendance", label: "Attendance" },
                    { key: "conduct", label: "Conduct" },
                    { key: "punctuality", label: "Punctuality" },
                    { key: "participation", label: "Participation" },
                    { key: "neatness", label: "Neatness" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} (0-20)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={form[field.key as keyof typeof form] as number}
                        onChange={(e) =>
                          setForm({ ...form, [field.key]: Math.min(20, Math.max(0, parseInt(e.target.value) || 0)) })
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Total */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-red-700 font-semibold">Total Score</p>
                  <p className={`text-sm font-medium ${getDisciplineGrade(getTotal()).color}`}>
                    {getDisciplineGrade(getTotal()).label}
                  </p>
                </div>
                <p className="text-red-900 font-bold text-3xl">{getTotal()}<span className="text-red-400 text-lg">/100</span></p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                  rows={2}
                  placeholder="Optional remarks about student discipline..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setActiveTab("records"); setEditingId(null); }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {editingId ? "Update Record" : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
