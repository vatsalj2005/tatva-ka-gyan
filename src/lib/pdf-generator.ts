import jsPDF from 'jspdf';
import { transliterateText } from './transliterate';

interface PdfOptions {
  title: string;
  slug: string;
  singer?: string;
  lyrics: string;
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

/**
 * Sanitize text to remove control characters and normalize
 */
function sanitizeText(text: string): string {
  if (!text) return '';
  
  // Remove control characters except newlines
  let cleaned = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
  
  // Normalize unicode
  cleaned = cleaned.normalize('NFC');
  
  // Remove any remaining invisible characters
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');
  
  // Trim each line but preserve line breaks
  cleaned = cleaned.split('\n').map(line => line.trim()).join('\n');
  
  return cleaned;
}

async function loadDevanagariFont(doc: jsPDF) {
  if (fontLoaded) return true;
  try {
    // Use relative path that works with base URL
    const basePath = import.meta.env.BASE_URL || '/';
    const fontPath = `${basePath}fonts/NotoSansDevanagari-Regular.ttf`;
    const response = await fetch(fontPath);
    if (!response.ok) throw new Error('Font not found');
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
    return true;
  } catch (err) {
    console.error('Failed to load Devanagari font for PDF:', err);
    return false;
  }
}

export async function generateBhajanPdf({ title, slug, singer, lyrics, theme }: PdfOptions) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 40;
  const marginBottom = 40;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const colors = themeColors[theme] || themeColors.dark;

  // Load Devanagari font
  const useDevanagari = await loadDevanagariFont(doc);

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

  // ========== PAGE 1: Hindi Lyrics ==========
  setPageBg();
  let y = marginTop;

  if (useDevanagari) {
    doc.setFont('NotoSansDevanagari', 'normal');
  } else {
    doc.setFont('Helvetica', 'normal');
  }

  // Title
  setAccentColor();
  doc.setFontSize(22);
  doc.text(title, pageWidth / 2, y, { align: 'center' });
  y += 15;

  if (singer) {
    setTextColor();
    doc.setFontSize(12);
    doc.text(singer, pageWidth / 2, y, { align: 'center' });
    y += 10;
  }

  doc.setDrawColor(...colors.divider);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 15;

  // Hindi Lyrics
  setTextColor();
  doc.setFontSize(14);
  const lyricsLines = lyrics.split('\n');
  
  for (const line of lyricsLines) {
    const trimmedLine = line.trim();
    
    // Empty line - add spacing
    if (!trimmedLine) {
      y += 7;
      continue;
    }
    
    // Check if we need a new page
    if (y > pageHeight - marginBottom) {
      doc.addPage();
      setPageBg();
      if (useDevanagari) {
        doc.setFont('NotoSansDevanagari', 'normal');
      }
      setTextColor();
      y = marginTop;
    }
    
    // Render line centered
    doc.text(trimmedLine, pageWidth / 2, y, { 
      align: 'center',
      maxWidth: contentWidth 
    });
    y += 8;
  }

  // ========== PAGE 2: Romanized Version ==========
  const romanizedLyrics = transliterateText(lyrics);
  const sanitizedRoman = sanitizeText(romanizedLyrics);
  
  doc.addPage();
  setPageBg();
  y = marginTop;

  // Use Helvetica for romanized text
  doc.setFont('Helvetica', 'normal');
  
  // Title
  setAccentColor();
  doc.setFontSize(22);
  doc.text(title, pageWidth / 2, y, { align: 'center' });
  y += 10;

  setTextColor();
  doc.setFontSize(12);
  doc.text('(Romanized)', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setDrawColor(...colors.divider);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 15;

  // Romanized Lyrics
  setTextColor();
  doc.setFontSize(14);
  const romanLines = sanitizedRoman.split('\n');
  
  for (const line of romanLines) {
    const trimmedLine = line.trim();
    
    // Empty line - add spacing
    if (!trimmedLine) {
      y += 7;
      continue;
    }
    
    // Check if we need a new page
    if (y > pageHeight - marginBottom) {
      doc.addPage();
      setPageBg();
      doc.setFont('Helvetica', 'normal');
      setTextColor();
      y = marginTop;
    }
    
    // Render line centered with proper wrapping
    doc.text(trimmedLine, pageWidth / 2, y, { 
      align: 'center',
      maxWidth: contentWidth,
      lineHeightFactor: 1.7
    });
    y += 8;
  }

  // Use slug as filename
  doc.save(`${slug}.pdf`);
}
