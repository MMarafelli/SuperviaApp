/**
 * DESIGN TOKENS - ESPAÇAMENTOS
 * 
 * Padronizando todos os espaçamentos baseados no que já funciona no projeto.
 */

export const spacing = {
  // Espaçamentos em rem (baseados no sistema atual)
  xs: '0.25rem',     // 4px - já usado
  sm: '0.5rem',      // 8px - já usado
  md: '0.75rem',     // 12px - já usado
  lg: '1rem',        // 16px - já usado
  xl: '1.5rem',      // 24px - já usado
  '2xl': '2rem',     // 32px - já usado
  '3xl': '2.5rem',   // 40px
  '4xl': '3rem',     // 48px
  '5xl': '4rem',     // 64px
  '6xl': '5rem'      // 80px
};

// Espaçamentos específicos para componentes
export const componentSpacing = {
  // Padding interno de cards
  cardPadding: {
    sm: spacing.md,      // 12px
    md: spacing.lg,      // 16px
    lg: spacing.xl       // 24px
  },
  
  // Margins entre seções
  sectionGap: {
    sm: spacing.sm,      // 8px
    md: spacing.lg,      // 16px
    lg: spacing.xl       // 24px
  },
  
  // Padding de inputs
  inputPadding: {
    x: spacing.md,       // 12px horizontal
    y: spacing.sm        // 8px vertical
  },
  
  // Margins de botões
  buttonMargin: spacing.xs,  // 4px
  
  // Gap entre elementos de formulário
  formGap: spacing.md       // 12px
};

// CSS Custom Properties (compatibilidade com sistema atual)
export const cssVariables = {
  // Mantendo compatibilidade com variáveis existentes
  '--sv-space-1': spacing.xs,
  '--sv-space-2': spacing.sm,
  '--sv-space-3': spacing.md,
  '--sv-space-4': spacing.lg,
  '--sv-space-5': '1.25rem',
  '--sv-space-6': spacing.xl,
  '--sv-space-8': spacing['2xl'],
  '--sv-space-10': spacing['3xl'],
  '--sv-space-12': spacing['4xl'],
  
  // Variáveis específicas do projeto atual (preservando)
  '--spacing-xs': spacing.xs,
  '--spacing-sm': spacing.sm,
  '--spacing-md': spacing.md,
  '--spacing-lg': spacing.lg,
  '--spacing-xl': spacing.xl,
  '--spacing-2xl': spacing['2xl']
};
