// ============================================================
// APPEC TSS College Web System - Main JavaScript
// ============================================================

const API_BASE = ''; // Empty for same-origin requests

// ============================================================
// Utility Functions
// ============================================================

function formatNaira(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function getGradeColor(grade) {
  const colors = {
    'A': 'badge-green',
    'B': 'badge-blue',
    'C': 'badge-yellow',
    'D': 'badge-yellow',
    'E': 'badge-red',
    'F': 'badge-red'
  };
  return colors[grade] || 'badge-gray';
}

function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  
  const container = document.querySelector('.main-content') || document.querySelector('.auth-card');
  if (container) {
    container.insertBefore(alert, container.firstChild);
    setTimeout(() => alert.remove(), 5000);
  }
}

function showLoading() {
  const btn = document.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Loading...';
  }
}

function hideLoading() {
  const btn = document.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || 'Submit';
  }
}

// ============================================================
// Authentication
// ============================================================

async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store user in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Connection error. Please try again.' };
  }
}

function getCurrentUser() {
  const userStr = sessionStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// ============================================================
// API Functions
// ============================================================

async function getUsers() {
  const response = await fetch(`${API_BASE}/api/users`);
  return response.json();
}

async function getClasses() {
  const response = await fetch(`${API_BASE}/api/classes`);
  return response.json();
}

async function getCourses() {
  const response = await fetch(`${API_BASE}/api/courses`);
  return response.json();
}

async function getTeachers() {
  const response = await fetch(`${API_BASE}/api/teachers`);
  return response.json();
}

async function getStudents() {
  const response = await fetch(`${API_BASE}/api/students`);
  return response.json();
}

async function getStudentByReg(regNumber) {
  const response = await fetch(`${API_BASE}/api/students/reg/${regNumber}`);
  if (response.ok) return response.json();
  return null;
}

async function getExamCode(code) {
  const response = await fetch(`${API_BASE}/api/exam-codes/${code}`);
  if (response.ok) return response.json();
  return null;
}

async function confirmExamCode(code) {
  const response = await fetch(`${API_BASE}/api/exam-codes/${code}/confirm`, {
    method: 'POST'
  });
  return response.json();
}

async function registerStudent(data) {
  const response = await fetch(`${API_BASE}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function getAcademicMarks(studentId) {
  const response = await fetch(`${API_BASE}/api/marks/academic/student/${studentId}`);
  return response.json();
}

async function getDisciplineMarks(studentId) {
  const response = await fetch(`${API_BASE}/api/marks/discipline/student/${studentId}`);
  return response.json();
}

async function getFeePayments() {
  const response = await fetch(`${API_BASE}/api/fees/payments`);
  return response.json();
}

async function getLibraryBooks() {
  const response = await fetch(`${API_BASE}/api/library/books`);
  return response.json();
}

async function getLibraryBorrowings() {
  const response = await fetch(`${API_BASE}/api/library/borrowings`);
  return response.json();
}

async function getStats() {
  const response = await fetch(`${API_BASE}/api/stats`);
  return response.json();
}

async function getAuditLogs() {
  const response = await fetch(`${API_BASE}/api/audit-logs`);
  return response.json();
}

async function getSettings() {
  const response = await fetch(`${API_BASE}/api/settings`);
  return response.json();
}

async function updateSetting(key, value) {
  const response = await fetch(`${API_BASE}/api/settings/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  });
  return response.json();
}

async function toggleUserStatus(userId) {
  const response = await fetch(`${API_BASE}/api/users/${userId}/toggle`, {
    method: 'PUT'
  });
  return response.json();
}

