/**
 * Utilitário para detecção de ambiente de desenvolvimento
 */
export const isDevelopment = (): boolean => {
  // Verifica múltiplas condições para garantir compatibilidade
  return (
    import.meta.env.MODE === 'development' ||
    import.meta.env.MODE === 'test' ||
    import.meta.env.MODE === 'preview' ||
    process.env.NODE_ENV === 'development' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('localhost')
  );
};

/**
 * Utilitário para logs condicionais em desenvolvimento
 */
export const devLog = (...args: unknown[]): void => {
  if (isDevelopment()) {
    console.log('[DEV]', ...args);
  }
};

/**
 * Utilitário para warns condicionais em desenvolvimento
 */
export const devWarn = (...args: unknown[]): void => {
  if (isDevelopment()) {
    console.warn('[DEV]', ...args);
  }
};

/**
 * Utilitário para errors condicionais em desenvolvimento
 */
export const devError = (...args: unknown[]): void => {
  if (isDevelopment()) {
    console.error('[DEV]', ...args);
  }
};
