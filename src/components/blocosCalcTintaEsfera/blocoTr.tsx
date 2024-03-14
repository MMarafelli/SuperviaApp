import React from 'react';

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
}


const BlocoTrVariavel: React.FC<BlocoTrVariavelProps> = ({ label, valorX, valorY, valorZ, tipoTacha, qtdTacha, opcoesLargura, opcoesTacha, onChange }) => {
    
    const handleInputChangeNumeric = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    };

    return (
        <tr>
            <td className="tdLegendaTelaGrande">{label}</td>
            <td>
                <select
                    className={`${(!valorX) ? 'border-white' : ''}
          ${(valorX) ? 'border-green' : ''}`}
                    value={valorX}
                    onChange={(e) => onChange('X', e.target.value)}
                >
                    {opcoesLargura.map((opcao) => (
                        <option key={opcao.valor} value={opcao.valor}>
                            {opcao.label}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="text"
                    value={valorY}
                    placeholder=" "
                    onChange={(e) => onChange('Y', handleInputChangeNumeric(e.target.value))}
                />
            </td>
            <td className='tdResultadoTelaGrande'>{valorZ}</td>
            <td>
                <select
                    className={`${(!tipoTacha) ? 'border-white' : ''}
          ${(tipoTacha) ? 'border-green' : ''}`}
                    value={tipoTacha}
                    onChange={(e) => onChange('TipoTacha', e.target.value)}
                >
                    {opcoesTacha.map((opcao) => (
                        <option key={opcao.valor} value={opcao.valor}>
                            {opcao.label}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="text"
                    value={qtdTacha}
                    placeholder=" "
                    onChange={(e) => onChange('QtdTacha', handleInputChangeNumeric(e.target.value))}
                />
            </td>
        </tr>
    );
};

export default BlocoTrVariavel;
