// Standalone Client-side PDF Generator for Javohir Abdurazzoqov's Resume
// Produces a standard, valid PDF 1.4 document with zero external dependencies!

import { RESUME_DATA, SKILLS, TIMELINE_ITEMS, PROJECTS } from "./data";

export function downloadResumePDF() {
  const pageWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  // Helper to escape PDF strings
  const esc = (str: string) => {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[\u02BB\u02BC]/g, "'") // Uzbek okina
      .replace(/[^\x00-\x7F]/g, (char) => {
        // Transliterate common accented/special characters to ASCII for Helvetica compatibility
        const map: Record<string, string> = {
          "o'": "o'",
          "g'": "g'",
          "O'": "O'",
          "G'": "G'",
          "sh": "sh",
          "ch": "ch",
          "ya": "ya",
          "yu": "yu",
          "yo": "yo",
        };
        return map[char] || char;
      });
  };

  // Build PDF text operations
  const ops: string[] = [];
  let y = pageHeight - 50;

  // Title: JAVOHIR ABDURAZZOQOV
  ops.push("BT");
  ops.push("/F1 20 Tf");
  ops.push("0 0 0 rg");
  ops.push(`1 0 0 1 ${margin} ${y} Tm`);
  ops.push(`(${esc(RESUME_DATA.fullName.toUpperCase())}) Tj`);
  ops.push("ET");

  y -= 18;
  // Subtitle: Frontend React & Next.js Developer
  ops.push("BT");
  ops.push("/F1 11 Tf");
  ops.push("0.25 0.25 0.25 rg");
  ops.push(`1 0 0 1 ${margin} ${y} Tm`);
  ops.push(`(${esc(RESUME_DATA.headline)}) Tj`);
  ops.push("ET");

  y -= 14;
  // Contacts line
  const contactsText = `${RESUME_DATA.contact.location}  |  ${RESUME_DATA.contact.email}  |  ${RESUME_DATA.contact.telegram}  |  ${RESUME_DATA.contact.github}`;
  ops.push("BT");
  ops.push("/F2 8.5 Tf");
  ops.push("0.35 0.35 0.35 rg");
  ops.push(`1 0 0 1 ${margin} ${y} Tm`);
  ops.push(`(${esc(contactsText)}) Tj`);
  ops.push("ET");

  y -= 10;
  // Header divider line
  ops.push("0.1 0.1 0.1 RG");
  ops.push("1.2 w");
  ops.push(`${margin} ${y} m ${margin + contentWidth} ${y} l S`);

  // Section helper
  const addSectionHeader = (title: string) => {
    y -= 18;
    ops.push("BT");
    ops.push("/F1 9.5 Tf");
    ops.push("0 0 0 rg");
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${esc(title)}) Tj`);
    ops.push("ET");

    y -= 4;
    ops.push("0.8 0.8 0.8 RG");
    ops.push("0.6 w");
    ops.push(`${margin} ${y} m ${margin + contentWidth} ${y} l S`);
    y -= 10;
  };

  // 1. UMUMIY XULOSA
  addSectionHeader("UMUMIY XULOSA (SUMMARY)");
  const summaryWords = RESUME_DATA.summary.split(" ");
  let curLine = "";
  for (const word of summaryWords) {
    if ((curLine + " " + word).length > 90) {
      ops.push("BT /F2 8.5 Tf 0.2 0.2 0.2 rg");
      ops.push(`1 0 0 1 ${margin} ${y} Tm`);
      ops.push(`(${esc(curLine.trim())}) Tj ET`);
      y -= 12;
      curLine = word;
    } else {
      curLine += " " + word;
    }
  }
  if (curLine.trim()) {
    ops.push("BT /F2 8.5 Tf 0.2 0.2 0.2 rg");
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${esc(curLine.trim())}) Tj ET`);
    y -= 12;
  }

  // 2. TEXNIK KO'NIKMALAR (Foizlarsiz, toza guruhlar)
  addSectionHeader("TEXNIK KO'NIKMALAR (TECHNICAL SKILLS)");
  const skillsCategories = [
    { label: "Frontend", skills: "Next.js 14+ (App Router), React.js, Redux Toolkit, Virtual DOM" },
    { label: "Dasturlash Tillari", skills: "JavaScript (ES6+), TypeScript, Python" },
    { label: "Styling & UI", skills: "Tailwind CSS, Material UI, Ant Design, Framer Motion, HTML5 & CSS3" },
    { label: "Backend & Vositalar", skills: "Node.js, Git & GitHub, Vercel, RESTful APIs, WebSockets" },
  ];

  for (const cat of skillsCategories) {
    ops.push("BT /F1 8.5 Tf 0 0 0 rg");
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${esc(cat.label + ":")}) Tj ET`);

    ops.push("BT /F2 8.5 Tf 0.25 0.25 0.25 rg");
    ops.push(`1 0 0 1 ${margin + 105} ${y} Tm`);
    ops.push(`(${esc(cat.skills)}) Tj ET`);
    y -= 13;
  }

  // 3. ISH TAJRIBASI
  addSectionHeader("ISH TAJRIBASI (WORK EXPERIENCE)");
  for (const item of TIMELINE_ITEMS) {
    ops.push("BT /F1 9 Tf 0.1 0.1 0.1 rg");
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${esc(item.title)}) Tj ET`);

    ops.push("BT /F2 8.5 Tf 0.4 0.4 0.4 rg");
    ops.push(`1 0 0 1 ${margin + contentWidth - 80} ${y} Tm`);
    ops.push(`(${esc(item.year)}) Tj ET`);
    y -= 11;

    ops.push("BT /F1 8 Tf 0.3 0.3 0.3 rg");
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${esc(item.organization + "  -  " + item.location)}) Tj ET`);
    y -= 11;

    // Description text wrap
    const descWords = item.description.split(" ");
    let dLine = "";
    for (const w of descWords) {
      if ((dLine + " " + w).length > 88) {
        ops.push("BT /F2 8 Tf 0.25 0.25 0.25 rg");
        ops.push(`1 0 0 1 ${margin + 8} ${y} Tm`);
        ops.push(`(${esc("- " + dLine.trim())}) Tj ET`);
        y -= 10;
        dLine = w;
      } else {
        dLine += " " + w;
      }
    }
    if (dLine.trim()) {
      ops.push("BT /F2 8 Tf 0.25 0.25 0.25 rg");
      ops.push(`1 0 0 1 ${margin + 8} ${y} Tm`);
      ops.push(`(${esc("- " + dLine.trim())}) Tj ET`);
      y -= 10;
    }

    ops.push("BT /F2 7.5 Tf 0.45 0.45 0.45 rg");
    ops.push(`1 0 0 1 ${margin + 8} ${y} Tm`);
    ops.push(`(Texnologiyalar: ${esc(item.skills.join(", "))}) Tj ET`);
    y -= 14;
  }

  // 4. ASOSIY LOYIHALAR
  addSectionHeader("ASOSIY LOYIHALAR (PROJECTS)");
  for (const p of PROJECTS.slice(0, 4)) {
    ops.push("BT /F1 8.5 Tf 0.1 0.1 0.1 rg");
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${esc(p.title)}) Tj ET`);

    ops.push("BT /F2 7.5 Tf 0.4 0.4 0.4 rg");
    ops.push(`1 0 0 1 ${margin + 200} ${y} Tm`);
    ops.push(`([${esc(p.categoryLabel)} - Stack: ${esc(p.technologies.slice(0, 4).join(", "))}]) Tj ET`);
    y -= 10;

    ops.push("BT /F2 7.5 Tf 0.3 0.3 0.3 rg");
    ops.push(`1 0 0 1 ${margin + 8} ${y} Tm`);
    ops.push(`(${esc(p.description.substring(0, 110) + "...")}) Tj ET`);
    y -= 12;
  }

  // 5. TILLAR VA QIZIQISHLAR
  addSectionHeader("TILLAR VA QIZIQISHLAR (LANGUAGES & INTERESTS)");
  const langText = RESUME_DATA.languages.map(l => `${l.name}: ${l.level}`).join("   |   ");
  ops.push("BT /F2 8 Tf 0.2 0.2 0.2 rg");
  ops.push(`1 0 0 1 ${margin} ${y} Tm`);
  ops.push(`(${esc(langText)}) Tj ET`);
  y -= 11;

  const interestsText = `Tamoyillar: ${RESUME_DATA.interests.slice(0, 4).join(", ")}`;
  ops.push("BT /F2 7.5 Tf 0.35 0.35 0.35 rg");
  ops.push(`1 0 0 1 ${margin} ${y} Tm`);
  ops.push(`(${esc(interestsText)}) Tj ET`);

  // Construct PDF stream
  const contentStream = ops.join("\n");
  const streamLength = contentStream.length;

  const pdfParts = [
    "%PDF-1.4\n",
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`,
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    "xref\n0 7\n",
    "0000000000 65535 f \n",
    "0000000009 00000 n \n",
    "0000000056 00000 n \n",
    "0000000111 00000 n \n",
    "0000000251 00000 n \n",
    "0000000300 00000 n \n",
    "0000000377 00000 n \n",
    "trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n",
    "450\n%%EOF",
  ];

  const blob = new Blob(pdfParts, { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Javohir_Abdurazzoqov_Rezyume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
