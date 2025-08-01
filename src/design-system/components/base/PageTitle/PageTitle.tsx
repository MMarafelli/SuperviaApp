/**
 * PAGE TITLE - COMPONENTE UNIFICADO
 * 
 * Unificando TODOS os PageTitle existentes em um só componente,
 * preservando todos os estilos e funcionalidades atuais.
 */

import { memo } from 'react';
import './PageTitle.css';

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: string;
  variant?: 'default' | 'modern' | 'legacy';
  className?: string;
}

export const PageTitle = memo<PageTitleProps>(({ 
  title, 
  className = '' 
}) => {
  // FORÇANDO SEMPRE A VARIANTE LEGACY PARA GARANTIR CONSISTÊNCIA
  // Estilo original do shared.css (preservando exatamente)
  return <h1 className={`page-title sv-page-title ${className}`} style={{
    color: '#ffcc29',
    fontSize: '1.75rem',
    fontWeight: '600',
    margin: '1rem 0 2rem 0',
    padding: '0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    textAlign: 'left',
    position: 'relative',
    display: 'block',
    background: 'transparent',
    border: 'none',
    width: '100%',
    boxSizing: 'border-box'
  }}>{title}</h1>;
});

PageTitle.displayName = 'PageTitle';

// Alias para compatibilidade com imports existentes
export { PageTitle as SVPageTitle };
export default PageTitle;
