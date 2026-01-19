// HEMIS tizimidan olingan talabalar ma'lumotlari (mock)

const firstNames = [
  'Abdulloh', 'Bobur', 'Dilshod', 'Eldor', 'Farrux', 'Gulnora', 'Hilola', 'Ibrohim',
  'Jasur', 'Kamola', 'Laziz', 'Malika', 'Nodira', 'Olim', 'Parvina', 'Qodir',
  'Ravshan', 'Sarvinoz', 'Temur', 'Ulugbek', 'Vazira', 'Xurshid', 'Yulduz', 'Zafar',
  'Aziza', 'Bekzod', 'Charos', 'Davron', 'Elmira', 'Farida', 'Ganijon', 'Husniya'
];

const lastNames = [
  'Abdullayev', 'Botirov', 'Choriyev', 'Davronov', 'Ergashev', 'Fayzullayev',
  'Gafurov', 'Hamidov', 'Ibragimov', 'Jurayev', 'Karimov', 'Latipov',
  'Mahmudov', 'Nazarov', 'Olimov', 'Po\'latov', 'Qodirov', 'Rahimov',
  'Saidov', 'Tursunov', 'Umarov', 'Valiyev', 'Xolmatov', 'Yusupov', 'Zokirov'
];

const faculties = [
  'Kompyuter injiniringi',
  'Axborot texnologiyalari',
  'Telekommunikatsiya',
  'Dasturiy injiniring',
  'Kiberxavfsizlik',
  'Sun\'iy intellekt',
  'Iqtisodiyot',
  'Menejment',
  'Huquqshunoslik',
  'Tibbiyot'
];

const groups = ['A', 'B', 'C', 'D'];

