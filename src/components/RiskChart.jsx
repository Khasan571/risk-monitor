import { riskIndicators, riskCategories } from '../data/riskData';

function RiskChart() {
  const statusCounts = {
    good: riskIndicators.filter(r => r.status === 'good' || r.status === 'low').length,
    medium: riskIndicators.filter(r => r.status === 'medium').length,
    high: riskIndicators.filter(r => r.status === 'high').length,
    critical: riskIndicators.filter(r => r.status === 'critical').length,
  };

  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const bars = [
    { label: 'Yaxshi', count: statusCounts.good, color: '#059669' },
    { label: "O'rta", count: statusCounts.medium, color: '#d97706' },
    { label: 'Yuqori', count: statusCounts.high, color: '#ea580c' },
    { label: 'Kritik', count: statusCounts.critical, color: '#dc2626' },
  ];

  const categoryCounts = riskCategories
    .filter(c => c.id !== 'all')
    .map(category => ({
      ...category,
      count: riskIndicators.filter(r => r.category === category.id).length,
    }))
    .filter(c => c.count > 0);

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h4>Xavf darajasi taqsimoti</h4>
        <div className="risk-distribution">
          <div className="risk-bar-chart">
            {bars.map((bar) => (
              <div key={bar.label} className="risk-bar-item">
                <span className="risk-bar-label">{bar.label}</span>
                <div className="risk-bar-container">
                  <div
                    className="risk-bar"
                    style={{
                      width: `${(bar.count / total) * 100}%`,
                      backgroundColor: bar.color,
                    }}
                  />
                </div>
                <span className="risk-bar-value">{bar.count}</span>
              </div>
            ))}
          </div>
          <div className="risk-legend">
            {bars.map((bar) => (
              <div key={bar.label} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: bar.color }}
                />
                <span className="legend-text">
                  {bar.label} ({Math.round((bar.count / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-card">
        <h4>Kategoriya bo'yicha indikatorlar</h4>
        <div className="category-stats">
          {categoryCounts.map((category) => (
            <div key={category.id} className="category-stat-item">
              <span className="category-stat-name">{category.name}</span>
              <span className="category-stat-value">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RiskChart;
