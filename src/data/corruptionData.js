// Moliyaviy nazorat - batafsil test ma'lumotlari

// ========== HEMIS PLATFORMASI ==========

// ID: 200 - Arxivdan qayta tiklangan talabalar
export const restoredStudents = [
  {
    id: 1,
    studentId: "STU-2020-000123",
    fullName: "Karimov Jasur Anvarovich",
    faculty: "Tibbiyot",
    expelledDate: "2022-06-15",
    expelReason: "Akademik qarzdorlik",
    restoredDate: "2024-09-01",
    restoredBy: "Aliyev R.S. (O'quv bo'limi)",
    orderNumber: "T-2024/089",
    daysAfterExpel: 808,
    legalBasis: "Yo'q",
    status: "Noqonuniy tiklanish",
    evidence: "HEMIS audit log, buyruqlar",
    notes: "Rektor ko'rsatmasi bilan tiklangan"
  },
  {
    id: 2,
    studentId: "STU-2019-000456",
    fullName: "Rahimova Madina Toxirovna",
    faculty: "Huquqshunoslik",
    expelledDate: "2021-12-20",
    expelReason: "To'lov qilmagan (2 yil)",
    restoredDate: "2024-08-25",
    restoredBy: "Nosirova M.K. (Dekan)",
    orderNumber: "T-2024/076",
    daysAfterExpel: 979,
    legalBasis: "Yo'q",
    status: "Noqonuniy tiklanish",
    evidence: "HEMIS audit log",
    notes: "Dekan qarindoshi"
  },
  {
    id: 3,
    studentId: "STU-2021-000789",
    fullName: "Toshmatov Sardor Rustamovich",
    faculty: "Iqtisodiyot",
    expelledDate: "2023-01-10",
    expelReason: "Intizomiy buzilish",
    restoredDate: "2024-09-05",
    restoredBy: "Karimov B.T. (O'quv bo'limi)",
    orderNumber: "T-2024/092",
    daysAfterExpel: 604,
    legalBasis: "Yo'q",
    status: "Noqonuniy tiklanish",
    evidence: "HEMIS audit log",
    notes: "To'lov qilmay tiklangan"
  }
];

// ID: 203 - Imtihonsiz o'tkazilgan talabalar
export const examFreeStudents = [
  {
    id: 1,
    studentId: "STU-2022-001111",
    fullName: "Saidov Alisher Karimovich",
    faculty: "Mexanika",
    subject: "Materiallar qarshiligi",
    semester: "2024-kuz",
    examDate: null,
    gradeEntered: 75,
    enteredBy: "Xolmatov D.S. (O'qituvchi)",
    enteredDate: "2024-12-28",
    status: "Imtihonsiz baho",
    evidence: "Imtihon qatnashchilar ro'yxati, HEMIS",
    notes: "Imtihon kunlari chet elda bo'lgan"
  },
  {
    id: 2,
    studentId: "STU-2023-002222",
    fullName: "Aliyeva Nilufar Bahodirovna",
    faculty: "Kimyo",
    subject: "Organik kimyo",
    semester: "2024-kuz",
    examDate: null,
    gradeEntered: 82,
    enteredBy: "Karimova N.A. (O'qituvchi)",
    enteredDate: "2024-12-25",
    status: "Imtihonsiz baho",
    evidence: "Imtihon qatnashchilar ro'yxati",
    notes: "O'qituvchi kursiga to'lov qilgan"
  },
  {
    id: 3,
    studentId: "STU-2021-003333",
    fullName: "Nosirova Sevara Anvarovna",
    faculty: "Biologiya",
    subject: "Genetika",
    semester: "2024-kuz",
    examDate: null,
    gradeEntered: 68,
    enteredBy: "Toshmatov R.K. (Kafedra mudiri)",
    enteredDate: "2024-12-30",
    status: "Imtihonsiz baho",
    evidence: "Imtihon qatnashchilar ro'yxati",
    notes: "Kafedra mudiri buyrug'i bilan"
  }
];

// ID: 204 - Davomat ma'lumotlari soxtalashtirilgan
export const fakeAttendance = [
  {
    id: 1,
    studentId: "STU-2022-004444",
    fullName: "Rahmonov Bobur Sherzodovich",
    faculty: "Arxitektura",
    subject: "Loyihalash asoslari",
    month: "2024-Noyabr",
    hemisAttendance: 95,
    biometricAttendance: 12,
    difference: 83,
    changedBy: "O'qituvchi Karimov S.",
    status: "Soxta davomat",
    evidence: "Biometrik tizim vs HEMIS",
    notes: "Chet elda bo'lgan, davomat kiritilgan"
  },
  {
    id: 2,
    studentId: "STU-2023-005555",
    fullName: "Toshmatova Dilnoza Anvarovna",
    faculty: "Filologiya",
    subject: "Jahon adabiyoti",
    month: "2024-Noyabr",
    hemisAttendance: 88,
    biometricAttendance: 23,
    difference: 65,
    changedBy: "O'qituvchi Aliyeva M.",
    status: "Soxta davomat",
    evidence: "Biometrik tizim vs HEMIS",
    notes: "Ishga ketgan, davomat yozilgan"
  },
  {
    id: 3,
    studentId: "STU-2021-006666",
    fullName: "Karimov Jahongir Rustamovich",
    faculty: "Jurnalistika",
    subject: "Media texnologiyalar",
    month: "2024-Dekabr",
    hemisAttendance: 100,
    biometricAttendance: 45,
    difference: 55,
    changedBy: "O'qituvchi Nosirova K.",
    status: "Soxta davomat",
    evidence: "Biometrik tizim vs HEMIS",
    notes: "Stipendiya uchun davomat kerak edi"
  }
];

