import Link from "next/link";

// ============================================================
// APPEC TSS College - Landing Page
// ============================================================
// Public-facing home page. Provides quick access to:
//   - Student portal (admission, registration, results)
//   - Staff login portal
//   - System role overview
//   - Student enrollment process guide
// ============================================================

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col">

      {/* ---- Header ---- */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-lg shadow-md">
              A
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">APPEC TSS College</h1>
              <p className="text-blue-200 text-xs">Academic Web Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-blue-200 text-sm hidden sm:block">
              Academic Year: 2024/2025
            </div>
            <Link
              href="/login"
              className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </header>

      {/* ---- Hero Section ---- */}
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
          designed to digitize and streamline all institutional processes.
        </p>

        {/* ---- Quick Access Cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {/* Student Portal */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Student Portal</h3>
            <p className="text-blue-200 text-sm mb-4">
              New students: verify your exam code, download your admission letter, and complete registration.
              Existing students: view your published results.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/admission"
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
              >
                📄 Admission Letter
              </Link>
              <Link
                href="/register"
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
              >
                📝 Student Registration
              </Link>
              <Link
                href="/results"
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
              >
                📊 View Results
              </Link>
            </div>
          </div>

          {/* Staff Login */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Staff Portal</h3>
            <p className="text-blue-200 text-sm mb-4">
              Administrative staff, teachers, and management: access your dedicated dashboard
              to manage academic and administrative operations.
            </p>
            <Link
              href="/login"
              className="block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors"
            >
              🔐 Staff Login
            </Link>
            <p className="text-blue-300 text-xs mt-3 text-center">
              Access restricted to authorized staff only
            </p>
          </div>

          {/* System Roles */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-3">System Roles</h3>
            <ul className="text-blue-200 text-sm space-y-1.5">
              {[
                { color: "bg-rose-400",    label: "Principal / Rector" },
                { color: "bg-yellow-400",  label: "Secretary" },
                { color: "bg-blue-400",    label: "Director of Studies (DOS)" },
                { color: "bg-red-400",     label: "Director of Discipline (DOD)" },
                { color: "bg-purple-400",  label: "HOD / Academic Supervisor" },
                { color: "bg-green-400",   label: "Teachers" },
                { color: "bg-emerald-400", label: "Bursar / Finance Officer" },
                { color: "bg-teal-400",    label: "Librarian" },
                { color: "bg-slate-400",   label: "IT Administrator" },
                { color: "bg-orange-400",  label: "Students" },
              ].map((role) => (
                <li key={role.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${role.color} rounded-full flex-shrink-0`} />
                  {role.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Student Enrollment Process ---- */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8">
          <h3 className="text-white font-bold text-xl mb-6">Student Enrollment Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Verify Exam Code",
                desc: "Enter your examination code issued after passing the APPEC TSS College entry examination",
                color: "bg-yellow-400",
                icon: "🔑",
              },
              {
                step: "2",
                title: "Download Admission Letter",
                desc: "Generate and download your official admission letter with all enrollment details",
                color: "bg-blue-400",
                icon: "📄",
              },
              {
                step: "3",
                title: "Confirm Admission",
                desc: "Confirm your admission letter to formally authorize your registration",
                color: "bg-green-400",
                icon: "✅",
              },
              {
                step: "4",
                title: "Complete Registration",
                desc: "Fill in your personal details and complete the student registration process",
                color: "bg-purple-400",
                icon: "📝",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-md`}>
                  {item.step}
                </div>
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-blue-200 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- System Features ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: "🔒",
              title: "Secure & Role-Based",
              desc: "Each user role has dedicated access controls. Staff credentials are never exposed in the UI.",
            },
            {
              icon: "📊",
              title: "Academic Management",
              desc: "Complete marks entry workflow with DOS authorization, grade calculation, and result publication.",
            },
            {
              icon: "⚖️",
              title: "Discipline Tracking",
              desc: "DOD manages attendance, conduct, punctuality, participation, and neatness records.",
            },
            {
              icon: "💰",
              title: "Financial Management",
              desc: "Bursar tracks fee payments, outstanding balances, and generates financial reports.",
            },
            {
              icon: "📚",
              title: "Library System",
              desc: "Librarian manages book catalog, student borrowings, returns, and overdue tracking.",
            },
            {
              icon: "🔧",
              title: "IT Administration",
              desc: "IT Admin manages user accounts, system settings, and monitors audit logs.",
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-left hover:bg-white/20 transition-all">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-blue-200 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPREHENSIVE WORLD-CLASS FOOTER */}
      {/* ============================================================ */}
      <footer className="bg-gray-900 text-white mt-auto">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: About */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-lg">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-lg">APPEC TSS College</h3>
                  <p className="text-gray-400 text-xs">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                A leading academic institution committed to providing quality education and holistic development for all students.
              </p>
              {/* Social Media Links */}
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.67c0-.21,0-.42,0-.63A12.8,12.8,0,0,0,24,4.69Z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors" aria-label="YouTube">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,15.58V8.42a2.83,2.83,0,0,1,4.69-1.89l6.93,3.24a2.06,2.06,0,0,1,0,3.46l-6.94,3.26A2.83,2.83,0,0,1,10,15.58Z"/>
                    <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm7.89,14.38-6.93,3.26a2.83,2.83,0,0,1-4.69-1.89V8.42a2.83,2.83,0,0,1,4.69-1.89l6.93,3.24A2.06,2.06,0,0,1,19.89,14.38Z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5,2h-17A1.5,1.5,0,0,0,2,3.5v17A1.5,1.5,0,0,0,3.5,22h17a1.5,1.5,0,0,0,1.5-1.5v-17A1.5,1.5,0,0,0,20.5,2ZM8,19H5V9h3Zm6,0H11V13c0-2,1-3,3-3s2.71,1,2.71,3v6H16v-6c0-2.21-1.67-3.52-3.24-3.52-1.07,0-2,.53-2,1.5v5H11V9h3v1.24C15.57,9.56,17.36,9,18.57,9c1.51,0,2.43.89,2.43,2.47V19Z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472,14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94,1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421,7.403h-.004a9.87,9.87,0,0,1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86,9.86,0,0,1-1.51-5.26c.001-5.45,4.436-9.884,9.888-9.884,2.64,0,5.122,1.03,6.988,2.898a9.825,9.825,0,0,1,2.893,6.994c-.003,5.45-4.437,9.884-9.885,9.884m8.413-18.297A11.815,11.815,0,0,0,12.05,0C5.495,0,.16,5.335.157,11.892c0,2.096.547,4.142 1.588,5.945L.057,24l6.305-1.654a11.882,11.882,0,0,0,5.683,1.448h.005c6.554,0,11.89-5.335,11.893-11.893a11.821,11.821,0,0,0-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/admission" className="text-gray-400 hover:text-white transition-colors text-sm">Admission Letter</Link></li>
                <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors text-sm">Student Registration</Link></li>
                <li><Link href="/results" className="text-gray-400 hover:text-white transition-colors text-sm">View Results</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">Staff Login</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Academic Calendar</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Fee Structure</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Student Handbook</a></li>
              </ul>
            </div>

            {/* Column 3: Academics */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-yellow-400">Academics</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Science Department</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Arts Department</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Commerce Department</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Examination Rules</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Library Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Sports & Activities</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Clubs & Societies</a></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-yellow-400">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm">APPEC TSS College<br />P.O. Box 1234, Academic City, Nigeria</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400 text-sm">+234-800-APPEC-TSS</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400 text-sm">info@appec.edu</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</span>
                </li>
              </ul>
              
              {/* Newsletter Subscription */}
              <div className="mt-6">
                <h5 className="font-semibold text-sm mb-2">Newsletter Subscription</h5>
                <form className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                  />
                  <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-gray-400 text-sm">
                © 2024 APPEC TSS College. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</a>
              </div>
              <p className="text-gray-500 text-xs">
                Designed with ❤️ for Education
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
