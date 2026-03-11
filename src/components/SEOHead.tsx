import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
}

const SEOHead = ({ title, description }: SEOHeadProps) => (
  <Helmet>
    <title>{title} | तत्वो का अर्थ</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <html lang="hi" />
  </Helmet>
);

export default SEOHead;
