import React from 'react';

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
    opcoesEspessura: OpcaoSelect[];
    opcoesTacha: OpcaoSelect[];
    onChange: (campo: string, valor: string) => void;
}


const BlocoDivUnidVariavel: React.FC<BlocoDivVariavelProps> = ({ label, valorX, valorY, valorZ, tipoTacha, qtdTacha, opcoesEspessura, opcoesTacha, onChange }) => {

    const handleInputChangeNumeric = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    };

    return (
        <div className='grupo'>
            <label className='quadro'>{label}:</label>
            <div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Espessura:</div>
                    <select
                        className={`${(!valorX) ? 'border-white' : ''}
                                    ${(valorX) ? 'border-green' : ''}`}
                        value={valorX}
                        onChange={(e) => onChange('X', e.target.value)}>
                        {opcoesEspessura.map((opcao) => (
                            <option key={opcao.valor} value={opcao.valor}>
                                {opcao.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Unidades:</div>
                    <input
                        type="text"
                        placeholder=" "
                        value={valorY}
                        onChange={(e) => onChange('Y', handleInputChangeNumeric(e.target.value))}
                    />
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Resultado(m²):</div>
                    <input
                        disabled
                        type="text"
                        placeholder=" "
                        value={valorZ}
                    />
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Tipo de tacha:</div>
                    <select
                        className={`${(!tipoTacha) ? 'border-white' : ''}
                                    ${(tipoTacha) ? 'border-green' : ''}`}
                        value={tipoTacha}
                        onChange={(e) => onChange('TipoTacha', e.target.value)}>
                        {opcoesTacha.map((opcao) => (
                            <option key={opcao.valor} value={opcao.valor}>
                                {opcao.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Quantidade de tacha:</div>
                    <input
                        type="text"
                        value={qtdTacha}
                        placeholder=" "
                        onChange={(e) => onChange('QtdTacha', handleInputChangeNumeric(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlocoDivUnidVariavel;