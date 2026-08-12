import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Router } from './lib/router'
import './styles/base.css'
import './styles/components.css'
import './styles/demos.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
