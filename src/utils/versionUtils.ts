// Versão da aplicação baseada no timestamp do build
export const APP_VERSION = '__APP_VERSION__';
export const BUILD_TIME = '__BUILD_TIME__';

// Função para verificar se há uma nova versão disponível
export const checkForNewVersion = async (): Promise<boolean> => {
  try {
    // Detecta se está em desenvolvimento ou produção
    const isDev = import.meta.env.DEV;
    const baseUrl = isDev ? '' : '/SuperviaApp';
    
    // Busca a versão atual do servidor
    const response = await fetch(`${baseUrl}/version.json?t=` + Date.now());
    if (!response.ok) return false;
    
    const serverVersion = await response.json();
    const currentVersion = localStorage.getItem('app_version');
    
    // Se não há versão salva localmente, salva a atual
    if (!currentVersion) {
      localStorage.setItem('app_version', serverVersion.version);
      return false;
    }
    
    // Compara versões
    if (currentVersion !== serverVersion.version) {
      localStorage.setItem('app_version', serverVersion.version);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao verificar nova versão:', error);
    return false;
  }
};

// Função para limpar cache antigo
export const clearOldCache = async (): Promise<void> => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          // Remove caches antigos que não são da versão atual
          if (!cacheName.includes(APP_VERSION)) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    } catch (error) {
      console.error('Erro ao limpar cache antigo:', error);
    }
  }
};
