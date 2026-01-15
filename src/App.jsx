import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RiskTable from './components/RiskTable';
import Settings from './components/Settings';
import Login from './components/Login';
import { riskIndicators as initialIndicators, riskCategories } from './data/riskData';

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
  const [indicators, setIndicators] = useState(initialIndicators);
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

  const filteredIndicators = indicators.filter((indicator) => {
    const matchesCategory = activeCategory === 'all' || indicator.category === activeCategory;
    const matchesSearch = indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.dataSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          </div>
          <div className="header-actions">
            {!isDashboard && (
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
          <Dashboard />
        ) : (
          <div className="dashboard">
            <RiskTable
              indicators={filteredIndicators}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onUpdateIndicators={setIndicators}
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
    </>
  );
}

export default App;
