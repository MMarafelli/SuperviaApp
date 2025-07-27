/**
 * DESIGN TOKENS - BREAKPOINTS
 * 
 * Definindo breakpoints responsivos baseados no que já está sendo usado.
 */

export const breakpoints = {
  // Breakpoints em pixels (baseados no sistema atual)
  mobile: '600px',      // Usado no navbar e layout geral
  tablet: '768px',      // Usado em vários componentes
  tabletLg: '900px',    // Usado na calcTintaEsfera
  desktop: '1024px',    // Usado em media queries
  desktopLg: '1200px',  // Usado na calcTintaEsfera
  wide: '1400px'        // Usado no header
};

// Queries pré-definidas para facilitar uso
export const mediaQueries = {
  // Mobile first approach
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  
  // Queries específicas já usadas
  mobileOnly: `@media only screen and (max-width: ${breakpoints.mobile})`,
  desktopOnly: `@media only screen and (min-width: ${breakpoints.mobile})`,
  
  // Breakpoints específicos do projeto
  calcTintaMobile: `@media (max-width: ${breakpoints.tabletLg})`,     // 900px
  calcTintaTablet: `@media (min-width: ${breakpoints.tabletLg}) and (max-width: ${breakpoints.desktopLg})`,  // 900px-1200px
  calcTintaDesktop: `@media (min-width: ${breakpoints.desktopLg})`,   // 1200px+
  
  // Query para navbar hover (telas grandes)
  navbarHover: `@media only screen and (min-width: ${breakpoints.mobile})`,
  
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
  
  // Variáveis específicas do projeto atual (preservando)
  '--breakpoint-calc-mobile': breakpoints.tabletLg,      // 900px usado na calcTinta
  '--breakpoint-calc-tablet': breakpoints.desktopLg      // 1200px usado na calcTinta
};
