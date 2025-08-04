/**
 * DESIGN TOKENS - BREAKPOINTS UNIFICADOS
 * 
 * Padrão Mobile-First Consistente
 */

export const breakpoints = {
  // Breakpoints principais (padronizados)
  mobile: '767px',      // Mobile máximo
  tablet: '768px',      // Tablet início  
  desktop: '1024px',    // Desktop início
  wide: '1200px',       // Wide desktop
  ultrawide: '1400px'   // Ultra wide
};

// Queries pré-definidas unificadas
export const mediaQueries = {
  // Padrão principal
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: 1023px)`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  
  // Queries específicas já usadas
  mobileOnly: `@media only screen and (max-width: ${breakpoints.mobile})`,
  desktopOnly: `@media only screen and (min-width: ${breakpoints.tablet})`,
  
  // Breakpoints específicos mantidos
  smallMobile: `@media (max-width: 480px)`,
  tinyMobile: `@media (max-width: 280px)`,
  
  // Query para navbar hover (telas grandes)
  navbarHover: `@media only screen and (min-width: ${breakpoints.tablet})`,
  
  // Queries para header responsivo
  headerMobile: `@media (max-width: ${breakpoints.tablet})`,
  headerSmall: `@media (max-width: 480px)`,
  
  // Query para dark mode
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)'
};

// Definições de grid responsivo
export const grid = {
  // Colunas baseadas no sistema atual
  columns: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  },
  
  // Gaps responsivos
  gap: {
    mobile: '0.75rem',    // 12px
    tablet: '1rem',       // 16px
    desktop: '1.5rem'     // 24px
  },
  
  // Container max-widths
  container: {
    mobile: '100%',
    tablet: '768px',
    desktop: '1024px',
    wide: '1400px'        // Usado no header
  }
};

// CSS Custom Properties (compatibilidade com sistema atual)
export const cssVariables = {
  // Breakpoints como variáveis (para uso em container queries futuras)
  '--breakpoint-mobile': breakpoints.mobile,
  '--breakpoint-tablet': breakpoints.tablet,
  '--breakpoint-desktop': breakpoints.desktop,
  
  // Variáveis específicas do projeto atual (atualizadas para padrão)
  '--breakpoint-calc-mobile': breakpoints.mobile,        // 767px mobile
  '--breakpoint-calc-tablet': breakpoints.wide           // 1200px desktop
};
