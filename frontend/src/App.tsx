import React from 'react';
import Header from './components/Header';

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      <Header />
      <main style={{ maxWidth: 960, margin: '2rem auto', padding: '0 1rem' }}>
        <h2>Welcome</h2>
        <p>This is a minimal frontend placeholder.</p>
      </main>
    </div>
  );
}
