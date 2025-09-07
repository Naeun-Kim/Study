'use client';

import { Button } from '@/components/Button/Button';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <header
        style={{
          position: 'fixed',
          width: '100%',
          height: '50px',
          backgroundColor: '#eee',
        }}
      >
        header
      </header>
      <section style={{ paddingTop: '50px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'calc(100vh - 50px)',
          }}
        >
          <section>cotents</section>
          <div
            style={{
              position: 'fixed',
              bottom: '0',
              left: '0',
              right: '0',
              padding: `0 20px calc(20px + env(safe-area-inset-bottom))`,
            }}
          >
            <Button style={{ width: '100%' }}>CTA</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
