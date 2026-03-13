/**
 * Filesystem-based content loader using Vite's import.meta.glob
 * Automatically discovers bhajans from /src/content/ at build time.
 */

export interface BhajanData {
  id: string;
  slug: string;
  subdivision: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  singer?: string;
  tags: string[];
  lyrics: string;
  translationEn?: string;
  transliterationRom?: string;
  audioUrl?: string;
}

export interface SubdivisionData {
  id: string;
  nameHi: string;
  nameEn: string;
  descHi: string;
  descEn: string;
  icon: string;
}

export const subdivisions: SubdivisionData[] = [
  { id: 'dev', nameHi: 'देव भजन', nameEn: 'Dev Bhajan', descHi: 'तीर्थंकर और देवों के भजन', descEn: 'Bhajans of Tirthankaras and Deities', icon: '🙏' },
  { id: 'shastra', nameHi: 'शास्त्र भजन', nameEn: 'Shastra Bhajan', descHi: 'शास्त्रों पर आधारित भजन', descEn: 'Bhajans based on scriptures', icon: '📜' },
  { id: 'guru', nameHi: 'गुरु भजन', nameEn: 'Guru Bhajan', descHi: 'गुरु महिमा के भजन', descEn: 'Bhajans glorifying Gurus', icon: '🙏' },
  { id: 'bhakti', nameHi: 'भक्ति भजन', nameEn: 'Bhakti Bhajan', descHi: 'भक्ति और आराधना के भजन', descEn: 'Devotional and worship bhajans', icon: '🎵' },
];

function parseFrontmatter(raw: string): { metadata: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { metadata: {}, content: raw.trim() };
  const metadata: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (key && value) metadata[key] = value;
    }
  });
  return { metadata, content: match[2].trim() };
}

const bhajanFiles = import.meta.glob('../content/bhajans/**/*.txt', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const translationFiles = import.meta.glob('../content/translations/**/*.txt', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const transliterationFiles = import.meta.glob('../content/transliteration/**/*.txt', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function buildBhajans(): BhajanData[] {
  const results: BhajanData[] = [];

  for (const [filePath, rawContent] of Object.entries(bhajanFiles)) {
    const pathMatch = filePath.match(/\/content\/bhajans\/([^/]+)\/([^/]+)\.txt$/);
    if (!pathMatch) continue;

    const subdivision = pathMatch[1];
    const slug = pathMatch[2];
    const { metadata, content } = parseFrontmatter(rawContent);

    const translationKey = Object.keys(translationFiles).find(
      tp => tp.includes(`/content/translations/${subdivision}/${slug}_en.txt`)
    );
    const translationEn = translationKey ? translationFiles[translationKey].trim() : undefined;

    const translitKey = Object.keys(transliterationFiles).find(
      tp => tp.includes(`/content/transliteration/${subdivision}/${slug}_rom.txt`)
    );
    const transliterationRom = translitKey ? transliterationFiles[translitKey].trim() : undefined;

    const tags = metadata.tags
      ? metadata.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    results.push({
      id: `${subdivision}/${slug}`,
      slug,
      subdivision,
      title: metadata.title || slug.replace(/_/g, ' '),
      titleEn: metadata.titleEn || metadata.title || slug.replace(/_/g, ' '),
      description: metadata.description || '',
      descriptionEn: metadata.descriptionEn || metadata.description || '',
      singer: metadata.singer,
      tags,
      lyrics: content,
      translationEn,
      transliterationRom,
      audioUrl: undefined,
    });
  }

  return results;
}

export const bhajans: BhajanData[] = buildBhajans();

export const getBhajansBySubdivision = (subdivisionId: string) =>
  bhajans.filter(b => b.subdivision === subdivisionId);

export const getBhajanById = (subdivisionId: string, bhajanSlug: string) =>
  bhajans.find(b => b.subdivision === subdivisionId && b.slug === bhajanSlug);

export const getRelatedBhajans = (bhajan: BhajanData, limit = 4): BhajanData[] => {
  if (!bhajan.tags.length) {
    return bhajans.filter(b => b.id !== bhajan.id && b.subdivision === bhajan.subdivision).slice(0, limit);
  }
  const scored = bhajans
    .filter(b => b.id !== bhajan.id)
    .map(b => ({
      bhajan: b,
      score: b.tags.filter(t => bhajan.tags.includes(t)).length + (b.subdivision === bhajan.subdivision ? 0.5 : 0),
    }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.bhajan);
};

export const searchContent = (query: string) => {
  const q = query.toLowerCase();
  return bhajans.filter(b =>
    b.title.includes(q) ||
    b.titleEn.toLowerCase().includes(q) ||
    b.description.includes(q) ||
    b.descriptionEn.toLowerCase().includes(q) ||
    b.lyrics.includes(q) ||
    b.tags.some(t => t.includes(q)) ||
    (b.singer && b.singer.includes(q)) ||
    (b.transliterationRom && b.transliterationRom.toLowerCase().includes(q))
  );
};
