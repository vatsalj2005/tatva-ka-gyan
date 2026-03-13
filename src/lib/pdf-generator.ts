import jsPDF from 'jspdf';

interface PdfOptions {
  title: string;
  singer?: string;
  lyrics: string;
  translationEn?: string;
  includeTranslation: boolean;
  theme: 'dark' | 'soft-dark' | 'light' | 'sepia';
}

// Theme color configs (RGB)
const themeColors: Record<string, { bg: [number, number, number]; text: [number, number, number]; accent: [number, number, number]; divider: [number, number, number] }> = {
  dark: {
    bg: [24, 26, 33],
    text: [220, 210, 190],
    accent: [212, 168, 83],
    divider: [80, 75, 65],
  },
  'soft-dark': {
    bg: [38, 40, 48],
    text: [215, 208, 195],
    accent: [212, 168, 83],
    divider: [90, 85, 75],
  },
  light: {
    bg: [248, 244, 235],
    text: [30, 32, 45],
    accent: [160, 120, 50],
    divider: [200, 190, 170],
  },
  sepia: {
    bg: [240, 228, 205],
    text: [50, 40, 25],
    accent: [140, 95, 40],
    divider: [200, 185, 155],
  },
};

let fontLoaded = false;

async function loadDevanagariFont(doc: jsPDF) {
  if (fontLoaded) return;
  try {
    const response = await fetch('/fonts/NotoSansDevanagari-Regular.ttf');
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);
    doc.addFileToVFS('NotoSansDevanagari-Regular.ttf', base64);
    doc.addFont('NotoSansDevanagari-Regular.ttf', 'NotoSansDevanagari', 'normal');
    fontLoaded = true;
  } catch (err) {
    console.warn('Failed to load Devanagari font for PDF, falling back to Helvetica', err);
  }
}

export async function generateBhajanPdf({ title, singer, lyrics, translationEn, includeTranslation, theme }: PdfOptions) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;
  const colors = themeColors[theme] || themeColors.dark;

  // Load Devanagari font
  await loadDevanagariFont(doc);

  const useDevanagari = fontLoaded;

  function setPageBg() {
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  function setTextColor() {
    doc.setTextColor(...colors.text);
  }

  function setAccentColor() {
    doc.setTextColor(...colors.accent);
  }

  // Page 1: Title + Lyrics
  setPageBg();
  let y = 40;

  if (useDevanagari) {
    doc.setFont('NotoSansDevanagari', 'normal');
  } else {
    doc.setFont('Helvetica', 'normal');
  }

  // Title
  setAccentColor();
  doc.setFontSize(22);
  doc.text(title, pageWidth / 2, y, { align: 'center' });
  y += 10;

  if (singer) {
    setTextColor();
    doc.setFontSize(12);
    doc.text(singer, pageWidth / 2, y, { align: 'center' });
    y += 12;
  }

  doc.setDrawColor(...colors.divider);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  // Lyrics
  setTextColor();
  doc.setFontSize(13);
  const lyricsLines = doc.splitTextToSize(lyrics, contentWidth);
  for (const line of lyricsLines) {
    if (y > 270) {
      doc.addPage();
      setPageBg();
      y = 30;
    }
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += 7;
  }

  // Page 2: English Translation (if requested and available)
  if (includeTranslation && translationEn) {
    doc.addPage();
    setPageBg();
    y = 40;

    doc.setFont('Helvetica', 'normal');
    setAccentColor();
    doc.setFontSize(18);
    doc.text('English Meaning', pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setDrawColor(...colors.divider);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    setTextColor();
    doc.setFontSize(12);
    const transLines = doc.splitTextToSize(translationEn, contentWidth);
    for (const line of transLines) {
      if (y > 270) {
        doc.addPage();
        setPageBg();
        y = 30;
      }
      doc.text(line, pageWidth / 2, y, { align: 'center' });
      y += 7;
    }
  }

  const filename = title.replace(/[^\w\s]/g, '').replace(/\s+/g, '_') || 'bhajan';
  doc.save(`${filename}.pdf`);
}