// ID: 206 - Bitirish uchun baholar sun'iy oshirilgan
export const inflatedGraduationGrades = [
  {
    id: 1,
    studentId: "STU-2020-007777",
    fullName: "Aliyev Sardor Karimovich",
    faculty: "Iqtisodiyot",
    subject: "Makroiqtisodiyot",
    originalGrade: 52,
    changedGrade: 71,
    changeDate: "2024-06-20",
    changedBy: "Kafedra mudiri Rahimov T.",
    reason: "Bitirish uchun GPA yetmagan",
    status: "Sun'iy oshirilgan",
    evidence: "HEMIS audit log",
    notes: "4 ta fandan baho oshirilgan"
  },
  {
    id: 2,
    studentId: "STU-2020-008888",
    fullName: "Nosirova Madina Bahodirovna",
    faculty: "Huquqshunoslik",
    subject: "Fuqarolik huquqi",
    originalGrade: 48,
    changedGrade: 65,
    changeDate: "2024-06-18",
    changedBy: "O'qituvchi Karimova S.",
    reason: "Bitirish uchun o'tish balli yetmagan",
    status: "Sun'iy oshirilgan",
    evidence: "HEMIS audit log",
    notes: "Otasi universitetda ishlaydi"
  }
];

// ID: 207 - O'qishdan chetlatish bekor qilingan
export const cancelledExpulsions = [
  {
    id: 1,
    studentId: "STU-2022-009999",
    fullName: "Toshmatov Ulug'bek Anvarovich",
    faculty: "Tibbiyot",
    expelDate: "2024-03-15",
    expelReason: "Akademik qarzdorlik (8 ta fan)",
    cancelDate: "2024-09-01",
    cancelledBy: "Prorektor Aliyev M.",
    cancelReason: "Ariza asosida",
    status: "Asossiz bekor qilish",
    evidence: "Buyruqlar, HEMIS",
    notes: "Qarzdorlik to'lanmagan"
  },
  {
    id: 2,
    studentId: "STU-2021-010101",
    fullName: "Rahimova Zarina Toxirovna",
    faculty: "Stomatologiya",
    expelDate: "2024-02-20",
    expelReason: "2 yil to'lov qilmagan",
    cancelDate: "2024-08-25",
    cancelledBy: "Rektor yordamchisi",
    cancelReason: "Xat asosida",
    status: "Asossiz bekor qilish",
    evidence: "Buyruqlar, Billing",
    notes: "To'lov hali ham qilinmagan"
  }
];

// ID: 201 - DTM balidan past qabul qilinganlar
export const dtmLowScoreAdmissions = [
  {
    id: 1,
    studentId: "STU-2024-001122",
    fullName: "Rahmonov Javohir Karimovich",
    faculty: "Tibbiyot",
    direction: "Davolash ishi",
    dtmScore: 142,
    requiredScore: 186,
    scoreDifference: -44,
    admissionDate: "2024-08-25",
    admissionOrder: "Q-2024/156",
    responsiblePerson: "Karimov S.T. (Qabul komissiyasi)",
    status: "Tekshirilmoqda",
    evidence: "DTM bazasi bilan solishtirish",
    notes: "O'rinbosar imzosi bilan qabul qilingan"
  },
  {
    id: 2,
    studentId: "STU-2024-001245",
    fullName: "Toshmatova Nilufar Anvarovna",
    faculty: "Huquqshunoslik",
    direction: "Xalqaro huquq",
    dtmScore: 128,
    requiredScore: 165,
    scoreDifference: -37,
    admissionDate: "2024-08-26",
    admissionOrder: "Q-2024/189",
    responsiblePerson: "Aliyev B.R. (Dekan)",
    status: "Tasdiqlangan",
    evidence: "DTM bazasi, qabul buyrug'i",
    notes: "Rektor qarindoshi ekanligi aniqlangan"
  },
  {
    id: 3,
    studentId: "STU-2024-001367",
    fullName: "Karimov Bobur Sherzodovich",
    faculty: "Iqtisodiyot",
    direction: "Moliya va kredit",
    dtmScore: 134,
    requiredScore: 158,
    scoreDifference: -24,
    admissionDate: "2024-08-24",
    admissionOrder: "Q-2024/134",
    responsiblePerson: "Nosirova M.K. (Qabul bo'limi)",
    status: "Tekshirilmoqda",
    evidence: "DTM bazasi",
    notes: "Viloyat hokimi murojaati asosida"
  }
];

