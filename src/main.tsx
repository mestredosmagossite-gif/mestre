import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (window.location.pathname.startsWith('/admin')) {
  import('./admin/AppAdmin').then(({ default: AppAdmin }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AppAdmin />
      </StrictMode>
    );
  });
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
