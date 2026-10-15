import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DailyEarn with JAY',
  description: 'South African rewards app prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
