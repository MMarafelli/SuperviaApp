import React from 'react';
import { SVInputField, SVSelectField, SVButton } from '../ui';
import { ResultDisplay } from '../calculation/CalculationComponents';
import '../../design-system/styles/index.css';

interface OpcaoSelect {
    valor: string;
    label: string;
}

interface BlocoTrVariavelProps {
    label: string;
    valorX: string;
    valorY: string;
    valorZ: string;
    tipoTacha: string;
    qtdTacha: string;
    opcoesLargura: OpcaoSelect[];
    opcoesTacha: OpcaoSelect[];
    onChange: (campo: string, valor: string) => void;
    // Props para edição
    editavel?: boolean;
    onEditToggle?: () => void;
}


const BlocoTrVariavel: React.FC<BlocoTrVariavelProps> = ({ 
    label, 
    valorX, 
    valorY, 
    valorZ, 
    tipoTacha, 
    qtdTacha, 
    opcoesLargura, 
    opcoesTacha, 
    onChange,
    editavel = false,
    onEditToggle
}) => {
    
    const handleInputChangeNumeric = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    };

    return (
        <tr>
            <td className="tdLegendaTelaGrande">{label}</td>
            <td>
                <SVSelectField
                    value={valorX}
                    onChange={(e) => onChange('X', e.target.value)}
                    options={opcoesLargura.map(opcao => ({
                        value: opcao.valor,
                        label: opcao.label
                    }))}
                />
            </td>
            <td>
                <SVInputField
                    value={valorY}
                    onChange={(e) => onChange('Y', handleInputChangeNumeric(e.target.value))}
                    variant="calculation"
                    placeholder=" "
                />
            </td>
            <td className='tdResultadoTelaGrande'>
                <div className='resultado-table-container'>
                    <ResultDisplay
                        label=""
                        value={valorZ}
                        unit="m²"
                        editable={editavel}
                        onEdit={(newValue) => onChange('Z', newValue)}
                        actionButton={
                            <SVButton
                                variant={editavel ? "success" : "info"}
                                size="sm"
                                onClick={onEditToggle}
                            >
                                {editavel ? "🔒 Bloquear" : "✏️ Editar"}
                            </SVButton>
                        }
                    />
                </div>
            </td>
            <td>
                <SVSelectField
                    value={tipoTacha}
                    onChange={(e) => onChange('TipoTacha', e.target.value)}
                    options={opcoesTacha.map(opcao => ({
                        value: opcao.valor,
                        label: opcao.label
                    }))}
                />
            </td>
            <td>
                <SVInputField
                    value={qtdTacha}
                    onChange={(e) => onChange('QtdTacha', handleInputChangeNumeric(e.target.value))}
                    variant="calculation"
                    placeholder=" "
                />
            </td>
        </tr>
    );
};

export default BlocoTrVariavel;
