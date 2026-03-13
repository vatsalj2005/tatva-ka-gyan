import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';

interface PdfDownloadModalProps {
  open: boolean;
  hasTranslation: boolean;
  onConfirm: (includeTranslation: boolean) => void;
  onCancel: () => void;
}

const PdfDownloadModal = ({ open, hasTranslation, onConfirm, onCancel }: PdfDownloadModalProps) => {
  const { t } = useApp();

  // If no translation available, just download without asking
  if (!hasTranslation && open) {
    onConfirm(false);
    return null;
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-surface-overlay/60 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm p-6 rounded-2xl bg-card border border-border shadow-2xl"
          >
            <h3 className="text-lg font-heading text-gold mb-4 devanagari-safe">
              {t('includeTranslation')}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => onConfirm(true)}
                className="flex-1 py-2.5 rounded-xl bg-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                {t('yes')}
              </button>
              <button
                onClick={() => onConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                {t('no')}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl border border-border text-muted-foreground font-medium hover:bg-secondary transition-colors"
              >
                {t('cancel')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PdfDownloadModal;
