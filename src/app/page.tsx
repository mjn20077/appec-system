import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-lg">
              A
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">APPEC TSS College</h1>
              <p className="text-blue-200 text-xs">Academic Web Management System</p>
            </div>
          </div>
          <div className="text-blue-200 text-sm hidden sm:block">
            Academic Year: 2024/2025
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-6">
          <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Official Portal
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Welcome to APPEC TSS College
          <br />
          <span className="text-yellow-400">Web System</span>
        </h2>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-12">
          A comprehensive, role-based academic and administrative management platform
          designed to digitize and streamline institutional processes.
        </p>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Student Portal */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Student Portal</h3>
            <p className="text-blue-200 text-sm mb-4">
              New students: verify your exam code, download admission letter, and complete registration.
              Existing students: view your results.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/admission"
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
              >
                Admission Letter
              </Link>
              <Link
                href="/register"
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
              >
                Student Registration
              </Link>
              <Link
                href="/results"
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
              >
                View Results
              </Link>
            </div>
          </div>

          {/* Staff Login */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Staff Portal</h3>
            <p className="text-blue-200 text-sm mb-4">
              Administrative staff and teachers: access your dedicated dashboard to manage academic operations.
            </p>
            <Link
              href="/login"
              className="block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
            >
              Staff Login
            </Link>
          </div>

          {/* System Info */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">System Roles</h3>
            <ul className="text-blue-200 text-sm space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Secretary – Administrative setup
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Director of Studies (DOS)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                Director of Discipline (DOD)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Teachers – Marks entry
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                HOD / Academic Supervisor
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Students – Self-registration & results
              </li>
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h3 className="text-white font-bold text-xl mb-6">Student Enrollment Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Verify Exam Code", desc: "Enter your examination code issued after passing entry exams", color: "bg-yellow-400" },
              { step: "2", title: "Download Admission Letter", desc: "Generate and download your official admission letter", color: "bg-blue-400" },
              { step: "3", title: "Confirm Admission", desc: "Confirm your admission letter to authorize registration", color: "bg-green-400" },
              { step: "4", title: "Complete Registration", desc: "Fill in your details and complete the registration process", color: "bg-purple-400" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                  {item.step}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-blue-200 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-blue-300 text-sm">
            © 2024 APPEC TSS College. All rights reserved. | Academic Web Management System
          </p>
        </div>
      </footer>
    </main>
  );
}