// ID: 202 - Baholar muddat o'tgandan keyin o'zgartirilgan
export const gradeChangesAfterDeadline = [
  {
    id: 1,
    studentId: "STU-2022-003421",
    fullName: "Saidov Alisher Rustamovich",
    faculty: "Axborot texnologiyalari",
    subject: "Ma'lumotlar bazasi",
    oldGrade: 45,
    newGrade: 78,
    changeDate: "2025-01-10",
    deadline: "2024-12-25",
    daysAfterDeadline: 16,
    changedBy: "Xolmatov D.S. (O'qituvchi)",
    ipAddress: "192.168.1.45",
    status: "Shubhali",
    evidence: "HEMIS audit log",
    notes: "Talaba otasi universitetda ishlaydi"
  },
  {
    id: 2,
    studentId: "STU-2023-002156",
    fullName: "Ergasheva Madina Toxirovna",
    faculty: "Filologiya",
    subject: "Ingliz tili",
    oldGrade: 52,
    newGrade: 86,
    changeDate: "2025-01-08",
    deadline: "2024-12-20",
    daysAfterDeadline: 19,
    changedBy: "Karimova N.A. (O'qituvchi)",
    ipAddress: "192.168.1.78",
    status: "Tekshirilmoqda",
    evidence: "HEMIS audit log, bank tranzaksiyasi",
    notes: "O'qituvchi hisobiga 2 mln so'm o'tkazilgan"
  },
  {
    id: 3,
    studentId: "STU-2021-004532",
    fullName: "Nazarov Bekzod Anvarovich",
    faculty: "Mexanika",
    subject: "Materiallar qarshiligi",
    oldGrade: 38,
    newGrade: 71,
    changeDate: "2025-01-05",
    deadline: "2024-12-22",
    daysAfterDeadline: 14,
    changedBy: "Toshmatov R.K. (Kafedra mudiri)",
    ipAddress: "192.168.1.23",
    status: "Tasdiqlangan",
    evidence: "HEMIS audit log",
    notes: "Admin huquqi orqali o'zgartirilgan"
  }
];

// ID: 205 - 'Arvoh' talabalar
export const ghostStudents = [
  {
    id: 1,
    studentId: "STU-2022-005678",
    fullName: "Abdullayev Jasur Karimovich",
    faculty: "Qurilish",
    course: 3,
    group: "QUR-21",
    lastActivity: "2023-09-15",
    inactiveDays: 487,
    contractPaid: true,
    paidAmount: 12500000,
    attendancePercent: 0,
    gradesEntered: false,
    status: "Arvoh talaba",
    evidence: "Davomat, HEMIS faollik",
    notes: "Rossiyada ishlaydi, diplom olish uchun to'laydi"
  },
  {
    id: 2,
    studentId: "STU-2021-006789",
    fullName: "Qosimova Dilnoza Bahodirovna",
    faculty: "Iqtisodiyot",
    course: 4,
    group: "IQ-20",
    lastActivity: "2023-06-20",
    inactiveDays: 573,
    contractPaid: true,
    paidAmount: 11000000,
    attendancePercent: 0,
    gradesEntered: true,
    status: "Arvoh talaba",
    evidence: "Davomat 0%, baholar kiritilgan",
    notes: "Dekan yordamchisi qarindoshi"
  },
  {
    id: 3,
    studentId: "STU-2023-007890",
    fullName: "Mirzayev Otabek Dilshodovich",
    faculty: "Huquqshunoslik",
    course: 2,
    group: "H-22",
    lastActivity: "2024-02-10",
    inactiveDays: 338,
    contractPaid: true,
    paidAmount: 14000000,
    attendancePercent: 2,
    gradesEntered: true,
    status: "Arvoh talaba",
    evidence: "Biometrik tizim, davomat",
    notes: "Koreyada ishlaydi"
  }
];

// ========== BILLING PLATFORMASI ==========

// ID: 210 - To'lov qilingan lekin tizimda yo'q
export const missingPayments = [
  {
    id: 1,
    studentId: "STU-2023-010111",
    fullName: "Tursunov Jahongir Anvarovich",
    faculty: "Arxitektura",
    bankTransactionId: "TRX-2024-789456",
    transactionDate: "2024-11-15",
    bankAmount: 6500000,
    billingAmount: 0,
    difference: 6500000,
    bankName: "Kapitalbank",
    cashier: "Rahimova S.N.",
    status: "Yo'qolgan to'lov",
    evidence: "Bank ko'chirma, Billing tizimi",
    notes: "Kassir shaxsiy hisobiga o'tkazgan"
  },
  {
    id: 2,
    studentId: "STU-2022-011222",
    fullName: "Xolmatov Sardor Rustamovich",
    faculty: "Tibbiyot",
    bankTransactionId: "TRX-2024-852963",
    transactionDate: "2024-10-20",
    bankAmount: 9000000,
    billingAmount: 0,
    difference: 9000000,
    bankName: "Asakabank",
    cashier: "Karimov B.T.",
    status: "Tekshirilmoqda",
    evidence: "Bank ko'chirma",
    notes: "Kvitansiya berilgan lekin tizimga kiritilmagan"
  },
  {
    id: 3,
    studentId: "STU-2023-012333",
    fullName: "Ergasheva Zarina Karimovna",
    faculty: "Filologiya",
    bankTransactionId: "TRX-2024-741852",
    transactionDate: "2024-12-05",
    bankAmount: 4500000,
    billingAmount: 0,
    difference: 4500000,
    bankName: "Ipotekabank",
    cashier: "Nosirova D.M.",
    status: "Yo'qolgan to'lov",
    evidence: "Bank ko'chirma, talaba arizasi",
    notes: "3 oylik to'lov qayd etilmagan"
  }
];

