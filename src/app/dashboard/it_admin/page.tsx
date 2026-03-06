"use client";

// ============================================================
// IT Administrator Dashboard
// ============================================================
// The IT Admin manages the technical aspects of the system:
//   - User account management (create, activate, deactivate)
//   - System settings configuration
//   - Audit log monitoring
//   - Security and access control oversight
// ============================================================

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  USERS,
  AUDIT_LOGS,
  SYSTEM_SETTINGS,
} from "@/lib/data";
import type { UserRole } from "@/lib/types";

// ---- Navigation items for the IT Admin sidebar ----
const NAV_ITEMS = [
  {
    label: "System Overview",
    href: "/dashboard/it_admin",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    label: "User Management",
    href: "/dashboard/it_admin#users",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "System Settings",
    href: "/dashboard/it_admin#settings",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Audit Logs",
    href: "/dashboard/it_admin#logs",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

const ROLE_COLOR = "bg-slate-700";

// Role display labels and badge colors
const ROLE_LABELS: Record<string, string> = {
  secretary: "Secretary",
  dos: "Director of Studies",
  dod: "Director of Discipline",
  hod: "HOD / Supervisor",
  principal: "Principal",
  bursar: "Bursar",
  librarian: "Librarian",
  it_admin: "IT Administrator",
  teacher: "Teacher",
  student: "Student",
};

const ROLE_BADGE_COLORS: Record<string, string> = {
  principal: "bg-rose-100 text-rose-700",
  secretary: "bg-yellow-100 text-yellow-700",
  dos: "bg-blue-100 text-blue-700",
  dod: "bg-red-100 text-red-700",
  hod: "bg-purple-100 text-purple-700",
  bursar: "bg-emerald-100 text-emerald-700",
  librarian: "bg-teal-100 text-teal-700",
  it_admin: "bg-slate-100 text-slate-700",
  teacher: "bg-green-100 text-green-700",
  student: "bg-orange-100 text-orange-700",
};

export default function ITAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "settings" | "logs">("overview");
  const [userSearch, setUserSearch] = useState("");
  const [logSearch, setLogSearch] = useState("");
  const [logRoleFilter, setLogRoleFilter] = useState<string>("All");

  // ---- Settings edit state ----
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [settingsSaved, setSettingsSaved] = useState("");

  // ---- Computed statistics ----
  const totalUsers = USERS.length;
  const activeUsers = USERS.filter((u) => u.isActive).length;
  const staffCount = USERS.filter((u) => u.role !== "student").length;
  const teacherCount = USERS.filter((u) => u.role === "teacher").length;

  // ---- Filtered users ----
  const filteredUsers = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      ROLE_LABELS[u.role]?.toLowerCase().includes(userSearch.toLowerCase())
  );

  // ---- Filtered audit logs ----
  const filteredLogs = AUDIT_LOGS.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(logSearch.toLowerCase());
    const matchesRole = logRoleFilter === "All" || log.userRole === logRoleFilter;
    return matchesSearch && matchesRole;
  });

  // ---- Handle saving a setting ----
  const handleSaveSetting = (key: string) => {
    const setting = SYSTEM_SETTINGS.find((s) => s.key === key);
    if (setting) {
      setting.value = editValue;
      setting.updatedAt = new Date().toISOString().split("T")[0];
    }
    setEditingKey(null);
    setSettingsSaved(`Setting "${key}" updated successfully.`);
    setTimeout(() => setSettingsSaved(""), 3000);
  };

  // ---- Toggle user active status ----
  const handleToggleUser = (userId: string) => {
    const user = USERS.find((u) => u.id === userId);
    if (user) {
      user.isActive = !user.isActive;
    }
  };

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      title="IT Admin Dashboard"
      roleLabel="IT Administrator"
      roleColor={ROLE_COLOR}
    >
      <div className="p-6 space-y-6">

        {/* ---- Page Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">IT Administration</h1>
            <p className="text-gray-500 text-sm mt-1">
              System management — APPEC TSS College Web System
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-slate-700 text-sm font-medium">System Online</span>
          </div>
        </div>

        {/* ---- Tab Navigation ---- */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {(["overview", "users", "settings", "logs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "overview" ? "Overview" :
               tab === "users" ? "User Management" :
               tab === "settings" ? "System Settings" :
               "Audit Logs"}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* TAB: Overview                                                 */}
        {/* ============================================================ */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* System Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Users</p>
                <p className="text-slate-700 text-2xl font-bold">{totalUsers}</p>
                <p className="text-slate-500 text-xs mt-1">all roles</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">Active Users</p>
                <p className="text-green-700 text-2xl font-bold">{activeUsers}</p>
                <p className="text-green-500 text-xs mt-1">of {totalUsers} total</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Staff Accounts</p>
                <p className="text-blue-700 text-2xl font-bold">{staffCount}</p>
                <p className="text-blue-500 text-xs mt-1">non-student users</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <p className="text-purple-600 text-xs font-semibold uppercase tracking-wide mb-1">Teachers</p>
                <p className="text-purple-700 text-2xl font-bold">{teacherCount}</p>
                <p className="text-purple-500 text-xs mt-1">teaching staff</p>
              </div>
            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">User Role Distribution</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(ROLE_LABELS)
                  .filter(([role]) => role !== "student")
                  .map(([role, label]) => {
                    const count = USERS.filter((u) => u.role === role).length;
                    return (
                      <div key={role} className={`${ROLE_BADGE_COLORS[role] ?? "bg-gray-100 text-gray-600"} rounded-xl p-3 text-center`}>
                        <p className="text-2xl font-bold">{count}</p>
                        <p className="text-xs font-medium mt-1">{label}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Recent Audit Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Recent System Activity</h3>
              <div className="space-y-2">
                {AUDIT_LOGS.slice(-5).reverse().map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono font-medium flex-shrink-0 mt-0.5 ${ROLE_BADGE_COLORS[log.userRole] ?? "bg-gray-100 text-gray-600"}`}>
                      {log.action}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{log.details}</p>
                      <p className="text-xs text-gray-400">
                        {log.userName} · {new Date(log.timestamp).toLocaleString("en-GB")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Settings Quick View */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Current System Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SYSTEM_SETTINGS.map((setting) => (
                  <div key={setting.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {setting.key.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-gray-400">{setting.description}</p>
                    </div>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                      setting.value === "true" ? "bg-green-100 text-green-700" :
                      setting.value === "false" ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {setting.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: User Management                                          */}
        {/* ============================================================ */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <div className="text-sm text-gray-500 flex items-center">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Last Login</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Status</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600 text-xs">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE_COLORS[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                          {ROLE_LABELS[user.role] ?? user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{user.createdAt}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{user.lastLoginAt ?? "Never"}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {user.role !== "it_admin" && (
                          <button
                            onClick={() => handleToggleUser(user.id)}
                            className={`text-xs px-3 py-1 rounded-lg transition-colors font-medium ${
                              user.isActive
                                ? "bg-red-50 hover:bg-red-100 text-red-600"
                                : "bg-green-50 hover:bg-green-100 text-green-600"
                            }`}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ <strong>Note:</strong> Deactivating a user prevents them from logging in.
                In production, password resets would be handled via secure email verification.
                The IT Admin account cannot be deactivated.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: System Settings                                          */}
        {/* ============================================================ */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            {settingsSaved && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
                ✓ {settingsSaved}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                🔧 System settings control key behaviors of the APPEC TSS College Web System.
                Changes take effect immediately. Exercise caution when modifying these values.
              </p>
            </div>

            <div className="space-y-3">
              {SYSTEM_SETTINGS.map((setting) => (
                <div key={setting.key} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {setting.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{setting.description}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Last updated: {setting.updatedAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingKey === setting.key ? (
                        <>
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-slate-500"
                          />
                          <button
                            onClick={() => handleSaveSetting(setting.key)}
                            className="bg-slate-600 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingKey(null)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                            setting.value === "true" ? "bg-green-100 text-green-700" :
                            setting.value === "false" ? "bg-red-100 text-red-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>
                            {setting.value}
                          </span>
                          <button
                            onClick={() => {
                              setEditingKey(setting.key);
                              setEditValue(setting.value);
                            }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: Audit Logs                                               */}
        {/* ============================================================ */}
        {activeTab === "logs" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search logs by user, action, or details..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <select
                value={logRoleFilter}
                onChange={(e) => setLogRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="All">All Roles</option>
                {Object.entries(ROLE_LABELS)
                  .filter(([role]) => role !== "student")
                  .map(([role, label]) => (
                    <option key={role} value={role}>{label}</option>
                  ))}
              </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Timestamp</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Action</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Details</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.slice().reverse().map((log) => (
                    <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString("en-GB")}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800 text-xs">{log.userName}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE_COLORS[log.userRole] ?? "bg-gray-100 text-gray-600"}`}>
                          {ROLE_LABELS[log.userRole] ?? log.userRole}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-xs max-w-xs">
                        <p className="truncate">{log.details}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs font-mono">
                        {log.ipAddress ?? "—"}
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        No audit log entries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-600 text-xs">
                📋 Showing {filteredLogs.length} of {AUDIT_LOGS.length} total log entries.
                In production, logs would be stored in a tamper-proof database with retention policies.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
