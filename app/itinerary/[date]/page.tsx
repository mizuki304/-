import Link from 'next/link';
import { loadItinerary } from '@/lib/data';
import { ItineraryEntry } from '@/lib/types';

function formatTime(entry: ItineraryEntry) {
  return entry.endTime ? `${entry.startTime} - ${entry.endTime}` : entry.startTime;
}

export default function ItineraryDetailPage({ params }: { params: { date: string } }) {
  const itinerary = loadItinerary();
  const day = itinerary.find((item) => item.date === params.date);

  if (!day) {
    return (
      <div>
        <h2>{params.date} の予定</h2>
        <p className="meta">該当する日付の行程が見つかりませんでした。</p>
        <Link href="/itinerary">行程一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{day.date} の予定</h2>
      {day.dayNote && <p className="meta">{day.dayNote}</p>}
      <section className="card">
        {day.entries.map((entry, index) => (
          <div key={`${day.date}-${index}`} style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
            <div className="meta">{formatTime(entry)}</div>
            <div className="highlight">{entry.title}</div>
            {entry.location && <div className="meta">📍 {entry.location}</div>}
            {entry.note && <div className="meta">{entry.note}</div>}
            {entry.links && entry.links.length > 0 && (
              <div className="meta">
                {entry.links.map((link) => (
                  <Link key={link.url} href={link.url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
      <Link href="/itinerary">行程一覧に戻る</Link>
    </div>
  );
}
