import { useState, useMemo, useRef } from 'react';
import { getStatusLabel } from '../data/riskData';
import { getStudentsByIndicator } from '../data/studentsData';
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

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// Talabalar ro'yxati komponenti
const StudentListSection = ({ indicatorName, universityId }) => {
  const students = getStudentsByIndicator(indicatorName, universityId);

  if (!students || students.length === 0) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">Tegishli talabalar</h4>
        <div className="no-students">
          <UserIcon />
          <p>Bu indikator uchun talabalar topilmadi</p>
        </div>
      </div>
    );
  }

  // Ikki OTMda o'qiyotganlar uchun maxsus jadval
  if (indicatorName === "Ikki OTMda bir vaqtda o'qiyotganlar") {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Ikki OTMda bir vaqtda o'qiyotgan talabalar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table dual-enrollment">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>1-OTM</th>
                <th>2-OTM</th>
                <th>Kurs</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row critical">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">
                    <div className="student-name-info">
                      <span className="name">{student.fullName}</span>
                      <span className="note">{student.note}</span>
                    </div>
                  </td>
                  <td>
                    <div className="university-info">
                      <span className="uni-name">{student.university1}</span>
                      <span className="faculty">{student.faculty1}</span>
                    </div>
                  </td>
                  <td>
                    <div className="university-info">
                      <span className="uni-name">{student.university2}</span>
                      <span className="faculty">{student.faculty2}</span>
                    </div>
                  </td>
                  <td className="course-cell">{student.course}-kurs</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Kurs bo'yicha xavf tahlili
  if (indicatorName === "Kurs bo'yicha xavf tahlili") {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Kurs bo'yicha xavfda bo'lgan talabalar ({students.length} ta)
        </h4>
        <div className="course-risk-info">
          <p>Maktabni bitirgan yilga ko'ra hozirgi kurs mos kelmaydigan talabalar. Masalan: 2022-yilda maktabni bitirgan talaba 2026-yilda 4-kursda bo'lishi kerak.</p>
        </div>
        <div className="student-table-wrapper">
          <table className="student-list-table course-risk">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>Maktab bitirgan</th>
                <th>Kutilgan kurs</th>
                <th>Hozirgi kurs</th>
                <th>Holat</th>
                <th>GPA</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className={`student-row ${student.riskLevel}`}>
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university}</td>
                  <td>{student.faculty}</td>
                  <td className="year-cell">{student.schoolGraduationYear}</td>
                  <td className="course-cell">{student.expectedCourse}-kurs</td>
                  <td className="course-cell">{student.course}-kurs</td>
                  <td>
                    <span className={`risk-badge ${student.riskLevel}`}>
                      {student.yearsBehind} yil orqada
                    </span>
                  </td>
                  <td className={`gpa-cell ${parseFloat(student.gpa) < 2.5 ? 'low' : ''}`}>
                    {student.gpa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Stipendiya to'lanmaganlar uchun maxsus jadval
  if (indicatorName === "Stipendiya to'lanmagan talabalar") {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Stipendiya to'lanmagan talabalar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table scholarship">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>GPA</th>
                <th>To'lanmagan oy</th>
                <th>Summa</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row warning">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university?.toUpperCase()}</td>
                  <td>{student.faculty}</td>
                  <td className="gpa-cell">{student.gpa}</td>
                  <td className="months-cell">{student.unpaidMonths} oy</td>
                  <td className="amount-cell">{(student.amount / 1000000).toFixed(1)} mln</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Vizasi tugagan talabalar uchun maxsus jadval
  if (indicatorName.includes("vizasi")) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Vizasi muammoli talabalar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table visa">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>Davlat</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>Viza tugash</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row warning">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.country}</td>
                  <td>{student.university?.toUpperCase()}</td>
                  <td>{student.faculty}</td>
                  <td className="date-cell">{student.visaExpiry}</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Hujjatlari to'liq emas talabalar
  if (indicatorName.includes("Hujjatlari")) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Hujjatlari to'liq emas talabalar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>Kurs</th>
                <th>Yetishmayotgan hujjatlar</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row warning">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university}</td>
                  <td>{student.faculty}</td>
                  <td className="course-cell">{student.course}-kurs</td>
                  <td className="docs-cell">{student.missingDocs?.join(', ')}</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Akademik ta'til muddati o'tganlar
  if (indicatorName.includes("ta'til")) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Akademik ta'til muddati o'tganlar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Ta'til boshlanishi</th>
                <th>Ta'til tugashi</th>
                <th>Sabab</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row warning">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university}</td>
                  <td className="date-cell">{student.leaveStart}</td>
                  <td className="date-cell critical">{student.leaveEnd}</td>
                  <td>{student.reason}</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Passport eskirgan
  if (indicatorName.includes("Passport")) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Passport ma'lumotlari eskirgan ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>Kurs</th>
                <th>Passport muddati</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row warning">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university}</td>
                  <td>{student.faculty}</td>
                  <td className="course-cell">{student.course}-kurs</td>
                  <td className="date-cell critical">{student.passportExpiry}</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Ro'yxatdan o'tkazilmagan
  if (indicatorName.includes("ro'yxatdan")) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          Ro'yxatdan o'tkazilmagan talabalar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table">
            <thead>
              <tr>
                <th>Vaqtincha ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>Qabul sanasi</th>
                <th>Izoh</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row critical">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university}</td>
                  <td>{student.faculty}</td>
                  <td className="date-cell">{student.admissionDate}</td>
                  <td className="note-cell">{student.note}</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // O'qishdan chetlatilganlar
  if (indicatorName.includes("chetlatilganlar")) {
    return (
      <div className="student-list-section">
        <h4 className="student-list-title">
          <UserIcon />
          O'qishdan chetlatilgan talabalar ({students.length} ta)
        </h4>
        <div className="student-table-wrapper">
          <table className="student-list-table">
            <thead>
              <tr>
                <th>HEMIS ID</th>
                <th>F.I.O.</th>
                <th>OTM</th>
                <th>Fakultet</th>
                <th>Chetlatish sanasi</th>
                <th>Sabab</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row critical">
                  <td className="hemis-cell">{student.hemisId}</td>
                  <td className="name-cell">{student.fullName}</td>
                  <td>{student.university}</td>
                  <td>{student.faculty}</td>
                  <td className="date-cell">{student.expelDate}</td>
                  <td className="reason-cell">{student.reason}</td>
                  <td className="phone-cell">
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Umumiy talabalar jadvali
  return (
    <div className="student-list-section">
      <h4 className="student-list-title">
        <UserIcon />
        Tegishli talabalar ({students.length} ta)
      </h4>
      <div className="student-table-wrapper">
        <table className="student-list-table">
          <thead>
            <tr>
              <th>HEMIS ID</th>
              <th>F.I.O.</th>
              <th>OTM</th>
              <th>Fakultet</th>
              <th>Kurs</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="student-row">
                <td className="hemis-cell">{student.hemisId}</td>
                <td className="name-cell">{student.fullName}</td>
                <td>{student.university?.toUpperCase() || '-'}</td>
                <td>{student.faculty || '-'}</td>
                <td className="course-cell">{student.course ? `${student.course}-kurs` : '-'}</td>
                <td className="phone-cell">
                  {student.phone && (
                    <a href={`tel:${student.phone}`} className="phone-link">
                      <PhoneIcon />
                      {student.phone}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function RiskTable({ indicators, statusFilter, setStatusFilter, onImportExcel, onIndicatorClick }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewModal, setViewModal] = useState({ isOpen: false, indicator: null });

  // File input ref for import
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && onImportExcel) {
      onImportExcel(file);
    }
    // Reset input so same file can be selected again
    event.target.value = '';
  };

  const statusFilters = [
    { id: 'all', label: 'Barchasi' },
    { id: 'critical', label: 'Kritik' },
    { id: 'high', label: 'Yuqori' },
    { id: 'medium', label: "O'rta" },
    { id: 'good', label: 'Yaxshi' },
  ];

  const filteredIndicators = statusFilter === 'all'
    ? indicators
    : indicators.filter(i => i.status === statusFilter || (statusFilter === 'good' && i.status === 'low'));

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

      if (sortConfig.key === 'value') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredIndicators, sortConfig]);

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

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Risk Indikatorlari ({filteredIndicators.length} ta)</h3>
        <div className="table-filters">
          {onImportExcel && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".xlsx,.xls,.csv"
                style={{ display: 'none' }}
              />
              <button
                className="filter-btn excel-import-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Excel fayldan ma'lumot yuklash"
              >
                <UploadIcon />
                <span>Excel yuklash</span>
              </button>
            </>
          )}
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
              <th className="sortable" onClick={() => handleSort('value')}>
                <div className="th-content">
                  Qiymat
                  <SortIcon direction={sortConfig.key === 'value' ? sortConfig.direction : null} />
                </div>
              </th>
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
              <th>Yangilangan</th>
              <th>Ko'rish</th>
            </tr>
          </thead>
          <tbody>
            {paginatedIndicators.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">Ma'lumot topilmadi</td>
              </tr>
            ) : (
              paginatedIndicators.map((indicator) => (
                <tr
                  key={indicator.id}
                  className="clickable-row"
                  onClick={() => {
                    if (indicator.category === 'talaba' && onIndicatorClick) {
                      onIndicatorClick(indicator);
                    } else {
                      setViewModal({ isOpen: true, indicator });
                    }
                  }}
                >
                  <td>
                    <div className="indicator-name">{indicator.name}</div>
                  </td>
                  <td className="value-cell">
                    <strong>{indicator.value}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${indicator.status}`}>
                      <span className="status-dot"></span>
                      {getStatusLabel(indicator.status)}
                    </span>
                  </td>
                  <td>
                    <span className="source-badge">{indicator.dataSource}</span>
                  </td>
                  <td className="time-cell">{indicator.lastUpdated}</td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (indicator.category === 'talaba' && onIndicatorClick) {
                          onIndicatorClick(indicator);
                        } else {
                          setViewModal({ isOpen: true, indicator });
                        }
                      }}
                      title="Ko'rish"
                    >
                      <EyeIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
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
      )}

      {/* View Modal - faqat talaba bo'lmagan kategoriyalar uchun */}
      <Modal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, indicator: null })}
        title="Indikator ma'lumotlari"
        size="medium"
      >
        {viewModal.indicator && (
          <div className="view-details">
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
                  <span className="detail-label">Qiymat</span>
                  <span className="detail-value highlight">{viewModal.indicator.value}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Holat</span>
                  <span className={`status-badge ${viewModal.indicator.status}`}>
                    <span className="status-dot"></span>
                    {getStatusLabel(viewModal.indicator.status)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Manba</span>
                  <span className="detail-value">{viewModal.indicator.dataSource}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Yangilangan</span>
                  <span className="detail-value">{viewModal.indicator.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default RiskTable;
export { StudentListSection };
