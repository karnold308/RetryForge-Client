import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/styles/App.css'
import Root from './Root.tsx'
import { initGA } from './utils/analytics';
import { AuthProvider } from './context/AuthProvider';


if (import.meta.env.VITE_VERCEL_ENV === 'production') {
  // Initialize Google Analytics
  initGA();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>

  </StrictMode>
)