// ID: 211 - Rasmiy narxdan farqli to'lovlar
export const overchargedPayments = [
  {
    id: 1,
    studentId: "STU-2024-020111",
    fullName: "Karimova Mohira Anvarovna",
    faculty: "Stomatologiya",
    officialRate: 18000000,
    chargedAmount: 22000000,
    overcharge: 4000000,
    paymentDate: "2024-09-01",
    semester: "2024-2025 kuz",
    cashier: "Aliyev R.S.",
    status: "Ortiqcha undirish",
    evidence: "Shartnoma, to'lov kvitansiyasi",
    notes: "Chet el fuqarosi sifatida to'lov olingan (O'zbekiston fuqarosi)"
  },
  {
    id: 2,
    studentId: "STU-2024-021222",
    fullName: "Sobirov Ulug'bek Toxirovich",
    faculty: "Tibbiyot",
    officialRate: 16500000,
    chargedAmount: 19500000,
    overcharge: 3000000,
    paymentDate: "2024-09-05",
    semester: "2024-2025 kuz",
    cashier: "Toshmatov K.R.",
    status: "Tekshirilmoqda",
    evidence: "Shartnoma, to'lov kvitansiyasi",
    notes: "'Tezkor ro'yxatga olish' uchun qo'shimcha olingan"
  },
  {
    id: 3,
    studentId: "STU-2024-022333",
    fullName: "Rahimova Dilfuza Bahodirovna",
    faculty: "Farmatsiya",
    officialRate: 15000000,
    chargedAmount: 17500000,
    overcharge: 2500000,
    paymentDate: "2024-09-10",
    semester: "2024-2025 kuz",
    cashier: "Nosirova M.A.",
    status: "Ortiqcha undirish",
    evidence: "Shartnoma, bank ko'chirma",
    notes: "'Kafolatlangan o'rin' uchun qo'shimcha"
  }
];

// ID: 212 - Asossiz chegirmalar berilgan
export const fraudulentDiscounts = [
  {
    id: 1,
    studentId: "STU-2023-030111",
    fullName: "Nazarova Sevara Karimovna",
    faculty: "Iqtisodiyot",
    discountType: "Nogironlik (1-guruh)",
    discountPercent: 50,
    discountAmount: 5500000,
    contractAmount: 11000000,
    verificationStatus: "Soxta",
    documentNumber: "NOG-2023-45678",
    issuedBy: "Ijtimoiy himoya bo'limi",
    status: "Hujjat soxta",
    evidence: "Ijtimoiy himoya bazasi tekshiruvi",
    notes: "Nogironlik guvohnomasi yo'q, sog'lom talaba"
  },
  {
    id: 2,
    studentId: "STU-2022-031222",
    fullName: "Aliyev Shoxrux Rustamovich",
    faculty: "Huquqshunoslik",
    discountType: "Yetim bola",
    discountPercent: 100,
    discountAmount: 14000000,
    contractAmount: 14000000,
    verificationStatus: "Soxta",
    documentNumber: "YET-2022-78901",
    issuedBy: "VXSXBAI",
    status: "Hujjat soxta",
    evidence: "Ota-onasi tirik, soliq bazasi",
    notes: "Ota-onasi tadbirkor, soliq to'laydi"
  },
  {
    id: 3,
    studentId: "STU-2024-032333",
    fullName: "Toshmatov Bobur Anvarovich",
    faculty: "Qurilish",
    discountType: "Kam ta'minlangan oila",
    discountPercent: 30,
    discountAmount: 3150000,
    contractAmount: 10500000,
    verificationStatus: "Soxta",
    documentNumber: "KTO-2024-12345",
    issuedBy: "Mahalla",
    status: "Hujjat soxta",
    evidence: "Kadastr, avtomobil ro'yxati",
    notes: "Oilada 3 ta avtomobil, 2 ta kvartira"
  }
];

// ========== TTJ PLATFORMASI ==========

// ID: 220 - Talaba bo'lmaganlar TTJda yashaydi
export const nonStudentsInDorm = [
  {
    id: 1,
    dormId: "TTJ-3-215",
    fullName: "Karimov Jasur Toxirovich",
    passportSeries: "AD",
    passportNumber: "1234567",
    checkInDate: "2024-09-01",
    monthlyPayment: 450000,
    totalPaid: 1800000,
    studentStatus: "HEMIS'da yo'q",
    relationship: "Komendant jiyani",
    status: "Noqonuniy yashash",
    evidence: "HEMIS bazasi, TTJ ro'yxati",
    notes: "Bozorda savdo qiladi"
  },
  {
    id: 2,
    dormId: "TTJ-1-312",
    fullName: "Rahimova Nilufar Anvarovna",
    passportSeries: "AC",
    passportNumber: "9876543",
    checkInDate: "2024-08-15",
    monthlyPayment: 450000,
    totalPaid: 2250000,
    studentStatus: "2023-da bitirib ketgan",
    relationship: "Sobiq talaba",
    status: "Noqonuniy yashash",
    evidence: "HEMIS bazasi",
    notes: "Shaharda ishlaydi, arzon turar joy"
  },
  {
    id: 3,
    dormId: "TTJ-2-105",
    fullName: "Aliyev Sardor Bahodirovich",
    passportSeries: "AB",
    passportNumber: "5678901",
    checkInDate: "2024-10-01",
    monthlyPayment: 450000,
    totalPaid: 1350000,
    studentStatus: "O'qishdan chetlatilgan",
    relationship: "Sobiq talaba",
    status: "Noqonuniy yashash",
    evidence: "HEMIS - chetlatish buyrug'i",
    notes: "Chetlatilgandan keyin ham yashaydi"
  }
];

