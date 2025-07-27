/**
 * DESIGN TOKENS - TIPOGRAFIA
 * 
 * Padronizando toda a tipografia baseada no que já está implementado.
 */

export const typography = {
  // Tamanhos de fonte (baseados no sistema atual)
  fontSize: {
    xs: '0.75rem',      // 12px - já usado
    sm: '0.875rem',     // 14px - já usado  
    base: '0.95rem',    // 15.2px - tamanho base atual
    lg: '1rem',         // 16px - já usado
    xl: '1.125rem',     // 18px - já usado
    '2xl': '1.75rem',   // 28px - título principal já usado
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem'       // 48px
  },

  // Pesos de fonte
  fontWeight: {
    light: '300',
    normal: '400',       // Peso padrão atual
    medium: '500',       // Já usado em labels
    semibold: '600',     // Já usado em títulos
    bold: '700'          // Já usado em headers
  },

  // Altura de linha
  lineHeight: {
    tight: '1.25',
    normal: '1.5',       // Padrão atual
    relaxed: '1.6',      // Usado em textareas
    loose: '2'
  },

  // Espaçamento de letras
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',     // Usado em alguns títulos
    widest: '0.1em'
  },

  // Famílias de fonte
  fontFamily: {
    sans: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',  // Atual
    mono: '"Courier New", monospace'  // Usado em levantamento
  }
};

// Combinações pré-definidas (baseadas no uso atual)
export const textStyles = {
  // Títulos de página
  pageTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.wide
  },

  // Títulos de seção
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal
  },

  // Subtítulos
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal
  },

  // Texto de labels
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal
  },

  // Texto base
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal
  },

  // Texto pequeno
  small: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal
  },

  // Texto muito pequeno
  tiny: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal
  },

  // Texto de código/monospace
  code: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
    fontFamily: typography.fontFamily.mono
  }
};

// CSS Custom Properties (compatibilidade com sistema atual)
export const cssVariables = {
  // Tamanhos de fonte
  '--sv-font-size-xs': typography.fontSize.xs,
  '--sv-font-size-sm': typography.fontSize.sm,
  '--sv-font-size-base': typography.fontSize.base,
  '--sv-font-size-lg': typography.fontSize.lg,
  '--sv-font-size-xl': typography.fontSize.xl,
  '--sv-font-size-2xl': typography.fontSize['2xl'],
  '--sv-font-size-3xl': typography.fontSize['3xl'],

  // Variáveis específicas do projeto atual (preservando)
  '--font-size-xs': typography.fontSize.xs,
  '--font-size-sm': typography.fontSize.sm,
  '--font-size-base': typography.fontSize.base,
  '--font-size-lg': typography.fontSize.lg,
  '--font-size-xl': typography.fontSize.xl,
  '--font-size-2xl': typography.fontSize['2xl'],

  // Família de fontes
  '--font-family-sans': typography.fontFamily.sans,
  '--font-family-mono': typography.fontFamily.mono
};