// Talabalar generatsiya qilish
const generateStudents = () => {
  const students = [];
  const universityIds = ['tatu', 'tdyu', 'tdiu', 'samdtu', 'andu', 'buxdu', 'namdu', 'qardu', 'urgdu', 'nukdu'];
  const courseIds = ['1', '2', '3', '4', 'magistr'];

  let id = 1;

  universityIds.forEach(uniId => {
    // Har bir universitet uchun 50 ta talaba
    for (let i = 0; i < 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const faculty = faculties[Math.floor(Math.random() * faculties.length)];
      const course = courseIds[Math.floor(Math.random() * courseIds.length)];
      const group = groups[Math.floor(Math.random() * groups.length)];
      const year = course === 'magistr' ? 2023 : 2024 - parseInt(course) + 1;

      const student = {
        id: id++,
        hemisId: `H${year}${String(id).padStart(6, '0')}`,
        firstName,
        lastName,
        fullName: `${lastName} ${firstName}`,
        university: uniId,
        faculty,
        course,
        group: `${course === 'magistr' ? 'M' : course}${group}`,
        enrollmentYear: year,
        birthDate: `${1998 + Math.floor(Math.random() * 6)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        phone: `+998${90 + Math.floor(Math.random() * 9)}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edu.uz`,

        // HEMIS ma'lumotlari
        gpa: (2 + Math.random() * 2).toFixed(2),
        credits: course === 'magistr' ? 60 + Math.floor(Math.random() * 60) : parseInt(course) * 30 + Math.floor(Math.random() * 30),
        attendance: Math.floor(70 + Math.random() * 30),

        // Moliyaviy holat
        contractAmount: course === 'magistr' ? 15000000 : 12000000,
        paidAmount: Math.floor((0.5 + Math.random() * 0.5) * (course === 'magistr' ? 15000000 : 12000000)),
        debtAmount: 0, // Keyinroq hisoblanadi
        paymentStatus: 'paid', // Keyinroq aniqlanadi

        // TTJ
        dormitory: Math.random() > 0.7,
        dormRoom: Math.random() > 0.7 ? `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 100) + 1}` : null,

        // Risk indikatorlari
        hasDebt: false,
        hasAcademicIssues: false,
        hasAttendanceIssues: false,
        hasDisciplinaryIssues: false,
      };

      // Qarzdorlik hisoblash
      student.debtAmount = student.contractAmount - student.paidAmount;
      student.paymentStatus = student.debtAmount > 0 ? (student.debtAmount > 5000000 ? 'critical' : 'warning') : 'paid';
      student.hasDebt = student.debtAmount > 3000000;

      // Akademik muammolar
      student.hasAcademicIssues = parseFloat(student.gpa) < 2.5;
      student.hasAttendanceIssues = student.attendance < 75;
      student.hasDisciplinaryIssues = Math.random() > 0.95;

      students.push(student);
    }
  });

  return students;
};

export const students = generateStudents();

// Talaba qidirish funksiyasi
export const searchStudents = (query, universityId = 'all') => {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  return students
    .filter(s => {
      const matchesQuery =
        s.fullName.toLowerCase().includes(lowerQuery) ||
        s.hemisId.toLowerCase().includes(lowerQuery) ||
        s.phone.includes(query);

      const matchesUniversity = universityId === 'all' || s.university === universityId;

      return matchesQuery && matchesUniversity;
    })
    .slice(0, 20); // Faqat birinchi 20 ta natija
};

// Talaba bo'yicha indikatorlar olish
export const getStudentIndicators = (studentId) => {
  const student = students.find(s => s.id === studentId || s.hemisId === studentId);
  if (!student) return [];

  const indicators = [];
  let id = 1;

  // Moliyaviy indikatorlar
  if (student.hasDebt) {
    indicators.push({
      id: id++,
      category: 'moliya',
      name: 'To\'lov qarzdorligi',
      value: `${(student.debtAmount / 1000000).toFixed(1)} mln`,
      status: student.paymentStatus === 'critical' ? 'critical' : 'high',
      dataSource: 'Billing',
      lastUpdated: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      studentId: student.id
    });
  }

  // Akademik indikatorlar
  if (student.hasAcademicIssues) {
    indicators.push({
      id: id++,
      category: 'akademik',
      name: 'Past GPA',
      value: student.gpa,
      status: parseFloat(student.gpa) < 2.0 ? 'critical' : 'high',
      dataSource: 'HEMIS',
      lastUpdated: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      studentId: student.id
    });
  }

  // Davomat indikatorlari
  if (student.hasAttendanceIssues) {
    indicators.push({
      id: id++,
      category: 'akademik',
      name: 'Past davomat',
      value: `${student.attendance}%`,
      status: student.attendance < 60 ? 'critical' : 'high',
      dataSource: 'HEMIS',
      lastUpdated: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      studentId: student.id
    });
  }

  // Intizomiy muammolar
  if (student.hasDisciplinaryIssues) {
    indicators.push({
      id: id++,
      category: 'talaba',
      name: 'Intizomiy ogohlantirish',
      value: '1',
      status: 'high',
      dataSource: 'HEMIS',
      lastUpdated: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      studentId: student.id
    });
  }

  // Agar muammo yo'q bo'lsa
  if (indicators.length === 0) {
    indicators.push({
      id: id++,
      category: 'talaba',
      name: 'Holat yaxshi',
      value: 'OK',
      status: 'good',
      dataSource: 'HEMIS',
      lastUpdated: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      studentId: student.id
    });
  }

  return indicators;
};

// Talaba to'liq ma'lumotlari
export const getStudentDetails = (studentId) => {
  return students.find(s => s.id === studentId || s.hemisId === studentId);
};

// Universitet bo'yicha talabalar
export const getStudentsByUniversity = (universityId) => {
  if (universityId === 'all') return students;
  return students.filter(s => s.university === universityId);
};

// Muammoli talabalar
export const getProblematicStudents = (universityId = 'all') => {
  return students.filter(s => {
    const matchesUniversity = universityId === 'all' || s.university === universityId;
    const hasProblems = s.hasDebt || s.hasAcademicIssues || s.hasAttendanceIssues || s.hasDisciplinaryIssues;
    return matchesUniversity && hasProblems;
  });
};

// ============================================
// INDIKATORLARGA TEGISHLI TALABALAR MA'LUMOTLARI
// ============================================

// Ikki OTMda bir vaqtda o'qiyotgan talabalar
export const dualEnrollmentStudents = [
  {
    id: 'dual_1',
    hemisId: 'H2023000145',
    fullName: 'Karimov Jahongir Rustamovich',
    university1: 'TATU',
    university2: 'TDIU',
    faculty1: 'Kompyuter injiniringi',
    faculty2: 'Iqtisodiyot',
    course: '3',
    enrollmentDate1: '2023-09-01',
    enrollmentDate2: '2023-09-15',
    phone: '+998901234567',
    status: 'critical',
    note: 'Ikkala OTMda ham faol talaba sifatida ro\'yxatdan o\'tgan'
  },
  {
    id: 'dual_2',
    hemisId: 'H2022000289',
    fullName: 'Rahimova Madina Bahodirovna',
    university1: 'TDYU',
    university2: 'SamDTU',
    faculty1: 'Huquqshunoslik',
    faculty2: 'Tibbiyot',
    course: '4',
    enrollmentDate1: '2022-09-01',
    enrollmentDate2: '2023-01-15',
    phone: '+998937654321',
    status: 'critical',
    note: 'Turli shaharlardagi OTMlarda bir vaqtda tahsil olmoqda'
  },
  {
    id: 'dual_3',
    hemisId: 'H2024000067',
    fullName: 'Toshmatov Sardor Alisher o\'g\'li',
    university1: 'AnDU',
    university2: 'NamDU',
    faculty1: 'Dasturiy injiniring',
    faculty2: 'Axborot texnologiyalari',
    course: '2',
    enrollmentDate1: '2024-09-01',
    enrollmentDate2: '2024-09-10',
    phone: '+998947891234',
    status: 'critical',
    note: 'O\'xshash yo\'nalishlarda ikki OTMda tahsil'
  },
  {
    id: 'dual_4',
    hemisId: 'H2023000412',
    fullName: 'Azizova Gulnora Shavkatovna',
    university1: 'BuxDU',
    university2: 'QarDU',
    faculty1: 'Menejment',
    faculty2: 'Iqtisodiyot',
    course: '3',
    enrollmentDate1: '2023-09-01',
    enrollmentDate2: '2023-10-01',
    phone: '+998951472583',
    status: 'critical',
    note: 'Qo\'shni viloyatlar OTMlarida bir vaqtda o\'qimoqda'
  },
  {
    id: 'dual_5',
    hemisId: 'H2022000578',
    fullName: 'Yusupov Bekzod Norboyevich',
    university1: 'TATU',
    university2: 'TDYU',
    faculty1: 'Kiberxavfsizlik',
    faculty2: 'Xalqaro huquq',
    course: '4',
    enrollmentDate1: '2022-09-01',
    enrollmentDate2: '2022-09-20',
    phone: '+998998765432',
    status: 'critical',
    note: 'Toshkentdagi ikki davlat OTMida tahsil'
  },
  {
    id: 'dual_6',
    hemisId: 'H2024000123',
    fullName: 'Ergasheva Nilufar Shuhratovna',
    university1: 'UrgDU',
    university2: 'NukDU',
    faculty1: 'Filologiya',
    faculty2: 'Pedagogika',
    course: '1',
    enrollmentDate1: '2024-09-01',
    enrollmentDate2: '2024-09-05',
    phone: '+998912345678',
    status: 'critical',
    note: 'Xorazm viloyatidagi ikki OTMda ro\'yxatdan o\'tgan'
  },
  {
    id: 'dual_7',
    hemisId: 'H2023000789',
    fullName: 'Mirzayev Ulug\'bek Toxirovich',
    university1: 'TDIU',
    university2: 'SamDTU',
    faculty1: 'Moliya',
    faculty2: 'Farmatsiya',
    course: '2',
    enrollmentDate1: '2023-09-01',
    enrollmentDate2: '2024-02-01',
    phone: '+998939876543',
    status: 'critical',
    note: 'Turli yo\'nalishlarda parallel tahsil'
  },
  {
    id: 'dual_8',
    hemisId: 'H2022000456',
    fullName: 'Jumayeva Feruza Anvarovna',
    university1: 'NamDU',
    university2: 'AnDU',
    faculty1: 'Kimyo',
    faculty2: 'Biologiya',
    course: '4',
    enrollmentDate1: '2022-09-01',
    enrollmentDate2: '2022-11-15',
    phone: '+998945678901',
    status: 'critical',
    note: 'Farg\'ona vodiysidagi OTMlarda bir vaqtda tahsil'
  }
];

// =============================================
// YORDAMCHI GENERATSIYA FUNKSIYALARI
// =============================================
const uniList = ['TATU', 'TDYU', 'TDIU', 'SamDTU', 'AnDU', 'BuxDU', 'NamDU', 'QarDU', 'UrgDU', 'NukDU'];
const facultyList = ['IT', 'Huquq', 'Iqtisodiyot', 'Tibbiyot', 'Pedagogika', 'Filologiya', 'Matematika', 'Fizika', 'Kimyo', 'Biologiya'];
const missingDocsList = [
  ['Diplom nusxasi', 'Tibbiy ma\'lumotnoma'],
  ['Pasport nusxasi'],
  ['Harbiy hujjat', 'Foto'],
  ['Attestat asligi'],
  ['Tug\'ilganlik haqida guvohnoma'],
  ['JSHSHIR'],
  ['Ota-ona rozilik xati']
];
const leaveReasons = ['Sog\'lik', 'Oilaviy', 'Harbiy xizmat', 'Moliyaviy', 'Boshqa'];
const expelReasons = ['Akademik qarzdorlik', 'Davomat buzilishi', 'Intizomiy jazolar', 'O\'z xohishi bilan', 'To\'lov qilmaslik'];

const generatePhone = (i) => `+99890${String(1000000 + i).slice(-7)}`;

// Hujjatlari to'liq emas talabalar (67 ta)
export const incompleteDocumentsStudents = Array.from({ length: 67 }, (_, i) => ({
  id: `doc_${i + 1}`,
  hemisId: `H2024${String(i + 1).padStart(6, '0')}`,
  fullName: `${lastNames[i % lastNames.length]} ${firstNames[i % firstNames.length]}`,
  university: uniList[i % uniList.length],
  faculty: facultyList[i % facultyList.length],
  course: String((i % 4) + 1),
  missingDocs: missingDocsList[i % missingDocsList.length],
  phone: generatePhone(i + 1000)
}));

// Akademik ta'til muddati o'tganlar (23 ta)
export const expiredAcademicLeaveStudents = Array.from({ length: 23 }, (_, i) => ({
  id: `leave_${i + 1}`,
  hemisId: `H202${1 + (i % 4)}${String(i + 500).padStart(6, '0')}`,
  fullName: `${lastNames[(i + 5) % lastNames.length]} ${firstNames[(i + 3) % firstNames.length]}`,
  university: uniList[i % uniList.length],
  faculty: facultyList[(i + 2) % facultyList.length],
  course: String((i % 4) + 1),
  leaveStart: `202${3 - (i % 2)}-0${(i % 9) + 1}-15`,
  leaveEnd: `202${4 - (i % 2)}-0${(i % 9) + 1}-15`,
  reason: leaveReasons[i % leaveReasons.length],
  phone: generatePhone(i + 2000)
}));

// Chet el talabalari vizasi tugagan (5 ta)
export const expiredVisaStudents = [
  { id: 'visa_1', hemisId: 'H2022000345', fullName: 'Ahmad Khan', university: 'SamDTU', faculty: 'Tibbiyot', course: '4', country: 'Afg\'oniston', visaExpiry: '2024-12-15', phone: '+998901234567' },
  { id: 'visa_2', hemisId: 'H2023000456', fullName: 'Maria Petrova', university: 'TATU', faculty: 'IT', course: '2', country: 'Rossiya', visaExpiry: '2024-11-30', phone: '+998937654321' },
  { id: 'visa_3', hemisId: 'H2023000567', fullName: 'John Smith', university: 'TDYU', faculty: 'Xalqaro huquq', course: '3', country: 'AQSh', visaExpiry: '2025-01-10', phone: '+998945678901' },
  { id: 'visa_4', hemisId: 'H2022000678', fullName: 'Li Wei', university: 'TDIU', faculty: 'Iqtisodiyot', course: '4', country: 'Xitoy', visaExpiry: '2024-10-20', phone: '+998951234567' },
  { id: 'visa_5', hemisId: 'H2024000789', fullName: 'Fatima Al-Hassan', university: 'BuxDU', faculty: 'Arabistika', course: '1', country: 'Iroq', visaExpiry: '2025-02-28', phone: '+998967890123' }
];

// Passport ma'lumotlari eskirgan talabalar (178 ta - birinchi 50 tasini ko'rsatamiz)
export const expiredPassportStudents = Array.from({ length: 50 }, (_, i) => ({
  id: `pass_${i + 1}`,
  hemisId: `H202${(i % 4)}${String(i + 100).padStart(6, '0')}`,
  fullName: `${lastNames[(i + 7) % lastNames.length]} ${firstNames[(i + 11) % firstNames.length]}`,
  university: uniList[i % uniList.length],
  faculty: facultyList[(i + 4) % facultyList.length],
  course: String((i % 4) + 1),
  passportExpiry: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  phone: generatePhone(i + 3000)
}));

// Talabalar ro'yxatdan o'tkazilmagan (45 ta)
const unregNotes = [
  'DTM natijasi tasdiqlangan, HEMIS ga kiritilmagan',
  'Shartnoma imzolangan, tizimga qo\'shilmagan',
  'Transfer talaba, hujjatlar kutilmoqda',
  'Hujjatlar tekshiruvda',
  'To\'lov kutilmoqda'
];
export const unregisteredStudents = Array.from({ length: 45 }, (_, i) => ({
  id: `unreg_${i + 1}`,
  hemisId: `TEMP${String(i + 1).padStart(3, '0')}`,
  fullName: `${lastNames[(i + 2) % lastNames.length]} ${firstNames[(i + 8) % firstNames.length]}`,
  university: uniList[i % uniList.length],
  faculty: facultyList[(i + 6) % facultyList.length],
  course: '1',
  admissionDate: '2024-09-01',
  phone: generatePhone(i + 4000),
  note: unregNotes[i % unregNotes.length]
}));

// O'qishdan chetlatilganlar (50 ta - birinchi 50 tasi)
export const expelledStudents = Array.from({ length: 50 }, (_, i) => ({
  id: `exp_${i + 1}`,
  hemisId: `H202${(i % 4)}${String(i + 700).padStart(6, '0')}`,
  fullName: `${lastNames[(i + 9) % lastNames.length]} ${firstNames[(i + 4) % firstNames.length]}`,
  university: uniList[i % uniList.length],
  faculty: facultyList[(i + 1) % facultyList.length],
  course: String((i % 4) + 1),
  expelDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  reason: expelReasons[i % expelReasons.length],
  phone: generatePhone(i + 5000)
}));

// Stipendiya to'lanmagan talabalar (50 ta - birinchi 50 tasi)
export const unpaidScholarshipStudents = Array.from({ length: 50 }, (_, i) => ({
  id: `stip_${i + 1}`,
  hemisId: `H202${2 + (i % 3)}${String(i + 100).padStart(6, '0')}`,
  fullName: `${lastNames[(i + 12) % lastNames.length]} ${firstNames[(i + 6) % firstNames.length]}`,
  university: uniList[i % uniList.length],
  faculty: facultyList[(i + 3) % facultyList.length],
  course: String((i % 4) + 1),
  gpa: (4 + Math.random() * 1).toFixed(1),
  unpaidMonths: (i % 4) + 1,
  amount: ((i % 4) + 1) * 400000,
  phone: generatePhone(i + 6000)
}));

// =============================================
// KURS BO'YICHA XAVF TAHLILI
// Maktabni bitirgan yilga nisbatan kutilgan kursda o'qimayotgan talabalar
// =============================================
const currentYear = 2026;

const calculateExpectedCourse = (graduationYear) => {
  const yearsPassed = currentYear - graduationYear;
  if (yearsPassed >= 4) return 4;
  if (yearsPassed <= 0) return 1;
  return yearsPassed;
};

// Kurs bo'yicha xavfda bo'lgan talabalar (47 ta)
const courseRiskBaseStudents = [
  { hemisId: 'H2022001', fullName: 'Karimov Jasur', faculty: 'Kompyuter injiniringi', course: '2', schoolGraduationYear: 2022, gpa: 3.2, attendance: 85 },
  { hemisId: 'H2023001', fullName: 'Toshmatov Bekzod', faculty: 'Dasturiy injiniring', course: '1', schoolGraduationYear: 2023, gpa: 2.9, attendance: 78 },
  { hemisId: 'H2022003', fullName: 'Ergashev Ulugbek', faculty: 'Kompyuter injiniringi', course: '3', schoolGraduationYear: 2022, gpa: 2.4, attendance: 65 },
  { hemisId: 'H2023003', fullName: 'Yusupova Gulnora', faculty: 'Iqtisodiyot', course: '2', schoolGraduationYear: 2023, gpa: 3.3, attendance: 87 },
  { hemisId: 'H2021001', fullName: 'Mirzayev Bobur', faculty: 'Menejment', course: '3', schoolGraduationYear: 2021, gpa: 2.8, attendance: 72 },
  { hemisId: 'H2022004', fullName: 'Qodirov Anvar', faculty: 'Dasturiy injiniring', course: '2', schoolGraduationYear: 2022, gpa: 2.1, attendance: 58 },
  { hemisId: 'H2023004', fullName: 'Xolmatov Rustam', faculty: 'Axborot texnologiyalari', course: '1', schoolGraduationYear: 2023, gpa: 2.5, attendance: 70 },
  { hemisId: 'H2021003', fullName: 'Nazarova Lola', faculty: 'Sun\'iy intellekt', course: '2', schoolGraduationYear: 2021, gpa: 2.3, attendance: 62 },
  { hemisId: 'H2020001', fullName: 'Azimova Sevara', faculty: 'Tibbiyot', course: '3', schoolGraduationYear: 2020, gpa: 2.0, attendance: 55 },
  { hemisId: 'H2022007', fullName: 'Rahmonov Sardor', faculty: 'Huquqshunoslik', course: '2', schoolGraduationYear: 2022, gpa: 2.6, attendance: 68 },
  { hemisId: 'H2021004', fullName: 'Tursunova Malika', faculty: 'Iqtisodiyot', course: '2', schoolGraduationYear: 2021, gpa: 2.4, attendance: 60 },
  { hemisId: 'H2023005', fullName: 'Abdullayev Jahongir', faculty: 'Telekommunikatsiya', course: '1', schoolGraduationYear: 2023, gpa: 2.7, attendance: 73 },
  { hemisId: 'H2020002', fullName: 'Saidov Bobur', faculty: 'Kompyuter injiniringi', course: '2', schoolGraduationYear: 2020, gpa: 1.9, attendance: 50 },
  { hemisId: 'H2022008', fullName: 'Yuldasheva Nodira', faculty: 'Pedagogika', course: '3', schoolGraduationYear: 2022, gpa: 2.8, attendance: 75 },
  { hemisId: 'H2021005', fullName: 'Xoliqov Temur', faculty: 'Matematika', course: '3', schoolGraduationYear: 2021, gpa: 2.5, attendance: 65 },
];

// Qo'shimcha generatsiya qilingan talabalar
const additionalCourseRiskStudents = Array.from({ length: 32 }, (_, i) => ({
  hemisId: `H202${1 + (i % 4)}${String(i + 100).padStart(6, '0')}`,
  fullName: `${lastNames[(i + 15) % lastNames.length]} ${firstNames[(i + 10) % firstNames.length]}`,
  faculty: facultyList[(i + 5) % facultyList.length],
  course: String((i % 3) + 1),
  schoolGraduationYear: 2020 + (i % 4),
  gpa: (1.8 + Math.random() * 1.5).toFixed(1),
  attendance: Math.floor(50 + Math.random() * 35)
}));

// Barcha kurs xavfi talabalarini birlashtirish va tahlil qilish
export const courseRiskStudents = [...courseRiskBaseStudents, ...additionalCourseRiskStudents]
  .map((student, index) => {
    const expectedCourse = calculateExpectedCourse(student.schoolGraduationYear);
    const actualCourse = parseInt(student.course) || 1;
    const yearsBehind = expectedCourse - actualCourse;
    const isAtRisk = actualCourse < expectedCourse;

    return {
      id: `risk_${index + 1}`,
      ...student,
      university: uniList[index % uniList.length],
      expectedCourse,
      yearsBehind: isAtRisk ? yearsBehind : 0,
      riskLevel: yearsBehind >= 2 ? 'critical' : yearsBehind === 1 ? 'warning' : 'normal',
      isAtRisk,
      phone: generatePhone(index + 7000)
    };
  })
  .filter(s => s.isAtRisk); // Faqat xavfda bo'lganlarni qaytarish

// Indikator nomi bo'yicha talabalar olish funksiyasi
export const getStudentsByIndicator = (indicatorName, universityId = 'all') => {
  const filterByUniversity = (students, uniField = 'university') => {
    if (universityId === 'all') return students;
    return students.filter(s => {
      const uni = s[uniField]?.toLowerCase();
      return uni === universityId || uni?.includes(universityId);
    });
  };

  // Indikator nomiga qarab tegishli talabalar ro'yxatini qaytarish
  const indicatorMap = {
    "Ikki OTMda bir vaqtda o'qiyotganlar": () => filterByUniversity(dualEnrollmentStudents, 'university1'),
    "Kurs bo'yicha xavf tahlili": () => filterByUniversity(courseRiskStudents),
    "Hujjatlari to'liq emas talabalar": () => filterByUniversity(incompleteDocumentsStudents),
    "Akademik ta'til muddati o'tganlar": () => filterByUniversity(expiredAcademicLeaveStudents),
    "Chet el talabalari vizasi tugagan": () => filterByUniversity(expiredVisaStudents),
    "Chet ellik talabalar vizasi muammolari": () => filterByUniversity(expiredVisaStudents),
    "Passport ma'lumotlari eskirgan": () => filterByUniversity(expiredPassportStudents),
    "Talabalar ro'yxatdan o'tkazilmagan": () => filterByUniversity(unregisteredStudents),
    "O'qishdan chetlatilganlar": () => filterByUniversity(expelledStudents),
    "Stipendiya to'lanmagan talabalar": () => filterByUniversity(unpaidScholarshipStudents)
  };

  const getStudents = indicatorMap[indicatorName];
  if (getStudents) {
    return getStudents();
  }

  // Agar maxsus ro'yxat bo'lmasa, umumiy muammoli talabalardan qaytarish
  return getProblematicStudents(universityId).slice(0, 20);
};
