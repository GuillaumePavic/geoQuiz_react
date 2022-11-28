import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import GlobalStyle from './theme/globalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <React.Fragment>
    <GlobalStyle/>
    <Router>
      <App />
    </Router>
  </React.Fragment>
  // </React.StrictMode>
)
