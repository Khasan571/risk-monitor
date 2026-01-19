// Universitetlar ro'yxati
export const universities = [
  { id: 'all', name: "Barcha universitetlar" },
  { id: 'tatu', name: "TATU - Toshkent axborot texnologiyalari universiteti" },
  { id: 'tdyu', name: "TDYU - Toshkent davlat yuridik universiteti" },
  { id: 'tdiu', name: "TDIU - Toshkent davlat iqtisodiyot universiteti" },
  { id: 'samdtu', name: "SamDTU - Samarqand davlat tibbiyot universiteti" },
  { id: 'andu', name: "AnDU - Andijon davlat universiteti" },
  { id: 'buxdu', name: "BuxDU - Buxoro davlat universiteti" },
  { id: 'namdu', name: "NamDU - Namangan davlat universiteti" },
  { id: 'qardu', name: "QarDU - Qarshi davlat universiteti" },
  { id: 'urgdu', name: "UrgDU - Urganch davlat universiteti" },
  { id: 'nukdu', name: "NukDU - Nukus davlat universiteti" },
];

// Oylar ro'yxati
export const months = [
  { id: 'all', name: "Barcha oylar" },
  { id: '2025-01', name: "Yanvar 2025" },
  { id: '2025-02', name: "Fevral 2025" },
  { id: '2025-03', name: "Mart 2025" },
  { id: '2025-04', name: "Aprel 2025" },
  { id: '2025-05', name: "May 2025" },
  { id: '2025-06', name: "Iyun 2025" },
  { id: '2024-12', name: "Dekabr 2024" },
  { id: '2024-11', name: "Noyabr 2024" },
  { id: '2024-10', name: "Oktyabr 2024" },
  { id: '2024-09', name: "Sentyabr 2024" },
];

// Kurslar ro'yxati
export const courses = [
  { id: 'all', name: "Barcha kurslar" },
  { id: '1', name: "1-kurs" },
  { id: '2', name: "2-kurs" },
  { id: '3', name: "3-kurs" },
  { id: '4', name: "4-kurs" },
  { id: 'magistr', name: "Magistratura" },
];

