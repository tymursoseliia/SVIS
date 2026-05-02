import type { Metadata } from 'next'
import { Montserrat, Russo_One } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SettingsProvider } from './providers/SettingsProvider'
import { getSiteSettings } from './actions/settings'

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
})

const russoOne = Russo_One({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-russo',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://svisdiski.netlify.app'),
  title: 'SVIS.YV | Професійний Шиномонтаж та Зберігання Шин',
  description: 'Сучасний шиномонтаж SVIS.YV. Зберігання шин, балансування, рихтування дисків та виїзний сервіс. Швидко, надійно, без вихідних.',
  keywords: ['шиномонтаж', 'зберігання шин', 'рихтування дисків', 'балансування', 'виїзний шиномонтаж', 'SVIS'],
  openGraph: {
    title: 'SVIS.YV | Шиномонтаж',
    description: 'Комплексний шиномонтаж, зберігання шин та рихтування дисків. Працюємо для вас на вищому рівні!',
    url: 'https://svisdiski.netlify.app',
    siteName: 'SVIS Шиномонтаж',
    locale: 'uk_UA',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [pricesRes, sectionsRes] = await Promise.all([
    getSiteSettings('prices'),
    getSiteSettings('sections')
  ]);

  const settings = {
    prices: pricesRes.data || {},
    sections: sectionsRes.data || {}
  };

  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${montserrat.variable} ${russoOne.variable} font-sans antialiased selection:bg-brand selection:text-dark`}>
        <SettingsProvider settings={settings as any}>
          <Navbar />
          {children}
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  )
}
