import { useState, useEffect } from 'react';
import { ICampos } from '../../types/calcConsumo.types';
import { useCalculos } from '../../hooks/useCalculos';
import { StorageService } from '../../services/StorageService';
import { InputField } from '../../components/InputField';
import { PageTitle } from '../../components/PageTitle';
import { isDevelopment } from '../../utils/devUtils';
import './calcConsumo.css';
import '../../styles/shared.css';

const TabelaConsumo = () => {
    const [larguraDaJanela, setLarguraDaJanela] = useState(window.innerWidth);
    const [isFocused, setIsFocused] = useState('');
    const [editarEsferas, setEditarEsferas] = useState(false);
    const [editarTinta, setEditarTinta] = useState(false);

    const isDev = isDevelopment();
    const [campos, setCampos] = useState<ICampos>(StorageService.getInitialState(isDev));

    // Atualizador de cache
    useEffect(() => {
        Object.keys(campos).forEach((campo) => {
            StorageService.setItem(campo, campos[campo as keyof ICampos]);
        });
    }, [campos]);

    // Controle do tamanho da tela, para responsividade
    useEffect(() => {
        const handleResize = () => {
            setLarguraDaJanela(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // handler de valor geral
    const handleChange = (
        campo: keyof ICampos,
        valor: string
    ) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [campo]: valor,
        }));
    };

    // Controle se o campo está focado ou não
    const handleInputFocus = (inputName: string) => {
        setIsFocused(inputName);
    };

    const handleInputBlur = () => {
        setIsFocused('');
    };

    // Libera ou trava a edição no campo
    const handleEditEsfera = () => {
        setEditarEsferas(!editarEsferas);
    };

    const handleEditTinta = () => {
        setEditarTinta(!editarTinta);
    };

    // Cálculos
    const { resultadoEsferas, resultadoTinta } = useCalculos(campos);

    useEffect(() => {
        handleChange('resultadoEsferas', resultadoEsferas);
        handleChange('resultadoTinta', resultadoTinta);
    }, [resultadoEsferas, resultadoTinta]);

    // Controle de tema (temporário - usando detecção manual)
    const isDark = document.documentElement.getAttribute('theme') === 'dark';
    const corDoSVG = isDark ? 'white' : 'hsl(300, 1%, 30%)';

    return (
        <div className="calc-consumo-container">
            <PageTitle title="Cálculo de Consumo" />
            
            {/* Primeiro quadro - Total m² */}
            <div className="quadro-consumo">
                <div className="p-2 flex flex-col w-full">
                    <InputField
                        label="📐 Total m²:"
                        value={campos.totalMetrosPista}
                        name="totalMetrosPista"
                        onChange={handleChange}
                        readOnly
                    />
                </div>
            </div>

            {/* Segundo quadro - Cálculos */}
            <div className="quadro-consumo m-4">
                <div className="p-2 flex flex-col w-full">
                    {larguraDaJanela <= 900 ? (
                        // Layout mobile - estrutura em cards verticais
                        <div className="flex flex-col space-y-4">
                            {/* Card Esfera */}
                            <div className="flex flex-col space-y-2">
                                <div className="w-full">
                                    <InputField
                                        label="⚪ Esfera(kg):"
                                        value={campos.esfera}
                                        name="esfera"
                                        onChange={handleChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        isFocused={isFocused === 'esfera'}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1">
                                        <InputField
                                            label="📊 Resultado(kg/m²):"
                                            value={campos.resultadoEsferas}
                                            name="resultadoEsferas"
                                            onChange={handleChange}
                                            readOnly={!editarEsferas}
                                            isFocused={editarEsferas}
                                        />
                                    </div>
                                    <div className="w-12 flex justify-center">
                                        <div
                                            className={`cursor-pointer flex items-center ${editarEsferas ? 'text-blue-500' : ''}`}
                                            onClick={handleEditEsfera}
                                        >
                                            <svg className='svgHabilitarEdicao' viewBox="-13 0 32 32" version="1.1">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
                                                        <g id="svgCanetaEditar" transform="translate(-583.000000, -101.000000)" fill={editarEsferas ? '#ffcc29' : corDoSVG}>
                                                            <path d="M583,123 L589,123 L589,110 L583,110 L583,123 Z M586,133.009 L589,125 L583,125 L586,133.009 L586,133.009 Z M587,101 L585,101 C583.367,100.963 582.947,101.841 583,103 L583,108 L589,108 L589,103 C589.007,101.788 588.635,101.008 587,101 L587,101 Z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Tinta */}
                            <div className="flex flex-col space-y-2">
                                <div className="w-full">
                                    <InputField
                                        label="🎨 Tinta(baldes):"
                                        value={campos.tinta}
                                        name="tinta"
                                        onChange={handleChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        isFocused={isFocused === 'tinta'}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1">
                                        <InputField
                                            label="📊 Resultado(m²/balde):"
                                            value={campos.resultadoTinta}
                                            name="resultadoTinta"
                                            onChange={handleChange}
                                            readOnly={!editarTinta}
                                            isFocused={editarTinta}
                                        />
                                    </div>
                                    <div className="w-12 flex justify-center">
                                        <div
                                            className={`cursor-pointer flex items-center ${editarTinta ? 'text-blue-500' : ''}`}
                                            onClick={handleEditTinta}
                                        >
                                            <svg className='svgHabilitarEdicao' viewBox="-13 0 32 32" version="1.1">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
                                                        <g id="svgCanetaEditar" transform="translate(-583.000000, -101.000000)" fill={editarTinta ? '#ffcc29' : corDoSVG}>
                                                            <path d="M583,123 L589,123 L589,110 L583,110 L583,123 Z M586,133.009 L589,125 L583,125 L586,133.009 L586,133.009 Z M587,101 L585,101 C583.367,100.963 582.947,101.841 583,103 L583,108 L589,108 L589,103 C589.007,101.788 588.635,101.008 587,101 L587,101 Z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Layout desktop - tabela tradicional
                        <table className="tabela2TelaGrande w-full border-collapse">
                            <tbody>
                                <tr>
                                    <td>
                                        <InputField
                                            label="⚪ Esfera(kg):"
                                            value={campos.esfera}
                                            name="esfera"
                                            onChange={handleChange}
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            isFocused={isFocused === 'esfera'}
                                        />
                                    </td>
                                    <td className="flex items-center">
                                        <div className="w-4/5 pr-2">
                                            <InputField
                                                label="📊 Resultado(kg/m²):"
                                                value={campos.resultadoEsferas}
                                                name="resultadoEsferas"
                                                onChange={handleChange}
                                                readOnly={!editarEsferas}
                                                isFocused={editarEsferas}
                                            />
                                        </div>
                                        <div className="teceiroQuadroHabilitarEdicao w-1/5">
                                            <div
                                                className={`cursor-pointer flex items-center ${editarEsferas ? 'text-blue-500' : ''}`}
                                                onClick={handleEditEsfera}
                                            >
                                                <svg className='svgHabilitarEdicao' viewBox="-13 0 32 32" version="1.1">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
                                                            <g id="svgCanetaEditar" transform="translate(-583.000000, -101.000000)" fill={editarEsferas ? '#ffcc29' : corDoSVG}>
                                                                <path d="M583,123 L589,123 L589,110 L583,110 L583,123 Z M586,133.009 L589,125 L583,125 L586,133.009 L586,133.009 Z M587,101 L585,101 C583.367,100.963 582.947,101.841 583,103 L583,108 L589,108 L589,103 C589.007,101.788 588.635,101.008 587,101 L587,101 Z"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <InputField
                                            label="🎨 Tinta(baldes):"
                                            value={campos.tinta}
                                            name="tinta"
                                            onChange={handleChange}
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            isFocused={isFocused === 'tinta'}
                                        />
                                    </td>
                                    <td className="flex items-center">
                                        <div className="w-4/5 pr-2">
                                            <InputField
                                                label="📊 Resultado(m²/balde):"
                                                value={campos.resultadoTinta}
                                                name="resultadoTinta"
                                                onChange={handleChange}
                                                readOnly={!editarTinta}
                                                isFocused={editarTinta}
                                            />
                                        </div>
                                        <div className="teceiroQuadroHabilitarEdicao w-1/5">
                                            <div
                                                className={`flex items-center ${editarTinta ? 'text-blue-500' : ''}`}
                                                onClick={handleEditTinta}
                                            >
                                                <svg className='svgHabilitarEdicao' viewBox="-13 0 32 32" version="1.1">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
                                                            <g id="svgCanetaEditar" transform="translate(-583.000000, -101.000000)" fill={editarTinta ? '#ffcc29' : corDoSVG}>
                                                                <path d="M583,123 L589,123 L589,110 L583,110 L583,123 Z M586,133.009 L589,125 L583,125 L586,133.009 L586,133.009 Z M587,101 L585,101 C583.367,100.963 582.947,101.841 583,103 L583,108 L589,108 L589,103 C589.007,101.788 588.635,101.008 587,101 L587,101 Z"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TabelaConsumo;
