/**
 * DESIGN TOKENS - EFEITOS VISUAIS
 * 
 * Padronizando sombras, bordas, transições e outros efeitos visuais
 * baseados no que já está implementado e funcionando.
 */

export const shadows = {
  // Sombras (baseadas no sistema atual)
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',                    // Sombra pequena já usada
  md: '0 4px 16px rgba(0, 0, 0, 0.1)',                   // Sombra média já usada
  lg: '0 8px 24px rgba(0, 0, 0, 0.15)',                  // Sombra grande já usada
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  
  // Sombras específicas de foco
  focus: '0 0 0 3px rgba(255, 204, 41, 0.1)',            // Foco amarelo já usado
  focusSuccess: '0 0 0 3px rgba(16, 185, 129, 0.3)',     // Foco verde já usado
  focusError: '0 0 0 3px rgba(239, 68, 68, 0.3)',        // Foco vermelho já usado
  
  // Sombras internas
  inset: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',          // Já usada em textarea
  
  // Sombras para botões
  button: '0 2px 4px rgba(0, 0, 0, 0.1)',
  buttonHover: '0 4px 8px rgba(0, 0, 0, 0.15)',
  
  // Sombras coloridas específicas
  primary: '0 2px 4px rgba(255, 204, 41, 0.2)',         // Sombra amarela já usada
  success: '0 2px 4px rgba(16, 185, 129, 0.2)',         // Sombra verde já usada
  error: '0 2px 4px rgba(239, 68, 68, 0.2)',            // Sombra vermelha já usada
  info: '0 2px 4px rgba(59, 130, 246, 0.2)'             // Sombra azul já usada
};

export const borderRadius = {
  // Raios de borda (baseados no sistema atual)
  none: '0',
  sm: '0.5rem',        // 8px - já usado
  md: '1rem',          // 16px - já usado
  lg: '1.5rem',        // 24px
  xl: '2rem',          // 32px
  full: '9999px'       // Círculo completo
};

export const borders = {
  // Larguras de borda
  width: {
    none: '0',
    thin: '1px',
    normal: '1.5px',     // Largura padrão já usada
    thick: '2px'
  },
  
  // Estilos de borda
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted'
  }
};

export const transitions = {
  // Durações (baseadas no sistema atual)
  duration: {
    fast: '150ms',       // Transição rápida
    normal: '200ms',     // Padrão atual (0.2s)
    slow: '300ms',       // Transição lenta atual (0.3s)
    slower: '600ms'      // Transição muito lenta (já usada)
  },
  
  // Funções de easing
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',  // Padrão atual
    easeInOut: 'ease-in-out',
    custom: 'cubic-bezier(0.4, 0, 0.2, 1)'  // Já usado no header
  },
  
  // Transições pré-definidas
  all: 'all 200ms ease-out',              // Transição padrão atual
  transform: 'transform 200ms ease-out',   // Para animações de movimento
  opacity: 'opacity 200ms ease-out',      // Para fade in/out
  colors: 'background-color 200ms ease-out, border-color 200ms ease-out, color 200ms ease-out'
};

export const animations = {
  // Animações já implementadas
  fadeInUp: {
    name: 'fadeInUp',
    duration: '0.6s',     // Duração atual
    easing: 'ease-out',
    fillMode: 'forwards'
  },
  
  slideIn: {
    name: 'slide-in',
    duration: '0.3s',     // Duração atual dos toasts
    easing: 'ease-out'
  },
  
  logoSpin: {
    name: 'logo-spin',
    duration: '20s',      // Duração já definida
    easing: 'linear',
    iterationCount: 'infinite'
  }
};

export const filters = {
  // Filtros já usados
  none: 'none',
  blur: {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(10px)',     // Usado no header backdrop
    xl: 'blur(15px)'      // Usado em glassmorphism
  },
  
  grayscale: {
    none: 'grayscale(0%)',
    partial: 'grayscale(100%) opacity(0.7)',  // Estado padrão navbar
    full: 'grayscale(100%)'
  }
};

// CSS Custom Properties (compatibilidade com sistema atual)
export const cssVariables = {
  // Sombras
  '--sv-shadow-sm': shadows.sm,
  '--sv-shadow-md': shadows.md,
  '--sv-shadow-lg': shadows.lg,
  '--sv-shadow-xl': shadows.xl,
  
  // Raios de borda
  '--sv-radius-sm': borderRadius.sm,
  '--sv-radius-md': borderRadius.md,
  '--sv-radius-lg': borderRadius.lg,
  '--sv-radius-xl': borderRadius.xl,
  
  // Transições
  '--sv-transition': transitions.all,
  
  // Variáveis específicas do projeto atual (preservando)
  '--border-radius-sm': borderRadius.sm,
  '--border-radius-md': borderRadius.md,
  '--border-width': borders.width.normal,
  '--shadow-sm': shadows.sm,
  '--shadow-md': shadows.md,
  '--shadow-lg': shadows.lg,
  '--shadow-focus': shadows.focus,
  '--transition-fast': `all ${transitions.duration.fast} ${transitions.easing.easeOut}`,
  '--transition-normal': `all ${transitions.duration.slow} ${transitions.easing.easeOut}`,
  '--transition-slow': `all 0.6s ${transitions.easing.easeOut}`,
  '--transition-speed': transitions.duration.slower  // Variável do navbar
};
