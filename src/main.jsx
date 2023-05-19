import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom'
// RecoilRoot from recoil for react state management
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />    
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
