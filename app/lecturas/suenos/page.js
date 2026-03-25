import ReadingCheckoutPage from '@/components/ReadingCheckoutPage';

export const metadata = {
  title: 'Interpretación de Sueños — SelenaUra',
  description: 'Describe tu sueño y recibe una interpretación basada en simbología arquetípica y psicología junguiana.',
};

export default function SuenosPage() {
  return <ReadingCheckoutPage readingId="suenos" />;
}
