import './globals.css';

export const metadata = {
  title: 'SelenaUra — Ciencia y consciencia de lo invisible',
  description: 'Tu espacio personal de consciencia cosmica. Carta natal, horoscopo personalizado, lecturas de tarot, quirologia e interpretacion de suenos.',
  metadataBase: new URL('https://selenaura.com'),
  openGraph: {
    title: 'SelenaUra — Ciencia y consciencia de lo invisible',
    description: 'Descubre tu carta natal, recibe tu horoscopo personalizado y guarda todas tus lecturas en un solo lugar.',
    siteName: 'SelenaUra',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SelenaUra',
    description: 'Tu espacio personal de consciencia cosmica — carta natal, horoscopo y lecturas.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body className="bg-selene-bg text-selene-white antialiased">
        {children}
      </body>
    </html>
  );
}
