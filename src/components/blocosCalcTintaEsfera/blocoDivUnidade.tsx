import React from 'react';
import { SVInputField, SVSelectField } from '../ui';
import { ResultDisplay } from '../calculation/CalculationComponents';
import '../../styles/shared.css';

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
                    <SVSelectField
                        value={valorX}
                        onChange={(e) => onChange('X', e.target.value)}
                        options={opcoesLargura.map(opcao => ({
                            value: opcao.valor,
                            label: opcao.label
                        }))}
                    />
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Unidades:</div>
                    <SVInputField
                        value={valorY}
                        onChange={(e) => onChange('Y', handleInputChangeNumeric(e.target.value))}
                        variant="calculation"
                        placeholder=" "
                    />
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Resultado(m²):</div>
                    <div className='resultado-input-container'>
                        <ResultDisplay
                            label=""
                            value={valorZ}
                            unit="m²"
                            editable={true}
                            onEdit={(newValue) => onChange('Z', newValue)}
                        />
                    </div>
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Tipo de tacha:</div>
                    <SVSelectField
                        value={tipoTacha}
                        onChange={(e) => onChange('TipoTacha', e.target.value)}
                        options={opcoesTacha.map(opcao => ({
                            value: opcao.valor,
                            label: opcao.label
                        }))}
                    />
                </div>
                <div className='bloco'>
                    <div className='texto-a-direita quadro'>Quantidade de tacha:</div>
                    <SVInputField
                        value={qtdTacha}
                        onChange={(e) => onChange('QtdTacha', handleInputChangeNumeric(e.target.value))}
                        variant="calculation"
                        placeholder=" "
                    />
                </div>
            </div>
        </div>
    );
};

export default BlocoDivUnidVariavel;
