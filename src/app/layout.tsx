import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'TicketTracker', template: '%s | TicketTracker' },
  description: 'A clear view of your tickets, priorities, and progress.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <div className="app-content">{children}</div>
      </body>
    </html>
  );
}
