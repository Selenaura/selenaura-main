export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/mi-selene/', '/perfil/', '/onboarding/'],
    },
    sitemap: 'https://selenaura.com/sitemap.xml',
  };
}
