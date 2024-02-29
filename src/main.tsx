import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';


import { PwaPrompt } from 'react-ios-pwa-prompt-ts'

import './index.css';
import App from './App';

//verificação da URL inicial
//console.log(import.meta.env.BASE_URL);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PwaPrompt promptOnVisit={3} timesToShow={3} permanentlyHideOnDismiss={false} />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();