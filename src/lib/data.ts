import { Project, Skill, TimelineItem, SocialLink } from '../types';

export const PERSONAL_INFO = {
  name: "Javohir Abdurazzoqov",
  title: "Frontend React & Next.js Developer",
  subtitles: [
    "Frontend React & Next.js Developer",
    "UI/UX & Interaktiv Veb Muhandisi",
    "Zamonaviy Veb Ilovalar Arxitektori",
    "Tailwind CSS & Animatsiya Mutaxassisi"
  ],
  location: "Farg'ona, O'zbekiston",
  status: "Loyihalar va ish uchun ochiq",
  email: "javohirabdurazzoqov625@gmail.com",
  telegram: "@rzzkv_i7",
  telegramUrl: "https://t.me/rzzkv_i7",
  github: "rzzkv013",
  githubUrl: "https://github.com/rzzkv013",
  linkedinUrl: "https://www.linkedin.com/in/javohir-abdurazzoqov/",
  experienceYears: "3+",
  completedProjects: "25+",
  satisfiedClients: "100%",
  cleanCodeScore: "99.9%",
  shortBio: "Salom! Men Javohir Abdurazzoqov — zamonaviy, chaqqon va yuqori darajada interaktiv veb-ilovalarni yaratishga ixtisoslashgan Frontend dasturchiman. React, Next.js (App Router) va TypeScript ekotizimida murakkab g'oyalarni toza kod va maftunkor foydalanuvchi tajribasiga aylantiraman.",
  detailedBio: `Dasturlash olamiga bo'lgan cheksiz qiziqishim orqali men har bir loyihaga nafaqat texnik yechim, balki san'at va estetikani ham kiritaman. Farg'onadan turib mahalliy va xalqaro miqyosdagi innovatsion loyihalar ustida ish olib boraman. 

Asosiy yo'nalishlarim — Next.js 14+ Server Components, optimallashtirilgan SPA/SSR tizimlar, micro-frontend arxitekturasi, murakkab davlat boshqaruvi (state management) va ko'zni qamashtiruvchi 3D/2D dinamik animatsiyalardir.`
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/rzzkv013",
    icon: "github",
    handle: "github.com/rzzkv013",
    color: "#6e5494"
  },
  {
    name: "Telegram",
    url: "https://t.me/rzzkv_i7",
    icon: "send",
    handle: "@rzzkv_i7",
    color: "#229ED9"
  },
  {
    name: "Email",
    url: "mailto:javohirabdurazzoqov625@gmail.com",
    icon: "mail",
    handle: "javohirabdurazzoqov625@gmail.com",
    color: "#EA4335"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/javohir-abdurazzoqov/",
    icon: "linkedin",
    handle: "Javohir Abdurazzoqov",
    color: "#0A66C2"
  }
];

