import React from 'react';

// ===== TIPOS =====
export interface PageTitleProps {
  title: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'spacious' | 'hover';
  className?: string;
  onClick?: () => void;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'spacious' | 'hover';
  className?: string;
  onClick?: () => void;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'error' | 'info';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  containerClassName?: string;
  icon?: string;
  variant?: 'default' | 'calculation' | 'result';
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  containerClassName?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  containerClassName?: string;
}

// ===== COMPONENTES =====

/**
 * Título de página padronizado
 */
export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  className = '' 
}) => {
  return (
    <h1 className={`sv-page-title ${className}`}>
      {title}
    </h1>
  );
};

/**
 * Card/Container padronizado
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  onClick
}) => {
  const variantClass = variant === 'compact' ? 'sv-card-compact' : 
                      variant === 'spacious' ? 'sv-card-spacious' : 
                      variant === 'hover' ? 'sv-hover-lift' : '';
  
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`sv-card ${variantClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * Conteúdo do card
 */
export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`sv-card-content ${className}`}>
      {children}
    </div>
  );
};

/**
 * Ações do card
 */
export const CardActions: React.FC<CardActionsProps> = ({ 
  children, 
  className = '',
  align = 'right'
}) => {
  const alignClass = align === 'left' ? 'sv-justify-start' :
                    align === 'center' ? 'sv-justify-center' :
                    align === 'between' ? 'sv-justify-between' :
                    'sv-justify-end';

  return (
    <div className={`sv-card-actions sv-flex sv-gap-2 ${alignClass} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Botão padronizado
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'base',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantClass = `sv-btn-${variant}`;
  const sizeClass = size !== 'base' ? `sv-btn-${size}` : '';
  const loadingClass = loading ? 'sv-loading' : '';

  return (
    <button 
      className={`sv-btn ${variantClass} ${sizeClass} ${loadingClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Campo de input padronizado
 */
export const InputField: React.FC<InputFieldProps> = ({ 
  label,
  error,
  success,
  helperText,
  containerClassName = '',
  className = '',
  icon,
  variant = 'default',
  value,
  ...props
}) => {
  const validationClass = error ? 'sv-invalid' : success ? 'sv-valid' : '';
  const inputClass = props.readOnly ? 'sv-readonly' : '';
  const variantClass = variant ? `sv-input-${variant}` : '';
  
  // Determina se o campo tem valor válido
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className={`sv-field-group ${containerClassName}`}>
      {label && (
        <label className="sv-label">
          {label}
        </label>
      )}
      <div className="sv-input-container">
        {icon && (
          <span className="sv-input-icon">
            {icon}
          </span>
        )}
        <input 
          className={`sv-input ${validationClass} ${inputClass} ${variantClass} ${icon ? 'sv-input-with-icon' : ''} ${className}`}
          data-has-value={hasValue}
          value={value}
          {...props}
        />
      </div>
      {error && (
        <p className="sv-text-sm" style={{ color: 'var(--sv-error)', marginTop: 'var(--sv-space-1)' }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="sv-text-sm" style={{ color: 'var(--sv-gray-500)', marginTop: 'var(--sv-space-1)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Campo de select padronizado
 */
export const SelectField: React.FC<SelectFieldProps> = ({ 
  label,
  error,
  success,
  helperText,
  containerClassName = '',
  className = '',
  options,
  value,
  ...props
}) => {
  const validationClass = error ? 'sv-invalid' : success ? 'sv-valid' : '';
  
  // Determina se o select tem valor válido (não vazio)
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className={`sv-field-group ${containerClassName}`}>
      {label && (
        <label className="sv-label">
          {label}
        </label>
      )}
      <select 
        className={`sv-select ${validationClass} ${className}`}
        data-has-value={hasValue}
        value={value}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="sv-text-sm" style={{ color: 'var(--sv-error)', marginTop: 'var(--sv-space-1)' }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="sv-text-sm" style={{ color: 'var(--sv-gray-500)', marginTop: 'var(--sv-space-1)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Campo de textarea padronizado
 */
export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  label,
  error,
  success,
  helperText,
  containerClassName = '',
  className = '',
  value,
  ...props
}) => {
  const validationClass = error ? 'sv-invalid' : success ? 'sv-valid' : '';
  const textareaClass = props.readOnly ? 'sv-readonly' : '';
  
  // Determina se o textarea tem valor válido
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className={`sv-field-group ${containerClassName}`}>
      {label && (
        <label className="sv-label">
          {label}
        </label>
      )}
      <textarea 
        className={`sv-textarea ${validationClass} ${textareaClass} ${className}`}
        data-has-value={hasValue}
        value={value}
        {...props}
      />
      {error && (
        <p className="sv-text-sm" style={{ color: 'var(--sv-error)', marginTop: 'var(--sv-space-1)' }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="sv-text-sm" style={{ color: 'var(--sv-gray-500)', marginTop: 'var(--sv-space-1)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Container de página padronizado
 */
export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`sv-page-container sv-space-y-4 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Container flex com espaçamento
 */
export const FlexContainer: React.FC<{ 
  children: React.ReactNode; 
  direction?: 'row' | 'col';
  gap?: 'sm' | 'base' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
}> = ({ 
  children, 
  direction = 'row',
  gap = 'base',
  align = 'center',
  justify = 'start',
  className = '' 
}) => {
  const directionClass = direction === 'col' ? 'sv-flex-col' : '';
  const gapClass = `sv-gap-${gap === 'sm' ? '2' : gap === 'lg' ? '6' : '4'}`;
  const alignClass = `sv-items-${align}`;
  const justifyClass = justify === 'between' ? 'sv-justify-between' : 
                       justify === 'center' ? 'sv-justify-center' :
                       justify === 'end' ? 'sv-justify-end' : '';

  return (
    <div className={`sv-flex ${directionClass} ${gapClass} ${alignClass} ${justifyClass} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Grid responsivo
 */
export const GridContainer: React.FC<{ 
  children: React.ReactNode; 
  cols?: 1 | 2 | 3;
  gap?: 'sm' | 'base' | 'lg';
  className?: string;
}> = ({ 
  children, 
  cols = 1,
  gap = 'base',
  className = '' 
}) => {
  const colsClass = `sv-grid-cols-${cols}`;
  const gapClass = `sv-gap-${gap === 'sm' ? '2' : gap === 'lg' ? '6' : '4'}`;

  return (
    <div className={`sv-grid ${colsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Seção com animação
 */
export const AnimatedSection: React.FC<{ 
  children: React.ReactNode; 
  animation?: 'fade' | 'slide' | 'bounce';
  delay?: 100 | 200 | 300 | 500;
  className?: string;
}> = ({ 
  children, 
  animation = 'slide',
  delay,
  className = '' 
}) => {
  const animationClass = `sv-animate-${animation === 'fade' ? 'fade-in' : 
                                     animation === 'bounce' ? 'bounce-in' : 'slide-up'}`;
  const delayClass = delay ? `sv-animate-delay-${delay}` : '';

  return (
    <section className={`${animationClass} ${delayClass} ${className}`}>
      {children}
    </section>
  );
};

// Export all components
export const SVPageTitle = PageTitle;
export const SVCard = Card;
export const SVCardContent = CardContent;
export const SVCardActions = CardActions;
export const SVButton = Button;
export const SVInputField = InputField;
export const SVSelectField = SelectField;
export const SVTextAreaField = TextAreaField;
export const SVPageContainer = PageContainer;
export const SVFlexContainer = FlexContainer;
export const SVGridContainer = GridContainer;
export const SVAnimatedSection = AnimatedSection;
