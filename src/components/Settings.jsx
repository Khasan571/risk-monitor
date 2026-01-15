import Modal from './Modal';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const LayoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// Theme preview card component
const ThemePreviewCard = ({ theme, isSelected, onClick }) => {
  const isDark = theme.type === 'dark';

  return (
    <div
      className={`theme-preview-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div
        className="theme-preview-content"
        style={{ background: isDark ? theme.bgColor : theme.bgColor }}
      >
        {/* Sidebar preview */}
        <div className="preview-sidebar" style={{ background: theme.sidebarBg }}>
          <div className="preview-logo" style={{ background: theme.accentColor }}></div>
          <div className="preview-text" style={{ background: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)' }}></div>
        </div>

        {/* Content preview */}
        <div className="preview-main">
          <div className="preview-bar" style={{ background: theme.accentColor }}></div>
          <div className="preview-line" style={{ background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}></div>
          <div className="preview-line short" style={{ background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)' }}></div>
          <div className="preview-line short" style={{ background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)' }}></div>
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <div className="theme-check">
            <CheckIcon />
          </div>
        )}
      </div>

      <div className="theme-preview-info">
        <span className="theme-preview-name">{theme.name}</span>
        <span className="theme-preview-desc">{theme.description}</span>
      </div>
    </div>
  );
};

// Available themes
const colorThemes = {
  dark: [
    {
      id: 'dark-emerald',
      name: 'Zumrad',
      description: 'Yashil va ko\'k urg\'u',
      type: 'dark',
      bgColor: '#0f1a14',
      sidebarBg: '#0d1f15',
      accentColor: '#10b981'
    },
    {
      id: 'dark-purple',
      name: 'Binafsha',
      description: 'Binafsha va pushti urg\'u',
      type: 'dark',
      bgColor: '#150f1a',
      sidebarBg: '#1a0d20',
      accentColor: '#a855f7'
    },
    {
      id: 'dark-blue',
      name: 'Ko\'k',
      description: 'Ko\'k va ochiq ko\'k urg\'u',
      type: 'dark',
      bgColor: '#0a0a0f',
      sidebarBg: '#0d0d1a',
      accentColor: '#3b82f6'
    }
  ],
  light: [
    {
      id: 'light-emerald',
      name: 'Yorug\' Zumrad',
      description: 'Toza va Yangi',
      type: 'light',
      bgColor: '#f0fdf4',
      sidebarBg: '#ecfdf5',
      accentColor: '#10b981'
    },
    {
      id: 'light-purple',
      name: 'Yorug\' Binafsha',
      description: 'Nafis va Yorqin',
      type: 'light',
      bgColor: '#faf5ff',
      sidebarBg: '#f5f3ff',
      accentColor: '#a855f7'
    },
    {
      id: 'light-blue',
      name: 'Yorug\' Ko\'k',
      description: 'Professional va Aniq',
      type: 'light',
      bgColor: '#eff6ff',
      sidebarBg: '#f0f9ff',
      accentColor: '#3b82f6'
    }
  ]
};

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

function Settings({ isOpen, onClose, theme, onThemeChange, settings, onSettingsChange, onLogout }) {
  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleColorThemeChange = (colorTheme) => {
    handleSettingChange('colorTheme', colorTheme.id);
    // Faqat accent ranglar o'zgaradi, fon o'zgarmaydi
  };

  const currentColorTheme = settings.colorTheme || 'dark-blue';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sozlamalar" size="large">
      <div className="settings-container">

        {/* Theme Panel Section */}
        <div className="settings-section theme-panel-section">
          <div className="settings-section-header">
            <PaletteIcon />
            <h4>Yon Panel Mavzusi</h4>
          </div>
          <div className="settings-section-content">
            <p className="theme-panel-desc">Qorong'u va yorug' variantlar o'rtasida tanlang</p>

            {/* Dark Themes */}
            <div className="theme-group">
              <h5 className="theme-group-title">Qorong'u Mavzular</h5>
              <div className="theme-grid">
                {colorThemes.dark.map((t) => (
                  <ThemePreviewCard
                    key={t.id}
                    theme={t}
                    isSelected={currentColorTheme === t.id}
                    onClick={() => handleColorThemeChange(t)}
                  />
                ))}
              </div>
            </div>

            {/* Light Themes */}
            <div className="theme-group">
              <h5 className="theme-group-title">Yorug' Mavzular</h5>
              <div className="theme-grid">
                {colorThemes.light.map((t) => (
                  <ThemePreviewCard
                    key={t.id}
                    theme={t}
                    isSelected={currentColorTheme === t.id}
                    onClick={() => handleColorThemeChange(t)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="settings-section">
          <div className="settings-section-header">
            <GlobeIcon />
            <h4>Til</h4>
          </div>
          <div className="settings-section-content">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Interfeys tili</span>
                <span className="setting-description">Dastur tilini tanlang</span>
              </div>
              <select
                className="setting-select"
                value={settings.language || 'uz'}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="uz">O'zbekcha</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="settings-section">
          <div className="settings-section-header">
            <LayoutIcon />
            <h4>Ko'rsatish</h4>
          </div>
          <div className="settings-section-content">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Sahifadagi elementlar</span>
                <span className="setting-description">Jadvalda ko'rsatiladigan qatorlar soni</span>
              </div>
              <select
                className="setting-select"
                value={settings.itemsPerPage || 10}
                onChange={(e) => handleSettingChange('itemsPerPage', Number(e.target.value))}
              >
                <option value={5}>5 ta</option>
                <option value={10}>10 ta</option>
                <option value={20}>20 ta</option>
                <option value={50}>50 ta</option>
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Kompakt rejim</span>
                <span className="setting-description">Jadval qatorlarini ixchamlashtirish</span>
              </div>
              <label className="setting-toggle">
                <input
                  type="checkbox"
                  checked={settings.compactMode || false}
                  onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-section">
          <div className="settings-section-header">
            <BellIcon />
            <h4>Bildirishnomalar</h4>
          </div>
          <div className="settings-section-content">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Kritik xavflar</span>
                <span className="setting-description">Kritik darajadagi xavflar haqida xabar berish</span>
              </div>
              <label className="setting-toggle">
                <input
                  type="checkbox"
                  checked={settings.criticalAlerts !== false}
                  onChange={(e) => handleSettingChange('criticalAlerts', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Email xabarnomalar</span>
                <span className="setting-description">Muhim yangiliklarni emailga yuborish</span>
              </div>
              <label className="setting-toggle">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications || false}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="settings-section">
          <div className="settings-section-header">
            <DatabaseIcon />
            <h4>Ma'lumotlar</h4>
          </div>
          <div className="settings-section-content">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Avtomatik yangilash</span>
                <span className="setting-description">Ma'lumotlarni avtomatik yangilash oralig'i</span>
              </div>
              <select
                className="setting-select"
                value={settings.refreshInterval || 0}
                onChange={(e) => handleSettingChange('refreshInterval', Number(e.target.value))}
              >
                <option value={0}>O'chirilgan</option>
                <option value={30}>30 soniya</option>
                <option value={60}>1 daqiqa</option>
                <option value={300}>5 daqiqa</option>
                <option value={600}>10 daqiqa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="settings-section">
          <div className="settings-section-header">
            <UserIcon />
            <h4>Hisob</h4>
          </div>
          <div className="settings-section-content">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Foydalanuvchi</span>
                <span className="setting-description">admin@example.com</span>
              </div>
              <button className="setting-btn">Tahrirlash</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Parolni o'zgartirish</span>
                <span className="setting-description">Hisobingiz xavfsizligini ta'minlang</span>
              </div>
              <button className="setting-btn">O'zgartirish</button>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="settings-section logout-section">
          <button className="logout-btn" onClick={onLogout}>
            <LogoutIcon />
            Tizimdan chiqish
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Settings;
