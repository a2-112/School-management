import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './sidebar.css'
import './dash.css'
import './StudentForm.css'
import './studentpage.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)