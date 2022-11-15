import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import { NotesProvider } from './contexts/notes'
import { DateProvider } from './contexts/date'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NotesProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </NotesProvider>
  </React.StrictMode>
)
