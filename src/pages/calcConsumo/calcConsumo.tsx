import { useState, useEffect } from 'react';

import './calcConsumo.css'

const TabelaConsumo = () => {

    // ---------------------------------------------------------------------------------------------
    // Variáveis da página
    // --------------------------------------------------------------------------------------------
    const [isFocused, setIsFocused] = useState('');

    const [editarEsferas, setEditarEsferas] = useState(false);
    const [editarTinta, setEditarTinta] = useState(false);

    const initialState = {
        estado: localStorage.getItem('estado') || '',
        equipe: localStorage.getItem('equipe') || '',
        nomeEstrada: localStorage.getItem('nomeEstrada') || '',
        kmInicial: localStorage.getItem('kmInicial') || '',
        diaMesAno: localStorage.getItem('diaMesAno') || '',
        kmFinal: localStorage.getItem('kmFinal') || '',
        esquerdoX: localStorage.getItem('esquerdoX') || '',
        esquerdoY: localStorage.getItem('esquerdoY') || '',
        esquerdoZ: localStorage.getItem('esquerdoZ') || '',
        esquerdoTipoTacha: localStorage.getItem('esquerdoTipoTacha') || '',
        esquerdoQtdTacha: localStorage.getItem('esquerdoQtdTacha') || '',
        direitoX: localStorage.getItem('direitoX') || '',
        direitoY: localStorage.getItem('direitoY') || '',
        direitoZ: localStorage.getItem('direitoZ') || '',
        direitoTipoTacha: localStorage.getItem('direitoTipoTacha') || '',
        direitoQtdTacha: localStorage.getItem('direitoQtdTacha') || '',
        eixo4x4X: localStorage.getItem('eixo4x4X') || '',
        eixo4x4Y: localStorage.getItem('eixo4x4Y') || '',
        eixo4x4Z: localStorage.getItem('eixo4x4Z') || '',
        eixo4x4TipoTacha: localStorage.getItem('eixo4x4TipoTacha') || '',
        eixo4x4QtdTacha: localStorage.getItem('eixo4x4QtdTacha') || '',
        eixo2x2X: localStorage.getItem('eixo2x2X') || '',
        eixo2x2Y: localStorage.getItem('eixo2x2Y') || '',
        eixo2x2Z: localStorage.getItem('eixo2x2Z') || '',
        eixo2x2TipoTacha: localStorage.getItem('eixo2x2TipoTacha') || '',
        eixo2x2QtdTacha: localStorage.getItem('eixo2x2QtdTacha') || '',
        alcaX: localStorage.getItem('alcaX') || '',
        alcaY: localStorage.getItem('alcaY') || '',
        alcaZ: localStorage.getItem('alcaZ') || '',
        alcaTipoTacha: localStorage.getItem('alcaTipoTacha') || '',
        alcaQtdTacha: localStorage.getItem('alcaQtdTacha') || '',
        totalMetrosPista: localStorage.getItem('totalMetrosPista') || '',
        esfera: localStorage.getItem('esfera') || '',
        resultadoEsferas: localStorage.getItem('resultadoEsferas') || '',
        tinta: localStorage.getItem('tinta') || '',
        resultadoTinta: localStorage.getItem('resultadoTinta') || '',
        remocao: localStorage.getItem('remocao') || '',
    };

    const [campos, setCampos] = useState(initialState);

    // ---------------------------------------------------------------------------------------------
    // Handlers 
    // ---------------------------------------------------------------------------------------------

    // Atualizador de cache
    useEffect(() => {
        Object.keys(campos).forEach((campo) => {
            if (campo in campos) {
                localStorage.setItem(campo, campos[campo as keyof typeof campos]);
                // Usa a asserção de tipo para informar ao TypeScript que campo é uma chave válida de campos
            }
        });
    }, [campos]);

    // handler de valor geral
    const handleChange = (
        campo: keyof typeof campos,
        valor: string | boolean
    ) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [campo]: valor,
        }));
    };

    // Controle se o campo está focado ou não.
    const handleInputFocus = (inputName: string) => {
        //console.log(inputName);
        setIsFocused(inputName);
    };

    const handleInputBlur = () => {
        setIsFocused('');
    };

    // Libera ou trava a edição no campo
    const handleEditEsfera = () => {
        setEditarEsferas(!editarEsferas);
    };
    // Libera ou trava a edição no campo
    const handleEditTinta = () => {
        setEditarTinta(!editarTinta);
    };

    useEffect(() => {
        calcularResultadoEsferas();
        calcularResultadoTinta();
    }, [campos.esfera, campos.tinta]);


    // ---------------------------------------------------------------------------------------------
    // Controle de tema
    // ---------------------------------------------------------------------------------------------

    const calcularResultadoEsferas = () => {

        // Função para verificar se é NaN e atribuir 0 se for
        const handleNaN = (value: number) => isNaN(value) ? 0 : value;

        // Aplicar a função para cada variável
        const direitoZNumber = handleNaN(parseFloat(campos.direitoZ));
        const esquerdoZNumber = handleNaN(parseFloat(campos.esquerdoZ));
        const eixo2x2ZNumber = handleNaN(parseFloat(campos.eixo2x2Z));
        const eixo4x4ZNumber = handleNaN(parseFloat(campos.eixo4x4Z));
        const alcaZNumber = handleNaN(parseFloat(campos.alcaZ));
        const esferaNumber = handleNaN(parseFloat(campos.esfera));

        const denominador =
            direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x4ZNumber + alcaZNumber;

        if (denominador === 0 || esferaNumber === 0) {
            handleChange('resultadoEsferas', '');
            return;
        }

        const resultado = esferaNumber / denominador;
        const roundedResultado = Math.ceil(resultado * 100) / 100;
        handleChange('resultadoEsferas', roundedResultado.toString());
    };

    // Calcula resultado de tinta
    const calcularResultadoTinta = () => {
        // Função para verificar se é NaN e atribuir 0 se for
        const handleNaN = (value: number) => isNaN(value) ? 0 : value;

        // Aplicar a função para cada variável
        const direitoZNumber = handleNaN(parseFloat(campos.direitoZ));
        const esquerdoZNumber = handleNaN(parseFloat(campos.esquerdoZ));
        const eixo2x2ZNumber = handleNaN(parseFloat(campos.eixo2x2Z));
        const eixo4x4ZNumber = handleNaN(parseFloat(campos.eixo4x4Z));
        const alcaZNumber = handleNaN(parseFloat(campos.alcaZ));
        const tintaNumber = handleNaN(parseFloat(campos.tinta));

        const numerador =
            direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x4ZNumber + alcaZNumber;

        if (tintaNumber === 0) {
            handleChange('resultadoTinta', '');
            return;
        }

        const resultado = numerador / tintaNumber;
        const roundedResultado = Math.ceil(resultado * 100) / 100;
        handleChange('resultadoTinta', roundedResultado.toString());
    };

    // ---------------------------------------------------------------------------------------------
    // Controle de tema
    // ---------------------------------------------------------------------------------------------
    const theme = document.documentElement.getAttribute('theme');
    const corDoSVG = theme == 'dark' ? 'white' : 'hsl(300, 1%, 30%)';

    // ---------------------------------------------------------------------------------------------
    // Pagina
    // ---------------------------------------------------------------------------------------------


    return (
        /* Quadro de consumo */
        <div>
            <div className="quadro-consumo m-4" >
                <div className="p-2 flex flex-col w-full">
                    <label className={`input-label ${campos.remocao ? 'input-label-active' : (isFocused == 'remocao' ? 'input-label-focus' : 'input-label-inactive')}`}>
                        Total m²:
                    </label>
                    <input
                        readOnly
                        value={campos.totalMetrosPista} />
                </div>
            </div>

            <div className="quadro-consumo m-4" >
                <div className="p-2 flex flex-col w-full">
                    <table className="tabela2TelaGrande w-full border-collapse">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="interacaoBox flex flex-col lg:mr-2">
                                        <label className={`input-label ${campos.esfera ? 'input-label-active' : (isFocused == 'esfera' ? 'input-label-focus' : 'input-label-inactive')}`}>
                                            Esfera(kg):
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={campos.esfera}
                                            onChange={(e) => handleChange('esfera', e.target.value)}
                                            onFocus={() => handleInputFocus('esfera')}
                                            onBlur={handleInputBlur}
                                        />
                                    </div>
                                </td>
                                <td className="flex items-center">
                                    <div className="w-4/5 pr-2">
                                        <div className="interacaoBox flex flex-col lg:mr-2">
                                            <label className={`input-label ${editarEsferas ? 'input-label-focus' : (campos.resultadoEsferas ? 'input-label-active' : 'input-label-inactive')}`}>
                                                Resultado(kg/m²):
                                            </label>
                                            <input
                                                type="text"
                                                placeholder=' '
                                                className={`
                                                    ${editarEsferas ? 'border-yellow' : (campos.resultadoEsferas ? 'border-green' : 'border-white')}
                                                `}
                                                readOnly={!editarEsferas}
                                                value={campos.resultadoEsferas}
                                                onChange={(e) => handleChange('resultadoEsferas', e.target.value)}
                                            />
                                        </div>
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
                                    <div className="interacaoBox flex flex-col lg:mr-2">
                                        <label className={`input-label ${campos.tinta ? 'input-label-active' : (isFocused == 'tinta' ? 'input-label-focus' : 'input-label-inactive')}`}>
                                            Tinta(baldes):
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={campos.tinta}
                                            onChange={(e) => handleChange('tinta', e.target.value)}
                                            onFocus={() => handleInputFocus('tinta')}
                                            onBlur={handleInputBlur}
                                        />
                                    </div>
                                </td>
                                <td className="flex items-center">
                                    <div className="w-4/5 pr-2">
                                        <div className="interacaoBox flex flex-col lg:mr-2">
                                            <label className={`input-label ${editarTinta ? 'input-label-focus' : (campos.resultadoTinta ? 'input-label-active' : 'input-label-inactive')}`}>
                                                Resultado(m²/balde):
                                            </label>
                                            <input
                                                type="text"
                                                placeholder=' '
                                                className={`
                                                    ${editarTinta ? 'border-yellow' : (campos.resultadoTinta ? 'border-green' : 'border-white')}
                                                `}
                                                readOnly={!editarTinta}
                                                value={campos.resultadoTinta}
                                                onChange={(e) => handleChange('resultadoTinta', e.target.value)}
                                            />
                                        </div>
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
                </div>
            </div >
        </div >
    )

}

export default TabelaConsumo;