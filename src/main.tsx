import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {App} from "./App";


document.documentElement.style.setProperty("--background-color",import.meta.env.VITE_BACKGROUND_COLOR);
document.documentElement.style.setProperty("--surface-color", import.meta.env.VITE_SURFACE_COLOR);
document.documentElement.style.setProperty("--secondary-color", import.meta.env.VITE_SECONDARY_COLOR);
document.documentElement.style.setProperty("--accent-color", import.meta.env.VITE_ACCENT_COLOR);
document.documentElement.style.setProperty("--color-text", import.meta.env.VITE_COLOR_TEXT);
document.documentElement.style.setProperty("--error-color", import.meta.env.VITE_ERROR_COLOR);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
