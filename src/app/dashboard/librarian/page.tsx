"use client";

// ============================================================
// Librarian Dashboard
// ============================================================
// The Librarian manages the college library including:
//   - Library book catalog management
//   - Student book borrowing and returns
//   - Overdue tracking and notifications
//   - Library statistics and reports
// ============================================================

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  STUDENTS,
  LIBRARY_BOOKS,
  LIBRARY_BORROWINGS,
} from "@/lib/data";
import type { LibraryBorrowing } from "@/lib/types";

// ---- Navigation items for the Librarian sidebar ----
const NAV_ITEMS = [
  {
    label: "Library Overview",
    href: "/dashboard/librarian",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Book Catalog",
    href: "/dashboard/librarian#catalog",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Borrowings",
    href: "/dashboard/librarian#borrowings",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: "Issue Book",
    href: "/dashboard/librarian#issue",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

const ROLE_COLOR = "bg-teal-700";

export default function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "catalog" | "borrowings" | "issue">("overview");
  const [bookSearch, setBookSearch] = useState("");
  const [borrowingSearch, setBorrowingSearch] = useState("");
  const [borrowingFilter, setBorrowingFilter] = useState<"All" | "Borrowed" | "Returned" | "Overdue">("All");

  // ---- Issue book form state ----
  const [issueForm, setIssueForm] = useState({
    registrationNumber: "",
    bookId: "",
    dueDate: "",
  });
  const [issueSuccess, setIssueSuccess] = useState("");
  const [issueError, setIssueError] = useState("");

  // ---- Return book state ----
  const [returnBorrowingId, setReturnBorrowingId] = useState("");
  const [returnSuccess, setReturnSuccess] = useState("");

  // ---- Computed statistics ----
  const totalBooks = LIBRARY_BOOKS.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableBooks = LIBRARY_BOOKS.reduce((sum, b) => sum + b.availableCopies, 0);
  const activeBorrowings = LIBRARY_BORROWINGS.filter((b) => b.status === "Borrowed").length;
  const overdueBorrowings = LIBRARY_BORROWINGS.filter((b) => b.status === "Overdue").length;

  // ---- Filtered books ----
  const filteredBooks = LIBRARY_BOOKS.filter(
    (b) =>
      b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.isbn.includes(bookSearch)
  );

  // ---- Filtered borrowings ----
  const filteredBorrowings = LIBRARY_BORROWINGS.filter((b) => {
    const student = STUDENTS.find((s) => s.id === b.studentId);
    const book = LIBRARY_BOOKS.find((bk) => bk.id === b.bookId);
    const matchesSearch =
      (student ? `${student.firstName} ${student.lastName}`.toLowerCase() : "").includes(borrowingSearch.toLowerCase()) ||
      b.registrationNumber.toLowerCase().includes(borrowingSearch.toLowerCase()) ||
      (book ? book.title.toLowerCase() : "").includes(borrowingSearch.toLowerCase());
    const matchesFilter = borrowingFilter === "All" || b.status === borrowingFilter;
    return matchesSearch && matchesFilter;
  });

  // ---- Handle issuing a book ----
  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueError("");
    setIssueSuccess("");

    const student = STUDENTS.find(
      (s) => s.registrationNumber === issueForm.registrationNumber.trim()
    );
    if (!student) {
      setIssueError("Student with this registration number not found.");
      return;
    }

    const book = LIBRARY_BOOKS.find((b) => b.id === issueForm.bookId);
    if (!book) {
      setIssueError("Please select a valid book.");
      return;
    }

    if (book.availableCopies <= 0) {
      setIssueError(`No copies of "${book.title}" are currently available.`);
      return;
    }

    // Update available copies
    book.availableCopies -= 1;

    // Add borrowing record
    const newBorrowing: LibraryBorrowing = {
      id: `bor${LIBRARY_BORROWINGS.length + 1}`,
      studentId: student.id,
      registrationNumber: student.registrationNumber,
      bookId: book.id,
      borrowedAt: new Date().toISOString().split("T")[0],
      dueDate: issueForm.dueDate,
      status: "Borrowed",
      recordedBy: "u9",
    };
    LIBRARY_BORROWINGS.push(newBorrowing);

    setIssueSuccess(
      `"${book.title}" successfully issued to ${student.firstName} ${student.lastName}. Due: ${issueForm.dueDate}`
    );
    setIssueForm({ registrationNumber: "", bookId: "", dueDate: "" });
  };

  // ---- Handle returning a book ----
  const handleReturnBook = (borrowingId: string) => {
    const borrowing = LIBRARY_BORROWINGS.find((b) => b.id === borrowingId);
    if (!borrowing) return;

    const book = LIBRARY_BOOKS.find((b) => b.id === borrowing.bookId);
    if (book) book.availableCopies += 1;

    borrowing.status = "Returned";
    borrowing.returnedAt = new Date().toISOString().split("T")[0];

    setReturnBorrowingId("");
    setReturnSuccess(`Book returned successfully on ${borrowing.returnedAt}.`);
    setTimeout(() => setReturnSuccess(""), 3000);
  };

  const getBorrowingStatusColor = (status: string) => {
    switch (status) {
      case "Borrowed": return "bg-blue-100 text-blue-700";
      case "Returned": return "bg-green-100 text-green-700";
      case "Overdue":  return "bg-red-100 text-red-700";
      default:         return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      title="Librarian Dashboard"
      roleLabel="Librarian"
      roleColor={ROLE_COLOR}
    >
      <div className="p-6 space-y-6">

        {/* ---- Page Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Library Management</h1>
            <p className="text-gray-500 text-sm mt-1">
              APPEC TSS College Library — Academic Year 2024/2025
            </p>
          </div>
          {overdueBorrowings > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              <span className="text-red-600 text-sm font-medium">
                ⚠️ {overdueBorrowings} overdue borrowing{overdueBorrowings !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* ---- Tab Navigation ---- */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {(["overview", "catalog", "borrowings", "issue"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "overview" ? "Overview" :
               tab === "catalog" ? "Book Catalog" :
               tab === "borrowings" ? "Borrowings" :
               "Issue Book"}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* TAB: Overview                                                 */}
        {/* ============================================================ */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
                <p className="text-teal-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Books</p>
                <p className="text-teal-700 text-2xl font-bold">{totalBooks}</p>
                <p className="text-teal-500 text-xs mt-1">{LIBRARY_BOOKS.length} titles</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">Available</p>
                <p className="text-green-700 text-2xl font-bold">{availableBooks}</p>
                <p className="text-green-500 text-xs mt-1">copies on shelf</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Active Loans</p>
                <p className="text-blue-700 text-2xl font-bold">{activeBorrowings}</p>
                <p className="text-blue-500 text-xs mt-1">currently borrowed</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">Overdue</p>
                <p className="text-red-700 text-2xl font-bold">{overdueBorrowings}</p>
                <p className="text-red-500 text-xs mt-1">past due date</p>
              </div>
            </div>

            {/* Recent borrowings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Recent Borrowing Activity</h3>
              <div className="space-y-3">
                {LIBRARY_BORROWINGS.slice(-5).reverse().map((b) => {
                  const student = STUDENTS.find((s) => s.id === b.studentId);
                  const book = LIBRARY_BOOKS.find((bk) => bk.id === b.bookId);
                  return (
                    <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 text-sm font-bold flex-shrink-0">
                        📖
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {book?.title ?? "Unknown Book"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student ? `${student.firstName} ${student.lastName}` : "Unknown"} ·{" "}
                          {b.status === "Borrowed" ? `Due: ${b.dueDate}` : `Returned: ${b.returnedAt}`}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${getBorrowingStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Books with low availability */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Books with Low Availability</h3>
              <div className="space-y-2">
                {LIBRARY_BOOKS.filter((b) => b.availableCopies < b.totalCopies * 0.5).map((book) => (
                  <div key={book.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-600">
                        {book.availableCopies}/{book.totalCopies}
                      </p>
                      <p className="text-xs text-gray-400">available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Book Catalog                                             */}
        {/* ============================================================ */}
        {activeTab === "catalog" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search by title, author, category, or ISBN..."
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Author</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">ISBN</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Total</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Available</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800 max-w-xs">
                        <p className="truncate">{book.title}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-xs">{book.author}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                          {book.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs font-mono">{book.isbn}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{book.totalCopies}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${
                          book.availableCopies === 0
                            ? "text-red-600"
                            : book.availableCopies < book.totalCopies * 0.3
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}>
                          {book.availableCopies}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredBooks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        No books found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Borrowings                                               */}
        {/* ============================================================ */}
        {activeTab === "borrowings" && (
          <div className="space-y-4">
            {returnSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
                ✓ {returnSuccess}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by student name, reg. number, or book title..."
                value={borrowingSearch}
                onChange={(e) => setBorrowingSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={borrowingFilter}
                onChange={(e) => setBorrowingFilter(e.target.value as typeof borrowingFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">All Statuses</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Student</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Book</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Borrowed</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Due Date</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Returned</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Status</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBorrowings.map((b) => {
                    const student = STUDENTS.find((s) => s.id === b.studentId);
                    const book = LIBRARY_BOOKS.find((bk) => bk.id === b.bookId);
                    return (
                      <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-800 text-xs">
                            {student ? `${student.firstName} ${student.lastName}` : "—"}
                          </p>
                          <p className="text-gray-400 text-xs font-mono">{b.registrationNumber}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-700 text-xs max-w-xs">
                          <p className="truncate">{book?.title ?? "—"}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{b.borrowedAt}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{b.dueDate}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{b.returnedAt ?? "—"}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBorrowingStatusColor(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {(b.status === "Borrowed" || b.status === "Overdue") && (
                            <button
                              onClick={() => handleReturnBook(b.id)}
                              className="text-xs bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg transition-colors"
                            >
                              Mark Returned
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredBorrowings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400">
                        No borrowing records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Issue Book                                               */}
        {/* ============================================================ */}
        {activeTab === "issue" && (
          <div className="max-w-lg space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-2">Issue a Book to Student</h3>
              <p className="text-gray-500 text-sm mb-6">
                Enter the student&apos;s registration number and select the book to issue.
              </p>

              {issueSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {issueSuccess}
                </div>
              )}

              {issueError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                  {issueError}
                </div>
              )}

              <form onSubmit={handleIssueBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={issueForm.registrationNumber}
                    onChange={(e) => setIssueForm({ ...issueForm, registrationNumber: e.target.value })}
                    placeholder="e.g. APPEC/2024/001"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Book <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={issueForm.bookId}
                    onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Select a book --</option>
                    {LIBRARY_BOOKS.map((book) => (
                      <option key={book.id} value={book.id} disabled={book.availableCopies === 0}>
                        {book.title} ({book.availableCopies} available)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={issueForm.dueDate}
                    onChange={(e) => setIssueForm({ ...issueForm, dueDate: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Issue Book
                </button>
              </form>
            </div>

            {/* Quick reference */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-600 text-xs font-semibold mb-2">Registered Students</p>
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
