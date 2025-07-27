import { useState, useEffect } from 'react';

interface PWAUpdateHook {
  needRefresh: boolean;
  updateServiceWorker: () => void;
  isOnline: boolean;
  registration?: ServiceWorkerRegistration;
}

export const usePWAUpdate = (): PWAUpdateHook => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Monitora o status de conexão
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Registra o service worker e monitora atualizações
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          // O caminho é sempre /SuperviaApp/sw.js tanto em dev quanto em prod
          const swPath = '/SuperviaApp/sw.js';
          const swScope = '/SuperviaApp/';
          
          console.log(`Registrando SW: ${swPath} com escopo: ${swScope}`);
          
          const reg = await navigator.serviceWorker.register(swPath, {
            scope: swScope
          });

          setRegistration(reg);

          // Verifica se há um service worker esperando
          if (reg.waiting) {
            setNeedRefresh(true);
          }

          // Escuta por atualizações
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setNeedRefresh(true);
                }
              });
            }
          });

          // Verifica periodicamente por atualizações (a cada 10 minutos)
          const checkForUpdates = async () => {
            try {
              await reg.update();
            } catch (error) {
              // Silencia os erros de atualização do SW para evitar spam no console
              console.debug('SW update check failed (normal behavior):', error);
            }
          };

          const interval = setInterval(checkForUpdates, 600000); // 10 minutos
          
          // Verifica quando a aba ganha foco, mas com throttle
          let lastCheck = 0;
          const handleVisibilityChange = () => {
            if (!document.hidden) {
              const now = Date.now();
              // Só verifica se passou pelo menos 5 minutos desde a última verificação
              if (now - lastCheck > 300000) {
                lastCheck = now;
                checkForUpdates();
              }
            }
          };

          document.addEventListener('visibilitychange', handleVisibilityChange);

          // Cleanup
          return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };

        } catch (error) {
          console.error('SW registration failed:', error);
        }
      }
    };

    registerSW();
  }, []);

  const updateServiceWorker = () => {
    if (registration?.waiting) {
      // Força o service worker em espera a se tornar ativo
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Limpa todos os caches
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              return caches.delete(cacheName);
            })
          );
        }).then(() => {
          // Recarrega a página após limpar o cache
          (window as any).location.reload();
        });
      } else {
        // Fallback se não há suporte a caches
        (window as any).location.reload();
      }
    }
  };

  return {
    needRefresh,
    updateServiceWorker,
    isOnline,
    registration
  };
};
