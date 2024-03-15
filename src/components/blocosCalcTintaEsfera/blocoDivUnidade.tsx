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
    opcoesLargura: OpcaoSelect[];
    opcoesTacha: OpcaoSelect[];
    onChange: (campo: string, valor: string) => void;
    onClickIcon?: () => void;
}


const BlocoDivUnidVariavel: React.FC<BlocoDivVariavelProps> = ({ label, valorX, valorY, valorZ, tipoTacha, qtdTacha, opcoesLargura, opcoesTacha, onChange, onClickIcon }) => {

    const handleInputChangeNumeric = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    };

    return (
        <div className='grupo'>
            <div className='tituloDaDivBloco'>
                <label  className='quadro'>{label}:</label>
                <svg onClick={onClickIcon} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M9.354 8l3.823-3.823a.5.5 0 1 0-.708-.708L8.646 7.293 4.823 3.47a.5.5 0 1 0-.708.708L7.938 8l-3.823 3.823a.5.5 0 1 0 .708.708L8.646 8.707l3.823 3.823a.5.5 0 1 0 .708-.708L9.354 8z" strokeWidth="2" />
                </svg>
            </div>
            <div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Largura:</div>
                    <select
                        className={`${(!valorX) ? 'border-white' : ''}
                                    ${(valorX) ? 'border-green' : ''}`}
                        value={valorX}
                        onChange={(e) => onChange('X', e.target.value)}>
                        {opcoesLargura.map((opcao) => (
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
                        className={`${(!valorZ) ? 'border-white' : ''}
                                    ${(valorZ) ? 'border-green' : ''}`}
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
