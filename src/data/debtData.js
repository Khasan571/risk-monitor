// Qarzdor talabalar batafsil ma'lumotlari
export const debtReasons = {
  financial: "Moliyaviy qiyinchilik",
  family: "Oilaviy muammolar",
  health: "Sog'liq muammolari",
  work: "Ishdan bo'shatilish",
  forgot: "Unutilgan",
  dispute: "To'lov bo'yicha nizo",
  abroad: "Chet elda",
  unknown: "Noma'lum"
};

// 1 yildan ortiq to'lov qilmagan talabalar (id: 83)
export const debtStudents1Year = [
  {
    id: 1,
    studentId: "STU-2023-001245",
    fullName: "Karimov Jasur Anvarovich",
    faculty: "Axborot texnologiyalari",
    course: 3,
    group: "AT-21",
    phone: "+998901234567",
    email: "jasur.karimov@mail.uz",
    contractAmount: 12500000,
    paidAmount: 6250000,
    debtAmount: 6250000,
    lastPaymentDate: "2024-01-15",
    debtDays: 365,
    reason: "financial",
    notes: "Ota-onasi ishsiz qolgan",
    warnings: 3
  },
  {
    id: 2,
    studentId: "STU-2022-003421",
    fullName: "Rahimova Nilufar Bahodirovna",
    faculty: "Iqtisodiyot",
    course: 4,
    group: "IQ-20",
    phone: "+998912345678",
    email: "nilufar.r@mail.uz",
    contractAmount: 11000000,
    paidAmount: 2750000,
    debtAmount: 8250000,
    lastPaymentDate: "2023-11-20",
    debtDays: 420,
    reason: "family",
    notes: "Oilaviy ajralish jarayonida",
    warnings: 4
  },
  {
    id: 3,
    studentId: "STU-2023-002156",
    fullName: "Toshmatov Sardor Kamoliddinovich",
    faculty: "Huquqshunoslik",
    course: 2,
    group: "H-22",
    phone: "+998933456789",
    email: "sardor.t@gmail.com",
    contractAmount: 14000000,
    paidAmount: 7000000,
    debtAmount: 7000000,
    lastPaymentDate: "2024-01-05",
    debtDays: 375,
    reason: "work",
    notes: "Part-time ishdan bo'shatilgan",
    warnings: 3
  },
  {
    id: 4,
    studentId: "STU-2021-004532",
    fullName: "Aliyeva Madina Rustamovna",
    faculty: "Tibbiyot",
    course: 5,
    group: "TIB-19",
    phone: "+998944567890",
    email: "madina.a@inbox.uz",
    contractAmount: 18000000,
    paidAmount: 4500000,
    debtAmount: 13500000,
    lastPaymentDate: "2023-09-10",
    debtDays: 492,
    reason: "health",
    notes: "Uzoq muddatli davolanish",
    warnings: 5
  },
  {
    id: 5,
    studentId: "STU-2022-005678",
    fullName: "Nazarov Bekzod Ilhomovich",
    faculty: "Qurilish",
    course: 3,
    group: "QUR-21",
    phone: "+998955678901",
    email: "bekzod.n@mail.ru",
    contractAmount: 10500000,
    paidAmount: 3500000,
    debtAmount: 7000000,
    lastPaymentDate: "2023-12-01",
    debtDays: 410,
    reason: "abroad",
    notes: "Rossiyada ishlamoqda",
    warnings: 4
  },
  {
    id: 6,
    studentId: "STU-2023-006789",
    fullName: "Saidova Zarina Akmalovna",
    faculty: "Filologiya",
    course: 2,
    group: "FIL-22",
    phone: "+998966789012",
    email: "zarina.s@gmail.com",
    contractAmount: 9000000,
    paidAmount: 2250000,
    debtAmount: 6750000,
    lastPaymentDate: "2024-01-10",
    debtDays: 370,
    reason: "financial",
    notes: "Kam ta'minlangan oila",
    warnings: 3
  },
  {
    id: 7,
    studentId: "STU-2022-007890",
    fullName: "Xudoyberdiyev Shoxrux Dilshodovich",
    faculty: "Mexanika",
    course: 4,
    group: "MEX-20",
    phone: "+998977890123",
    email: "shoxrux.x@mail.uz",
    contractAmount: 11500000,
    paidAmount: 5750000,
    debtAmount: 5750000,
    lastPaymentDate: "2023-10-25",
    debtDays: 447,
    reason: "dispute",
    notes: "Chegirma bo'yicha nizo",
    warnings: 2
  },
  {
    id: 8,
    studentId: "STU-2021-008901",
    fullName: "Mirzayeva Gulnora Toxirovna",
    faculty: "Kimyo",
    course: 5,
    group: "KIM-19",
    phone: "+998988901234",
    email: "gulnora.m@inbox.uz",
    contractAmount: 13000000,
    paidAmount: 3250000,
    debtAmount: 9750000,
    lastPaymentDate: "2023-08-15",
    debtDays: 518,
    reason: "family",
    notes: "Otasi vafot etgan",
    warnings: 4
  }
];

