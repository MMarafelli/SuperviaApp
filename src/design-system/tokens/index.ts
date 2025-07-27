/**
 * DESIGN TOKENS - INDEX
 * 
 * Exportando todos os tokens para fácil importação.
 */

// Import específicos para evitar conflitos
import { colors, cssVariables as colorVariables } from './colors';
import { spacing, componentSpacing, cssVariables as spacingVariables } from './spacing';
import { typography, textStyles, cssVariables as typographyVariables } from './typography';
import { shadows, borderRadius, borders, transitions, animations, filters, cssVariables as effectVariables } from './effects';
import { breakpoints, mediaQueries, grid, cssVariables as breakpointVariables } from './breakpoints';

// Re-export
export { colors, spacing, componentSpacing, typography, textStyles };
export { shadows, borderRadius, borders, transitions, animations, filters };
export { breakpoints, mediaQueries, grid };

// Função utilitária para aplicar todas as variáveis CSS
export const getAllCSSVariables = () => {
  return {
    ...colorVariables,
    ...spacingVariables,
    ...typographyVariables,
    ...effectVariables,
    ...breakpointVariables
  };
};
