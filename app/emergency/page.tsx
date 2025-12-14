import Link from 'next/link';
import { loadEmergencyContacts } from '@/lib/data';

export default function EmergencyPage() {
  const contacts = loadEmergencyContacts();

  return (
    <div>
      <h2>緊急情報</h2>
      <p className="meta">連絡先、保険情報、パスポート控えをまとめています。旅先でもすぐに確認できます。</p>
      {contacts.length === 0 && <p className="meta">緊急連絡先がまだ登録されていません。</p>}
      {contacts.map((contact) => (
        <section className="card" key={contact.name}>
          <div className="highlight">{contact.name}</div>
          {contact.phone && <div className="meta">電話: {contact.phone}</div>}
          {contact.emergencyPhone && <div className="meta">緊急: {contact.emergencyPhone}</div>}
          {contact.insurance && <div className="meta">保険: {contact.insurance}</div>}
          {contact.embassy && <div className="meta">大使館/現地連絡先: {contact.embassy}</div>}
          {contact.passportCopyUrl && (
            <div className="meta">
              パスポート控え: <Link href={contact.passportCopyUrl}>確認</Link>
            </div>
          )}
          {contact.memo && <div className="meta">メモ: {contact.memo}</div>}
        </section>
      ))}
    </div>
  );
}
