import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col">

      {/* ---- Header ---- */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/10 backdrop-blur-md border-b border-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-all duration-300 ${
              scrolled 
                ? 'bg-yellow-400 text-blue-900' 
                : 'bg-yellow-400 text-blue-900 animate-pulse'
            }`}>
              A
            </div>
            <div>
              <h1 className={`font-bold leading-tight transition-colors duration-300 ${
                scrolled ? 'text-blue-900' : 'text-white'
              }`}>APPEC TSS College</h1>
              <p className={`text-xs transition-colors duration-300 ${
                scrolled ? 'text-blue-600' : 'text-blue-200'
              }`}>Academic Web Management System</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
              scrolled ? 'text-blue-700' : 'text-blue-200'
            }`}>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Academic Year: 2024/2025</span>
            </div>
            <nav className="flex items-center gap-1">
              <Link 
                href="/admission" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? 'text-blue-700 hover:bg-blue-50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Admission
              </Link>
              <Link 
                href="/results" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? 'text-blue-700 hover:bg-blue-50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Results
              </Link>
              <Link 
                href="/login" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                Staff Login
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
          >
            <svg className={`w-6 h-6 transition-colors duration-300 ${scrolled ? 'text-blue-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-3 space-y-2">
            <Link 
              href="/admission" 
              className="block px-4 py-2 text-blue-700 hover:bg-blue-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              📄 Admission
            </Link>
            <Link 
              href="/results" 
              className="block px-4 py-2 text-blue-700 hover:bg-blue-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              📊 Results
            </Link>
            <Link 
              href="/login" 
              className="block px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔐 Staff Login
            </Link>
          </div>
        </div>
      </header>

      {/* ---- Hero Section ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-6">
          <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-bounce">
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
          <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20">
            <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">Student Portal</h3>
            <p className="text-blue-200 text-sm mb-4">
              New students: verify your exam code, download your admission letter, and complete registration.
              Existing students: view your published results.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/admission"
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all hover:shadow-lg"
              >
                📄 Admission Letter
              </Link>
              <Link
                href="/register"
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all hover:shadow-lg"
              >
                📝 Student Registration
              </Link>
              <Link
                href="/results"
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all hover:shadow-lg"
              >
                📊 View Results
              </Link>
            </div>
          </div>

          {/* Staff Login */}
          <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20">
            <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">Staff Portal</h3>
            <p className="text-blue-200 text-sm mb-4">
              Administrative staff, teachers, and management: access your dedicated dashboard
              to manage academic and administrative operations.
            </p>
            <Link
              href="/login"
              className="block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all hover:shadow-lg"
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
                <li key={role.label} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <span className={`w-2 h-2 ${role.color} rounded-full flex-shrink-0 animate-pulse`} />
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
            ].map((item, idx) => (
              <div key={item.step} className="text-center group">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
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
            <div key={feature.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-left hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-blue-200 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* MODERN ADVANCED INTERACTIVE FOOTER */}
      {/* ============================================================ */}
      <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-blue-900 text-white mt-auto overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Column 1: About & Social */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-xl">APPEC TSS</h3>
                  <p className="text-gray-400 text-xs">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                A leading academic institution committed to providing quality education and holistic development for all students since 1995.
              </p>
              
              {/* Social Media Links with hover effects */}
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', color: 'hover:bg-blue-600', icon: 'M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z' },
                  { name: 'Twitter', color: 'hover:bg-blue-400', icon: 'M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.67c0-.21,0-.42,0-.63A12.8,12.8,0,0,0,24,4.69Z' },
                  { name: 'YouTube', color: 'hover:bg-red-600', icon: 'M10,15.58V8.42a2.83,2.83,0,0,1,4.69-1.89l6.93,3.24a2.06,2.06,0,0,1,0,3.46l-6.94,3.26A2.83,2.83,0,0,1,10,15.58Z' },
                  { name: 'Instagram', color: 'hover:bg-pink-600', icon: 'M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.86,3.9,2.32,7.15,2.16,8.42,2.11,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z' },
                  { name: 'LinkedIn', color: 'hover:bg-blue-700', icon: 'M20.5,2h-17A1.5,1.5,0,0,0,2,3.5v17A1.5,1.5,0,0,0,3.5,22h17a1.5,1.5,0,0,0,1.5-1.5v-17A1.5,1.5,0,0,0,20.5,2ZM8,19H5V9h3Zm6,0H11V13c0-2,1-3,3-3s2.71,1,2.71,3v6H16v-6c0-2.21-1.67-3.52-3.24-3.52-1.07,0-2,.53-2,1.5v5H11V9h3v1.24C15.57,9.56,17.36,9,18.57,9c1.51,0,2.43.89,2.43,2.47V19Z' },
                ].map((social) => (
                  <a 
                    key={social.name}
                    href="#" 
                    className={`w-10 h-10 bg-gray-800 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg`}
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 relative inline-block">
                <span className="relative z-10">Quick Links</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400/50 rounded"></span>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Admission Letter", href: "/admission", icon: "📄" },
                  { name: "Student Registration", href: "/register", icon: "📝" },
                  { name: "View Results", href: "/results", icon: "📊" },
                  { name: "Staff Login", href: "/login", icon: "🔐" },
                  { name: "Academic Calendar", href: "#", icon: "📅" },
                  { name: "Fee Structure", href: "#", icon: "💰" },
                  { name: "Student Handbook", href: "#", icon: "📚" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group">
                      <span className="group-hover:translate-x-1 transition-transform">{link.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Academics */}
            <div>
              <h4 className="font-bold text-lg mb-6 relative inline-block">
                <span className="relative z-10">Academics</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400/50 rounded"></span>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Science Department", icon: "🔬" },
                  { name: "Arts Department", icon: "🎨" },
                  { name: "Commerce Department", icon: "📈" },
                  { name: "Examination Rules", icon: "📋" },
                  { name: "Library Services", icon: "📚" },
                  { name: "Sports & Activities", icon: "⚽" },
                  { name: "Clubs & Societies", icon: "🎯" },
                ].map((link) => (
                  <li key={link.name}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group">
                      <span className="group-hover:translate-x-1 transition-transform">{link.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6 relative inline-block">
                <span className="relative z-10">Contact Us</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400/50 rounded"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">APPEC TSS College</p>
                    <p className="text-white text-sm">P.O. Box 1234, Academic City, Nigeria</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p className="text-white text-sm">+234-800-APPEC-TSS</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-white text-sm">info@appec.edu</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Hours</p>
                    <p className="text-white text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 5: Newsletter & Stats */}
            <div>
              <h4 className="font-bold text-lg mb-6 relative inline-block">
                <span className="relative z-10">Stay Updated</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-400/50 rounded"></span>
              </h4>
              
              {/* Newsletter Form */}
              {subscribed ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
                  <svg className="w-12 h-12 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-400 font-semibold">Thank you!</p>
                  <p className="text-gray-400 text-xs">You're now subscribed.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Subscribe
                  </button>
                </form>
              )}
              
              <p className="text-gray-500 text-xs mt-3">
                Get the latest updates on admissions, events, and academic news.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-gray-800/30 rounded-lg p-3 text-center hover:bg-gray-800/50 transition-colors">
                  <p className="text-2xl font-bold text-yellow-400">25+</p>
                  <p className="text-gray-500 text-xs">Years Excellence</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3 text-center hover:bg-gray-800/50 transition-colors">
                  <p className="text-2xl font-bold text-blue-400">5000+</p>
                  <p className="text-gray-500 text-xs">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-800 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} APPEC TSS College. All rights reserved.</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy Policy
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms of Service
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Cookie Policy
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Sitemap
                </a>
              </div>
              
              <p className="text-gray-500 text-xs flex items-center gap-1">
                Made with 
                <span className="text-red-500">❤️</span> 
                for Education
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
