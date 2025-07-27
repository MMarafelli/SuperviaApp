import React, { ReactNode, useState, useEffect } from 'react';

// Interface para CalculationSection
interface CalculationSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: string;
}

export const CalculationSection: React.FC<CalculationSectionProps> = ({
  title,
  children,
  className = '',
  icon
}) => {
  return (
    <div className={`calculation-section ${className}`}>
      <h3 className="calculation-section-title">
        {icon && <span className="calculation-section-icon">{icon}</span>}
        {title}
      </h3>
      <div className="calculation-section-content">
        {children}
      </div>
    </div>
  );
};

// Interface para FieldGroup
interface FieldGroupProps {
  children: ReactNode;
  className?: string;
  title?: string;
  columns?: number;
}

export const FieldGroup: React.FC<FieldGroupProps> = ({
  children,
  className = '',
  title,
  columns = 1
}) => {
  const gridClass = columns > 1 ? `sv-grid sv-grid-cols-${columns} sv-gap-4` : '';
  
  return (
    <div className={`field-group ${className}`}>
      {title && <h4 className="field-group-title">{title}</h4>}
      <div className={gridClass}>
        {children}
      </div>
    </div>
  );
};

// Interface para ResultDisplay
interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
  editable?: boolean;
  onEdit?: (newValue: string) => void;
  actionButton?: ReactNode;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  value,
  unit = '',
  className = '',
  editable = false,
  onEdit,
  actionButton
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());

  const handleEditToggle = () => {
    if (editable) {
      setIsEditing(!isEditing);
      if (isEditing && onEdit) {
        onEdit(editValue);
      }
    }
  };

  return (
    <div className={`result-display ${className} ${editable ? 'editable' : ''}`}>
      <div className="result-row">
        <span className="result-label">{label}:</span>
        {isEditing ? (
          <div className="result-edit">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleEditToggle}
              onKeyPress={(e) => e.key === 'Enter' && handleEditToggle()}
              autoFocus
            />
          </div>
        ) : (
          <span className="result-value" onClick={handleEditToggle}>
            {value} {unit}
            {editable && !actionButton && <span className="edit-indicator">✏️</span>}
          </span>
        )}
        {actionButton && (
          <div className="result-action">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
};

// Interface para ActionButtons
interface ActionButtonsProps {
  onCalculate?: () => void;
  onClear?: () => void;
  onSave?: () => void;
  showSave?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'stretch';
  children?: ReactNode;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCalculate,
  onClear,
  onSave,
  showSave = false,
  className = '',
  align = 'left',
  children
}) => {
  const alignClass = align === 'stretch' ? 'sv-flex sv-flex-col sv-gap-2' : 
                    align === 'center' ? 'sv-flex sv-justify-center sv-gap-2' :
                    align === 'right' ? 'sv-flex sv-justify-end sv-gap-2' :
                    'sv-flex sv-justify-start sv-gap-2';

  return (
    <div className={`action-buttons ${alignClass} ${className}`}>
      {children || (
        <>
          {onCalculate && (
            <button
              type="button"
              onClick={onCalculate}
              className="action-btn action-btn-calculate"
            >
              Calcular
            </button>
          )}
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="action-btn action-btn-clear"
            >
              Limpar
            </button>
          )}
          {showSave && onSave && (
            <button
              type="button"
              onClick={onSave}
              className="action-btn action-btn-save"
            >
              Salvar
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Interface para ResponsiveCalculationLayout
interface ResponsiveCalculationLayoutProps {
  children?: ReactNode;
  className?: string;
  mobileLayout?: ReactNode;
  desktopLayout?: ReactNode;
  breakpoint?: number;
}

export const ResponsiveCalculationLayout: React.FC<ResponsiveCalculationLayoutProps> = ({
  children,
  className = '',
  mobileLayout,
  desktopLayout,
  breakpoint = 768
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  // Se layouts específicos foram fornecidos, use-os
  if (mobileLayout && desktopLayout) {
    return (
      <div className={`responsive-calculation-layout ${isMobile ? 'mobile' : 'desktop'} ${className}`}>
        {isMobile ? mobileLayout : desktopLayout}
      </div>
    );
  }

  // Caso contrário, use o children padrão
  return (
    <div className={`responsive-calculation-layout ${isMobile ? 'mobile' : 'desktop'} ${className}`}>
      {children}
    </div>
  );
};

// Interface para CalculationTable
interface CalculationTableProps {
  headers: string[];
  rows?: (string | number)[][];
  className?: string;
  children?: ReactNode;
}

export const CalculationTable: React.FC<CalculationTableProps> = ({
  headers,
  rows,
  className = '',
  children
}) => {
  return (
    <div className={`calculation-table-container ${className}`}>
      <table className="calculation-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="calculation-table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children ? (
            children
          ) : (
            rows?.map((row, rowIndex) => (
              <tr key={rowIndex} className="calculation-table-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="calculation-table-cell">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};