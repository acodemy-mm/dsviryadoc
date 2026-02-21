import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins, Nunito, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

/** KBZ Bank — https://fonts.google.com/specimen/Poppins */
const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
/** KBZ Pay — https://fonts.google.com/specimen/Nunito */
const nunito = Nunito({ variable: '--font-nunito', subsets: ['latin'], weight: ['400', '600', '700'] });
/** Premium Bank — https://fonts.google.com/specimen/Inter */
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Virya Design System', template: '%s · Virya' },
  description: 'Virya Design System — KBZ Bank, KBZ Pay, and Premium Bank design language documentation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${nunito.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
