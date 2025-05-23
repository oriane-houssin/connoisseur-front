import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/*<ThemeProvider theme={theme}>*/}
          <CssBaseline />
          <App />
      {/*</ThemeProvider>*/}
  </React.StrictMode>,
)
