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

  // Verifica se uma atualização foi executada recentemente (últimos 2 minutos)
  useEffect(() => {
    const lastUpdate = localStorage.getItem('sw-update-executed');
    if (lastUpdate) {
      const timeSinceUpdate = Date.now() - parseInt(lastUpdate);
      // Se foi há menos de 2 minutos, não mostra a notificação
      if (timeSinceUpdate < 120000) { // 2 minutos
        setNeedRefresh(false);
        return;
      }
    }
  }, []);

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

  const updateServiceWorker = async () => {
    try {
      // Primeiro, reseta o estado needRefresh para evitar que a notificação reapareça
      setNeedRefresh(false);
      
      // Marca no localStorage que uma atualização foi executada
      localStorage.setItem('sw-update-executed', Date.now().toString());
      
      if (registration?.waiting) {
        // Força o service worker em espera a se tornar ativo
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Aguarda um pouco para o service worker processar
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Limpa todos os caches
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        }
        
        // Aguarda mais um pouco antes de recarregar
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Recarrega a página
        window.location.reload();
      } else {
        // Se não há service worker em espera, tenta forçar uma atualização
        if (registration) {
          await registration.update();
          // Aguarda um pouco antes de recarregar
          await new Promise(resolve => setTimeout(resolve, 500));
          window.location.reload();
        } else {
          // Fallback - apenas recarrega a página
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar service worker:', error);
      // Em caso de erro, reseta o estado e recarrega a página
      setNeedRefresh(false);
      window.location.reload();
    }
  };

  return {
    needRefresh,
    updateServiceWorker,
    isOnline,
    registration
  };
};
