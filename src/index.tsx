import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/styles/App.css'
import Root from './Root.tsx'
import { initGA } from './utils/analytics';


if (process.env.VERCEL_URL === 'production') {
  // Initialize Google Analytics
  initGA();
} else {
  console.log(process.env.VERCEL_URL)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
