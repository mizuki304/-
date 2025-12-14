import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '旅行サイト',
  description: 'ヨーロッパ旅行の共通ポータル',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header>
          <h1>旅行ポータル</h1>
          <nav>
            <Link href="/">トップ</Link>
            <Link href="/itinerary">行程</Link>
            <Link href="/bookings">予約</Link>
            <Link href="/emergency">緊急</Link>
                        <Link href="/login">ログイン</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
