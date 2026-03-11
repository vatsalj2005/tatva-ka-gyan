export interface Bhajan {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  singer?: string;
  subdivision: string;
  lyrics: string;
  translationEn?: string;
  audioUrl?: string;
}

export interface Subdivision {
  id: string;
  nameHi: string;
  nameEn: string;
  descHi: string;
  descEn: string;
  icon: string;
}

export const subdivisions: Subdivision[] = [
  { id: 'dev', nameHi: 'देव भजन', nameEn: 'Dev Bhajan', descHi: 'तीर्थंकर और देवों के भजन', descEn: 'Bhajans of Tirthankaras and Deities', icon: '🙏' },
  { id: 'shastra', nameHi: 'शास्त्र भजन', nameEn: 'Shastra Bhajan', descHi: 'शास्त्रों पर आधारित भजन', descEn: 'Bhajans based on scriptures', icon: '📜' },
  { id: 'guru', nameHi: 'गुरु भजन', nameEn: 'Guru Bhajan', descHi: 'गुरु महिमा के भजन', descEn: 'Bhajans glorifying Gurus', icon: '🙏' },
  { id: 'bhakti', nameHi: 'भक्ति भजन', nameEn: 'Bhakti Bhajan', descHi: 'भक्ति और आराधना के भजन', descEn: 'Devotional and worship bhajans', icon: '🎵' },
];

