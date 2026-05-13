import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/styles/App.css'
import Root from './Root.tsx'
import { initGA } from './utils/analytics';


if (import.meta.env.VITE_VERCEL_ENV === 'production') {
  // Initialize Google Analytics
  initGA();
} else {
  console.log(process.env.VERCEL_ENV)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
