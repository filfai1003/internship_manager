import Header from './components/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
        <Header title="Internship Manager" />
        <main style={{ maxWidth: 960, margin: '2rem auto', padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<ApplicationPage />} />
            <Route path="/requests/:id" element={<DetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
