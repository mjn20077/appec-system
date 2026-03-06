"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { EXAM_CODES, CLASSES, STUDENTS } from "@/lib/data";
import type { ExamCode } from "@/lib/types";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code") ?? "";

  const [examCode, setExamCode] = useState(codeParam);
  const [examData, setExamData] = useState<ExamCode | null>(null);
  const [step, setStep] = useState<"code" | "form" | "success">("code");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [regNumber, setRegNumber] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
  });

  useEffect(() => {
    if (codeParam) {
      const found = EXAM_CODES.find((ec) => ec.code === codeParam);
      if (found && found.admissionLetterConfirmed && !found.isUsed) {
        const nameParts = found.candidateName.split(" ");
        queueMicrotask(() => {
          setExamData(found);
          setForm((f) => ({
            ...f,
            firstName: nameParts[0] ?? "",
            lastName: nameParts.slice(1).join(" ") ?? "",
          }));
          setStep("form");
        });
      }
    }
  }, [codeParam]);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const found = EXAM_CODES.find((ec) => ec.code === examCode.trim().toUpperCase());
      if (!found) {
        setError("Invalid examination code.");
        setLoading(false);
        return;
      }
      if (found.isUsed) {
        setError("This examination code has already been used for registration.");
        setLoading(false);
        return;
      }
      if (!found.admissionLetterConfirmed) {
        setError("You must confirm your admission letter before registering. Please visit the Admission Letter portal first.");
        setLoading(false);
        return;
      }
      setExamData(found);
      const nameParts = found.candidateName.split(" ");
      setForm((f) => ({
        ...f,
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" ") ?? "",
      }));
      setStep("form");
      setLoading(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!examData) return;

      // Generate registration number
      const nextNum = String(STUDENTS.length + 1).padStart(3, "0");
      const newRegNumber = `APPEC/2024/${nextNum}`;
      setRegNumber(newRegNumber);

      // Mark exam code as used
      const idx = EXAM_CODES.findIndex((ec) => ec.code === examData.code);
      if (idx !== -1) {
        EXAM_CODES[idx].isUsed = true;
      }

      // Add student to mock data
      STUDENTS.push({
        id: `s${STUDENTS.length + 1}`,
        registrationNumber: newRegNumber,
        examCode: examData.code,
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender as "Male" | "Female",
        phone: form.phone,
        email: form.email,
        address: form.address,
        guardianName: form.guardianName,
        guardianPhone: form.guardianPhone,
        program: examData.program,
        department: examData.department,
        level: examData.level,
        classId: examData.classId,
        academicYear: "2024/2025",
        registeredAt: new Date().toISOString().split("T")[0],
        admissionLetterConfirmed: true,
      });

      setStep("success");
      setLoading(false);
    }, 800);
  };

  const getClassName = (classId: string) => {
    return CLASSES.find((c) => c.id === classId)?.name ?? classId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-4">
            A
          </div>
          <h1 className="text-white font-bold text-2xl">APPEC TSS College</h1>
          <p className="text-blue-200 text-sm mt-1">Student Self-Registration</p>
        </div>

        {/* Step 1: Enter Code */}
        {step === "code" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-gray-800 font-bold text-xl mb-2">Enter Examination Code</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your examination code. Your admission letter must be confirmed before you can register.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Examination Code</label>
                <input
                  type="text"
                  value={examCode}
                  onChange={(e) => setExamCode(e.target.value)}
                  placeholder="e.g. APPEC-2024-003"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {error}
                  {error.includes("admission letter") && (
                    <Link href="/admission" className="block mt-2 text-blue-600 underline font-medium">
                      Go to Admission Letter Portal →
                    </Link>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                Haven&apos;t confirmed your admission letter?{" "}
                <Link href="/admission" className="text-blue-600 hover:underline font-medium">
                  Get Admission Letter
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {step === "form" && examData && (
          <div className="space-y-4">
            {/* Admission Info Banner */}
            <div className="bg-green-500 text-white rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-sm">Admission Confirmed</p>
                <p className="text-green-100 text-xs">
                  Code: {examData.code} | Program: {examData.program} | {examData.level} | {getClassName(examData.classId)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-gray-800 font-bold text-xl mb-6">Complete Registration</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Information */}
                <div>
                  <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+234-800-000-0000"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="student@email.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Address *</label>
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      rows={2}
                      required
                      placeholder="Enter your full home address"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Guardian Information */}
                <div>
                  <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                    Guardian / Parent Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name *</label>
                      <input
                        type="text"
                        value={form.guardianName}
                        onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone *</label>
                      <input
                        type="tel"
                        value={form.guardianPhone}
                        onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
                        placeholder="+234-800-000-0000"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Info (read-only) */}
                <div>
                  <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                    Academic Information (from Admission)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Program", value: examData.program },
                      { label: "Department", value: examData.department },
                      { label: "Level", value: examData.level },
                      { label: "Class", value: getClassName(examData.classId) },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-lg px-3 py-2.5">
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("code")}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    {loading ? "Registering..." : "Complete Registration"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-gray-800 font-bold text-2xl mb-2">Registration Successful!</h2>
            <p className="text-gray-500 mb-6">
              You have been successfully registered at APPEC TSS College.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-left">
              <p className="text-blue-800 font-bold text-center text-lg mb-1">Your Registration Number</p>
              <p className="text-blue-900 font-mono font-bold text-2xl text-center">{regNumber}</p>
              <p className="text-blue-600 text-xs text-center mt-1">
                Please save this number — you will need it to view your results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/results?reg=${regNumber}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-center"
              >
                View My Results
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
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

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
