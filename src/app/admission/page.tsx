"use client";

import { useState } from "react";
import Link from "next/link";
import { EXAM_CODES, CLASSES } from "@/lib/data";
import type { ExamCode } from "@/lib/types";

type Step = "verify" | "letter" | "confirmed";

export default function AdmissionPage() {
  const [step, setStep] = useState<Step>("verify");
  const [examCode, setExamCode] = useState("");
  const [examData, setExamData] = useState<ExamCode | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const found = EXAM_CODES.find((ec) => ec.code === examCode.trim().toUpperCase());
      if (!found) {
        setError("Invalid examination code. Please check and try again.");
        setLoading(false);
        return;
      }
      if (found.isUsed) {
        setError("This examination code has already been used for registration.");
        setLoading(false);
        return;
      }
      setExamData(found);
      setStep("letter");
      setLoading(false);
    }, 600);
  };

  const handleConfirm = () => {
    if (examData) {
      // Mark as confirmed in our mock data
      const idx = EXAM_CODES.findIndex((ec) => ec.code === examData.code);
      if (idx !== -1) {
        EXAM_CODES[idx].admissionLetterConfirmed = true;
      }
      setExamData({ ...examData, admissionLetterConfirmed: true });
      setStep("confirmed");
    }
  };

  const getClassName = (classId: string) => {
    return CLASSES.find((c) => c.id === classId)?.name ?? classId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-4">
            A
          </div>
          <h1 className="text-white font-bold text-2xl">APPEC TSS College</h1>
          <p className="text-blue-200 text-sm mt-1">Admission Letter Portal</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["verify", "letter", "confirmed"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step === s
                    ? "bg-yellow-400 text-blue-900"
                    : i < ["verify", "letter", "confirmed"].indexOf(step)
                    ? "bg-green-400 text-white"
                    : "bg-white/20 text-white/50"
                }`}
              >
                {i < ["verify", "letter", "confirmed"].indexOf(step) ? "✓" : i + 1}
              </div>
              {i < 2 && <div className={`w-12 h-0.5 ${i < ["verify", "letter", "confirmed"].indexOf(step) ? "bg-green-400" : "bg-white/20"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Verify Exam Code */}
        {step === "verify" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-gray-800 font-bold text-xl mb-2">Verify Examination Code</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter the examination code issued to you after passing the APPEC TSS College entry examination.
            </p>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Examination Code
                </label>
                <input
                  type="text"
                  value={examCode}
                  onChange={(e) => setExamCode(e.target.value)}
                  placeholder="e.g. APPEC-2024-002"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            {/* Demo codes */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Available Demo Codes (not yet used)
              </p>
              <div className="space-y-2">
                {EXAM_CODES.filter((ec) => !ec.isUsed).map((ec) => (
                  <button
                    key={ec.code}
                    onClick={() => setExamCode(ec.code)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs font-mono font-medium text-gray-700">{ec.code}</p>
                      <p className="text-xs text-gray-500">{ec.candidateName}</p>
                    </div>
                    <span className="text-xs text-gray-400">{ec.program}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Admission Letter */}
        {step === "letter" && examData && (
          <div className="space-y-4">
            {/* Letter Document */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Letter Header */}
              <div className="bg-blue-900 text-white p-6 text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-3">
                  A
                </div>
                <h2 className="font-bold text-xl">APPEC TSS COLLEGE</h2>
                <p className="text-blue-200 text-sm">P.O. Box 1234, Academic City</p>
                <p className="text-blue-200 text-sm">Tel: +234-800-APPEC-TSS | Email: info@appec.edu</p>
                <div className="mt-4 border-t border-blue-700 pt-4">
                  <h3 className="font-bold text-lg text-yellow-400">ADMISSION LETTER</h3>
                  <p className="text-blue-200 text-sm">Academic Year 2024/2025</p>
                </div>
              </div>

              {/* Letter Body */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Ref: APPEC/ADM/2024/{examData.code.split("-")[2]}</p>
                    <p className="text-gray-500 text-sm">Date: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      ADMITTED
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">Dear <strong>{examData.candidateName}</strong>,</p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  We are pleased to inform you that following your successful performance in the APPEC TSS College
                  Entry Examination, you have been <strong>admitted</strong> to APPEC TSS College for the
                  Academic Year <strong>2024/2025</strong>.
                </p>

                {/* Admission Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                  <h4 className="font-bold text-blue-900 mb-4">Admission Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Candidate Name", value: examData.candidateName },
                      { label: "Examination Code", value: examData.code },
                      { label: "Program", value: examData.program },
                      { label: "Department", value: examData.department },
                      { label: "Level", value: examData.level },
                      { label: "Class", value: getClassName(examData.classId) },
                      { label: "Academic Year", value: "2024/2025" },
                      { label: "Report Date", value: "September 5, 2024" },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">{item.label}</span>
                        <span className="text-gray-800 font-semibold text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  You are required to report to the college on or before the date indicated above with the following:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-6">
                  <li>This admission letter (printed or digital)</li>
                  <li>Original examination result slip</li>
                  <li>Birth certificate or age declaration</li>
                  <li>4 recent passport photographs</li>
                  <li>Registration fee payment receipt</li>
                </ul>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Please confirm this admission letter by clicking the button below to proceed with your registration.
                  <strong> Confirmation is mandatory before registration can be completed.</strong>
                </p>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-700 font-semibold">Dr. Emmanuel Okafor</p>
                  <p className="text-gray-500 text-sm">Director of Studies</p>
                  <p className="text-gray-500 text-sm">APPEC TSS College</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                ✓ Confirm Admission Letter
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                🖨 Print / Download
              </button>
              <button
                onClick={() => { setStep("verify"); setExamData(null); setExamCode(""); }}
                className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmed */}
        {step === "confirmed" && examData && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-gray-800 font-bold text-2xl mb-2">Admission Confirmed!</h2>
            <p className="text-gray-500 mb-6">
              Your admission letter has been confirmed. You may now proceed to complete your registration.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-green-800 font-semibold text-sm">Confirmed Details:</p>
              <p className="text-green-700 text-sm mt-1">Name: <strong>{examData.candidateName}</strong></p>
              <p className="text-green-700 text-sm">Exam Code: <strong>{examData.code}</strong></p>
              <p className="text-green-700 text-sm">Program: <strong>{examData.program}</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/register?code=${examData.code}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Proceed to Registration →
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
