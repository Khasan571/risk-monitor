import { useState, useMemo } from 'react';
import { getStatusLabel, formatValue } from '../data/riskData';
import { getDetailedDataByIndicatorId, formatCurrency, formatDate, getReasonLabel } from '../data/debtData';
import { getCorruptionDataByIndicatorId, formatMoney } from '../data/corruptionData';
import Modal from './Modal';

const SortIcon = ({ direction }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sort-icon">
    {direction === 'asc' ? (
      <path d="M12 5v14M5 12l7-7 7 7"/>
    ) : direction === 'desc' ? (
      <path d="M12 19V5M5 12l7 7 7-7"/>
    ) : (
      <>
        <path d="M7 8l5-5 5 5" opacity="0.4"/>
        <path d="M7 16l5 5 5-5" opacity="0.4"/>
      </>
    )}
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

function RiskTable({ indicators, statusFilter, setStatusFilter, onUpdateIndicators }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [viewModal, setViewModal] = useState({ isOpen: false, indicator: null });
  const [editModal, setEditModal] = useState({ isOpen: false, indicator: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, indicator: null });
  const [editForm, setEditForm] = useState({});

  const statusFilters = [
    { id: 'all', label: 'Barchasi' },
    { id: 'critical', label: 'Kritik' },
    { id: 'high', label: 'Yuqori' },
    { id: 'medium', label: "O'rta" },
    { id: 'good', label: 'Yaxshi' },
  ];

  const filteredIndicators = statusFilter === 'all'
    ? indicators
    : indicators.filter(i => i.status === statusFilter);

  // Sorting
  const sortedIndicators = useMemo(() => {
    if (!sortConfig.key) return filteredIndicators;

    return [...filteredIndicators].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortConfig.key === 'status') {
        const statusOrder = { critical: 4, high: 3, medium: 2, low: 1, good: 0 };
        aValue = statusOrder[aValue] || 0;
        bValue = statusOrder[bValue] || 0;
      }

      if (sortConfig.key === 'currentValue') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredIndicators, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedIndicators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIndicators = sortedIndicators.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1);
  };

  const handleFilterChange = (filterId) => {
    setStatusFilter(filterId);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Action handlers
  const handleView = (indicator) => {
    setViewModal({ isOpen: true, indicator });
  };

  const handleEdit = (indicator) => {
    setEditForm({
      currentValue: indicator.currentValue,
      status: indicator.status,
      threshold: indicator.threshold
    });
    setEditModal({ isOpen: true, indicator });
  };

  const handleDelete = (indicator) => {
    setDeleteModal({ isOpen: true, indicator });
  };

  const confirmDelete = () => {
    if (deleteModal.indicator && onUpdateIndicators) {
      onUpdateIndicators(prev => prev.filter(i => i.id !== deleteModal.indicator.id));
    }
    setDeleteModal({ isOpen: false, indicator: null });
  };

  const confirmEdit = () => {
    if (editModal.indicator && onUpdateIndicators) {
      onUpdateIndicators(prev => prev.map(i =>
        i.id === editModal.indicator.id
          ? { ...i, ...editForm }
          : i
      ));
    }
    setEditModal({ isOpen: false, indicator: null });
  };

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Risk Indikatorlari ({filteredIndicators.length} ta)</h3>
        <div className="table-filters">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${statusFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="risk-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('name')}>
                <div className="th-content">
                  Indikator nomi
                  <SortIcon direction={sortConfig.key === 'name' ? sortConfig.direction : null} />
                </div>
              </th>
              <th>Mulkchilik</th>
              <th className="sortable" onClick={() => handleSort('currentValue')}>
                <div className="th-content">
                  Joriy qiymat
                  <SortIcon direction={sortConfig.key === 'currentValue' ? sortConfig.direction : null} />
                </div>
              </th>
              <th>Me'yor</th>
              <th className="sortable" onClick={() => handleSort('status')}>
                <div className="th-content">
                  Holat
                  <SortIcon direction={sortConfig.key === 'status' ? sortConfig.direction : null} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('dataSource')}>
                <div className="th-content">
                  Manba
                  <SortIcon direction={sortConfig.key === 'dataSource' ? sortConfig.direction : null} />
                </div>
              </th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {paginatedIndicators.map((indicator) => (
              <tr
                key={indicator.id}
                className="clickable-row"
                onClick={() => handleView(indicator)}
              >
                <td>
                  <div className="indicator-name">{indicator.name}</div>
                </td>
                <td>
                  <div className="ownership-badges">
                    {indicator.ownership.map((own) => (
                      <span
                        key={own}
                        className={`ownership-badge ${own.toLowerCase()}`}
                      >
                        {own}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="value-cell">
                  {formatValue(indicator.currentValue, indicator.unit)}
                </td>
                <td>{indicator.threshold}</td>
                <td>
                  <span className={`status-badge ${indicator.status}`}>
                    <span className="status-dot"></span>
                    {getStatusLabel(indicator.status)}
                  </span>
                </td>
                <td>
                  <span className="source-badge">{indicator.dataSource}</span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="action-buttons">
                    <button
                      className="action-btn view"
                      onClick={() => handleView(indicator)}
                      title="Ko'rish"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(indicator)}
                      title="Tahrirlash"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(indicator)}
                      title="O'chirish"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-pagination">
        <div className="pagination-info">
          <span>Sahifada:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="pagination-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="pagination-range">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedIndicators.length)} / {sortedIndicators.length}
          </span>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
            <ChevronLeft />
          </button>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          <div className="pagination-pages">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`dots-${index}`} className="pagination-dots">...</span>
              ) : (
                <button
                  key={page}
                  className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, indicator: null })}
        title="Indikator ma'lumotlari"
        size="xlarge"
      >
        {viewModal.indicator && (
          <div className="view-details">
            {/* Asosiy ma'lumotlar */}
            <div className="indicator-summary">
              <div className="detail-row">
                <span className="detail-label">Indikator nomi</span>
                <span className="detail-value">{viewModal.indicator.name}</span>
              </div>
              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-label">Kategoriya</span>
                  <span className="detail-value">{viewModal.indicator.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Mulkchilik</span>
                  <span className="detail-value">
                    {viewModal.indicator.ownership.join(', ')}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Joriy qiymat</span>
                  <span className="detail-value highlight">
                    {formatValue(viewModal.indicator.currentValue, viewModal.indicator.unit)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Holat</span>
                  <span className={`status-badge ${viewModal.indicator.status}`}>
                    <span className="status-dot"></span>
                    {getStatusLabel(viewModal.indicator.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Batafsil ma'lumotlar - Qarzdorlik */}
            {getDetailedDataByIndicatorId(viewModal.indicator.id) && (
              <div className="detailed-data-section">
                <h4 className="section-title">
                  {getDetailedDataByIndicatorId(viewModal.indicator.id).title}
                  <span className="count-badge">
                    {getDetailedDataByIndicatorId(viewModal.indicator.id).data.length} ta
                  </span>
                </h4>

                <div className="debt-table-wrapper">
                  <table className="debt-details-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Talaba</th>
                        <th>Fakultet / Guruh</th>
                        <th>Shartnoma</th>
                        <th>To'langan</th>
                        <th>Qarzdorlik</th>
                        <th>Oxirgi to'lov</th>
                        <th>Sababi</th>
                        <th>Ogohlantirish</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDetailedDataByIndicatorId(viewModal.indicator.id).data.map((student, index) => (
                        <tr key={student.id}>
                          <td className="row-number">{index + 1}</td>
                          <td>
                            <div className="student-info">
                              <span className="student-name">{student.fullName}</span>
                              <span className="student-id">{student.studentId}</span>
                            </div>
                          </td>
                          <td>
                            <div className="faculty-info">
                              <span className="faculty-name">{student.faculty}</span>
                              <span className="group-name">{student.group} / {student.course}-kurs</span>
                            </div>
                          </td>
                          <td className="amount-cell">{formatCurrency(student.contractAmount)}</td>
                          <td className="amount-cell paid">{formatCurrency(student.paidAmount)}</td>
                          <td className="amount-cell debt">{formatCurrency(student.debtAmount)}</td>
                          <td>
                            <div className="date-info">
                              <span className="date">{formatDate(student.lastPaymentDate)}</span>
                              <span className="days-badge">{student.debtDays} kun</span>
                            </div>
                          </td>
                          <td>
                            <div className="reason-info">
                              <span className={`reason-badge ${student.reason}`}>
                                {getReasonLabel(student.reason)}
                              </span>
                              {student.notes && (
                                <span className="reason-note" title={student.notes}>
                                  {student.notes}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={`warning-badge ${student.warnings >= 4 ? 'critical' : student.warnings >= 2 ? 'warning' : ''}`}>
                              {student.warnings}x
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3"><strong>Jami:</strong></td>
                        <td className="amount-cell">
                          <strong>
                            {formatCurrency(
                              getDetailedDataByIndicatorId(viewModal.indicator.id).data.reduce((sum, s) => sum + s.contractAmount, 0)
                            )}
                          </strong>
                        </td>
                        <td className="amount-cell paid">
                          <strong>
                            {formatCurrency(
                              getDetailedDataByIndicatorId(viewModal.indicator.id).data.reduce((sum, s) => sum + s.paidAmount, 0)
                            )}
                          </strong>
                        </td>
                        <td className="amount-cell debt">
                          <strong>
                            {formatCurrency(
                              getDetailedDataByIndicatorId(viewModal.indicator.id).data.reduce((sum, s) => sum + s.debtAmount, 0)
                            )}
                          </strong>
                        </td>
                        <td colSpan="3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Korrupsiya/Moliyaviy nazorat ma'lumotlari */}
            {getCorruptionDataByIndicatorId(viewModal.indicator.id) && (
              <div className="detailed-data-section">
                <h4 className="section-title">
                  {getCorruptionDataByIndicatorId(viewModal.indicator.id).title}
                  <span className="count-badge danger">
                    {getCorruptionDataByIndicatorId(viewModal.indicator.id).data.length} ta holat
                  </span>
                </h4>

                <div className="debt-table-wrapper">
                  <table className="debt-details-table corruption-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'restored' && (
                          <>
                            <th>Talaba</th>
                            <th>Fakultet</th>
                            <th>Chetlatilgan sana</th>
                            <th>Sababi</th>
                            <th>Tiklangan sana</th>
                            <th>Tiklagan shaxs</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'admission' && (
                          <>
                            <th>Talaba</th>
                            <th>Fakultet</th>
                            <th>DTM ball</th>
                            <th>Kerakli ball</th>
                            <th>Farq</th>
                            <th>Mas'ul shaxs</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'examFree' && (
                          <>
                            <th>Talaba</th>
                            <th>Fakultet</th>
                            <th>Fan</th>
                            <th>Baho</th>
                            <th>Kiritgan</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'attendance' && (
                          <>
                            <th>Talaba</th>
                            <th>Fakultet</th>
                            <th>Fan</th>
                            <th>HEMIS davomat</th>
                            <th>Biometrik</th>
                            <th>Farq</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'graduationGrades' && (
                          <>
                            <th>Talaba</th>
                            <th>Fan</th>
                            <th>Eski baho</th>
                            <th>Yangi baho</th>
                            <th>O'zgargan sana</th>
                            <th>O'zgartirgan</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'cancelledExpulsion' && (
                          <>
                            <th>Talaba</th>
                            <th>Fakultet</th>
                            <th>Chetlatish sanasi</th>
                            <th>Sababi</th>
                            <th>Bekor qilingan</th>
                            <th>Bekor qilgan</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'grades' && (
                          <>
                            <th>Talaba</th>
                            <th>Fan</th>
                            <th>Eski baho</th>
                            <th>Yangi baho</th>
                            <th>Muddatdan keyin</th>
                            <th>O'zgartirgan</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'ghost' && (
                          <>
                            <th>Talaba</th>
                            <th>Fakultet</th>
                            <th>Oxirgi faollik</th>
                            <th>Nofaol kunlar</th>
                            <th>To'langan</th>
                            <th>Davomat</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'payment' && (
                          <>
                            <th>Talaba</th>
                            <th>Bank summasi</th>
                            <th>Tizimda</th>
                            <th>Farq</th>
                            <th>Sana</th>
                            <th>Kassir</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'overcharge' && (
                          <>
                            <th>Talaba</th>
                            <th>Rasmiy narx</th>
                            <th>Olingan</th>
                            <th>Ortiqcha</th>
                            <th>Sana</th>
                            <th>Kassir</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'discount' && (
                          <>
                            <th>Talaba</th>
                            <th>Chegirma turi</th>
                            <th>Foiz</th>
                            <th>Summa</th>
                            <th>Tekshiruv</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'dorm' && (
                          <>
                            <th>Ism</th>
                            <th>Xona</th>
                            <th>Kirgan sana</th>
                            <th>Oylik to'lov</th>
                            <th>Talaba holati</th>
                            <th>Aloqa</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'dormPayment' && (
                          <>
                            <th>Talaba</th>
                            <th>Xona</th>
                            <th>Rasmiy narx</th>
                            <th>Olingan</th>
                            <th>Ortiqcha</th>
                            <th>Yig'uvchi</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'queue' && (
                          <>
                            <th>Talaba</th>
                            <th>Viloyat</th>
                            <th>Navbat</th>
                            <th>O'tkazilganlar</th>
                            <th>Aloqa</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'quota' && (
                          <>
                            <th>Talaba</th>
                            <th>Kvota turi</th>
                            <th>Tekshiruv</th>
                            <th>Haqiqiy holat</th>
                            <th>Tejangan</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'grant' && (
                          <>
                            <th>Grant egasi</th>
                            <th>DTM ball</th>
                            <th>Kontrakt talaba</th>
                            <th>DTM ball</th>
                            <th>Summa</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'ghostEmp' && (
                          <>
                            <th>Xodim</th>
                            <th>Lavozim</th>
                            <th>Bo'lim</th>
                            <th>Maosh</th>
                            <th>Nofaol kunlar</th>
                            <th>Olingan summa</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'nepotism' && (
                          <>
                            <th>1-xodim</th>
                            <th>Lavozim</th>
                            <th>2-xodim</th>
                            <th>Lavozim</th>
                            <th>Qarindoshlik</th>
                            <th>Holat</th>
                          </>
                        )}
                        {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'multiJob' && (
                          <>
                            <th>Xodim</th>
                            <th>1-OTM</th>
                            <th>Maosh</th>
                            <th>2-OTM</th>
                            <th>Maosh</th>
                            <th>Jami</th>
                            <th>Holat</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {getCorruptionDataByIndicatorId(viewModal.indicator.id).data.map((item, index) => (
                        <tr key={item.id}>
                          <td className="row-number">{index + 1}</td>

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'restored' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.faculty}</td>
                              <td>{item.expelledDate}</td>
                              <td><span className="reason-note">{item.expelReason}</span></td>
                              <td>{item.restoredDate}</td>
                              <td><span className="reason-note">{item.restoredBy}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'admission' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.faculty}</td>
                              <td className="amount-cell">{item.dtmScore}</td>
                              <td className="amount-cell">{item.requiredScore}</td>
                              <td className="amount-cell debt">{item.scoreDifference}</td>
                              <td><span className="reason-note">{item.responsiblePerson}</span></td>
                              <td><span className={`status-badge-sm ${item.status === 'Tasdiqlangan' ? 'critical' : 'warning'}`}>{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'examFree' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.faculty}</td>
                              <td>{item.subject}</td>
                              <td className="amount-cell">{item.gradeEntered}</td>
                              <td><span className="reason-note">{item.enteredBy}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'attendance' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.faculty}</td>
                              <td>{item.subject}</td>
                              <td className="amount-cell">{item.hemisAttendance}%</td>
                              <td className="amount-cell">{item.biometricAttendance}%</td>
                              <td className="amount-cell debt">{item.difference}%</td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'graduationGrades' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.subject}</td>
                              <td className="amount-cell">{item.originalGrade}</td>
                              <td className="amount-cell paid">{item.changedGrade}</td>
                              <td>{item.changeDate}</td>
                              <td><span className="reason-note">{item.changedBy}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'cancelledExpulsion' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.faculty}</td>
                              <td>{item.expelDate}</td>
                              <td><span className="reason-note">{item.expelReason}</span></td>
                              <td>{item.cancelDate}</td>
                              <td><span className="reason-note">{item.cancelledBy}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'grades' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.subject}</td>
                              <td className="amount-cell">{item.oldGrade}</td>
                              <td className="amount-cell paid">{item.newGrade}</td>
                              <td><span className="days-badge">{item.daysAfterDeadline} kun</span></td>
                              <td><span className="reason-note">{item.changedBy}</span></td>
                              <td><span className={`status-badge-sm ${item.status === 'Tasdiqlangan' ? 'critical' : 'warning'}`}>{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'ghost' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.faculty}</td>
                              <td>{item.lastActivity}</td>
                              <td><span className="days-badge">{item.inactiveDays} kun</span></td>
                              <td className="amount-cell">{formatMoney(item.paidAmount)}</td>
                              <td className="amount-cell debt">{item.attendancePercent}%</td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'payment' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td className="amount-cell paid">{formatMoney(item.bankAmount)}</td>
                              <td className="amount-cell">{formatMoney(item.billingAmount)}</td>
                              <td className="amount-cell debt">{formatMoney(item.difference)}</td>
                              <td>{item.transactionDate}</td>
                              <td><span className="reason-note">{item.cashier}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'overcharge' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td className="amount-cell">{formatMoney(item.officialRate)}</td>
                              <td className="amount-cell">{formatMoney(item.chargedAmount)}</td>
                              <td className="amount-cell debt">{formatMoney(item.overcharge)}</td>
                              <td>{item.paymentDate}</td>
                              <td><span className="reason-note">{item.cashier}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'discount' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td><span className="reason-badge financial">{item.discountType}</span></td>
                              <td className="amount-cell">{item.discountPercent}%</td>
                              <td className="amount-cell debt">{formatMoney(item.discountAmount)}</td>
                              <td><span className="status-badge-sm critical">{item.verificationStatus}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'dorm' && (
                            <>
                              <td><span className="student-name">{item.fullName}</span></td>
                              <td>{item.dormId}</td>
                              <td>{item.checkInDate}</td>
                              <td className="amount-cell">{formatMoney(item.monthlyPayment)}</td>
                              <td><span className="status-badge-sm critical">{item.studentStatus}</span></td>
                              <td><span className="reason-note">{item.relationship}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'dormPayment' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.dormRoom}</td>
                              <td className="amount-cell">{formatMoney(item.officialRate)}</td>
                              <td className="amount-cell">{formatMoney(item.chargedAmount)}</td>
                              <td className="amount-cell debt">{formatMoney(item.overcharge)}</td>
                              <td><span className="reason-note">{item.collectedBy}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'queue' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td>{item.homeRegion}</td>
                              <td className="amount-cell">{item.queuePosition || 'Navbatsiz'}</td>
                              <td className="amount-cell debt">{item.studentsSkipped} ta</td>
                              <td><span className="reason-note">{item.connection}</span></td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'quota' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.studentId}</span></div></td>
                              <td><span className="reason-badge family">{item.quotaType}</span></td>
                              <td><span className="status-badge-sm critical">{item.verificationResult}</span></td>
                              <td><span className="reason-note">{item.realStatus}</span></td>
                              <td className="amount-cell debt">{formatMoney(item.savedAmount)}</td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'grant' && (
                            <>
                              <td><span className="student-name">{item.grantStudentName}</span></td>
                              <td className="amount-cell paid">{item.dtmScore}</td>
                              <td><span className="student-name">{item.contractStudentName}</span></td>
                              <td className="amount-cell debt">{item.contractDtmScore}</td>
                              <td className="amount-cell debt">{formatMoney(item.transactionAmount)}</td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'ghostEmp' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.empId}</span></div></td>
                              <td>{item.position}</td>
                              <td>{item.department}</td>
                              <td className="amount-cell">{formatMoney(item.salary)}</td>
                              <td><span className="days-badge">{item.inactiveDays} kun</span></td>
                              <td className="amount-cell debt">{formatMoney(item.totalReceivedInactive)}</td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'nepotism' && (
                            <>
                              <td><span className="student-name">{item.emp1Name}</span></td>
                              <td>{item.emp1Position}</td>
                              <td><span className="student-name">{item.emp2Name}</span></td>
                              <td>{item.emp2Position}</td>
                              <td><span className="reason-badge family">{item.relationship}</span></td>
                              <td><span className="status-badge-sm warning">{item.status}</span></td>
                            </>
                          )}

                          {getCorruptionDataByIndicatorId(viewModal.indicator.id).type === 'multiJob' && (
                            <>
                              <td><div className="student-info"><span className="student-name">{item.fullName}</span><span className="student-id">{item.jshshir}</span></div></td>
                              <td><span className="reason-note">{item.otm1}</span></td>
                              <td className="amount-cell">{formatMoney(item.salary1)}</td>
                              <td><span className="reason-note">{item.otm2}</span></td>
                              <td className="amount-cell">{formatMoney(item.salary2)}</td>
                              <td className="amount-cell debt">{formatMoney(item.totalSalary)}</td>
                              <td><span className="status-badge-sm critical">{item.status}</span></td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {viewModal.indicator.notes && (
                  <div className="corruption-notes">
                    <strong>Izoh:</strong> {viewModal.indicator.notes}
                  </div>
                )}
              </div>
            )}

            {/* Oddiy indikatorlar uchun qo'shimcha ma'lumot */}
            {!getDetailedDataByIndicatorId(viewModal.indicator.id) && !getCorruptionDataByIndicatorId(viewModal.indicator.id) && (
              <div className="additional-info">
                <div className="detail-row">
                  <span className="detail-label">Me'yor</span>
                  <span className="detail-value">{viewModal.indicator.threshold}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Risk holati</span>
                  <span className="detail-value">{viewModal.indicator.riskCondition}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ma'lumot manbai</span>
                  <span className="detail-value">{viewModal.indicator.dataSource}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, indicator: null })}
        title="Indikatorni tahrirlash"
      >
        {editModal.indicator && (
          <div className="edit-form">
            <div className="form-group">
              <label>Indikator nomi</label>
              <input
                type="text"
                value={editModal.indicator.name}
                disabled
                className="form-input disabled"
              />
            </div>
            <div className="form-group">
              <label>Joriy qiymat</label>
              <input
                type="number"
                value={editForm.currentValue}
                onChange={(e) => setEditForm(prev => ({ ...prev, currentValue: Number(e.target.value) }))}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Me'yor</label>
              <input
                type="text"
                value={editForm.threshold}
                onChange={(e) => setEditForm(prev => ({ ...prev, threshold: e.target.value }))}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Holat</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                className="form-select"
              >
                <option value="good">Yaxshi</option>
                <option value="low">Past</option>
                <option value="medium">O'rta</option>
                <option value="high">Yuqori</option>
                <option value="critical">Kritik</option>
              </select>
            </div>
            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setEditModal({ isOpen: false, indicator: null })}
              >
                Bekor qilish
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmEdit}
              >
                Saqlash
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, indicator: null })}
        title="O'chirishni tasdiqlash"
        size="small"
      >
        {deleteModal.indicator && (
          <div className="delete-confirm">
            <p className="delete-message">
              Quyidagi indikatorni o'chirishni xohlaysizmi?
            </p>
            <p className="delete-item-name">
              "{deleteModal.indicator.name}"
            </p>
            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteModal({ isOpen: false, indicator: null })}
              >
                Bekor qilish
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                O'chirish
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default RiskTable;
