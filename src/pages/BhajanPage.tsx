import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { getBhajanById, subdivisions } from '@/data/bhajans';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Play, Copy, Check, Languages, Volume2, VolumeX } from 'lucide-react';

const BhajanPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, fontSize, lineSpacing, useSerif } = useApp();
  const [showTranslation, setShowTranslation] = useState(false);
  const [copied, setCopied] = useState(false);

  const bhajan = getBhajanById(id || '');
  if (!bhajan) return null;

  const subdivision = subdivisions.find(s => s.id === bhajan.subdivision);

  const handleCopy = () => {
    navigator.clipboard.writeText(bhajan.lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const readingClass = useSerif ? 'font-reading' : '';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link to="/bhajan" className="hover:text-gold transition-colors">{t('bhajan')}</Link>
            <span>/</span>
            {subdivision && (
              <>
                <Link
                  to={`/bhajan/subdivision/${subdivision.id}`}
                  className="hover:text-gold transition-colors"
                >
                  {language === 'hi' ? subdivision.nameHi : subdivision.nameEn}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground/80">
              {language === 'hi' ? bhajan.title : bhajan.titleEn}
            </span>
          </div>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-heading text-gradient-gold mb-2">
              {language === 'hi' ? bhajan.title : bhajan.titleEn}
            </h1>
            <p className="text-muted-foreground mb-1">
              {language === 'hi' ? bhajan.description : bhajan.descriptionEn}
            </p>
            {bhajan.singer && (
              <p className="text-sm text-gold/80">🎤 {t('singer')}: {bhajan.singer}</p>
            )}
          </motion.div>

          {/* Audio + Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {/* Audio button */}
            {bhajan.audioUrl ? (
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                <Play className="w-4 h-4" /> {language === 'hi' ? 'सुनें' : 'Listen'}
              </button>
            ) : (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-muted-foreground">
                <VolumeX className="w-4 h-4" />
                <span className="text-sm">{t('audioUnavailable')}</span>
              </div>
            )}

            {/* Translation toggle */}
            {bhajan.translationEn && (
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  showTranslation
                    ? 'bg-gold text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-gold/20'
                }`}
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? t('hideTranslation') : t('englishMeaning')}
              </button>
            )}

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground hover:bg-gold/20 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? t('copied') : t('copyVerse')}</span>
            </button>
          </motion.div>

          {/* Lyrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`grid gap-6 ${showTranslation ? 'md:grid-cols-2' : 'grid-cols-1 max-w-3xl'}`}
          >
            {/* Hindi lyrics */}
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
              <h3 className="text-sm font-medium text-gold mb-4 uppercase tracking-wider">{t('lyrics')}</h3>
              <div
                className={`whitespace-pre-line text-foreground/90 ${readingClass}`}
                style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
              >
                {bhajan.lyrics}
              </div>
            </div>

            {/* English translation */}
            {showTranslation && bhajan.translationEn && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 md:p-8 rounded-2xl bg-card border border-gold/20"
              >
                <h3 className="text-sm font-medium text-gold mb-4 uppercase tracking-wider">{t('translation')}</h3>
                <div
                  className="whitespace-pre-line text-foreground/80"
                  style={{ fontSize: `${Math.max(fontSize - 1, 12)}px`, lineHeight: lineSpacing }}
                >
                  {bhajan.translationEn}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BhajanPage;
