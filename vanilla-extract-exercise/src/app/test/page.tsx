'use client';

import { Button } from '@/components/Button/Button';

export default function Home() {
  return (
    <main style={{}}>
      <header style={{ height: '50px', backgroundColor: '#eee' }}>
        header
      </header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 'calc(100vh - 50px)',
        }}
      >
        <section>cotents</section>
        <Button>CTA</Button>
      </div>
    </main>
  );
}
