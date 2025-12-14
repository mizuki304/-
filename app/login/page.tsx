"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ダミー判定（本番は API か認証サービスを呼ぶ）
    if (email === "test@example.com" && password === "password123") {
      // ログイン成功した想定でトップへ
      router.push("/");
    } else {
      setError("メールアドレスまたはパスワードが正しくありません。");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: "block", width: "100%", marginTop: 4, padding: "8px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            パスワード
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: "block", width: "100%", marginTop: 4, padding: "8px" }}
            />
          </label>
        </div>
        {error && (
          <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
        )}
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          ログイン
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        テスト用: test@example.com / password123
      </p>
    </div>
  );
}
