import { useState, useEffect } from 'react';
import { riskCategories, formatValue } from '../data/riskData';

function Dashboard({ indicators = [], stats: propStats, selectedUniversity, selectedMonth }) {
  const [animatedStats, setAnimatedStats] = useState({ total: 0, critical: 0, high: 0, good: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [chartExpanded, setChartExpanded] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [showAllSources, setShowAllSources] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const stats = propStats || {
    total: indicators.length,
    critical: indicators.filter(r => r.status === 'critical').length,
    high: indicators.filter(r => r.status === 'high').length,
    medium: indicators.filter(r => r.status === 'medium').length,
    good: indicators.filter(r => r.status === 'good' || r.status === 'low').length,
  };

  // Animate numbers when stats change
  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        total: Math.round(stats.total * easeOut),
        critical: Math.round(stats.critical * easeOut),
        high: Math.round(stats.high * easeOut),
        good: Math.round(stats.good * easeOut),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [stats.total, stats.critical, stats.high, stats.good]);

  const riskScore = Math.round(
    ((stats.critical * 4 + stats.high * 3 + stats.medium * 2 + stats.good * 1) /
    (stats.total * 4)) * 100
  );

  const getScoreColor = (score) => {
    if (score <= 30) return '#10b981';
    if (score <= 50) return '#f59e0b';
    if (score <= 70) return '#f97316';
    return '#ef4444';
  };

  const getScoreGradient = (score) => {
    if (score <= 30) return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
    if (score <= 50) return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
    if (score <= 70) return 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)';
    return 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
  };

  // Donut chart data
  const donutData = [
    { label: 'Kritik', value: stats.critical, color: '#ef4444' },
    { label: 'Yuqori', value: stats.high, color: '#f97316' },
    { label: "O'rta", value: stats.medium, color: '#f59e0b' },
    { label: 'Yaxshi', value: stats.good, color: '#10b981' },
  ];

  // Calculate donut segments
  const total = donutData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const donutSegments = donutData.map(item => {
    const angle = (item.value / total) * 360;
    const segment = { ...item, startAngle: currentAngle, endAngle: currentAngle + angle };
    currentAngle += angle;
    return segment;
  });

  // Category stats with trends
  const categoryStats = riskCategories
    .filter(c => c.id !== 'all')
    .map(category => {
      const categoryIndicators = indicators.filter(r => r.category === category.id);
      const critical = categoryIndicators.filter(r => r.status === 'critical').length;
      const high = categoryIndicators.filter(r => r.status === 'high').length;
      const medium = categoryIndicators.filter(r => r.status === 'medium').length;
      const good = categoryIndicators.filter(r => r.status === 'good' || r.status === 'low').length;
      return {
        ...category,
        total: categoryIndicators.length,
        critical,
        high,
        medium,
        good,
        riskLevel: critical > 0 ? 'critical' : high > 0 ? 'high' : medium > 0 ? 'medium' : 'good'
      };
    })
    .filter(c => c.total > 0)
    .sort((a, b) => (b.critical * 3 + b.high * 2 + b.medium) - (a.critical * 3 + a.high * 2 + a.medium));

  // Critical indicators list
  const criticalIndicators = indicators
    .filter(r => r.status === 'critical' || r.status === 'high')
    .sort((a, b) => (a.status === 'critical' ? 0 : 1) - (b.status === 'critical' ? 0 : 1))
    .slice(0, 6);

  // Data sources
  const dataSources = [...new Set(indicators.map(r => r.dataSource))].map(source => {
    const items = indicators.filter(r => r.dataSource === source);
    const critical = items.filter(r => r.status === 'critical' || r.status === 'high').length;
    return { name: source, count: items.length, critical };
  }).sort((a, b) => b.count - a.count);

  // Weekly trend data (simulated)
  const weeklyTrend = [
    { day: 'Du', medium: 12, good: 18, resolved: 5 },
    { day: 'Se', medium: 14, good: 20, resolved: 8 },
    { day: 'Ch', medium: 16, good: 22, resolved: 12 },
    { day: 'Pa', medium: 18, good: 16, resolved: 7 },
    { day: 'Ju', medium: 20, good: 24, resolved: 10 },
    { day: 'Sh', medium: 15, good: 28, resolved: 14 },
    { day: 'Ya', medium: stats.medium, good: stats.good, resolved: 6 },
  ];
  const maxTrend = Math.max(...weeklyTrend.map(d => Math.max(d.medium, d.good, d.resolved)));

  // Recent activity (simulated)
  const recentActivity = [
    { id: 1, type: 'critical', message: "Yangi kritik xavf aniqlandi", time: '5 daqiqa oldin', icon: 'alert' },
    { id: 2, type: 'resolved', message: "3 ta xavf bartaraf etildi", time: '1 soat oldin', icon: 'check' },
    { id: 3, type: 'warning', message: "HEMIS tizimida anomaliya", time: '2 soat oldin', icon: 'warning' },
    { id: 4, type: 'info', message: "Haftalik hisobot tayyor", time: '3 soat oldin', icon: 'doc' },
    { id: 5, type: 'critical', message: "Billing tizimida xatolik", time: '5 soat oldin', icon: 'alert' },
  ];

  const createDonutPath = (startAngle, endAngle, radius, innerRadius) => {
    const start = polarToCartesian(60, 60, radius, endAngle);
    const end = polarToCartesian(60, 60, radius, startAngle);
    const innerStart = polarToCartesian(60, 60, innerRadius, endAngle);
    const innerEnd = polarToCartesian(60, 60, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', innerEnd.x, innerEnd.y,
      'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div className="dashboard-modern">
      {/* Controls Section */}
      <div className="dash-controls">
        <div className="period-selector">
          {['day', 'week', 'month'].map(period => (
            <button
              key={period}
              className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period === 'day' ? 'Bugun' : period === 'week' ? 'Hafta' : 'Oy'}
            </button>
          ))}
        </div>
        <button className="dash-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Export
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <div className="stat-card-content">
            <div className="stat-icon-wrapper blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Jami indikatorlar</span>
              <span className="stat-number">{animatedStats.total}</span>
            </div>
          </div>
          <div className="stat-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 6l-9.5 9.5-5-5L1 18"/>
            </svg>
            <span>+12%</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-content">
            <div className="stat-icon-wrapper red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Kritik xavflar</span>
              <span className="stat-number red">{animatedStats.critical}</span>
            </div>
          </div>
          <div className="stat-trend down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 18l-9.5-9.5-5 5L1 6"/>
            </svg>
            <span>-8%</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-content">
            <div className="stat-icon-wrapper orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Yuqori xavflar</span>
              <span className="stat-number orange">{animatedStats.high}</span>
            </div>
          </div>
          <div className="stat-trend up warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 6l-9.5 9.5-5-5L1 18"/>
            </svg>
            <span>+5%</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-content">
            <div className="stat-icon-wrapper green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Yaxshi holat</span>
              <span className="stat-number green">{animatedStats.good}</span>
            </div>
          </div>
          <div className="stat-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 6l-9.5 9.5-5-5L1 18"/>
            </svg>
            <span>+15%</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dash-main-grid">
        {/* Risk Score Card */}
        <div className="dash-card risk-overview-card">
          <div className="card-header">
            <h3>Xavf ko'rsatkichi</h3>
            <span className="card-badge" style={{ background: getScoreGradient(riskScore) }}>
              {riskScore <= 30 ? 'Yaxshi' : riskScore <= 50 ? "O'rta" : riskScore <= 70 ? 'Yuqori' : 'Kritik'}
            </span>
          </div>
          <div className="risk-overview-content">
            <div className="risk-gauge">
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="33%" stopColor="#f59e0b"/>
                    <stop offset="66%" stopColor="#f97316"/>
                    <stop offset="100%" stopColor="#ef4444"/>
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8"/>
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke={getScoreColor(riskScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(riskScore / 100) * 326.7} 326.7`}
                  transform="rotate(-90 60 60)"
                  className="gauge-progress"
                />
              </svg>
              <div className="gauge-center">
                <span className="gauge-value" style={{ color: getScoreColor(riskScore) }}>{riskScore}</span>
                <span className="gauge-label">ball</span>
              </div>
            </div>
            <div className="risk-breakdown">
              <div className="breakdown-item">
                <span className="breakdown-dot critical"></span>
                <span className="breakdown-label">Kritik</span>
                <span className="breakdown-value">{stats.critical}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-dot high"></span>
                <span className="breakdown-label">Yuqori</span>
                <span className="breakdown-value">{stats.high}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-dot medium"></span>
                <span className="breakdown-label">O'rta</span>
                <span className="breakdown-value">{stats.medium}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-dot good"></span>
                <span className="breakdown-label">Yaxshi</span>
                <span className="breakdown-value">{stats.good}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Donut Chart */}
        <div className="dash-card">
          <div className="card-header">
            <h3>Holat taqsimoti</h3>
          </div>
          <div className="donut-chart-container">
            <svg viewBox="0 0 120 120" className="donut-chart">
              {donutSegments.map((segment, idx) => (
                <path
                  key={idx}
                  d={createDonutPath(segment.startAngle, segment.endAngle, 50, 32)}
                  fill={segment.color}
                  className="donut-segment"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                />
              ))}
              <text x="60" y="56" textAnchor="middle" className="donut-center-value">{stats.total}</text>
              <text x="60" y="70" textAnchor="middle" className="donut-center-label">Jami</text>
            </svg>
            <div className="donut-legend">
              {donutData.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <span className="legend-color" style={{ background: item.color }}></span>
                  <span className="legend-label">{item.label}</span>
                  <span className="legend-value">{item.value}</span>
                  <span className="legend-percent">{Math.round((item.value / total) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart - Collapsible */}
        <div className={`dash-card wide collapsible ${chartExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="card-header clickable" onClick={() => setChartExpanded(!chartExpanded)}>
            <h3>Haftalik dinamika</h3>
            <button className="collapse-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={chartExpanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
              </svg>
            </button>
          </div>
          {chartExpanded && (
            <div className="chart-with-legend">
              <div className="bar-chart-container">
                <div className="chart-y-axis">
                  {[maxTrend, Math.round(maxTrend * 0.75), Math.round(maxTrend * 0.5), Math.round(maxTrend * 0.25), 0].map((val, idx) => (
                    <span key={idx}>{val}</span>
                  ))}
                </div>
                <div className="bar-chart">
                  {weeklyTrend.map((day, idx) => (
                    <div key={idx} className="bar-group">
                      <div className="bars">
                        <div
                          className="bar medium"
                          style={{ height: `${(day.medium / maxTrend) * 100}%` }}
                          title={`O'rta: ${day.medium}`}
                        ></div>
                        <div
                          className="bar good"
                          style={{ height: `${(day.good / maxTrend) * 100}%` }}
                          title={`Yaxshi: ${day.good}`}
                        ></div>
                        <div
                          className="bar resolved"
                          style={{ height: `${(day.resolved / maxTrend) * 100}%` }}
                          title={`Hal qilingan: ${day.resolved}`}
                        ></div>
                      </div>
                      <span className="bar-label">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-legend-vertical">
                <div className="legend-item-full">
                  <span className="legend-color-box medium"></span>
                  <span className="legend-text">O'rta xavflar</span>
                  <span className="legend-value">{stats.medium}</span>
                </div>
                <div className="legend-item-full">
                  <span className="legend-color-box good"></span>
                  <span className="legend-text">Yaxshi holat</span>
                  <span className="legend-value">{stats.good}</span>
                </div>
                <div className="legend-item-full">
                  <span className="legend-color-box resolved"></span>
                  <span className="legend-text">Hal qilingan</span>
                  <span className="legend-value">62</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="dash-secondary-grid">
        {/* Categories */}
        <div className="dash-card">
          <div className="card-header">
            <h3>Kategoriyalar</h3>
            <button className="see-all-btn" onClick={() => setShowAllCategories(!showAllCategories)}>
              {showAllCategories ? 'Yopish' : 'Barchasi'}
            </button>
          </div>
          <div className={`categories-list ${showAllCategories ? 'expanded' : ''}`}>
            {(showAllCategories ? categoryStats : categoryStats.slice(0, 6)).map((cat, idx) => (
              <div key={cat.id} className="category-row">
                <div className="category-rank">{idx + 1}</div>
                <div className="category-info">
                  <span className="category-name">{cat.name}</span>
                  <div className="category-bar-wrapper">
                    <div className="category-bar-track">
                      <div
                        className="category-bar-fill"
                        style={{
                          width: `${(cat.critical + cat.high) / cat.total * 100}%`,
                          background: cat.riskLevel === 'critical' ? '#ef4444' :
                                      cat.riskLevel === 'high' ? '#f97316' :
                                      cat.riskLevel === 'medium' ? '#f59e0b' : '#10b981'
                        }}
                      ></div>
                    </div>
                    <span className="category-stat">{cat.critical + cat.high}/{cat.total}</span>
                  </div>
                </div>
                <div className={`category-badge ${cat.riskLevel}`}>
                  {cat.critical > 0 ? cat.critical : cat.high > 0 ? cat.high : cat.medium}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="dash-card">
          <div className="card-header">
            <h3>Muhim ogohlantirishlar</h3>
            <button className="see-all-btn" onClick={() => setShowAllAlerts(!showAllAlerts)}>
              {showAllAlerts ? 'Yopish' : 'Barchasi'}
            </button>
          </div>
          <div className={`alerts-list ${showAllAlerts ? 'expanded' : ''}`}>
            {(showAllAlerts ? indicators.filter(r => r.status === 'critical' || r.status === 'high') : criticalIndicators).map((item, idx) => (
              <div key={item.id} className={`alert-row ${item.status}`}>
                <div className={`alert-indicator ${item.status}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.status === 'critical' ? (
                      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>
                    ) : (
                      <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>
                    )}
                  </svg>
                </div>
                <div className="alert-content">
                  <span className="alert-title">{item.name}</span>
                  <span className="alert-meta">{item.dataSource} • {item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="dash-card">
          <div className="card-header">
            <h3>Ma'lumot manbalari</h3>
            <button className="see-all-btn" onClick={() => setShowAllSources(!showAllSources)}>
              {showAllSources ? 'Yopish' : 'Barchasi'}
            </button>
          </div>
          <div className={`sources-list ${showAllSources ? 'expanded' : ''}`}>
            {(showAllSources ? dataSources : dataSources.slice(0, 6)).map((source, idx) => (
              <div key={idx} className="source-row">
                <div className="source-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <div className="source-info">
                  <span className="source-name">{source.name}</span>
                  <div className="source-stats">
                    <span>{source.count} ta indikator</span>
                    {source.critical > 0 && (
                      <span className="source-critical">{source.critical} xavfli</span>
                    )}
                  </div>
                </div>
                <div className="source-badge">{source.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dash-card">
          <div className="card-header">
            <h3>So'nggi faoliyat</h3>
            <button className="see-all-btn" onClick={() => setShowAllActivity(!showAllActivity)}>
              {showAllActivity ? 'Yopish' : 'Barchasi'}
            </button>
          </div>
          <div className={`activity-list ${showAllActivity ? 'expanded' : ''}`}>
            {recentActivity.map((activity) => (
              <div key={activity.id} className={`activity-row ${activity.type}`}>
                <div className={`activity-icon ${activity.type}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {activity.icon === 'alert' && <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>}
                    {activity.icon === 'check' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>}
                    {activity.icon === 'warning' && <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>}
                    {activity.icon === 'doc' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>}
                  </svg>
                </div>
                <div className="activity-content">
                  <span className="activity-message">{activity.message}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
