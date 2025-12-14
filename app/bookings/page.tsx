import Link from 'next/link';
import { loadBookings } from '@/lib/data';
import { Booking } from '@/lib/types';

const labels: Record<Booking['type'], string> = {
  hotel: '宿泊',
  transport: '移動',
  activity: '施設・アクティビティ',
};

export default function BookingsPage() {
  const bookings = loadBookings();
  const grouped = bookings.reduce<Record<Booking['type'], Booking[]>>(
    (acc, item) => {
      acc[item.type] = acc[item.type] ? [...acc[item.type], item] : [item];
      return acc;
    },
    { hotel: [], transport: [], activity: [] },
  );

  return (
    <div>
      <h2>予約一覧</h2>
      <p className="meta">提示が必要な情報をまとめています。PDFやメールへのリンクも確認してください。</p>

      {(['hotel', 'transport', 'activity'] as Booking['type'][]).map((type) => (
        <section className="card" key={type}>
          <div className="badge">{labels[type]}</div>
          {grouped[type].length === 0 ? (
            <p className="meta">登録がありません。</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>日時</th>
                  <th>予約番号</th>
                  <th>提示リンク</th>
                  <th>住所/メモ</th>
                </tr>
              </thead>
              <tbody>
                {grouped[type].map((item, idx) => (
                  <tr key={`${type}-${idx}`}>
                    <td>{item.name}</td>
                    <td className="meta">{item.datetime ?? '-'}</td>
                    <td className="meta">{item.reference ?? '-'}</td>
                    <td>
                      {item.proofUrl ? (
                        <Link href={item.proofUrl} target="_blank" rel="noreferrer">
                          確認
                        </Link>
                      ) : (
                        <span className="meta">-</span>
                      )}
                    </td>
                    <td className="meta">
                      {item.address ?? ''}
                      {item.note ? <div>{item.note}</div> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </div>
  );
}
