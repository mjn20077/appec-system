"use client";

// ============================================================
// Admission Letter Portal
// ============================================================
// Students use their examination code (issued after passing the
// entry exam) to access, view, and confirm their admission letter.
// Confirmation is required before proceeding to registration.
// ============================================================

import { useState } from "react";
import Link from "next/link";
import { EXAM_CODES, CLASSES } from "@/lib/data";
import type { ExamCode } from "@/lib/types";

// The three steps of the admission process
type Step = "verify" | "letter" | "confirmed";

// Step labels for the progress indicator
const STEP_LABELS: Record<Step, string> = {
  verify: "Verify Code",
  letter: "Review Letter",
  confirmed: "Confirmed",
};

const STEPS: Step[] = ["verify", "letter", "confirmed"];

export default function AdmissionPage() {
  const [step, setStep] = useState<Step>("verify");
  const [examCodeInput, setExamCodeInput] = useState("");
  const [examData, setExamData] = useState<ExamCode | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---- Step 1: Verify the examination code ----
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief network delay for realism
    setTimeout(() => {
      const found = EXAM_CODES.find(
        (ec) => ec.code === examCodeInput.trim().toUpperCase()
      );

      if (!found) {
        setError("Invalid examination code. Please check your code and try again.");
        setLoading(false);
        return;
      }

      if (found.isUsed) {
        setError(
          "This examination code has already been used for registration. " +
          "If you believe this is an error, please contact the Secretary's office."
        );
        setLoading(false);
        return;
      }

      // Valid code found — proceed to show the admission letter
      setExamData(found);
      setStep("letter");
      setLoading(false);
    }, 700);
  };

  // ---- Step 2: Confirm the admission letter ----
  const handleConfirm = () => {
    if (!examData) return;

    // Update the in-memory record to mark the letter as confirmed
    const idx = EXAM_CODES.findIndex((ec) => ec.code === examData.code);
    if (idx !== -1) {
      EXAM_CODES[idx].admissionLetterConfirmed = true;
    }

    setExamData({ ...examData, admissionLetterConfirmed: true });
    setStep("confirmed");
  };

  // ---- Helper: get class name from class ID ----
  const getClassName = (classId: string): string => {
    return CLASSES.find((c) => c.id === classId)?.name ?? classId;
  };

  // ---- Helper: get current step index for progress bar ----
  const currentStepIndex = STEPS.indexOf(step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">

        {/* ---- Page Header ---- */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-4 shadow-lg">
            A
          </div>
          <h1 className="text-white font-bold text-2xl">APPEC TSS College</h1>
          <p className="text-blue-200 text-sm mt-1">Admission Letter Portal</p>
        </div>

        {/* ---- Step Progress Indicator ---- */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step === s
                      ? "bg-yellow-400 text-blue-900 shadow-lg scale-110"
                      : i < currentStepIndex
                      ? "bg-green-400 text-white"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {i < currentStepIndex ? "✓" : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${step === s ? "text-yellow-300 font-semibold" : "text-white/50"}`}>
                  {STEP_LABELS[s]}
                </span>
              </div>
              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div
                  className={`w-16 h-0.5 mb-4 transition-colors duration-300 ${
                    i < currentStepIndex ? "bg-green-400" : "bg-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* STEP 1: Verify Examination Code                               */}
        {/* ============================================================ */}
        {step === "verify" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-gray-800 font-bold text-xl">Verify Examination Code</h2>
                <p className="text-gray-500 text-sm">Enter the code issued to you after passing the entry examination</p>
              </div>
            </div>

            {/* Information notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-800 text-sm font-medium mb-1">📋 How this works:</p>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                <li>Enter your examination code (format: APPEC-YYYY-NNN)</li>
                <li>Review your official admission letter</li>
                <li>Confirm the letter to unlock student registration</li>
              </ol>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Examination Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={examCodeInput}
                  onChange={(e) => setExamCodeInput(e.target.value)}
                  placeholder="e.g. APPEC-2024-002"
                  required
                  autoFocus
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase tracking-wider"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Your examination code was provided in your result notification letter.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !examCodeInput.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verify Examination Code
                  </>
                )}
              </button>
            </form>

            {/* Help section */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-xs text-center">
                Having trouble? Contact the Secretary&apos;s office at{" "}
                <span className="font-medium text-gray-700">secretary@appec.edu</span>{" "}
                or call <span className="font-medium text-gray-700">+234-801-111-2222</span>
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: View Admission Letter                                 */}
        {/* ============================================================ */}
        {step === "letter" && examData && (
          <div className="space-y-4">

            {/* Already confirmed notice */}
            {examData.admissionLetterConfirmed && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800 text-sm font-medium">
                  This admission letter was previously confirmed. You may proceed directly to registration.
                </p>
              </div>
            )}

            {/* Admission Letter Document */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* Letter Header */}
              <div className="bg-blue-900 text-white p-6 text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-3 shadow-lg">
                  A
                </div>
                <h2 className="font-bold text-xl tracking-wide">APPEC TSS COLLEGE</h2>
                <p className="text-blue-200 text-sm">P.O. Box 1234, Academic City, Nigeria</p>
                <p className="text-blue-200 text-sm">Tel: +234-800-APPEC-TSS | Email: info@appec.edu</p>
                <div className="mt-4 border-t border-blue-700 pt-4">
                  <h3 className="font-bold text-lg text-yellow-400 tracking-widest uppercase">
                    Admission Letter
                  </h3>
                  <p className="text-blue-200 text-sm">Academic Year 2024/2025</p>
                </div>
              </div>

              {/* Letter Body */}
              <div className="p-8">
                {/* Reference and date */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Ref: APPEC/ADM/2024/{examData.code.split("-")[2]}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Date:{" "}
                      {new Date().toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                    ✓ ADMITTED
                  </span>
                </div>

                {/* Salutation */}
                <p className="text-gray-700 mb-4">
                  Dear <strong>{examData.candidateName}</strong>,
                </p>

                {/* Opening paragraph */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We are pleased to inform you that following your successful performance in the{" "}
                  <strong>APPEC TSS College Entry Examination</strong>, you have been{" "}
                  <strong>admitted</strong> to APPEC TSS College for the Academic Year{" "}
                  <strong>2024/2025</strong>.
                </p>

                {/* Admission Details Table */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Admission Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Candidate Name",  value: examData.candidateName },
                      { label: "Examination Code", value: examData.code },
                      { label: "Program",          value: examData.program },
                      { label: "Department",       value: examData.department },
                      { label: "Level",            value: examData.level },
                      { label: "Class",            value: getClassName(examData.classId) },
                      { label: "Academic Year",    value: "2024/2025" },
                      { label: "Report Date",      value: "September 5, 2024" },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                          {item.label}
                        </span>
                        <span className="text-gray-800 font-medium text-sm mt-0.5">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <p className="text-gray-700 mb-3 leading-relaxed">
                  You are required to report to the college on or before the date indicated above
                  with the following documents:
                </p>
                <ul className="text-gray-700 text-sm space-y-1.5 mb-6">
                  {[
                    "This admission letter (printed or digital copy)",
                    "Original examination result slip",
                    "Birth certificate or sworn age declaration",
                    "4 recent passport photographs (white background)",
                    "Registration fee payment receipt",
                    "Medical fitness certificate",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Confirmation instruction */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 text-sm font-medium">
                    ⚠️ Important: You must confirm this admission letter before you can complete
                    your registration. Click the &quot;Confirm Admission Letter&quot; button below.
                  </p>
                </div>

                {/* Signature */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-700 font-semibold">Dr. Emmanuel Okafor</p>
                  <p className="text-gray-500 text-sm">Director of Studies</p>
                  <p className="text-gray-500 text-sm">APPEC TSS College</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-600 text-sm mb-4 text-center">
                Please review the details above carefully before confirming.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Admission Letter
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print / Download
                </button>
                <button
                  onClick={() => {
                    setStep("verify");
                    setExamData(null);
                    setExamCodeInput("");
                    setError("");
                  }}
                  className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: Admission Confirmed                                   */}
        {/* ============================================================ */}
        {step === "confirmed" && examData && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            {/* Success icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-gray-800 font-bold text-2xl mb-2">Admission Confirmed!</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Your admission letter has been successfully confirmed. You are now authorized
              to complete your student registration.
            </p>

            {/* Confirmed details summary */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-left">
              <p className="text-green-800 font-semibold text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Confirmed Admission Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-green-600 font-medium">Name: </span>
                  <span className="text-green-800">{examData.candidateName}</span>
                </div>
                <div>
                  <span className="text-green-600 font-medium">Exam Code: </span>
                  <span className="text-green-800 font-mono">{examData.code}</span>
                </div>
                <div>
                  <span className="text-green-600 font-medium">Program: </span>
                  <span className="text-green-800">{examData.program}</span>
                </div>
                <div>
                  <span className="text-green-600 font-medium">Level: </span>
                  <span className="text-green-800">{examData.level}</span>
                </div>
              </div>
            </div>

            {/* Next step instruction */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-blue-800 text-sm font-medium mb-1">📌 Next Step:</p>
              <p className="text-blue-700 text-sm">
                Click &quot;Proceed to Registration&quot; to complete your student registration.
                You will need your examination code during registration.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/register?code=${examData.code}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
              >
                Proceed to Registration
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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

        {/* Back to home link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-blue-200 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
