/**
 * DESIGN TOKENS - CORES
 * 
 * Centralizando todas as cores do sistema SuperVia em um único local.
 * Baseado nas cores já existentes e funcionais no projeto.
 */

export const colors = {
  // Cor primária SuperVia (exatamente como usado atualmente)
  primary: {
    50: '#fff3cc',
    100: '#ffe89f', 
    200: '#ffd952',
    300: '#ffcc29',    // Cor principal já estabelecida
    400: '#e6b824',    // Versão escura já estabelecida
    500: '#d9a821',
    600: '#b8961c',
    700: '#947618',
    800: '#6b5612',
    900: '#42350b'
  },

  // Cores semânticas (preservando as já estabelecidas)
  semantic: {
    success: '#10b981',      // Verde já usado
    successDark: '#059669',  // Verde escuro já usado
    error: '#ef4444',        // Vermelho já usado
    errorDark: '#dc2626',    // Vermelho escuro já usado
    warning: '#f59e0b',      // Amarelo aviso
    warningDark: '#d97706',
    info: '#3b82f6',         // Azul já usado
    infoDark: '#2563eb'      // Azul escuro já usado
  },

  // Cores neutras (baseadas no sistema atual)
  neutral: {
    50: '#f9fafb',           // Cinza muito claro
    100: '#f3f4f6',          // Cinza claro
    200: '#e5e7eb',          // Borda clara já usada
    300: '#d1d5db',          // Borda cinza já usada
    400: '#9ca3af',          // Placeholder já usado
    500: '#6b7280',          // Texto muted já usado
    600: '#4b5563',
    700: '#374151',          // Texto secundário já usado
    800: '#1f2937',          // Texto primário já usado
    900: '#111827'
  },

  // Cores de background (preservando o atual)
  background: {
    body: '#f5f5f5',         // Background light atual
    bodyDark: '#1a2332',     // Background dark atual
    white: '#ffffff',        // Branco puro
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },

  // Cores de borda (já estabelecidas)
  border: {
    light: '#e5e7eb',        // Borda clara já usada
    gray: '#d1d5db',         // Borda cinza já usada
    dark: '#374151'
  }
};

// CSS Custom Properties (para compatibilidade com CSS existente)
export const cssVariables = {
  // Mantendo compatibilidade com variáveis existentes
  '--sv-primary': colors.primary[300],
  '--sv-primary-dark': colors.primary[400],
  '--sv-primary-light': colors.primary[50],
  
  '--sv-success': colors.semantic.success,
  '--sv-success-dark': colors.semantic.successDark,
  '--sv-error': colors.semantic.error,
  '--sv-error-dark': colors.semantic.errorDark,
  '--sv-info': colors.semantic.info,
  '--sv-info-dark': colors.semantic.infoDark,
  
  '--sv-white': colors.background.white,
  '--sv-gray-50': colors.neutral[50],
  '--sv-gray-100': colors.neutral[100],
  '--sv-gray-200': colors.neutral[200],
  '--sv-gray-300': colors.neutral[300],
  '--sv-gray-400': colors.neutral[400],
  '--sv-gray-500': colors.neutral[500],
  '--sv-gray-600': colors.neutral[600],
  '--sv-gray-700': colors.neutral[700],
  '--sv-gray-800': colors.neutral[800],
  '--sv-gray-900': colors.neutral[900],
  
  // Variáveis específicas do projeto atual (preservando)
  '--color-primary': colors.primary[300],
  '--color-primary-dark': colors.primary[400],
  '--color-text-primary': colors.neutral[800],
  '--color-text-secondary': colors.neutral[700],
  '--color-text-muted': colors.neutral[500],
  '--color-text-placeholder': colors.neutral[400],
  '--color-bg-white': colors.background.white,
  '--color-bg-gray-50': colors.neutral[50],
  '--color-bg-gray-100': colors.neutral[100],
  '--color-bg-transparent': colors.background.transparent,
  '--color-border-gray': colors.border.gray,
  '--color-border-light': colors.border.light,
  '--color-success': colors.semantic.success,
  '--color-success-dark': colors.semantic.successDark,
  '--color-error': colors.semantic.error,
  '--color-error-dark': colors.semantic.errorDark,
  '--color-info': colors.semantic.info,
  '--color-info-dark': colors.semantic.infoDark
};