// ID: 221 - Rasmiy narxdan yuqori TTJ to'lovi
export const overchargedDormPayments = [
  {
    id: 1,
    studentId: "STU-2023-040111",
    fullName: "Saidova Zarina Karimovna",
    dormRoom: "TTJ-1-401",
    officialRate: 350000,
    chargedAmount: 650000,
    overcharge: 300000,
    paymentPeriod: "2024-yil Sentabr-Dekabr",
    totalOvercharge: 1200000,
    collectedBy: "Komendant Nosirova M.",
    status: "Ortiqcha undirish",
    evidence: "Rasmiy tarif, to'lov kvitansiyasi",
    notes: "1-qavatdagi 'yaxshi' xona uchun"
  },
  {
    id: 2,
    studentId: "STU-2022-041222",
    fullName: "Ergashev Otabek Rustamovich",
    dormRoom: "TTJ-2-201",
    officialRate: 350000,
    chargedAmount: 550000,
    overcharge: 200000,
    paymentPeriod: "2024-yil Sentabr-Dekabr",
    totalOvercharge: 800000,
    collectedBy: "Komendant Toshmatov K.",
    status: "Ortiqcha undirish",
    evidence: "Rasmiy tarif, naqd to'lov",
    notes: "2 kishilik xonada yolg'iz yashash uchun"
  },
  {
    id: 3,
    studentId: "STU-2024-042333",
    fullName: "Xolmatova Madina Anvarovna",
    dormRoom: "TTJ-3-305",
    officialRate: 350000,
    chargedAmount: 500000,
    overcharge: 150000,
    paymentPeriod: "2024-yil Sentabr-Dekabr",
    totalOvercharge: 600000,
    collectedBy: "Komendant Rahimov S.",
    status: "Ortiqcha undirish",
    evidence: "Rasmiy tarif, bank ko'chirma",
    notes: "Konditsioner o'rnatilgan xona uchun"
  }
];

// ID: 222 - TTJ navbatini chetlab o'tganlar
export const dormQueueJumpers = [
  {
    id: 1,
    studentId: "STU-2024-050111",
    fullName: "Karimov Bobur Sherzodovich",
    faculty: "Tibbiyot",
    homeRegion: "Toshkent viloyati",
    queuePosition: 456,
    assignedDate: "2024-09-01",
    studentsSkipped: 455,
    assignedRoom: "TTJ-1-101",
    connection: "Rektor yordamchisi o'g'li",
    status: "Navbat buzilgan",
    evidence: "TTJ navbat ro'yxati",
    notes: "Shaharga yaqin viloyatdan"
  },
  {
    id: 2,
    studentId: "STU-2024-051222",
    fullName: "Aliyeva Sevara Toxirovna",
    faculty: "Iqtisodiyot",
    homeRegion: "Toshkent shahri",
    queuePosition: 0,
    assignedDate: "2024-09-05",
    studentsSkipped: 523,
    assignedRoom: "TTJ-2-205",
    connection: "Dekan qarindoshi",
    status: "Navbat buzilgan",
    evidence: "TTJ navbat ro'yxati, HEMIS manzil",
    notes: "Toshkent shahrida ro'yxatda, TTJ kerak emas"
  },
  {
    id: 3,
    studentId: "STU-2024-052333",
    fullName: "Nosirova Dilnoza Bahodirovna",
    faculty: "Huquqshunoslik",
    homeRegion: "Samarqand",
    queuePosition: 234,
    assignedDate: "2024-09-03",
    studentsSkipped: 233,
    assignedRoom: "TTJ-1-301",
    connection: "TTJ direktori tanishi",
    status: "Navbat buzilgan",
    evidence: "TTJ navbat ro'yxati",
    notes: "1-navbatda joylashtrilgan"
  }
];

// ========== KADRLAR PLATFORMASI ==========

