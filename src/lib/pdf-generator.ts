import jsPDF from 'jspdf';

interface PdfOptions {
  title: string;
  singer?: string;
  lyrics: string;
  translationEn?: string;
}

export async function generateBhajanPdf({ title, singer, lyrics, translationEn }: PdfOptions) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;

  // Use built-in font (Helvetica) — Devanagari rendering in jsPDF is limited
  // For production, a custom Unicode font would be embedded
  doc.setFont('Helvetica', 'normal');

  // Page 1: Title + Lyrics
  let y = 40;
  doc.setFontSize(22);
  doc.text(title, pageWidth / 2, y, { align: 'center' });
  y += 10;

  if (singer) {
    doc.setFontSize(12);
    doc.text(singer, pageWidth / 2, y, { align: 'center' });
    y += 12;
  }

  doc.setDrawColor(200, 180, 120);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  doc.setFontSize(13);
  const lyricsLines = doc.splitTextToSize(lyrics, contentWidth);
  for (const line of lyricsLines) {
    if (y > 270) {
      doc.addPage();
      y = 30;
    }
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += 7;
  }

  // Page 2: English Translation (if available)
  if (translationEn) {
    doc.addPage();
    y = 40;
    doc.setFontSize(18);
    doc.text('English Meaning', pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setDrawColor(200, 180, 120);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    doc.setFontSize(12);
    const transLines = doc.splitTextToSize(translationEn, contentWidth);
    for (const line of transLines) {
      if (y > 270) {
        doc.addPage();
        y = 30;
      }
      doc.text(line, pageWidth / 2, y, { align: 'center' });
      y += 7;
    }
  }

  const filename = title.replace(/[^\w\s]/g, '').replace(/\s+/g, '_') || 'bhajan';
  doc.save(`${filename}.pdf`);
}
