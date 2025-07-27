// src/utils/storageUtils.ts

/**
 * Utilitário para manipulação segura do localStorage
 */
export const getStorageItem = (key: string): string => {
  try {
    return localStorage.getItem(key) || '';
  } catch (error) {
    // Em produção, evite logar erros sensíveis
    return '';
  }
};

export const setStorageItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Em produção, evite logar erros sensíveis
  }
};

export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Em produção, evite logar erros sensíveis
  }
};

export const getParsedStorageItem = <T = any>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
};