// 6-12 oy to'lov qilmagan talabalar (id: 84)
export const debtStudents6to12Months = [
  {
    id: 1,
    studentId: "STU-2023-010111",
    fullName: "Abdullayev Javohir Sherzodovich",
    faculty: "Arxitektura",
    course: 3,
    group: "ARX-21",
    phone: "+998901112233",
    email: "javohir.a@mail.uz",
    contractAmount: 15000000,
    paidAmount: 11250000,
    debtAmount: 3750000,
    lastPaymentDate: "2025-04-20",
    debtDays: 269,
    reason: "financial",
    notes: "Tadbirkorlik muammolari",
    warnings: 2
  },
  {
    id: 2,
    studentId: "STU-2022-011222",
    fullName: "Qosimova Sevara Ulug'bekovna",
    faculty: "Matematika",
    course: 4,
    group: "MAT-20",
    phone: "+998912223344",
    email: "sevara.q@gmail.com",
    contractAmount: 10000000,
    paidAmount: 5000000,
    debtAmount: 5000000,
    lastPaymentDate: "2025-05-10",
    debtDays: 249,
    reason: "forgot",
    notes: "To'lovni unutgan",
    warnings: 2
  },
  {
    id: 3,
    studentId: "STU-2023-012333",
    fullName: "Yusupov Azizbek Toxirovich",
    faculty: "Fizika",
    course: 2,
    group: "FIZ-22",
    phone: "+998923334455",
    email: "azizbek.y@mail.ru",
    contractAmount: 11000000,
    paidAmount: 8250000,
    debtAmount: 2750000,
    lastPaymentDate: "2025-06-05",
    debtDays: 223,
    reason: "work",
    notes: "Yangi ish qidirmoqda",
    warnings: 1
  },
  {
    id: 4,
    studentId: "STU-2021-013444",
    fullName: "Ergasheva Dilfuza Normurodovna",
    faculty: "Biologiya",
    course: 5,
    group: "BIO-19",
    phone: "+998934445566",
    email: "dilfuza.e@inbox.uz",
    contractAmount: 12500000,
    paidAmount: 6250000,
    debtAmount: 6250000,
    lastPaymentDate: "2025-03-15",
    debtDays: 305,
    reason: "health",
    notes: "Kasallik tufayli",
    warnings: 2
  },
  {
    id: 5,
    studentId: "STU-2022-014555",
    fullName: "Mamatov Otabek Dilmurodovich",
    faculty: "Tarix",
    course: 3,
    group: "TAR-21",
    phone: "+998945556677",
    email: "otabek.m@mail.uz",
    contractAmount: 9500000,
    paidAmount: 4750000,
    debtAmount: 4750000,
    lastPaymentDate: "2025-05-25",
    debtDays: 234,
    reason: "financial",
    notes: "Oilaviy daromad kamaygan",
    warnings: 2
  }
];

// 3-6 oy to'lov qilmagan talabalar (id: 85)
export const debtStudents3to6Months = [
  {
    id: 1,
    studentId: "STU-2023-020111",
    fullName: "Tursunov Ulug'bek Bahodirovich",
    faculty: "Geografiya",
    course: 2,
    group: "GEO-22",
    phone: "+998901234111",
    email: "ulugbek.t@mail.uz",
    contractAmount: 10000000,
    paidAmount: 7500000,
    debtAmount: 2500000,
    lastPaymentDate: "2025-09-10",
    debtDays: 126,
    reason: "forgot",
    notes: "Esdan chiqargan",
    warnings: 1
  },
  {
    id: 2,
    studentId: "STU-2022-021222",
    fullName: "Xolmatova Dilnoza Karimovna",
    faculty: "Psixologiya",
    course: 3,
    group: "PSI-21",
    phone: "+998912345222",
    email: "dilnoza.x@gmail.com",
    contractAmount: 11500000,
    paidAmount: 8625000,
    debtAmount: 2875000,
    lastPaymentDate: "2025-10-05",
    debtDays: 101,
    reason: "financial",
    notes: "Vaqtinchalik moliyaviy qiyinchilik",
    warnings: 1
  },
  {
    id: 3,
    studentId: "STU-2023-022333",
    fullName: "Sobirov Jahongir Rustamovich",
    faculty: "Jurnalistika",
    course: 2,
    group: "JUR-22",
    phone: "+998923456333",
    email: "jahongir.s@mail.ru",
    contractAmount: 9000000,
    paidAmount: 4500000,
    debtAmount: 4500000,
    lastPaymentDate: "2025-08-20",
    debtDays: 147,
    reason: "work",
    notes: "Ishdan bo'shab qolgan",
    warnings: 1
  }
];

// Umumiy qarzdor talabalar ro'yxati (id: 87)
export const allDebtStudents = [
  ...debtStudents1Year,
  ...debtStudents6to12Months,
  ...debtStudents3to6Months
];

// Ma'lumotlarni formatlash funksiyasi
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getReasonLabel = (reason) => {
  return debtReasons[reason] || "Noma'lum";
};

// Indikator ID bo'yicha tegishli ma'lumotlarni olish
export const getDetailedDataByIndicatorId = (indicatorId) => {
  switch (indicatorId) {
    case 83: // 1 yildan ortiq to'lov qilmagan
      return {
        type: 'debt',
        title: "1 yildan ortiq to'lov qilmagan talabalar",
        data: debtStudents1Year
      };
    case 84: // 6-12 oy
      return {
        type: 'debt',
        title: "6-12 oy to'lov qilmagan talabalar",
        data: debtStudents6to12Months
      };
    case 85: // 3-6 oy
      return {
        type: 'debt',
        title: "3-6 oy to'lov qilmagan talabalar",
        data: debtStudents3to6Months
      };
    case 87: // Qarzdor talabalar umumiy
      return {
        type: 'debt',
        title: "Qarzdor talabalar umumiy ro'yxati",
        data: allDebtStudents
      };
    default:
      return null;
  }
};
