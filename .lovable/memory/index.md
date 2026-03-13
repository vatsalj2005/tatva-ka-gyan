# Memory: index.md
Updated: now

Design system: dark default with warm gold (#d4a853 hsl), 4 themes (dark/soft-dark/light/sepia)
Fonts: Noto Sans Devanagari (body), Playfair Display + Noto Serif Devanagari (headings/reading)
i18n: Hindi default, English toggle, localStorage persistence
Architecture: static data in src/content/, AppContext for global state, no auth required
Colors via CSS vars: --gold, --surface-elevated, --surface-overlay + standard shadcn tokens
Project name: Tatvo Ka Arth (NOT Tatwo/Tatwa/Tatva)
Storage key: tatvo-ka-arth-settings
PDF: NotoSansDevanagari font embedded, theme-aware colors, translation choice modal
Dual script: Roman transliteration files in src/content/transliteration/{subdivision}/{slug}_rom.txt
Devanagari fix: line-height 1.8, overflow visible, padding-top 0.2em, text-rendering optimizeLegibility
