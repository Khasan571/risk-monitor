import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RiskTable from './components/RiskTable';
import Settings from './components/Settings';
import Login from './components/Login';
import { riskCategories } from './data/riskData';
import { universities, months, courses, allIndicators, getStats } from './data/universitiesData';
import { searchStudents, getStudentIndicators, getStudentDetails, students, getStudentsByUniversity, getProblematicStudents } from './data/studentsData';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const SunIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="12" cy="2" r="1"/>
    <circle cx="12" cy="22" r="1"/>
    <circle cx="22" cy="12" r="1"/>
    <circle cx="2" cy="12" r="1"/>
    <circle cx="19.07" cy="4.93" r="1"/>
    <circle cx="4.93" cy="19.07" r="1"/>
    <circle cx="19.07" cy="19.07" r="1"/>
    <circle cx="4.93" cy="4.93" r="1"/>
  </svg>
);

const MoonIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
    <circle cx="19" cy="5" r="1"/>
    <circle cx="21" cy="9" r="0.5"/>
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const UserAvatarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

const PersonSearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="7" r="4"/>
    <path d="M10 14c-4 0-7 2-7 4v2h10"/>
    <circle cx="18" cy="18" r="3"/>
    <path d="M21 21l-1.5-1.5"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

function App() {
  // Authentication state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [indicators, setIndicators] = useState(allIndicators);

  // New filters
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Student search
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentSearchResults, setStudentSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    const defaultSettings = {
      language: 'uz',
      itemsPerPage: 10,
      compactMode: false,
      criticalAlerts: true,
      emailNotifications: false,
      refreshInterval: 0,
      colorTheme: 'dark-blue'
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultSettings, ...parsed };
    }
    return defaultSettings;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply color theme on initial load
  useEffect(() => {
    const colorTheme = settings.colorTheme || 'dark-blue';
    document.documentElement.setAttribute('data-color-theme', colorTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    // Apply color theme
    const colorTheme = settings.colorTheme || 'dark-blue';
    document.documentElement.setAttribute('data-color-theme', colorTheme);
  }, [settings]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setShowUserMenu(false);
    setUser(null);
  };

  // Refresh data
  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update indicators with new random values and timestamps
    const refreshedIndicators = indicators.map(ind => ({
      ...ind,
      value: ind.value.includes('%')
        ? `${Math.floor(Math.random() * 30 + 70)}%`
        : ind.value.includes('ball')
          ? `${Math.floor(Math.random() * 50 + 50)} ball`
          : ind.value,
      lastUpdated: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    }));

    setIndicators(refreshedIndicators);
    setIsRefreshing(false);
  };

  // Student search handler
  const handleStudentSearch = (query) => {
    setStudentSearchQuery(query);
    if (query.length >= 2) {
      const results = searchStudents(query, selectedUniversity);
      setStudentSearchResults(results);
      setShowStudentDropdown(true);
    } else {
      setStudentSearchResults([]);
      setShowStudentDropdown(false);
    }
  };

  // Select student handler
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setStudentSearchQuery(student.fullName);
    setShowStudentDropdown(false);
  };

  // Clear student selection
  const clearStudentSelection = () => {
    setSelectedStudent(null);
    setStudentSearchQuery('');
    setStudentSearchResults([]);
  };

  // Get indicators based on student selection
  const getDisplayIndicators = () => {
    // If a student is selected, show their specific indicators
    if (selectedStudent && activeCategory === 'talaba') {
      return getStudentIndicators(selectedStudent.id);
    }

    // Otherwise filter from all indicators
    return indicators.filter((indicator) => {
      const matchesCategory = activeCategory === 'all' || indicator.category === activeCategory;
      const matchesSearch = indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        indicator.dataSource.toLowerCase().includes(searchQuery.toLowerCase());

      // Global indikatorlar (talaba kategoriyasi) doim ko'rinadi
      if (indicator.isGlobal) {
        return matchesCategory && matchesSearch;
      }

      // Boshqa indikatorlar uchun filtrlar
      const matchesUniversity = selectedUniversity === 'all' || indicator.university === selectedUniversity;
      const matchesMonth = selectedMonth === 'all' || indicator.month === selectedMonth;
      const matchesCourse = selectedCourse === 'all' || indicator.course === selectedCourse || indicator.course === 'all';
      return matchesCategory && matchesSearch && matchesUniversity && matchesMonth && matchesCourse;
    });
  };

  const filteredIndicators = getDisplayIndicators();

  // Get current stats
  const currentStats = getStats(filteredIndicators);

  const currentCategory = riskCategories.find(c => c.id === activeCategory);
  const isDashboard = activeCategory === 'all';

  // Export to Excel
  const exportToExcel = () => {
    const data = filteredIndicators.map(ind => ({
      'Nomi': ind.name,
      'Kategoriya': ind.category,
      'Qiymat': ind.value,
      'Status': ind.status,
      'Manba': ind.dataSource,
      'Oxirgi yangilanish': ind.lastUpdated
    }));

    let csvContent = '\uFEFF';
    const headers = Object.keys(data[0] || {});
    csvContent += headers.join(';') + '\n';

    data.forEach(row => {
      csvContent += headers.map(h => `"${row[h] || ''}"`).join(';') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `risk-indikatorlar-${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  // Import students from Excel
  const [importedStudents, setImportedStudents] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importError, setImportError] = useState(null);

  // Test data - 20 students with school graduation year and risk analysis
  const currentYear = new Date().getFullYear(); // 2026

  const calculateExpectedCourse = (graduationYear) => {
    // If graduated in 2022, by 2026 should be 4th year (4 years passed)
    // If graduated in 2023, by 2026 should be 3rd year
    // If graduated in 2024, by 2026 should be 2nd year
    // If graduated in 2025, by 2026 should be 1st year
    const yearsPassed = currentYear - graduationYear;
    if (yearsPassed >= 4) return 4;
    if (yearsPassed <= 0) return 1;
    return yearsPassed;
  };

  const analyzeStudentRisk = (student) => {
    const expectedCourse = calculateExpectedCourse(student.schoolGraduationYear);
    const actualCourse = parseInt(student.course) || 1;
    const isAtRisk = actualCourse < expectedCourse;
    const yearsBehind = expectedCourse - actualCourse;
    return {
      ...student,
      expectedCourse,
      isAtRisk,
      yearsBehind: isAtRisk ? yearsBehind : 0,
      riskLevel: yearsBehind >= 2 ? 'critical' : yearsBehind === 1 ? 'warning' : 'normal'
    };
  };

  // Sample test data - 20 students
  const sampleTestStudents = [
    { id: 1, hemisId: 'H2022001', fullName: 'Karimov Jasur', faculty: 'Kompyuter injiniringi', course: '2', group: '2A', schoolGraduationYear: 2022, gpa: 3.2, attendance: 85 },
    { id: 2, hemisId: 'H2022002', fullName: 'Rahimova Dilnoza', faculty: 'Axborot texnologiyalari', course: '4', group: '4B', schoolGraduationYear: 2022, gpa: 3.8, attendance: 92 },
    { id: 3, hemisId: 'H2023001', fullName: 'Toshmatov Bekzod', faculty: 'Dasturiy injiniring', course: '1', group: '1A', schoolGraduationYear: 2023, gpa: 2.9, attendance: 78 },
    { id: 4, hemisId: 'H2023002', fullName: 'Norova Madina', faculty: 'Kiberxavfsizlik', course: '3', group: '3C', schoolGraduationYear: 2023, gpa: 3.5, attendance: 88 },
    { id: 5, hemisId: 'H2024001', fullName: 'Aliyev Sardor', faculty: 'Telekommunikatsiya', course: '1', group: '1B', schoolGraduationYear: 2024, gpa: 3.1, attendance: 80 },
    { id: 6, hemisId: 'H2024002', fullName: 'Karimova Zarina', faculty: 'Sun\'iy intellekt', course: '2', group: '2A', schoolGraduationYear: 2024, gpa: 3.6, attendance: 91 },
    { id: 7, hemisId: 'H2022003', fullName: 'Ergashev Ulugbek', faculty: 'Kompyuter injiniringi', course: '3', group: '3A', schoolGraduationYear: 2022, gpa: 2.4, attendance: 65 },
    { id: 8, hemisId: 'H2023003', fullName: 'Yusupova Gulnora', faculty: 'Iqtisodiyot', course: '2', group: '2B', schoolGraduationYear: 2023, gpa: 3.3, attendance: 87 },
    { id: 9, hemisId: 'H2021001', fullName: 'Mirzayev Bobur', faculty: 'Menejment', course: '3', group: '3C', schoolGraduationYear: 2021, gpa: 2.8, attendance: 72 },
    { id: 10, hemisId: 'H2021002', fullName: 'Saidova Feruza', faculty: 'Huquqshunoslik', course: '4', group: '4A', schoolGraduationYear: 2021, gpa: 3.7, attendance: 94 },
    { id: 11, hemisId: 'H2022004', fullName: 'Qodirov Anvar', faculty: 'Dasturiy injiniring', course: '2', group: '2C', schoolGraduationYear: 2022, gpa: 2.1, attendance: 58 },
    { id: 12, hemisId: 'H2025001', fullName: 'Ismoilova Shahzoda', faculty: 'Kompyuter injiniringi', course: '1', group: '1A', schoolGraduationYear: 2025, gpa: 3.9, attendance: 96 },
    { id: 13, hemisId: 'H2023004', fullName: 'Xolmatov Rustam', faculty: 'Axborot texnologiyalari', course: '1', group: '1B', schoolGraduationYear: 2023, gpa: 2.5, attendance: 70 },
    { id: 14, hemisId: 'H2022005', fullName: 'Tursunova Nilufar', faculty: 'Kiberxavfsizlik', course: '4', group: '4B', schoolGraduationYear: 2022, gpa: 3.4, attendance: 89 },
    { id: 15, hemisId: 'H2024003', fullName: 'Abdullayev Shoxrux', faculty: 'Telekommunikatsiya', course: '1', group: '1C', schoolGraduationYear: 2024, gpa: 2.7, attendance: 75 },
    { id: 16, hemisId: 'H2021003', fullName: 'Nazarova Lola', faculty: 'Sun\'iy intellekt', course: '2', group: '2A', schoolGraduationYear: 2021, gpa: 2.3, attendance: 62 },
    { id: 17, hemisId: 'H2023005', fullName: 'Rajabov Farrux', faculty: 'Iqtisodiyot', course: '3', group: '3B', schoolGraduationYear: 2023, gpa: 3.0, attendance: 83 },
    { id: 18, hemisId: 'H2022006', fullName: 'Jumayeva Kamola', faculty: 'Menejment', course: '3', group: '3A', schoolGraduationYear: 2022, gpa: 3.2, attendance: 86 },
    { id: 19, hemisId: 'H2024004', fullName: 'Salimov Davron', faculty: 'Huquqshunoslik', course: '2', group: '2B', schoolGraduationYear: 2024, gpa: 3.5, attendance: 90 },
    { id: 20, hemisId: 'H2020001', fullName: 'Azimova Sevara', faculty: 'Tibbiyot', course: '3', group: '3C', schoolGraduationYear: 2020, gpa: 2.0, attendance: 55 },
  ].map(analyzeStudentRisk);

  // State for displayed students (test or imported)
  const [displayedStudents, setDisplayedStudents] = useState(sampleTestStudents);

  const importStudentsFromExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          setImportError('Fayl bo\'sh yoki noto\'g\'ri formatda');
          setShowImportModal(true);
          return;
        }

        // Parse header
        const headers = lines[0].split(/[;,\t]/).map(h => h.replace(/"/g, '').trim());

        // Parse data rows
        const importedData = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(/[;,\t]/).map(v => v.replace(/"/g, '').trim());
          if (values.length >= 3) { // At least HEMIS ID, Name, Faculty
            const student = {
              id: Date.now() + i,
              hemisId: values[0] || `IMPORT${Date.now()}${i}`,
              fullName: values[1] || 'Noma\'lum',
              faculty: values[2] || 'Noma\'lum',
              course: values[3]?.includes('Magistr') ? 'magistr' : values[3]?.replace('-kurs', '').replace(/\D/g, '') || '1',
              group: values[4] || '1A',
              schoolGraduationYear: parseInt(values[5]) || currentYear - 1,
              gpa: parseFloat(values[6]) || 0,
              attendance: parseInt(values[7]) || 0,
              university: selectedUniversity !== 'all' ? selectedUniversity : 'tatu',
            };
            importedData.push(analyzeStudentRisk(student));
          }
        }

        if (importedData.length > 0) {
          setImportedStudents(importedData);
          setDisplayedStudents(importedData);
          setImportError(null);
          setShowImportModal(true);
        } else {
          setImportError('Hech qanday ma\'lumot topilmadi');
          setShowImportModal(true);
        }
      } catch (error) {
        setImportError('Faylni o\'qishda xatolik: ' + error.message);
        setShowImportModal(true);
      }
    };

    reader.onerror = () => {
      setImportError('Faylni o\'qib bo\'lmadi');
      setShowImportModal(true);
    };

    reader.readAsText(file, 'UTF-8');
  };

  // Get risk statistics
  const riskStats = {
    total: displayedStudents.length,
    atRisk: displayedStudents.filter(s => s.isAtRisk).length,
    critical: displayedStudents.filter(s => s.riskLevel === 'critical').length,
    warning: displayedStudents.filter(s => s.riskLevel === 'warning').length,
    normal: displayedStudents.filter(s => s.riskLevel === 'normal').length,
  };

  // Export to PDF
  const exportToPDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Risk Indikatorlar</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #3b82f6; color: white; padding: 12px 8px; text-align: left; }
          td { padding: 10px 8px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) { background: #f8fafc; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .critical { background: #fee2e2; color: #dc2626; }
          .warning { background: #fef3c7; color: #d97706; }
          .normal { background: #dcfce7; color: #16a34a; }
          .footer { margin-top: 30px; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Risk Indikatorlar - ${currentCategory?.name || 'Barcha'}</h1>
        <p>Sana: ${new Date().toLocaleDateString('uz-UZ')}</p>
        <table>
          <thead>
            <tr>
              <th>Nomi</th>
              <th>Qiymat</th>
              <th>Status</th>
              <th>Manba</th>
              <th>Yangilangan</th>
            </tr>
          </thead>
          <tbody>
            ${filteredIndicators.map(ind => `
              <tr>
                <td>${ind.name}</td>
                <td>${ind.value}</td>
                <td><span class="status ${ind.status}">${ind.status === 'critical' ? 'Kritik' : ind.status === 'warning' ? 'Ogohlantirish' : 'Normal'}</span></td>
                <td>${ind.dataSource}</td>
                <td>${ind.lastUpdated}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">Risk Monitor © ${new Date().getFullYear()}</div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    setShowExportMenu(false);
  };

  // Show login page if not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h2>{currentCategory?.name || 'Dashboard'}</h2>
            <span className="header-stats">
              {filteredIndicators.length} ta indikator
              {selectedUniversity !== 'all' && ` • ${universities.find(u => u.id === selectedUniversity)?.name}`}
            </span>
          </div>
          <div className="header-actions">
            {/* Filters */}
            <div className="header-filters">
              <div className="filter-dropdown">
                <BuildingIcon />
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="filter-select"
                >
                  {universities.map(uni => (
                    <option key={uni.id} value={uni.id}>{uni.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-dropdown">
                <CalendarIcon />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="filter-select"
                >
                  {months.map(month => (
                    <option key={month.id} value={month.id}>{month.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-dropdown">
                <GraduationIcon />
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="filter-select"
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              {/* Student Search - only in talaba category */}
              {activeCategory === 'talaba' && (
                <>
                  <div className="student-search-container">
                    <div className="student-search-input">
                      <PersonSearchIcon />
                      <input
                        type="text"
                        placeholder="Talaba qidirish (ism yoki HEMIS ID)..."
                        value={studentSearchQuery}
                        onChange={(e) => handleStudentSearch(e.target.value)}
                        onFocus={() => studentSearchResults.length > 0 && setShowStudentDropdown(true)}
                      />
                      {selectedStudent && (
                        <button className="clear-student-btn" onClick={clearStudentSelection}>
                          <CloseIcon />
                        </button>
                      )}
                    </div>
                    {showStudentDropdown && studentSearchResults.length > 0 && (
                      <div className="student-search-dropdown">
                        {studentSearchResults.map(student => (
                          <div
                            key={student.id}
                            className="student-search-item"
                            onClick={() => handleSelectStudent(student)}
                          >
                            <div className="student-info">
                              <span className="student-name">{student.fullName}</span>
                              <span className="student-details">
                                {student.hemisId} • {student.faculty} • {student.course === 'magistr' ? 'Magistr' : `${student.course}-kurs`}
                              </span>
                            </div>
                            <span className={`student-status ${student.hasDebt || student.hasAcademicIssues ? 'warning' : 'good'}`}>
                              {student.hasDebt || student.hasAcademicIssues ? 'Muammo bor' : 'Yaxshi'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {!isDashboard && activeCategory !== 'talaba' && (
              <div className="search-box">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Indikator qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            <button
              className={`header-btn ${isRefreshing ? 'refreshing' : ''}`}
              title="Yangilash"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshIcon />
            </button>

            {/* Export/Saqlash Menu */}
            <div className="export-menu-container">
              <button
                className="header-btn"
                title="Saqlash"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <DownloadIcon />
              </button>
              {showExportMenu && (
                <div className="export-menu-dropdown">
                  <button className="export-menu-item" onClick={exportToPDF}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <path d="M9 15h6"/>
                      <path d="M9 11h6"/>
                    </svg>
                    PDF formatda saqlash
                  </button>
                  <button className="export-menu-item" onClick={exportToExcel}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <path d="M8 13h2"/>
                      <path d="M8 17h2"/>
                      <path d="M14 13h2"/>
                      <path d="M14 17h2"/>
                    </svg>
                    Excel formatda saqlash
                  </button>
                </div>
              )}
            </div>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
            >
              <div className="toggle-track">
                <SunIcon className="toggle-icon sun" />
                <MoonIcon className="toggle-icon moon" />
                <div className="toggle-thumb"></div>
              </div>
            </button>

            {/* User Menu */}
            <div className="user-menu-container">
              <button
                className="user-menu-trigger"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  <UserAvatarIcon />
                </div>
                <span className="user-name">{user.fullName}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="user-chevron">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {showUserMenu && (
                <div className="user-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="user-menu-header">
                    <div className="user-avatar-large">
                      <UserAvatarIcon />
                    </div>
                    <div className="user-info">
                      <span className="user-fullname">{user.fullName}</span>
                      <span className="user-role">{user.role === 'admin' ? 'Administrator' : 'Foydalanuvchi'}</span>
                    </div>
                  </div>
                  <div className="user-menu-divider"></div>
                  <button className="user-menu-item" onClick={() => { setSettingsOpen(true); setShowUserMenu(false); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Sozlamalar
                  </button>
                  <button className="user-menu-item logout" onClick={handleLogout}>
                    <LogoutIcon />
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {isDashboard ? (
          <Dashboard
            indicators={filteredIndicators}
            stats={currentStats}
            selectedUniversity={selectedUniversity}
            selectedMonth={selectedMonth}
          />
        ) : (
          <div className="dashboard">
            {/* Student Info Card */}
            {selectedStudent && activeCategory === 'talaba' && (
              <div className="student-info-card">
                <div className="student-card-header">
                  <div className="student-avatar">
                    <UserAvatarIcon />
                  </div>
                  <div className="student-main-info">
                    <h3>{selectedStudent.fullName}</h3>
                    <p>{selectedStudent.hemisId} • {selectedStudent.faculty}</p>
                  </div>
                  <button className="close-card-btn" onClick={clearStudentSelection}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="student-card-body">
                  <div className="student-stat">
                    <span className="stat-label">Kurs</span>
                    <span className="stat-value">{selectedStudent.course === 'magistr' ? 'Magistratura' : `${selectedStudent.course}-kurs`}</span>
                  </div>
                  <div className="student-stat">
                    <span className="stat-label">Guruh</span>
                    <span className="stat-value">{selectedStudent.group}</span>
                  </div>
                  <div className="student-stat">
                    <span className="stat-label">GPA</span>
                    <span className={`stat-value ${parseFloat(selectedStudent.gpa) < 2.5 ? 'danger' : ''}`}>{selectedStudent.gpa}</span>
                  </div>
                  <div className="student-stat">
                    <span className="stat-label">Davomat</span>
                    <span className={`stat-value ${selectedStudent.attendance < 75 ? 'danger' : ''}`}>{selectedStudent.attendance}%</span>
                  </div>
                  <div className="student-stat">
                    <span className="stat-label">To'lov holati</span>
                    <span className={`stat-value ${selectedStudent.hasDebt ? 'danger' : 'success'}`}>
                      {selectedStudent.hasDebt ? `${(selectedStudent.debtAmount / 1000000).toFixed(1)} mln qarzdor` : 'To\'langan'}
                    </span>
                  </div>
                  <div className="student-stat">
                    <span className="stat-label">Telefon</span>
                    <span className="stat-value">{selectedStudent.phone}</span>
                  </div>
                </div>
              </div>
            )}

            <RiskTable
              indicators={filteredIndicators}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onUpdateIndicators={setIndicators}
              onImportExcel={activeCategory === 'talaba' ? importStudentsFromExcel : null}
            />
          </div>
        )}
      </main>

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={handleThemeChange}
        settings={settings}
        onSettingsChange={setSettings}
        onLogout={handleLogout}
      />

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="user-menu-overlay"
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="export-menu-overlay"
          onClick={() => setShowExportMenu(false)}
        />
      )}

      {/* Click outside to close student dropdown */}
      {showStudentDropdown && (
        <div
          className="student-dropdown-overlay"
          onClick={() => setShowStudentDropdown(false)}
        />
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal import-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{importError ? 'Xatolik' : 'Import natijalari'}</h3>
              <button className="modal-close" onClick={() => setShowImportModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              {importError ? (
                <div className="import-error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <p>{importError}</p>
                </div>
              ) : (
                <>
                  <div className="import-success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <p><strong>{importedStudents.length}</strong> ta talaba ma'lumoti yuklandi</p>
                  </div>
                  <div className="import-preview">
                    <table className="import-table">
                      <thead>
                        <tr>
                          <th>HEMIS ID</th>
                          <th>F.I.O.</th>
                          <th>Fakultet</th>
                          <th>Kurs</th>
                          <th>GPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importedStudents.slice(0, 10).map((student, index) => (
                          <tr key={index}>
                            <td>{student.hemisId}</td>
                            <td>{student.fullName}</td>
                            <td>{student.faculty}</td>
                            <td>{student.course === 'magistr' ? 'Magistr' : `${student.course}-kurs`}</td>
                            <td>{student.gpa}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {importedStudents.length > 10 && (
                      <p className="import-more">...va yana {importedStudents.length - 10} ta</p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowImportModal(false)}>
                Yopish
              </button>
              {!importError && importedStudents.length > 0 && (
                <button className="btn-primary" onClick={() => {
                  // Here you would typically save to backend
                  alert(`${importedStudents.length} ta talaba muvaffaqiyatli yuklandi!`);
                  setShowImportModal(false);
                  setImportedStudents([]);
                }}>
                  Saqlash
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
