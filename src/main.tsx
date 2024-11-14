// /src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Import HashRouter
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename="/Personal-Portfolio"> {/* Use HashRouter */}
      <App />
    </HashRouter>
  </StrictMode>
);
