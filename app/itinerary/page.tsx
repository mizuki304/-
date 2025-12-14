import { ItineraryList } from '@/app/components/ItineraryList';
import { loadItinerary } from '@/lib/data';

export default function ItineraryPage() {
  const days = loadItinerary();

  return (
    <div>
      <h2>行程一覧</h2>
      <p className="meta">日付順に旅程を確認できます。詳細ページからメモやリンクも参照できます。</p>
      {days.length ? <ItineraryList days={days} /> : <p className="meta">行程データがまだありません。</p>}
    </div>
  );
}
