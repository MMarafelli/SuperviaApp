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
  subtitle, 
  icon, 
  variant = 'legacy',  // VOLTANDO PARA LEGACY - APARÊNCIA ORIGINAL CORRETA
  className = '' 
}) => {
  // Renderização baseada na variante para manter compatibilidade
  if (variant === 'legacy') {
    // Estilo original do shared.css (preservando exatamente)
    return <h1 className={`page-title ${className}`}>{title}</h1>;
  }

  if (variant === 'modern') {
    // Estilo do design system atual (preservando)
    return (
      <h1 className={`sv-page-title ${className}`}>
        {title}
      </h1>
    );
  }

  // Estilo unificado padrão (combinando o melhor dos dois)
  return (
    <header className={`sv-unified-page-title ${className}`}>
      {icon && <span className="sv-unified-page-title__icon">{icon}</span>}
      <div className="sv-unified-page-title__content">
        <h1 className="sv-unified-page-title__title">{title}</h1>
        {subtitle && <p className="sv-unified-page-title__subtitle">{subtitle}</p>}
      </div>
    </header>
  );
});

PageTitle.displayName = 'PageTitle';

// Alias para compatibilidade com imports existentes
export { PageTitle as SVPageTitle };
export default PageTitle;
