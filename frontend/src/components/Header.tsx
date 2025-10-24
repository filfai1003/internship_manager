import React from 'react';

type Props = {
  title?: string;
};

export default function Header({ title = 'App Title' }: Props) {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>{title}</h1>
        <small style={{ color: '#6b7280' }}>• dashboard</small>
      </div>
    </header>
  );
}