export const SKILLS: Skill[] = [
  {
    name: "Next.js",
    category: "frontend",
    level: 95,
    iconName: "Globe",
    color: "#ffffff",
    description: "App Router, Server Components, SSR/SSG/ISR, Turbopack, Dynamic Routing, API Routes",
    experienceYears: "2.5 yil",
    highlight: true
  },
  {
    name: "React.js",
    category: "frontend",
    level: 96,
    iconName: "Code2",
    color: "#61DAFB",
    description: "Custom Hooks, Context API, Redux Toolkit, Virtual DOM optimallashtirish, React 19",
    experienceYears: "3 yil",
    highlight: true
  },
  {
    name: "TypeScript",
    category: "languages",
    level: 92,
    iconName: "FileCode",
    color: "#3178C6",
    description: "Qat'iy turlash (Strict Typing), Generics, Utility Types, Type Guards, Interfeyslar",
    experienceYears: "2.5 yil",
    highlight: true
  },
  {
    name: "JavaScript (ES6+)",
    category: "languages",
    level: 98,
    iconName: "Zap",
    color: "#F7DF1E",
    description: "Async/Await, Promises, Closures, Event Loop, DOM manipulyatsiyasi, Modul tizimi",
    experienceYears: "3.5 yil",
    highlight: true
  },
  {
    name: "Tailwind CSS",
    category: "styling",
    level: 96,
    iconName: "Palette",
    color: "#38BDF8",
    description: "Utility-first arxitektura, Custom responsive breakpoints, Animatsiyalar, Dark mode",
    experienceYears: "3 yil",
    highlight: true
  },
  {
    name: "Python",
    category: "languages",
    level: 85,
    iconName: "Terminal",
    color: "#FFD43B",
    description: "Skriptlar, Aiogram Telegram botlari, Web scraping, REST API integratsiyalari",
    experienceYears: "2 yil"
  },
  {
    name: "Material UI",
    category: "styling",
    level: 88,
    iconName: "Layers",
    color: "#007FFF",
    description: "Komponentlar tizimi, Theme customization, Grid tizimlari, Responsive maketlar",
    experienceYears: "2 yil"
  },
  {
    name: "Ant Design",
    category: "styling",
    level: 86,
    iconName: "LayoutGrid",
    color: "#1890FF",
    description: "Boshqaruv panellari (Admin dashboards), Murakkab formalar, Jadval va filtrlash",
    experienceYears: "1.5 yil"
  },
  {
    name: "Node.js",
    category: "backend-tools",
    level: 82,
    iconName: "Server",
    color: "#68A063",
    description: "Express.js, RESTful APIs, JSON Web Tokens (JWT), Middleware arxitekturasi",
    experienceYears: "2 yil"
  },
  {
    name: "Git & GitHub",
    category: "backend-tools",
    level: 94,
    iconName: "GitBranch",
    color: "#F05032",
    description: "Branching workflows, Git flow, CI/CD Actions, Pull Requests, Code Review",
    experienceYears: "3 yil",
    highlight: true
  },
  {
    name: "Vercel",
    category: "backend-tools",
    level: 94,
    iconName: "Rocket",
    color: "#000000",
    description: "Avtomatik deploylar, Edge Functions, Analytics, Custom domenlar va SSL",
    experienceYears: "2.5 yil"
  },
  {
    name: "Redux Toolkit",
    category: "frontend",
    level: 90,
    iconName: "Database",
    color: "#764ABC",
    description: "Global State boshqaruvi, createSlice, RTK Query orqali kesh va API boshqaruvi",
    experienceYears: "2 yil"
  },
  {
    name: "Framer Motion",
    category: "styling",
    level: 91,
    iconName: "Sparkles",
    color: "#F012BE",
    description: "Layout animatsiyalar, Gesture/Drag effektlar, Scroll-driven visual dinamika",
    experienceYears: "2 yil"
  },
  {
    name: "HTML5 & CSS3",
    category: "styling",
    level: 99,
    iconName: "FileSpreadsheet",
    color: "#E34F26",
    description: "Semantik teglar, Accessibility (a11y), CSS Grid, Flexbox, Custom Variables",
    experienceYears: "3.5 yil"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ansor-savdo",
    title: "Ansor Savdo Markazi Web Platformasi",
    subtitle: "Keng ko'lamli zamonaviy elektron savdo portali",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    description: "Ansor savdo markazi uchun Next.js va Tailwind CSS asosida yaratilgan to'liq funksional elektron savdo platformasi. Mahsulotlar filtri, qulay savatcha va buyurtma boshqaruvi.",
    fullDescription: "Ansor Savdo Markazi platformasi xaridorlarga minglab mahsulotlarni qulay qidirish, turkumlar bo'yicha saralash, narx va reyting filtrlari orqali tezda xarid qilish imkonini beradi. Tizimda yuqori yuklamalarga chidamlilik uchun Next.js App Router va Server-Side Rendering qo'llanilgan. Savatcha holati Redux Toolkit yordamida brauzer xotirasiga sinxronlashadi, foydalanuvchilar buyurtma holatini real vaqtda kuzatishi mumkin.",
    features: [
      "Turkumlangan mahsulotlar katalogi va tezkor Live Search",
      "Dinamik savatcha (Cart Drawer) va buyurtmani rasmiylashtirish",
      "Narx, brend va xususiyatlar bo'yicha ko'p bosqichli filtrlash",
      "Admin boshqaruv paneli orqali yangi tovarlarni yuklash",
      "To'liq moslashuvchan (Mobile-first) zamonaviy responsiv interfeys",
      "Tezkor yuklanish va SEO optimallashtirish (Lighthouse 98+ ball)"
    ],
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Vercel"],
    demoUrl: "https://ansor-savdo.uz",
    githubUrl: "https://github.com/rzzkv013/ansor-savdo-platform",
    featured: true,
    color: "#3b82f6",
    badge: "E-Commerce Flagship",
    metrics: [
      { label: "Yuklanish tezligi", value: "0.8s" },
      { label: "SEO natijasi", value: "98%" },
      { label: "Tovarlar sig'imi", value: "5,000+" }
    ]
  },
  {
    id: "moshina-rent",
    title: "Moshina - Avtomobil Ijara Servisi",
    subtitle: "Premium va tejamkor avtomobillar ijarasi platformasi",
    category: "web",
    categoryLabel: "Web Ilovalar",
    description: "O'zbekiston bo'ylab avtomobillarni onlayn bron qilish va ijaraga olish imkonini beruvchi ko'p sahifali yuqori darajadagi veb-ilova.",
    fullDescription: "Moshina servisi avtomobil ijarasini oddiy va shaffof qilish uchun ishlab chiqilgan. Foydalanuvchilar qulay sana va shahar bo'yicha transport vositalarini tanlashi, narx kalkulyatori orqali xarajatlarni hisoblashi, shartnoma shartlari bilan tanishishi va onlayn tasdiq olishi mumkin. Platforma zamonaviy neon glassmorphism uslubida Vercel serverlariga joylangan.",
    features: [
      "Kompakt, premium, biznes va yo'ltanlamas avtomobillar katalogi",
      "Ijara kunlariga qarab avtomatik narx hisoblagich kalkulyatori",
      "Foydalanuvchi qulayligi uchun bir bosqichli onlayn bron tizimi",
      "Haydovchili va haydovchisiz ijara parametrlarini sozlash",
      "Avtomobil texnik ma'lumotlari va yuqori sifatli fotosuratlar galereyasi"
    ],
    technologies: ["Next.js", "React.js", "Tailwind CSS", "Lucide React", "Vercel"],
    demoUrl: "https://moshina-rent.vercel.app",
    githubUrl: "https://github.com/rzzkv013/moshina-car-rental",
    featured: true,
    color: "#06b6d4",
    badge: "Avto Xizmat",
    metrics: [
      { label: "Bron vaqti", value: "60 soniya" },
      { label: "Konversiya", value: "+45%" },
      { label: "Platforma", value: "Vercel Edge" }
    ]
  },
  {
    id: "badiiyat-adabiyot",
    title: "Badiiyat - O'zbek Adabiyoti Portali",
    subtitle: "Mumtoz va zamonaviy adabiyotimiz durdonalari platformasi",
    category: "web",
    categoryLabel: "Web Ilovalar",
    description: "O'zbek adiblari, ularning hayoti, asarlari, iqtiboslari va audio kitoblarini jamlagan ma'rifiy va interaktiv veb portal.",
    fullDescription: "Badiiyat portali yoshlar va kitobxonlar uchun yaratilgan boy adabiy xazina bo'lib, unda Alisher Navoiy, Abdulla Qodiriy, Cho'lpon, O'tkir Hoshimov kabi buyuk allomalarning hayoti va ijodiy merosi qulay kataloglangan. Portalda audio kitoblarni to'g'ridan-to'g'ri tinglash uchun maxsus audio player, kitoblardan terilgan ta'sirli iqtiboslar hamda elektron kutubxona mavjud.",
    features: [
      "Adiblar bo'yicha batafsil biografik ma'lumotlar va tarixiy xronologiya",
      "Elektron asarlar to'plami va qidiruv tizimi",
      "Interaktiv audio kitob pleyeri va boblar bo'yicha bo'lingan mundarija",
      "Kun iqtibosi va foydalanuvchilar uchun fikr qoldirish paneli",
      "Yengil va ko'zga qulay madaniy dizayn, tungi rejim"
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS", "Lucide React", "Web Audio API"],
    demoUrl: "https://badiiyat-uz.vercel.app",
    githubUrl: "https://github.com/rzzkv013/badiiyat-adabiyot-portali",
    featured: true,
    color: "#8b5cf6",
    badge: "Madaniy Portal",
    metrics: [
      { label: "Adiblar bazasi", value: "100+" },
      { label: "O'quvchilar soni", value: "10k+" },
      { label: "O'rtacha mutolaa", value: "8.4 daqiqa" }
    ]
  },
  {
    id: "ozbegim-doors",
    title: "O'ZBEGIM DOORS - Onlayn Katalog",
    subtitle: "Eshik va interyer dizaynlari rasmiy mahsulot katalogi",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    description: "Premium yog'och va zamonaviy MDF eshiklar ishlab chiqaruvchi brend uchun eksklyuziv veb-katalog va buyurtma konfiguratori.",
    fullDescription: "O'ZBEGIM DOORS fabrikasi uchun ishlab chiqilgan mazkur sayt xaridorlarga xonadon interyeriga mos eshiklarni tanlash, ranglarini (kulrang, oq emal, yong'oq, eman) real vaqtda almashtirib ko'rish, o'lchamlar bo'yicha narxni hisoblash va mutaxassis o'lchovchi chaqirish imkonini beradi.",
    features: [
      "Klassik, Neoklassik va Zamonaviy (Hi-Tech) eshiklar katalogi",
      "Rang va material qoplamalarini interaktiv o'zgartirish (Color Switcher)",
      "O'lcham va qo'shimcha furnituralar bo'yicha kalkulyator",
      "Mahsulot sifat sertifikatlari va 3 yillik kafolat shartlari",
      "Telegram orqali to'g'ridan-to'g'ri buyurtma va o'lchov xizmati so'rovi"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    demoUrl: "https://ozbegim-doors.uz",
    githubUrl: "https://github.com/rzzkv013/ozbegim-doors-catalog",
    featured: true,
    color: "#f59e0b",
    badge: "Ishlab Chiqarish",
    metrics: [
      { label: "Modellar", value: "250+ tur" },
      { label: "Mijozlar qoniqishi", value: "99%" },
      { label: "So'rovlar o'sishi", value: "+80%" }
    ]
  },
  {
    id: "dream-smp67",
    title: "DREAM SMP67 - O'yin Hamjamiyati Portali",
    subtitle: "Minecraft serveri jonli monitoringi va donat tizimi",
    category: "gameserver",
    categoryLabel: "Minecraft / Game Server",
    description: "Mashhur DREAM SMP67 o'yin serveri uchun jonli onlayn monitoring, server holati, o'yinchilar statistikasi va avtomatlashtirilgan do'kon.",
    fullDescription: "Minecraft geymerlari va hamjamiyat a'zolari uchun maxsus yaratilgan platforma. Saytda server IP manzili, online turgan o'yinchilar ro'yxati, server ping ko'rsatkichi, Discord integratsiyasi, server qoidalari hamda xavfsiz avtomatik donat tizimi jamlangan. Yuqori tezlik va qiziqarli gamer-uslubidagi vizual effektlar mavjud.",
    features: [
      "Server holatini jonli tekshirish (Live Player Count & TPS Ping)",
      "Server IP manzilini bir bosishda nusxalash (One-click IP copy)",
      "O'yinchilar reytingi va klanlar jadvali",
      "Avtomatlashtirilgan o'yin ichi imtiyozlar do'koni",
      "Discord hamjamiyatiga to'g'ridan-to'g'ri bog'lanish va qoidalar bazasi"
    ],
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "WebSockets", "Vercel"],
    demoUrl: "https://dream-smp67.vercel.app",
    githubUrl: "https://github.com/rzzkv013/dream-smp67-web",
    featured: false,
    color: "#10b981",
    badge: "Gaming Community",
    metrics: [
      { label: "Onlayn o'yinchilar", value: "1,200+" },
      { label: "Server Uptime", value: "99.8%" },
      { label: "Klanlar soni", value: "48 ta" }
    ]
  },
  {
    id: "smart-commerce-bot",
    title: "Smart Commerce - Telegram Savdo Boti & CRM",
    subtitle: "Avtomatlashtirilgan savdo va buyurtmalar qabul qilish boti",
    category: "telegram",
    categoryLabel: "Telegram Bot",
    description: "Do'konlar va xizmat ko'rsatish sohalari uchun Python (Aiogram) va Node.js da yaratilgan qulay savdo boti hamda veb boshqaruv paneli.",
    fullDescription: "Telegram orqali to'g'ridan-to'g'ri tovarlarni tanlash, xarid savatchasiga qo'shish, lokatsiyani yuborish, to'lov tizimlari orqali hisob-kitob qilish va yetkazib beruvchilarga avtomatik marshrut yuborish imkonini beruvchi mukammal bot tizimi. Administratorlar uchun veb-interfeys orqali mahsulot qo'shish va statistika ko'rish imkoniyati mavjud.",
    features: [
      "Interaktiv Telegram Web App (TWA) katalog ko'rinishi",
      "Click va Payme orqali xavfsiz to'lovlarni amalga oshirish",
      "Lokatsiyani avtomatik aniqlash va yetkazib berish narxini hisoblash",
      "Buyurtma holati o'zgarganda xaridorga tezkor SMS/Telegram xabar",
      "Savdo statistikasi, hisobotlar va eksport qilish imkoniyati"
    ],
    technologies: ["Python", "Aiogram", "Node.js", "PostgreSQL", "Telegram API"],
    demoUrl: "https://t.me/smart_commerce_demo_bot",
    githubUrl: "https://github.com/rzzkv013/smart-commerce-telegram-bot",
    featured: false,
    color: "#0284c7",
    badge: "Telegram & CRM",
    metrics: [
      { label: "Kunlik so'rovlar", value: "15,000+" },
      { label: "Buyurtma tezligi", value: "30 soniya" },
      { label: "Avtomatlashuv", value: "100%" }
    ]
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2024 - Hozirgacha",
    period: "Aktiv",
    title: "Katta Frontend & Next.js Dasturchi",
    organization: "Mustaqil Frilans & Xususiy Loyihalar",
    location: "Farg'ona / Masofaviy (Remote)",
    type: "work",
    description: "Next.js 14+ App Router, TypeScript va zamonaviy arxitektura asosida bizneslar uchun moslashtirilgan veb platformalar, elektron tijorat saytlari va xususiy dasturlar ishlab chiqish.",
    skills: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Vercel"]
  },
  {
    year: "2023 - 2024",
    period: "1.5 yil",
    title: "Frontend Dasturchi (React.js)",
    organization: "Web Dasturlash & Raqamli Yechimlar",
    location: "O'zbekiston",
    type: "work",
    description: "Turli kompaniyalar uchun korporativ veb-saytlar, boshqaruv panellari (Admin dashboards) va REST API lar bilan integratsiyalashgan interaktiv foydalanuvchi interfeyslarini yaratish.",
    skills: ["React.js", "JavaScript (ES6+)", "Material UI", "Ant Design", "Git", "REST API"]
  },
  {
    year: "2022 - 2023",
    period: "1 yil",
    title: "Dasturiy Ta'minot Asoslari & Python Botlar",
    organization: "Amaliy Dasturlash Laboratoriyasi",
    location: "Farg'ona",
    type: "education",
    description: "Veb texnologiyalari, algoritmlar, ma'lumotlar tuzilmasi, Python orqali avtomatlashtirish va dasturlash mantig'ini chuqur o'rganish va amaliyotda qo'llash.",
    skills: ["JavaScript", "HTML5", "CSS3", "Python", "Algoritmlar", "Git"]
  }
];

export const RESUME_DATA = {
  fullName: "Javohir Abdurazzoqov",
  headline: "Frontend React & Next.js Developer",
  contact: {
    email: "javohirabdurazzoqov625@gmail.com",
    telegram: "@rzzkv_i7",
    phone: "+998 (90) 000-00-00",
    location: "Farg'ona viloyati, O'zbekiston",
    github: "github.com/rzzkv013"
  },
  summary: "Zamonaviy veb-texnologiyalarga, ayniqsa React va Next.js ekotizimiga chuqur qiziqqan va amaliy ko'nikmalarga ega Frontend dasturchi. Foydalanuvchi tajribasini (UX) yuqori pog'onaga ko'taruvchi chiroyli animatsiyalar, toza kod arxitekturasi va tezkor yuklanish imkoniyatlarini ta'minlashga intilaman.",
  languages: [
    { name: "O'zbek tili", level: "Ona tili (Mukammal)" },
    { name: "Ingliz tili", level: "Texnik daraja (B2 / Hujjatlar va muloqot)" },
    { name: "Rus tili", level: "So'zlashuv darajasi (B1)" }
  ],
  interests: [
    "Veb Animatsiyalar & Micro-Interactions",
    "Open Source Loyihalar",
    "Game Serverlar Arxitekturasi",
    "Sun'iy Intellekt Vositalari (AI Tools)",
    "Foydalanuvchi Psixologiyasi & UI Dizayn"
  ]
};
