import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';

const sutras = [
  {
    id: 1,
    hindi: 'सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।',
    english: 'Right faith, right knowledge, and right conduct together constitute the path to liberation.',
  },
  {
    id: 2,
    hindi: 'तत्त्वार्थश्रद्धानं सम्यग्दर्शनम्।',
    english: 'Belief in the true nature of reality is right faith.',
  },
  {
    id: 3,
    hindi: 'जीवाजीवास्रवबन्धसंवरनिर्जरामोक्षास्तत्त्वम्।',
    english: 'Soul, non-soul, influx, bondage, stoppage, shedding, and liberation — these are the seven fundamental truths.',
  },
  {
    id: 4,
    hindi: 'परस्परोपग्रहो जीवानाम्।',
    english: 'Souls exist to serve and support one another.',
  },
];

const SutraSection = () => {
  const { language } = useApp();

  return (
    <section className="py-20 px-4 relative z-10 bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading text-center text-gradient-gold mb-4 leading-relaxed pb-1"
        >
          {language === 'hi' ? 'तत्त्वार्थ सूत्र' : 'Tattvarth Sutra'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-12"
        >
          {language === 'hi'
            ? 'आचार्य उमास्वामी द्वारा रचित जैन दर्शन का मूल ग्रंथ'
            : 'The foundational Jain philosophical text by Acharya Umaswami'}
        </motion.p>

        <div className="space-y-6">
          {sutras.map((sutra, i) => (
            <motion.div
              key={sutra.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border/50 bg-card text-center"
            >
              <p className="text-lg md:text-xl font-heading text-gold leading-relaxed mb-3">
                {sutra.hindi}
              </p>
              <p className="text-sm md:text-base text-muted-foreground italic">
                {sutra.english}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SutraSection;
