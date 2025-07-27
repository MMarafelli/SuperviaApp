/**
 * SECTION - COMPONENTE UNIFICADO
 * 
 * Unificando todos os "quadros", cards e seções em um componente só,
 * preservando TODOS os estilos e comportamentos existentes.
 */

import React, { useState, memo } from 'react';
import './Section.css';

export interface SectionProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'card' | 'calculation' | 'result' | 'transparent' | 'primeiro-quadro' | 'segundo-quadro' | 'terceiro-quadro' | 'quarto-quadro';
  icon?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
  hover?: boolean;
  background?: 'white' | 'transparent' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Section = memo<SectionProps>(({
  title,
  children,
  variant = 'card',
  icon,
  collapsible = false,
  defaultCollapsed = false,
  className = '',
  hover = true,
  background = 'white',
  padding = 'md',
  margin = 'md',
  onClick
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapsed = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Classe base baseada na variante para preservar estilos existentes
  const getBaseClass = () => {
    switch (variant) {
      case 'primeiro-quadro':
        return 'primeiroQuadro';
      case 'segundo-quadro':
        return 'segundoQuadro';
      case 'terceiro-quadro':
        return 'terceiroQuadro';
      case 'quarto-quadro':
        return 'quartoQuadro';
      case 'calculation':
        return 'sv-calculation-section';
      case 'result':
        return 'sv-result-section';
      case 'transparent':
        return 'sv-transparent-section';
      default:
        return 'sv-card';
    }
  };

  // Classes adicionais baseadas nas props
  const getModifierClasses = () => {
    const classes = [];
    
    if (hover) classes.push('sv-section--hoverable');
    if (background !== 'white') classes.push(`sv-section--bg-${background}`);
    if (padding !== 'md') classes.push(`sv-section--padding-${padding}`);
    if (margin !== 'md') classes.push(`sv-section--margin-${margin}`);
    if (onClick) classes.push('sv-section--clickable');
    
    return classes.join(' ');
  };

  const baseClass = getBaseClass();
  const modifierClasses = getModifierClasses();
  const fullClassName = `${baseClass} sv-unified-section ${modifierClasses} ${className}`.trim();

  return (
    <section className={fullClassName} onClick={onClick}>
      {title && (
        <header 
          className={`sv-unified-section__header ${collapsible ? 'sv-unified-section__header--clickable' : ''}`}
          onClick={toggleCollapsed}
        >
          <div className="sv-unified-section__header-content">
            {icon && <span className="sv-unified-section__icon">{icon}</span>}
            <h3 className="sv-unified-section__title">{title}</h3>
          </div>
          {collapsible && (
            <span 
              className="sv-unified-section__collapse-indicator"
              style={{ 
                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              ▼
            </span>
          )}
        </header>
      )}
      <div className={`sv-unified-section__content ${isCollapsed ? 'sv-unified-section__content--collapsed' : ''} ${title ? 'sv-unified-section__content--with-title' : ''}`}>
        {(!collapsible || !isCollapsed) && children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

// Aliases para compatibilidade
export { Section as SVCard };
export { Section as CalculationSection };
export default Section;