// ID: 260 - 'Arvoh' xodimlar
export const ghostEmployees = [
  {
    id: 1,
    empId: "EMP-2020-001234",
    fullName: "Rahmonov Anvar Karimovich",
    position: "Dotsent",
    department: "Iqtisodiyot kafedrasi",
    salary: 8500000,
    lastWorkDay: "2023-03-15",
    inactiveDays: 670,
    salaryReceived: true,
    totalReceivedInactive: 68000000,
    relationship: "Rektor ukasi",
    status: "Arvoh xodim",
    evidence: "Davomat, dars jadvali",
    notes: "Rossiyada yashaydi, maosh oladi"
  },
  {
    id: 2,
    empId: "EMP-2019-002345",
    fullName: "Toshmatova Nilufar Rustamovna",
    position: "Katta o'qituvchi",
    department: "Chet tillari kafedrasi",
    salary: 6500000,
    lastWorkDay: "2023-08-20",
    inactiveDays: 512,
    salaryReceived: true,
    totalReceivedInactive: 32500000,
    relationship: "Dekan rafiqasi",
    status: "Arvoh xodim",
    evidence: "Biometrik tizim, dars jadvali",
    notes: "Dekret ta'tili tugagan, ishga kelmaydi"
  },
  {
    id: 3,
    empId: "EMP-2021-003456",
    fullName: "Karimov Sardor Anvarovich",
    position: "Laborant",
    department: "Fizika kafedrasi",
    salary: 4500000,
    lastWorkDay: "2024-01-10",
    inactiveDays: 369,
    salaryReceived: true,
    totalReceivedInactive: 18000000,
    relationship: "Buxgalter o'g'li",
    status: "Arvoh xodim",
    evidence: "Biometrik tizim",
    notes: "Chet elda o'qiydi"
  }
];

// ID: 261 - Qarindoshlik aloqasi (nepotizm)
export const nepotismCases = [
  {
    id: 1,
    emp1Id: "EMP-2015-001111",
    emp1Name: "Karimov Anvar Toxirovich",
    emp1Position: "Rektor",
    emp2Id: "EMP-2020-002222",
    emp2Name: "Karimov Jasur Anvarovich",
    emp2Position: "Moliya bo'limi boshlig'i",
    relationship: "Ota-o'g'il",
    emp2Salary: 12000000,
    hireDate: "2020-09-01",
    hiredBy: "Rektor buyrug'i",
    status: "Nepotizm",
    evidence: "JSHSHIR, oilaviy aloqa",
    notes: "Bevosita bo'ysunuv"
  },
  {
    id: 2,
    emp1Id: "EMP-2018-003333",
    emp1Name: "Aliyev Rustam Karimovich",
    emp1Position: "Dekan",
    emp2Id: "EMP-2022-004444",
    emp2Name: "Aliyeva Madina Rustamovna",
    emp2Position: "O'qituvchi",
    relationship: "Ota-qiz",
    emp2Salary: 7500000,
    hireDate: "2022-09-01",
    hiredBy: "Dekan tavsiyasi",
    status: "Nepotizm",
    evidence: "JSHSHIR, kadrlar ma'lumoti",
    notes: "Fakultetda ishlaydi"
  },
  {
    id: 3,
    emp1Id: "EMP-2016-005555",
    emp1Name: "Nosirova Sevara Bahodirovna",
    emp1Position: "Bosh hisobchi",
    emp2Id: "EMP-2021-006666",
    emp2Name: "Nosirov Bobur Karimovich",
    emp2Position: "Hisobchi",
    relationship: "Opa-uka",
    emp2Salary: 6000000,
    hireDate: "2021-02-15",
    hiredBy: "Bosh hisobchi tavsiyasi",
    status: "Nepotizm",
    evidence: "JSHSHIR, oilaviy aloqa",
    notes: "Bir bo'limda ishlaydi"
  }
];

// ID: 263 - Bir necha OTMda bir vaqtda to'liq stavka
export const multipleFullTimeJobs = [
  {
    id: 1,
    empId: "EMP-2018-010111",
    fullName: "Rahmonov Sherzod Anvarovich",
    jshshir: "12345678901234",
    otm1: "Toshkent davlat universiteti",
    position1: "Dotsent (1.0 stavka)",
    salary1: 9500000,
    otm2: "Iqtisodiyot universiteti",
    position2: "Dotsent (1.0 stavka)",
    salary2: 8500000,
    totalSalary: 18000000,
    status: "Qonunbuzarlik",
    evidence: "HEMIS (barcha OTM), JSHSHIR",
    notes: "Jismoniy imkonsiz - bir vaqtda dars"
  },
  {
    id: 2,
    empId: "EMP-2019-011222",
    fullName: "Toshmatov Karim Rustamovich",
    jshshir: "23456789012345",
    otm1: "Politexnika instituti",
    position1: "Professor (1.0 stavka)",
    salary1: 12000000,
    otm2: "Arxitektura instituti",
    position2: "Professor (1.0 stavka)",
    salary2: 11500000,
    totalSalary: 23500000,
    status: "Qonunbuzarlik",
    evidence: "HEMIS (barcha OTM), JSHSHIR",
    notes: "Dars jadvallari to'qnashadi"
  },
  {
    id: 3,
    empId: "EMP-2020-012333",
    fullName: "Aliyeva Nilufar Toxirovna",
    jshshir: "34567890123456",
    otm1: "Tibbiyot universiteti",
    position1: "Katta o'qituvchi (1.0 stavka)",
    salary1: 7500000,
    otm2: "Farmatsiya instituti",
    position2: "Katta o'qituvchi (1.0 stavka)",
    salary2: 7000000,
    totalSalary: 14500000,
    status: "Qonunbuzarlik",
    evidence: "HEMIS (barcha OTM), JSHSHIR",
    notes: "Bir kunda ikki joyda dars"
  }
];

