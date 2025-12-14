'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(redirect);
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.message ?? '認証に失敗しました。');
    }
  };

  return (
    <div>
      <h2>閲覧用パスワードを入力</h2>
      <p className="meta">旅行メンバーに共有されたパスワードを入力してください。</p>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 420 }}>
        <label className="meta" htmlFor="password">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: 8, border: '1px solid #cbd5e1' }}
        />
        {error && <div className="meta" style={{ color: '#dc2626' }}>{error}</div>}
        <button type="submit" style={{ marginTop: 12, padding: '12px', borderRadius: 8, border: 'none', background: '#0ea5e9', color: '#fff', fontWeight: 700, width: '100%' }}>
          ログイン
        </button>
      </form>
    </div>
  );
}
