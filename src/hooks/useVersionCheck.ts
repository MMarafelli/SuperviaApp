import { useEffect } from 'react';
import { checkForNewVersion, clearOldCache } from '../utils/versionUtils';

export const useVersionCheck = () => {
  useEffect(() => {
    // Verifica por atualizações ao carregar a página
    const checkVersion = async () => {
      try {
        const hasNewVersion = await checkForNewVersion();
        if (hasNewVersion) {
          // Limpa cache antigo
          await clearOldCache();
          
          // Mostra notificação ou força reload
          console.log('Nova versão detectada! A página será recarregada.');
          
          // Opcional: força reload automático
          // window.location.reload();
        }
      } catch (error) {
        console.error('Erro ao verificar versão:', error);
      }
    };

    checkVersion();

    // Verifica por atualizações quando a aba ganha foco
    const handleFocus = () => {
      checkVersion();
    };

    window.addEventListener('focus', handleFocus);
    
    // Verifica periodicamente (a cada 5 minutos)
    const interval = setInterval(checkVersion, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);
};