// ========== QABUL PLATFORMASI ==========

// ID: 231 - Soxta imtiyozli kvota
export const fraudulentQuotas = [
  {
    id: 1,
    studentId: "STU-2024-060111",
    fullName: "Karimov Jahongir Anvarovich",
    faculty: "Tibbiyot",
    quotaType: "Nogironlik (2-guruh)",
    documentNumber: "NOG-2024-11111",
    issuedBy: "Toshkent shahar VTEK",
    verificationResult: "SOXTA",
    realStatus: "Sog'lom",
    savedAmount: 18000000,
    status: "Soxta hujjat",
    evidence: "VTEK bazasi, tibbiy ko'rik",
    notes: "Hujjat sotib olingan"
  },
  {
    id: 2,
    studentId: "STU-2024-061222",
    fullName: "Rahimova Dilnoza Rustamovna",
    faculty: "Huquqshunoslik",
    quotaType: "Yetim",
    documentNumber: "YET-2024-22222",
    issuedBy: "Samarqand viloyati VXSXBAI",
    verificationResult: "SOXTA",
    realStatus: "Ota-onasi tirik",
    savedAmount: 14000000,
    status: "Soxta hujjat",
    evidence: "JSHSHIR, soliq bazasi",
    notes: "Ota-onasi tadbirkor"
  },
  {
    id: 3,
    studentId: "STU-2024-062333",
    fullName: "Nosirova Sevara Bahodirovna",
    faculty: "Iqtisodiyot",
    quotaType: "Harbiy xizmatchi farzandi",
    documentNumber: "HXF-2024-33333",
    issuedBy: "Mudofaa vazirligi",
    verificationResult: "SOXTA",
    realStatus: "Otasi harbiy emas",
    savedAmount: 5500000,
    status: "Soxta hujjat",
    evidence: "Mudofaa vazirligi bazasi",
    notes: "Hujjat soxtalashtrilgan"
  }
];

// ID: 233 - Grant o'rnini kontraktga sotish
export const grantSelling = [
  {
    id: 1,
    grantStudentId: "STU-2024-070111",
    grantStudentName: "Aliyev Sardor Karimovich",
    dtmScore: 189,
    grantType: "Davlat granti",
    contractStudentId: "STU-2024-070112",
    contractStudentName: "Karimov Bobur Anvarovich",
    contractDtmScore: 145,
    transactionAmount: 25000000,
    intermediary: "Qabul komissiyasi a'zosi",
    status: "Grant sotilgan",
    evidence: "DTM ball, HEMIS, bank tranzaksiya",
    notes: "Grant egasi boshqa OTMga o'tgan"
  },
  {
    id: 2,
    grantStudentId: "STU-2024-071222",
    grantStudentName: "Rahmonova Zarina Toxirovna",
    dtmScore: 178,
    grantType: "Davlat granti",
    contractStudentId: "STU-2024-071223",
    contractStudentName: "Nosirova Madina Rustamovna",
    contractDtmScore: 134,
    transactionAmount: 20000000,
    intermediary: "Noma'lum",
    status: "Tekshirilmoqda",
    evidence: "DTM ball, HEMIS",
    notes: "Grant egasi o'qishni tark etgan"
  }
];

// Korrupsiya turlari
export const corruptionTypes = {
  'Noqonuniy tiklanish': { color: '#ef4444', icon: 'restore' },
  'Noqonuniy qabul': { color: '#dc2626', icon: 'admission' },
  'Baho sotish': { color: '#f97316', icon: 'grade' },
  'Davomat sotish': { color: '#fb923c', icon: 'attendance' },
  'Soxta talaba': { color: '#b91c1c', icon: 'ghost' },
  'Pul o\'mashtirish': { color: '#991b1b', icon: 'money' },
  'Ortiqcha undirish': { color: '#c2410c', icon: 'overcharge' },
  'Soxta chegirma': { color: '#ea580c', icon: 'discount' },
  'Hujjat soxtalashtirish': { color: '#9a3412', icon: 'document' },
  'Kelishuv': { color: '#78350f', icon: 'deal' },
  'Nazorat yo\'qligi': { color: '#a16207', icon: 'control' },
  'Noqonuniy joylashtirish': { color: '#ca8a04', icon: 'housing' },
  'Navbat sotish': { color: '#eab308', icon: 'queue' },
  'Imtiyoz sotish': { color: '#facc15', icon: 'privilege' },
  'Soxta hujjat': { color: '#dc2626', icon: 'fake' },
  'Noqonuniy o\'tkazma': { color: '#b91c1c', icon: 'transfer' },
  'Grant sotish': { color: '#991b1b', icon: 'grant' },
  'Diplom sotish': { color: '#7f1d1d', icon: 'diploma' },
  'Soxta diplom': { color: '#450a0a', icon: 'fakeDiploma' },
  'Soxta stipendiya': { color: '#ef4444', icon: 'scholarship' },
  'Soxta xodim': { color: '#dc2626', icon: 'ghostEmp' },
  'Nepotizm': { color: '#f97316', icon: 'nepotism' },
  'Tender fitna': { color: '#ea580c', icon: 'tender' },
  'Narx oshirish': { color: '#c2410c', icon: 'price' },
  'Tender chetlab o\'tish': { color: '#9a3412', icon: 'bypass' }
};

