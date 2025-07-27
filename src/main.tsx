import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './styles/animations.css';
import App from './App';

//verificação da URL inicial
//console.log(import.meta.env.BASE_URL);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const checkForUpdates = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  //console.log(registration)
  if (registration) {
    registration.update();
  }
};

// Verifica atualizações periodicamente (por exemplo, a cada hora)
setInterval(checkForUpdates, 60 * 60 * 1000); // 1 hora

window.addEventListener('message', (event) => {
  if (event.data === 'updateAvailable') {
    // Recarregue automaticamente a página para aplicar a atualização
    window.location.reload();
  }
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();