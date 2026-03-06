"use client";

// ============================================================
// Bursar / Finance Officer Dashboard
// ============================================================
// The Bursar manages all financial operations including:
//   - Recording and tracking student fee payments
//   - Viewing fee structures per program and level
//   - Generating financial reports and summaries
//   - Monitoring outstanding balances
// ============================================================

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  STUDENTS,
  FEE_PAYMENTS,
  FEE_STRUCTURES,
  formatNaira,
  getFeeStatusColor,
} from "@/lib/data";
import type { FeePayment } from "@/lib/types";

// ---- Navigation items for the Bursar sidebar ----
const NAV_ITEMS = [
  {
    label: "Fee Overview",
    href: "/dashboard/bursar",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Payment Records",
    href: "/dashboard/bursar#payments",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: "Fee Structures",
    href: "/dashboard/bursar#structures",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Record Payment",
    href: "/dashboard/bursar#record",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

const ROLE_COLOR = "bg-emerald-700";

export default function BursarDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "payments" | "structures" | "record">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Paid" | "Partial" | "Unpaid">("All");

  // ---- New payment form state ----
  const [newPayment, setNewPayment] = useState({
    registrationNumber: "",
    amountPaid: "",
    paymentMethod: "Cash" as "Cash" | "Bank Transfer" | "Online",
    semester: "First" as "First" | "Second",
  });
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // ---- Computed statistics ----
  const totalRevenue = FEE_PAYMENTS.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalOutstanding = FEE_PAYMENTS.reduce((sum, p) => sum + p.balance, 0);
  const totalExpected = FEE_PAYMENTS.reduce((sum, p) => sum + p.totalFee, 0);
  const paidCount = FEE_PAYMENTS.filter((p) => p.status === "Paid").length;
  const partialCount = FEE_PAYMENTS.filter((p) => p.status === "Partial").length;
  const unpaidCount = FEE_PAYMENTS.filter((p) => p.status === "Unpaid").length;

  // ---- Filtered payments ----
  const filteredPayments = FEE_PAYMENTS.filter((p) => {
    const student = STUDENTS.find((s) => s.id === p.studentId);
    const studentName = student ? `${student.firstName} ${student.lastName}`.toLowerCase() : "";
    const matchesSearch =
      studentName.includes(searchQuery.toLowerCase()) ||
      p.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ---- Handle recording a new payment ----
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError("");
    setPaymentSuccess("");

    const student = STUDENTS.find(
      (s) => s.registrationNumber === newPayment.registrationNumber.trim()
    );

    if (!student) {
      setPaymentError("Student with this registration number not found.");
      return;
    }

    const existingPayment = FEE_PAYMENTS.find((p) => p.studentId === student.id);
    const amount = parseFloat(newPayment.amountPaid);

    if (isNaN(amount) || amount <= 0) {
      setPaymentError("Please enter a valid payment amount.");
      return;
    }

    if (existingPayment) {
      // Update existing payment record
      const newTotal = existingPayment.amountPaid + amount;
      const newBalance = Math.max(0, existingPayment.totalFee - newTotal);
      existingPayment.amountPaid = newTotal;
      existingPayment.balance = newBalance;
      existingPayment.status = newBalance === 0 ? "Paid" : "Partial";
      existingPayment.paymentDate = new Date().toISOString().split("T")[0];
      existingPayment.paymentMethod = newPayment.paymentMethod;
    }

    setPaymentSuccess(
      `Payment of ${formatNaira(amount)} recorded successfully for ${student.firstName} ${student.lastName} (${student.registrationNumber}).`
    );
    setNewPayment({ registrationNumber: "", amountPaid: "", paymentMethod: "Cash", semester: "First" });
  };

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      title="Bursar Dashboard"
      roleLabel="Bursar / Finance Officer"
      roleColor={ROLE_COLOR}
    >
      <div className="p-6 space-y-6">

        {/* ---- Page Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Finance Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Fee management — Academic Year 2024/2025
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
            <span className="text-emerald-700 text-sm font-medium">
              Collection Rate:{" "}
              <strong>
                {totalExpected > 0 ? Math.round((totalRevenue / totalExpected) * 100) : 0}%
              </strong>
            </span>
          </div>
        </div>

        {/* ---- Tab Navigation ---- */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {(["overview", "payments", "structures", "record"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "overview" ? "Overview" :
               tab === "payments" ? "Payment Records" :
               tab === "structures" ? "Fee Structures" :
               "Record Payment"}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* TAB: Overview                                                 */}
        {/* ============================================================ */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="text-emerald-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Collected</p>
                <p className="text-emerald-700 text-2xl font-bold">{formatNaira(totalRevenue)}</p>
                <p className="text-emerald-500 text-xs mt-1">of {formatNaira(totalExpected)} expected</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">Outstanding</p>
                <p className="text-red-700 text-2xl font-bold">{formatNaira(totalOutstanding)}</p>
                <p className="text-red-500 text-xs mt-1">Pending collection</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">Fully Paid</p>
                <p className="text-green-700 text-2xl font-bold">{paidCount}</p>
                <p className="text-green-500 text-xs mt-1">student{paidCount !== 1 ? "s" : ""}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <p className="text-yellow-600 text-xs font-semibold uppercase tracking-wide mb-1">Partial / Unpaid</p>
                <p className="text-yellow-700 text-2xl font-bold">{partialCount + unpaidCount}</p>
                <p className="text-yellow-500 text-xs mt-1">{partialCount} partial, {unpaidCount} unpaid</p>
              </div>
            </div>

            {/* Payment Status Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Payment Status Breakdown</h3>
              <div className="space-y-3">
                {FEE_PAYMENTS.map((payment) => {
                  const student = STUDENTS.find((s) => s.id === payment.studentId);
                  const pct = payment.totalFee > 0
                    ? Math.round((payment.amountPaid / payment.totalFee) * 100)
                    : 0;
                  return (
                    <div key={payment.id} className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium text-gray-700 truncate">
                        {student ? `${student.firstName} ${student.lastName}` : "—"}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{formatNaira(payment.amountPaid)} paid</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct === 100 ? "bg-green-500" : pct > 0 ? "bg-yellow-500" : "bg-red-300"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getFeeStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Payment Records                                          */}
        {/* ============================================================ */}
        {activeTab === "payments" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by name, reg. number, or receipt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Student</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Reg. No.</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Receipt</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium">Total Fee</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium">Paid</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium">Balance</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Method</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => {
                    const student = STUDENTS.find((s) => s.id === payment.studentId);
                    return (
                      <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {student ? `${student.firstName} ${student.lastName}` : "—"}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-xs font-mono">
                          {payment.registrationNumber}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-xs font-mono">
                          {payment.receiptNumber}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatNaira(payment.totalFee)}
                        </td>
                        <td className="py-3 px-4 text-right text-green-600 font-medium">
                          {formatNaira(payment.amountPaid)}
                        </td>
                        <td className="py-3 px-4 text-right text-red-600 font-medium">
                          {formatNaira(payment.balance)}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{payment.paymentMethod}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getFeeStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-400">
                        No payment records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Fee Structures                                           */}
        {/* ============================================================ */}
        {activeTab === "structures" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                📋 Fee structures define the breakdown of charges per program and level for the academic year.
                Contact the IT Administrator to update these values.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {FEE_STRUCTURES.map((fs) => (
                <div key={fs.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-800">{fs.program}</h4>
                      <p className="text-gray-500 text-xs">{fs.level} · {fs.academicYear}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-700 font-bold text-lg">{formatNaira(fs.totalFee)}</p>
                      <p className="text-gray-400 text-xs">Total</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Tuition Fee",       value: fs.tuitionFee },
                      { label: "Development Levy",  value: fs.developmentLevy },
                      { label: "Examination Fee",   value: fs.examFee },
                      { label: "Library Fee",       value: fs.libraryFee },
                      { label: "Sports Fee",        value: fs.sportsFee },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium text-gray-800">{formatNaira(item.value)}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-emerald-700">{formatNaira(fs.totalFee)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Record Payment                                           */}
        {/* ============================================================ */}
        {activeTab === "record" && (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-2">Record New Payment</h3>
              <p className="text-gray-500 text-sm mb-6">
                Enter the student&apos;s registration number and payment details to record a fee payment.
              </p>

              {paymentSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {paymentSuccess}
                </div>
              )}

              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {paymentError}
                </div>
              )}

              <form onSubmit={handleRecordPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPayment.registrationNumber}
                    onChange={(e) => setNewPayment({ ...newPayment, registrationNumber: e.target.value })}
                    placeholder="e.g. APPEC/2024/001"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Paid (₦) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newPayment.amountPaid}
                    onChange={(e) => setNewPayment({ ...newPayment, amountPaid: e.target.value })}
                    placeholder="e.g. 30000"
                    min="1"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value as "Cash" | "Bank Transfer" | "Online" })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Online">Online Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPayment.semester}
                    onChange={(e) => setNewPayment({ ...newPayment, semester: e.target.value as "First" | "Second" })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="First">First Semester</option>
                    <option value="Second">Second Semester</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Record Payment
                </button>
              </form>
            </div>

            {/* Quick reference */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
              <p className="text-gray-600 text-xs font-semibold mb-2">Registered Students (Quick Reference)</p>
              <div className="space-y-1">
                {STUDENTS.map((s) => (
                  <div key={s.id} className="flex justify-between text-xs text-gray-500">
                    <span>{s.firstName} {s.lastName}</span>
                    <span className="font-mono">{s.registrationNumber}</span>
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