// Indikator ID bo'yicha batafsil ma'lumotlarni olish
export const getCorruptionDataByIndicatorId = (indicatorId) => {
  const dataMap = {
    // HEMIS platformasi
    200: { type: 'restored', title: "Arxivdan qayta tiklangan talabalar", data: restoredStudents, columns: ['fullName', 'faculty', 'expelledDate', 'expelReason', 'restoredDate', 'restoredBy', 'status'] },
    201: { type: 'admission', title: "DTM balidan past qabul qilinganlar", data: dtmLowScoreAdmissions, columns: ['fullName', 'faculty', 'dtmScore', 'requiredScore', 'scoreDifference', 'responsiblePerson', 'status'] },
    202: { type: 'grades', title: "Baholar muddat o'tgandan keyin o'zgartirilgan", data: gradeChangesAfterDeadline, columns: ['fullName', 'subject', 'oldGrade', 'newGrade', 'daysAfterDeadline', 'changedBy', 'status'] },
    203: { type: 'examFree', title: "Imtihonsiz o'tkazilgan talabalar", data: examFreeStudents, columns: ['fullName', 'faculty', 'subject', 'gradeEntered', 'enteredBy', 'status'] },
    204: { type: 'attendance', title: "Davomat ma'lumotlari soxtalashtirilgan", data: fakeAttendance, columns: ['fullName', 'faculty', 'subject', 'hemisAttendance', 'biometricAttendance', 'difference', 'status'] },
    205: { type: 'ghost', title: "'Arvoh' talabalar", data: ghostStudents, columns: ['fullName', 'faculty', 'lastActivity', 'inactiveDays', 'paidAmount', 'attendancePercent', 'status'] },
    206: { type: 'graduationGrades', title: "Bitirish uchun baholar sun'iy oshirilgan", data: inflatedGraduationGrades, columns: ['fullName', 'subject', 'originalGrade', 'changedGrade', 'changeDate', 'changedBy', 'status'] },
    207: { type: 'cancelledExpulsion', title: "O'qishdan chetlatish bekor qilingan", data: cancelledExpulsions, columns: ['fullName', 'faculty', 'expelDate', 'expelReason', 'cancelDate', 'cancelledBy', 'status'] },
    // Billing platformasi
    210: { type: 'payment', title: "To'lov qilingan lekin tizimda yo'q", data: missingPayments, columns: ['fullName', 'bankAmount', 'billingAmount', 'difference', 'transactionDate', 'cashier', 'status'] },
    211: { type: 'overcharge', title: "Rasmiy narxdan farqli to'lovlar", data: overchargedPayments, columns: ['fullName', 'officialRate', 'chargedAmount', 'overcharge', 'paymentDate', 'cashier', 'status'] },
    212: { type: 'discount', title: "Asossiz chegirmalar berilgan", data: fraudulentDiscounts, columns: ['fullName', 'discountType', 'discountPercent', 'discountAmount', 'verificationStatus', 'status'] },
    // TTJ platformasi
    220: { type: 'dorm', title: "Talaba bo'lmaganlar TTJda yashaydi", data: nonStudentsInDorm, columns: ['fullName', 'dormId', 'checkInDate', 'monthlyPayment', 'studentStatus', 'relationship', 'status'] },
    221: { type: 'dormPayment', title: "Rasmiy narxdan yuqori TTJ to'lovi", data: overchargedDormPayments, columns: ['fullName', 'dormRoom', 'officialRate', 'chargedAmount', 'overcharge', 'collectedBy', 'status'] },
    222: { type: 'queue', title: "TTJ navbatini chetlab o'tganlar", data: dormQueueJumpers, columns: ['fullName', 'homeRegion', 'queuePosition', 'studentsSkipped', 'connection', 'status'] },
    // Qabul platformasi
    231: { type: 'quota', title: "Soxta imtiyozli kvota", data: fraudulentQuotas, columns: ['fullName', 'quotaType', 'verificationResult', 'realStatus', 'savedAmount', 'status'] },
    233: { type: 'grant', title: "Grant o'rnini kontraktga sotish", data: grantSelling, columns: ['grantStudentName', 'dtmScore', 'contractStudentName', 'contractDtmScore', 'transactionAmount', 'status'] },
    // Kadrlar platformasi
    260: { type: 'ghostEmp', title: "'Arvoh' xodimlar", data: ghostEmployees, columns: ['fullName', 'position', 'department', 'salary', 'inactiveDays', 'totalReceivedInactive', 'status'] },
    261: { type: 'nepotism', title: "Qarindoshlik aloqasi (nepotizm)", data: nepotismCases, columns: ['emp1Name', 'emp1Position', 'emp2Name', 'emp2Position', 'relationship', 'status'] },
    263: { type: 'multiJob', title: "Bir necha OTMda bir vaqtda to'liq stavka", data: multipleFullTimeJobs, columns: ['fullName', 'otm1', 'salary1', 'otm2', 'salary2', 'totalSalary', 'status'] }
  };

  return dataMap[indicatorId] || null;
};

// Summa formatlash
export const formatMoney = (amount) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
};
