import Link from 'next/link';
import { loadItinerary } from '@/lib/data';
import { ItineraryEntry, ItineraryDay, LinkItem } from '@/lib/types';

function flattenEntries(days: ItineraryDay[]): { date: string; entry: ItineraryEntry; dateTime: Date }[] {
  return days.flatMap((day) =>
    day.entries.map((entry) => ({
      date: day.date,
      entry,
      dateTime: new Date(`${day.date}T${entry.startTime}`),
    })),
  );
}

function getNextMeet(entries: { date: string; entry: ItineraryEntry; dateTime: Date }[]) {
  const now = new Date();
  const upcoming = entries
    .filter((item) => item.dateTime >= now)
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
  return upcoming[0] ?? entries[0];
}

const importantLinks: LinkItem[] = [
  { label: 'フライト予約', url: '#' },
  { label: '宿泊情報', url: '#' },
  { label: '保険証書', url: '#' },
  { label: '緊急連絡', url: '/emergency' },
];

export default function HomePage() {
  const itinerary = loadItinerary();
  const flatEntries = flattenEntries(itinerary);
  const nextMeet = flatEntries.length > 0 ? getNextMeet(flatEntries) : null;

  const today = new Date();
  const formatDate = (offset: number) => {
    const target = new Date(today);
    target.setDate(today.getDate() + offset);
    return target.toISOString().slice(0, 10);
  };

  const todayEntries = itinerary.find((day) => day.date === formatDate(0));
  const tomorrowEntries = itinerary.find((day) => day.date === formatDate(1));

  return (
    <div>
      <section className="card">
        <h2>次の集合</h2>
        {nextMeet ? (
          <div>
            <div className="badge">{nextMeet.date}</div>
            <div className="highlight" style={{ fontSize: 20, marginTop: 4 }}>
              {nextMeet.entry.title}
            </div>
            <div className="meta">{nextMeet.dateTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</div>
            {nextMeet.entry.location && <div className="meta">📍 {nextMeet.entry.location}</div>}
            {nextMeet.entry.links && nextMeet.entry.links.length > 0 && (
              <div className="meta" style={{ marginTop: 8 }}>
                {nextMeet.entry.links.map((link) => (
                  <Link key={link.url} href={link.url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="meta">予定がまだ登録されていません。</p>
        )}
      </section>

      <section className="card">
        <h2>今日と明日の予定</h2>
        <div className="list">
          <div>
            <div className="badge">今日</div>
            {todayEntries?.entries.length ? (
              todayEntries.entries.map((entry, idx) => (
                <div key={`today-${idx}`} className="meta" style={{ paddingTop: 4 }}>
                  <span className="highlight">{entry.startTime}</span> {entry.title}
                </div>
              ))
            ) : (
              <p className="meta">登録なし</p>
            )}
          </div>
          <div>
            <div className="badge">明日</div>
            {tomorrowEntries?.entries.length ? (
              tomorrowEntries.entries.map((entry, idx) => (
                <div key={`tomorrow-${idx}`} className="meta" style={{ paddingTop: 4 }}>
                  <span className="highlight">{entry.startTime}</span> {entry.title}
                </div>
              ))
            ) : (
              <p className="meta">登録なし</p>
            )}
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <Link href="/itinerary">行程を詳しく見る →</Link>
        </div>
      </section>

      <section className="card">
        <h2>重要リンク</h2>
        <div className="list">
          {importantLinks.map((link) => (
            <div key={link.label} className="meta">
              <Link href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>緊急導線</h2>
        <p className="meta">トラブル時はすぐに緊急ページを確認してください。</p>
        <Link href="/emergency">緊急情報を見る →</Link>
      </section>
    </div>
  );
}
