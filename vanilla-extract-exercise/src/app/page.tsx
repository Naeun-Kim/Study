'use client';

import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { TextField } from '@/components/TextField/TextField';

export default function Home() {
  const [email, setEmail] = useState('');
  const emailError =
    email && !email.includes('@') ? '이메일 형식이 올바르지 않아요' : '';
  return (
    <main
      style={{ maxWidth: 420, margin: '40px auto', display: 'grid', gap: 16 }}
    >
      <TextField
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
        error={emailError}
        helperText={!email ? '회사 메일을 권장합니다' : undefined}
        leadingIcon={<span>📧</span>}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button>기본</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button loading>저장 중…</Button>
      </div>
    </main>
  );
}