export const bhajans: Bhajan[] = [
  {
    id: 'bhajan-1',
    title: 'जिनवाणी का अमृत',
    titleEn: 'Nectar of Jinvani',
    description: 'तीर्थंकर भगवान की वाणी का गुणगान',
    descriptionEn: 'Praise of the words of Tirthankara Bhagwan',
    singer: 'पं. प्रवीण जैन',
    subdivision: 'dev',
    lyrics: `जिनवाणी का अमृत पी लो,
मन का मैल सदा को धो लो।

तीर्थंकर की वाणी अमृत,
सुनकर जीवन को कर लो पावन।
ज्ञान का दीपक जले सदा,
अंधकार से हो जाओ मुक्त।

सत्य अहिंसा धर्म का मार्ग,
चलो तो जीवन हो जाए सार्थक।
करुणा प्रेम दया का सागर,
बनो तो जग में हो उजियारा।

जिनवाणी का अमृत पी लो,
मन का मैल सदा को धो लो।`,
    translationEn: `Drink the nectar of Jinvani,
Wash away the impurities of the mind forever.

The words of Tirthankara are nectar,
Listen and purify your life.
The lamp of knowledge burns eternally,
Be free from the darkness.

The path of truth, non-violence and dharma,
Walk it and life becomes meaningful.
An ocean of compassion, love and mercy,
Become it and spread light in the world.

Drink the nectar of Jinvani,
Wash away the impurities of the mind forever.`,
  },
  {
    id: 'bhajan-2',
    title: 'महावीर स्वामी की जय',
    titleEn: 'Glory to Mahavir Swami',
    description: 'भगवान महावीर की स्तुति',
    descriptionEn: 'Hymn to Lord Mahavir',
    singer: 'साध्वी प्रभा जैन',
    subdivision: 'dev',
    lyrics: `महावीर स्वामी की जय जय,
अहिंसा के प्रतीक तुम हो।

कर्म बंधन तोड़ दिया तुमने,
मोक्ष का मार्ग दिखाया है।
जग को सत्य का पाठ पढ़ाया,
अनेकांतवाद सिखाया है।

वीर तुम्हारी जय जय होवे,
तुम बिन जग अंधियारा है।
क्षमा करो हे करुणासागर,
तुम ही तो एक सहारा हो।

महावीर स्वामी की जय जय,
अहिंसा के प्रतीक तुम हो।`,
    translationEn: `Glory to Mahavir Swami,
You are the symbol of non-violence.

You broke the bonds of karma,
You showed the path to liberation.
You taught the world the lesson of truth,
You taught the doctrine of Anekantavad.

Victory to you, O brave one,
Without you the world is darkness.
Forgive us, O ocean of compassion,
You are our only support.

Glory to Mahavir Swami,
You are the symbol of non-violence.`,
  },
  {
    id: 'bhajan-3',
    title: 'गुरुदेव की कृपा',
    titleEn: 'Grace of Gurudev',
    description: 'गुरु की कृपा और मार्गदर्शन',
    descriptionEn: 'Grace and guidance of the Guru',
    singer: 'मुनि श्री प्रमाणसागर',
    subdivision: 'guru',
    lyrics: `गुरुदेव की कृपा बरसे,
मन का अंधकार सब हरसे।

गुरु चरणों में शीश नवाकर,
ज्ञान का प्रकाश मिल जाता।
भव सागर से पार उतारें,
गुरु ही तो नैया का खेवट।

वचन गुरु के अमृत समान,
पालन करो तो हो कल्याण।
संयम सत्य तपस्या का मार्ग,
गुरु दिखाते हैं सब प्रकार।

गुरुदेव की कृपा बरसे,
मन का अंधकार सब हरसे।`,
    translationEn: `The grace of Gurudev showers down,
All darkness of the mind is dispelled.

Bowing at the feet of the Guru,
The light of knowledge is received.
They ferry us across the ocean of existence,
The Guru is the boatman of our vessel.

The words of the Guru are like nectar,
Follow them and attain welfare.
The path of restraint, truth and penance,
The Guru shows all the ways.

The grace of Gurudev showers down,
All darkness of the mind is dispelled.`,
  },
  {
    id: 'bhajan-4',
    title: 'भक्ति का सुख',
    titleEn: 'Joy of Devotion',
    description: 'भक्ति में मिलने वाले सुख का वर्णन',
    descriptionEn: 'Description of the joy found in devotion',
    subdivision: 'bhakti',
    lyrics: `भक्ति का सुख और क्या चाहिए,
प्रभु के चरणों में मन लगा दो।

जो जग का सुख वो क्षणभंगुर,
भक्ति का सुख है शाश्वत सुंदर।
मन को लगाओ प्रभु के ध्यान में,
पाओ अनंत सुख ज्ञान में।

कर्म बंधन टूटे भक्ति से,
मोक्ष का द्वार खुले मुक्ति से।
आत्मा का परमात्मा से मिलन,
यही है भक्ति का सच्चा फल।

भक्ति का सुख और क्या चाहिए,
प्रभु के चरणों में मन लगा दो।`,
    translationEn: `What more is needed than the joy of devotion,
Surrender your mind at the feet of the Lord.

The joy of the world is fleeting,
The joy of devotion is eternal and beautiful.
Focus your mind on the Lord's meditation,
Find infinite joy in knowledge.

Bonds of karma break through devotion,
The door to liberation opens through freedom.
The union of the soul with the Supreme Soul,
This is the true fruit of devotion.

What more is needed than the joy of devotion,
Surrender your mind at the feet of the Lord.`,
  },
  {
    id: 'bhajan-5',
    title: 'शास्त्र ज्ञान का दीपक',
    titleEn: 'Lamp of Scriptural Knowledge',
    description: 'शास्त्रों के ज्ञान की महिमा',
    descriptionEn: 'Glory of scriptural knowledge',
    singer: 'आचार्य श्री विद्यासागर',
    subdivision: 'shastra',
    lyrics: `शास्त्र ज्ञान का दीपक जलाओ,
अंतर का अंधकार मिटाओ।

जैन आगम का अध्ययन करो,
तत्व ज्ञान को हृदय में धरो।
सम्यक दर्शन ज्ञान चारित्र,
यही मोक्ष का मार्ग पवित्र।

द्रव्य गुण पर्याय का ज्ञान,
करो तो जीवन हो महान।
अनेकांत स्याद्वाद विचार,
सत्य का करो सदा आचार।

शास्त्र ज्ञान का दीपक जलाओ,
अंतर का अंधकार मिटाओ।`,
    translationEn: `Light the lamp of scriptural knowledge,
Dispel the darkness within.

Study the Jain Agamas,
Hold the essence of knowledge in your heart.
Right faith, right knowledge, right conduct,
This is the sacred path to liberation.

Knowledge of substance, quality, and modification,
Attain it and life becomes great.
The thought of Anekant and Syadvad,
Always practice truth.

Light the lamp of scriptural knowledge,
Dispel the darkness within.`,
  },
];

export const getBhajansBySubdivision = (subdivisionId: string) =>
  bhajans.filter(b => b.subdivision === subdivisionId);

export const getBhajanById = (id: string) =>
  bhajans.find(b => b.id === id);

export const searchContent = (query: string) => {
  const q = query.toLowerCase();
  return bhajans.filter(b =>
    b.title.includes(q) ||
    b.titleEn.toLowerCase().includes(q) ||
    b.description.includes(q) ||
    b.descriptionEn.toLowerCase().includes(q) ||
    b.lyrics.includes(q) ||
    (b.singer && b.singer.includes(q))
  );
};
