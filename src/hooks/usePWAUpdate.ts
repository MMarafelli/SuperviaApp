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
          const reg = await navigator.serviceWorker.register('/SuperviaApp/sw.js', {
            scope: '/SuperviaApp/'
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

          // Verifica periodicamente por atualizações (a cada 60 segundos)
          const checkForUpdates = () => {
            reg.update().catch(console.error);
          };

          const interval = setInterval(checkForUpdates, 60000);
          
          // Verifica imediatamente quando a aba ganha foco
          const handleVisibilityChange = () => {
            if (!document.hidden) {
              checkForUpdates();
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
