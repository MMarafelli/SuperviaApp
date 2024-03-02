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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((registration) => {
    console.log('Service Worker registrado com sucesso:', registration);
  }).catch((error) => {
    console.error('Erro ao registrar o Service Worker:', error);
  });
}

const checkForUpdates = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  console.log(registration)
  if (registration) {
    registration.update();
  }
};

// Verifica atualizações periodicamente (por exemplo, a cada hora)
setInterval(checkForUpdates, 60 * 60); // 1 hora

window.addEventListener('message', (event) => {
  if (event.data === 'updateAvailable') {
    // Recarregue automaticamente a página para aplicar a atualização
    window.location.reload();
  }
});


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