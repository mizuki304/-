import Link from 'next/link';
import { ItineraryDay } from '@/lib/types';

function formatTimeRange(start: string, end?: string) {
  return end ? `${start} - ${end}` : start;
}

export function ItineraryList({ days }: { days: ItineraryDay[] }) {
  return (
    <div>
      {days.map((day) => (
        <section className="card" key={day.date}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="badge">{day.date}</div>
              {day.dayNote && <p className="meta">{day.dayNote}</p>}
            </div>
            <Link href={`/itinerary/${day.date}`} aria-label={`${day.date} の詳細`}>
              詳細へ →
            </Link>
          </div>
          <div>
            {day.entries.map((entry, index) => (
              <div key={`${day.date}-${index}`} style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div className="meta">{formatTimeRange(entry.startTime, entry.endTime)}</div>
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
          </div>
        </section>
      ))}
    </div>
  );
}