// Har bir universitet uchun katta hajmli test ma'lumotlari
const generateIndicators = () => {
  const indicators = [];
  let id = 1;

  const universityIds = ['tatu', 'tdyu', 'tdiu', 'samdtu', 'andu', 'buxdu', 'namdu', 'qardu', 'urgdu', 'nukdu'];
  const monthIds = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2024-12', '2024-11', '2024-10', '2024-09'];
  const courseIds = ['1', '2', '3', '4', 'magistr'];

  // =============================================
  // TALABA KATEGORIYASI - GLOBAL INDIKATORLAR
  // (Faqat bitta marta, barcha OTMlar uchun umumiy)
  // =============================================
  const talabaIndicators = [
    { name: "Ikki OTMda bir vaqtda o'qiyotganlar", dataSource: 'HEMIS', value: 8, status: 'critical' },
    { name: "Kurs bo'yicha xavf tahlili", dataSource: 'HEMIS', value: 47, status: 'critical' },
    { name: "Hujjatlari to'liq emas talabalar", dataSource: 'HEMIS', value: 67, status: 'high' },
    { name: "Akademik ta'til muddati o'tganlar", dataSource: 'HEMIS', value: 23, status: 'medium' },
    { name: "Transfer talabalar muammolari", dataSource: 'HEMIS', value: 14, status: 'medium' },
    { name: "Chet el talabalari vizasi tugagan", dataSource: 'HEMIS + Migratsiya', value: 5, status: 'high' },
    { name: "Passport ma'lumotlari eskirgan", dataSource: 'HEMIS', value: 178, status: 'high' },
    { name: "Talabalar ro'yxatdan o'tkazilmagan", dataSource: 'HEMIS', value: 45, status: 'high' },
    { name: "O'qishdan chetlatilganlar", dataSource: 'HEMIS', value: 312, status: 'medium' },
    { name: "Stipendiya to'lanmagan talabalar", dataSource: 'Moliya bo\'limi', value: 156, status: 'high' },
  ];

  // Talaba indikatorlarini qo'shish (FAQAT BITTA MARTA)
  talabaIndicators.forEach(ind => {
    const hour = Math.floor(Math.random() * 12) + 8;
    const minute = Math.floor(Math.random() * 60);
    indicators.push({
      id: id++,
      category: 'talaba',
      name: ind.name,
      value: ind.value.toString(),
      status: ind.status,
      dataSource: ind.dataSource,
      lastUpdated: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      university: 'all',
      month: 'all',
      course: 'all',
      isGlobal: true // Bu global indikator
    });
  });

  // =============================================
  // BOSHQA KATEGORIYALAR - FILTRLANGAN INDIKATORLAR
  // =============================================
  const indicatorTemplates = [
    // Korrupsiya
    { category: 'korrupsiya', name: "Arxivdan qayta tiklangan talabalar", dataSource: 'HEMIS', baseValue: 15 },
    { category: 'korrupsiya', name: "DTM balidan past qabul qilinganlar", dataSource: 'DTM + HEMIS', baseValue: 8 },
    { category: 'korrupsiya', name: "Baholar muddat o'tgandan keyin o'zgartirilgan", dataSource: 'HEMIS Audit', baseValue: 45 },
    { category: 'korrupsiya', name: "Imtihon natijalarida anomaliyalar", dataSource: 'HEMIS Analytics', baseValue: 12 },
    { category: 'korrupsiya', name: "Bir xil javobli test natijalari", dataSource: 'Test tizimi', baseValue: 25 },

    // Huquqiy
    { category: 'huquqiy', name: "Akkreditatsiya muddati tugagan yo'nalishlar", dataSource: 'Akkreditatsiya baza', baseValue: 2 },
    { category: 'huquqiy', name: "Noqonuniy diplomlar aniqlangan", dataSource: 'Tekshiruv', baseValue: 5 },
    { category: 'huquqiy', name: "Litsenziyasiz ta'lim yo'nalishlari", dataSource: 'Litsenziya baza', baseValue: 3 },
    { category: 'huquqiy', name: "Shartnoma buzilishlari", dataSource: 'Yuridik bo\'lim', baseValue: 18 },

    // Akademik
    { category: 'akademik', name: "Plagiatizm aniqlangan ishlar", dataSource: 'Antiplagiat', baseValue: 35 },
    { category: 'akademik', name: "Akademik qarzdorlik darajasi", dataSource: 'HEMIS', baseValue: 12, isPercent: true },
    { category: 'akademik', name: "O'zlashtirishga ta'sir qilmagan fanlar", dataSource: 'HEMIS', baseValue: 8 },
    { category: 'akademik', name: "Sirtqi talabalar davomat buzilishi", dataSource: 'HEMIS', baseValue: 156 },
    { category: 'akademik', name: "GPA 2.0 dan past talabalar", dataSource: 'HEMIS', baseValue: 89 },

    // Diplom
    { category: 'diplom', name: "Bitirgan lekin diplom olmaganlar", dataSource: 'HEMIS', baseValue: 120 },
    { category: 'diplom', name: "Diplom dublikatlari so'ralgan", dataSource: 'Arxiv', baseValue: 34 },
    { category: 'diplom', name: "Noto'g'ri ma'lumotli diplomlar", dataSource: 'Tekshiruv', baseValue: 7 },

    // Ta'lim shakli
    { category: 'talim_shakli', name: "Sirtqi ta'limda ruxsatsiz yo'nalishlar", dataSource: 'HEMIS', baseValue: 3 },
    { category: 'talim_shakli', name: "Kechki ta'lim limitidan oshgan", dataSource: 'HEMIS', baseValue: 45 },
    { category: 'talim_shakli', name: "Masofaviy ta'lim texnik muammolar", dataSource: 'IT bo\'limi', baseValue: 28 },

    // Moliya
    { category: 'moliya', name: "1 yildan ortiq to'lov qilmaganlar", dataSource: 'Billing', baseValue: 95 },
    { category: 'moliya', name: "Umumiy qarzdorlik summasi (mln)", dataSource: 'Billing', baseValue: 2500 },
    { category: 'moliya', name: "Grant kontrakt o'zgartirilgan", dataSource: 'HEMIS + Billing', baseValue: 12 },
    { category: 'moliya', name: "Ortiqcha to'lov qaytarilmagan", dataSource: 'Billing', baseValue: 56 },

    // Ish / Bandlik
    { category: 'ish', name: "Bitiruvchilar bandlik darajasi", dataSource: 'Mehnat vazirligi', baseValue: 67, isPercent: true },
    { category: 'ish', name: "Mutaxassislik bo'yicha ishlamaganlar", dataSource: 'So\'rovnoma', baseValue: 234 },
    { category: 'ish', name: "Amaliyot o'tamaganlar", dataSource: 'HEMIS', baseValue: 89 },

    // TTJ
    { category: 'ttj', name: "TTJda joy yetishmasligi", dataSource: 'TTJ tizimi', baseValue: 350 },
    { category: 'ttj', name: "TTJ sanitariya buzilishlari", dataSource: 'Nazorat', baseValue: 12 },
    { category: 'ttj', name: "TTJda ro'yxatdan o'tmagan yashovchilar", dataSource: 'TTJ tizimi', baseValue: 45 },
    { category: 'ttj', name: "TTJ to'lov qarzdorlari", dataSource: 'Billing', baseValue: 78 },

    // Kadrlar
    { category: 'kadrlar', name: "Arvoh xodimlar", dataSource: 'Kadrlar', baseValue: 15 },
    { category: 'kadrlar', name: "Malaka oshirmagan o'qituvchilar", dataSource: 'Kadrlar', baseValue: 67 },
    { category: 'kadrlar', name: "Stavka limitidan oshgan", dataSource: 'Kadrlar', baseValue: 23 },
    { category: 'kadrlar', name: "PhD darajasiz kafedra mudirlari", dataSource: 'HEMIS', baseValue: 4 },
    { category: 'kadrlar', name: "Pensiya yoshidagi xodimlar", dataSource: 'Kadrlar', baseValue: 45 },

    // Qo'shimcha
    { category: 'qoshimcha', name: "IT tizimlar uzilishi", dataSource: 'IT bo\'limi', baseValue: 5 },
    { category: 'qoshimcha', name: "Kutubxona resurslar yetishmasligi", dataSource: 'Kutubxona', baseValue: 34 },
    { category: 'qoshimcha', name: "Laboratoriya jihozlari eskirgan", dataSource: 'Inventar', baseValue: 78 },
    { category: 'qoshimcha', name: "Xavfsizlik kameralari ishlamaydi", dataSource: 'Xavfsizlik', baseValue: 12 },
  ];

  // Boshqa kategoriyalar uchun universitet/oy kombinatsiyasida generatsiya qilish
  universityIds.forEach(uniId => {
    monthIds.forEach(monthId => {
      indicatorTemplates.forEach(template => {
        // Random variance qo'shish
        const variance = Math.random() * 0.6 - 0.3;
        let value = Math.round(template.baseValue * (1 + variance));

        // Universitetga qarab o'zgartirish
        const uniMultiplier = {
          'tatu': 1.2, 'tdyu': 0.9, 'tdiu': 1.1, 'samdtu': 0.8,
          'andu': 1.3, 'buxdu': 1.0, 'namdu': 1.15, 'qardu': 0.95,
          'urgdu': 1.05, 'nukdu': 1.25
        };
        value = Math.round(value * (uniMultiplier[uniId] || 1));

        // Status aniqlash
        let status;
        const ratio = value / template.baseValue;
        if (ratio > 1.5) status = 'critical';
        else if (ratio > 1.2) status = 'high';
        else if (ratio > 0.8) status = 'medium';
        else if (ratio > 0.5) status = 'low';
        else status = 'good';

        const hour = Math.floor(Math.random() * 12) + 8;
        const minute = Math.floor(Math.random() * 60);

        indicators.push({
          id: id++,
          category: template.category,
          name: template.name,
          value: template.isPercent ? `${value}%` : value.toString(),
          status,
          dataSource: template.dataSource,
          lastUpdated: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          university: uniId,
          month: monthId,
          course: 'all',
          isGlobal: false
        });
      });
    });
  });

  return indicators;
};

export const allIndicators = generateIndicators();

// Statistika olish funksiyasi
export const getStats = (indicators) => {
  return {
    total: indicators.length,
    critical: indicators.filter(i => i.status === 'critical').length,
    high: indicators.filter(i => i.status === 'high').length,
    medium: indicators.filter(i => i.status === 'medium').length,
    low: indicators.filter(i => i.status === 'low').length,
    good: indicators.filter(i => i.status === 'good').length,
  };
};
