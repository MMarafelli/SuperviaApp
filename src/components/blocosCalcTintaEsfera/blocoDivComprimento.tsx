import React from 'react';
import { SVInputField, SVSelectField, SVButton } from '../ui';
import '../../design-system/styles/index.css';

interface OpcaoSelect {
    valor: string;
    label: string;
}

interface BlocoDivVariavelProps {
    label: string;
    valorX: string;
    valorY: string;
    valorZ: string;
    tipoTacha: string;
    qtdTacha: string;
    opcoesLargura: OpcaoSelect[];
    opcoesTacha: OpcaoSelect[];
    onChange: (campo: string, valor: string) => void;
    onClickIcon?: () => void;
    // Props para edição
    editavel?: boolean;
    onEditToggle?: () => void;
}


const BlocoDivCompVariavel: React.FC<BlocoDivVariavelProps> = ({ 
    label, 
    valorX, 
    valorY, 
    valorZ, 
    tipoTacha, 
    qtdTacha, 
    opcoesLargura, 
    opcoesTacha, 
    onChange, 
    onClickIcon,
    editavel = false,
    onEditToggle
}) => {

    const handleInputChangeNumeric = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    };

    return (
        <div className='calculation-section'>
            <div className='calculation-section-title' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: '600',
                fontSize: '1.1rem',
                color: '#374151'
            }}>
                <span>{label}</span>
                <svg onClick={onClickIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ cursor: 'pointer', opacity: 0.7, color: '#ef4444' }}>
                    <path fillRule="evenodd" d="M9.354 8l3.823-3.823a.5.5 0 1 0-.708-.708L8.646 7.293 4.823 3.47a.5.5 0 1 0-.708.708L7.938 8l-3.823 3.823a.5.5 0 1 0 .708.708L8.646 8.707l3.823 3.823a.5.5 0 1 0 .708-.708L9.354 8z" strokeWidth="2" />
                </svg>
            </div>
            <div className="sv-grid sv-grid-cols-1 md:sv-grid-cols-2 lg:sv-grid-cols-3 sv-gap-4">
                <SVSelectField
                    label="Largura"
                    value={valorX}
                    onChange={(e) => onChange('X', e.target.value)}
                    options={opcoesLargura.map(opcao => ({
                        value: opcao.valor,
                        label: opcao.label
                    }))}
                />
                
                <SVInputField
                    label="Comprimento (m)"
                    value={valorY}
                    onChange={(e) => onChange('Y', handleInputChangeNumeric(e.target.value))}
                    variant="calculation"
                    placeholder="0.00"
                    type="number"
                />
                
                <div className="sv-field-group">
                    <label className="sv-label">Resultado (m²)</label>
                    <div className="sv-input-container">
                        <input 
                            className="sv-input"
                            value={`${valorZ} m²`}
                            readOnly
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingRight: '80px' // Espaço para o botão
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1
                        }}>
                            <SVButton
                                variant={editavel ? "success" : "info"}
                                size="sm"
                                onClick={onEditToggle}
                            >
                                {editavel ? "🔒 Bloquear" : "✏️ Editar"}
                            </SVButton>
                        </div>
                        {editavel && (
                            <input
                                type="text"
                                value={valorZ}
                                onChange={(e) => onChange('Z', e.target.value)}
                                style={{
                                    position: 'absolute',
                                    left: '0',
                                    right: '80px',
                                    top: '0',
                                    bottom: '0',
                                    border: 'none',
                                    padding: '15.87px 16.1px',
                                    background: 'transparent',
                                    fontSize: '18.5px',
                                    fontWeight: '400',
                                    color: '#111827',
                                    outline: 'none',
                                    zIndex: 2
                                }}
                            />
                        )}
                    </div>
                </div>
                
                <SVSelectField
                    label="Tipo de tacha"
                    value={tipoTacha}
                    onChange={(e) => onChange('TipoTacha', e.target.value)}
                    options={opcoesTacha.map(opcao => ({
                        value: opcao.valor,
                        label: opcao.label
                    }))}
                />
                
                <SVInputField
                    label="Quantidade de tacha"
                    value={qtdTacha}
                    onChange={(e) => onChange('QtdTacha', handleInputChangeNumeric(e.target.value))}
                    variant="calculation"
                    placeholder="0"
                    type="number"
                />
            </div>
        </div>
    );
};

export default BlocoDivCompVariavel;
