/**
 * DESIGN SYSTEM - INDEX PRINCIPAL
 * 
 * Ponto de entrada único para todo o design system.
 * Preserva total compatibilidade com componentes existentes.
 */

// ===== TOKENS =====
export * from './tokens';

// ===== COMPONENTES BASE =====
export { PageTitle, SVPageTitle, type PageTitleProps } from './components/base/PageTitle';
export { Section, SVCard, CalculationSection, type SectionProps } from './components/base/Section';

// ===== ESTILOS GLOBAIS =====
// Importante: este import deve ser feito no main.tsx ou App.tsx
// import './design-system/styles/global.css';

// ===== HOOKS UTILITÁRIOS =====

import { useCallback, useState } from 'react';

/**
 * Hook para aplicar design tokens como CSS custom properties
 */
export const useDesignTokens = () => {
  const applyTokens = useCallback(() => {
    // Esta função pode ser usada para aplicar tokens dinamicamente
    // se necessário, mas normalmente os tokens são aplicados via CSS
    const root = document.documentElement;
    
    // Exemplo de aplicação dinâmica (se necessário)
    root.style.setProperty('--sv-primary', '#ffcc29');
    
    return true;
  }, []);

  return { applyTokens };
};

/**
 * Hook para tema (compatibilidade com sistema existente)
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('theme', newTheme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
};

// ===== TIPOS GLOBAIS =====

export interface DesignSystemConfig {
  theme: 'light' | 'dark';
  primaryColor: string;
  enableAnimations: boolean;
}

export interface ComponentVariant {
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ===== CONSTANTES =====

export const DESIGN_SYSTEM_VERSION = '1.0.0';

export const DEFAULT_CONFIG: DesignSystemConfig = {
  theme: 'light',
  primaryColor: '#ffcc29',
  enableAnimations: true
};
