Design system: dark default with warm gold (#d4a853 hsl), 4 themes (dark/soft-dark/light/sepia)
Fonts: Noto Sans Devanagari (body), Playfair Display + Noto Serif Devanagari (headings/reading)
i18n: Hindi default, English toggle, localStorage persistence
Architecture: filesystem-based content in src/content/, Vite import.meta.glob for auto-discovery, no database
Content: bhajans as .txt files with YAML frontmatter (title, titleEn, singer, tags, etc.)
Translations: separate _en.txt files matched by filename
Routes: /bhajan/:subdivisionId/:bhajanId (new), /bhajan/:subdivisionId for categories
Colors via CSS vars: --gold, --surface-elevated, --surface-overlay + standard shadcn tokens
PDF: jspdf for client-side bhajan PDF download
Hindi fix: .devanagari-safe class for proper matra rendering (line-height: 1.6, overflow: visible)