// ============================================================
// Page Initialization
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Login Page
  if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.dataset.originalText = submitBtn.textContent;
    
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('loginError');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Signing in...';
      
      const result = await login(email, password);
      
      if (result.success) {
        // Redirect based on role
        const roleDashboards = {
          'secretary': 'dashboard-secretary.html',
          'dos': 'dashboard-dos.html',
          'dod': 'dashboard-dod.html',
          'teacher': 'dashboard-teacher.html',
          'student': 'dashboard-student.html',
          'hod': 'dashboard-hod.html',
          'principal': 'dashboard-principal.html',
          'bursar': 'dashboard-bursar.html',
          'librarian': 'dashboard-librarian.html',
          'it_admin': 'dashboard-itadmin.html'
        };
        
        const redirectUrl = roleDashboards[result.user.role] || 'index.html';
        window.location.href = redirectUrl;
      } else {
        errorDiv.textContent = result.message;
        errorDiv.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText;
      }
    });
  }
  
  // Admission Page
  if (document.getElementById('verifyForm')) {
    const verifyForm = document.getElementById('verifyForm');
    const examCodeInput = document.getElementById('examCode');
    const errorDiv = document.getElementById('verifyError');
    const successDiv = document.getElementById('verifySuccess');
    
    // Populate exam codes for testing
    loadExamCodesList();
    
    verifyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const code = examCodeInput.value.trim().toUpperCase();
      errorDiv.classList.remove('show');
      successDiv.classList.remove('show');
      
      showLoading();
      
      const examData = await getExamCode(code);
      
      if (!examData) {
        errorDiv.textContent = 'Invalid examination code. Please check and try again.';
        errorDiv.classList.add('show');
        hideLoading();
        return;
      }
      
      if (examData.isUsed) {
        errorDiv.textContent = 'This examination code has already been used for registration.';
        errorDiv.classList.add('show');
        hideLoading();
        return;
      }
      
      // Store exam data and show letter
      sessionStorage.setItem('examData', JSON.stringify(examData));
      showAdmissionLetter(examData);
      hideLoading();
    });
  }
  
  // Confirm Admission Button
  const confirmBtn = document.getElementById('confirmAdmission');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      const examData = JSON.parse(sessionStorage.getItem('examData'));
      if (examData) {
        await confirmExamCode(examData.code);
        examData.admissionLetterConfirmed = true;
        sessionStorage.setItem('examData', JSON.stringify(examData));
        showConfirmationSuccess(examData);
      }
    });
  }
  
  // Registration Page
  if (document.getElementById('registerForm')) {
    const registerForm = document.getElementById('registerForm');
    const urlParams = new URLSearchParams(window.location.search);
    const examCode = urlParams.get('code');
    
    if (examCode) {
      document.getElementById('examCode').value = examCode;
      loadExamCodeData(examCode);
    }
    
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        examCode: document.getElementById('examCode').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        guardianName: document.getElementById('guardianName').value,
        guardianPhone: document.getElementById('guardianPhone').value
      };
      
      showLoading();
      
      const result = await registerStudent(formData);
      
      if (result.success) {
        document.getElementById('registrationSuccess').classList.remove('hidden');
        document.getElementById('registrationForm').classList.add('hidden');
        document.getElementById('registeredRegNumber').textContent = result.student.registrationNumber;
      } else {
        document.getElementById('registrationError').textContent = result.message;
        document.getElementById('registrationError').classList.add('show');
      }
      
      hideLoading();
    });
  }
  
  // Results Page
  if (document.getElementById('resultsForm')) {
    const resultsForm = document.getElementById('resultsForm');
    
    resultsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const regNumber = document.getElementById('regNumber').value.trim();
      
      showLoading();
      
      const student = await getStudentByReg(regNumber);
      
      if (!student) {
        document.getElementById('resultsError').textContent = 'Student not found with this registration number.';
        document.getElementById('resultsError').classList.add('show');
        document.getElementById('resultsContent').classList.add('hidden');
        hideLoading();
        return;
      }
      
      const marks = await getAcademicMarks(student.id);
      const discipline = await getDisciplineMarks(student.id);
      
      displayResults(student, marks, discipline);
      hideLoading();
    });
  }
  
  // Logout Button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
  
  // Tab Navigation
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    });
  });
});

// ============================================================
// Admission Page Functions
// ============================================================

async function loadExamCodesList() {
  try {
    const response = await fetch(`${API_BASE}/api/exam-codes`);
    const codes = await response.json();
    
    const container = document.getElementById('availableCodes');
    if (!container) return;
    
    const availableCodes = codes.filter(c => !c.isUsed);
    
    container.innerHTML = availableCodes.map(code => `
      <button type="button" class="code-btn" onclick="document.getElementById('examCode').value = '${code.code}'">
        <span class="code">${code.code}</span>
        <span class="name">${code.candidateName}</span>
        <span class="program">${code.program}</span>
      </button>
    `).join('');
  } catch (error) {
    console.error('Error loading exam codes:', error);
  }
}

function showAdmissionLetter(examData) {
  document.getElementById('verifyStep').classList.add('hidden');
  document.getElementById('letterStep').classList.remove('hidden');
  
  // Populate letter data
  document.getElementById('letterName').textContent = examData.candidateName;
  document.getElementById('letterCode').textContent = examData.code;
  document.getElementById('letterProgram').textContent = examData.program;
  document.getElementById('letterDepartment').textContent = examData.department;
  document.getElementById('letterLevel').textContent = examData.level;
}

function showConfirmationSuccess(examData) {
  document.getElementById('letterStep').classList.add('hidden');
  document.getElementById('confirmedStep').classList.remove('hidden');
  
  document.getElementById('confirmedName').textContent = examData.candidateName;
  document.getElementById('confirmedCode').textContent = examData.code;
  document.getElementById('confirmedProgram').textContent = examData.program;
}

async function loadExamCodeData(code) {
  const examData = await getExamCode(code);
  if (examData && examData.admissionLetterConfirmed) {
    // Allow registration
  } else if (examData && !examData.admissionLetterConfirmed) {
    document.getElementById('registrationError').textContent = 'Please confirm your admission letter first.';
    document.getElementById('registrationError').classList.add('show');
    document.getElementById('registrationForm').querySelector('button[type="submit"]').disabled = true;
  }
}

// ============================================================
// Results Page Functions
// ============================================================

async function displayResults(student, marks, discipline) {
  document.getElementById('resultsError').classList.add('hidden');
  document.getElementById('resultsContent').classList.remove('hidden');
  
  // Student Info
  document.getElementById('resultName').textContent = `${student.firstName} ${student.lastName}`;
  document.getElementById('resultReg').textContent = student.registrationNumber;
  document.getElementById('resultLevel').textContent = student.level;
  document.getElementById('resultDepartment').textContent = student.department;
  
  // Academic Marks
  const marksTable = document.getElementById('marksTable');
  if (marks.length > 0) {
    marksTable.innerHTML = marks.map(mark => `
      <tr>
        <td>${mark.courseId}</td>
        <td>${mark.continuousAssessment}</td>
        <td>${mark.examScore}</td>
        <td>${mark.total}</td>
        <td><span class="badge ${getGradeColor(mark.grade)}">${mark.grade}</span></td>
      </tr>
    `).join('');
  } else {
    marksTable.innerHTML = '<tr><td colspan="5" class="text-center">No marks available</td></tr>';
  }
  
  // Discipline
  if (discipline) {
    document.getElementById('disciplineTotal').textContent = discipline.total + '%';
    document.getElementById('disciplineRemarks').textContent = discipline.remarks || 'No remarks';
  } else {
    document.getElementById('disciplineTotal').textContent = 'N/A';
    document.getElementById('disciplineRemarks').textContent = 'No discipline record';
  }
}

// ============================================================
// Role Badge Colors
// ============================================================

function getRoleBadgeClass(role) {
  const classes = {
    'secretary': 'badge-yellow',
    'dos': 'badge-blue',
    'dod': 'badge-red',
    'teacher': 'badge-green',
    'student': 'badge-orange',
    'hod': 'badge-purple',
    'principal': 'badge-red',
    'bursar': 'badge-green',
    'librarian': 'badge-blue',
    'it_admin': 'badge-gray'
  };
  return classes[role] || 'badge-gray';
}

function getRoleLabel(role) {
  const labels = {
    'secretary': 'Secretary',
    'dos': 'Director of Studies',
    'dod': 'Director of Discipline',
    'teacher': 'Teacher',
    'student': 'Student',
    'hod': 'HOD / Supervisor',
    'principal': 'Principal',
    'bursar': 'Bursar',
    'librarian': 'Librarian',
    'it_admin': 'IT Admin'
  };
  return labels[role] || role;
}

// ============================================================
// Export for use in inline onclick handlers
// ============================================================

window.getCurrentUser = getCurrentUser;
window.logout = logout;
window.getRoleBadgeClass = getRoleBadgeClass;
window.getRoleLabel = getRoleLabel;
