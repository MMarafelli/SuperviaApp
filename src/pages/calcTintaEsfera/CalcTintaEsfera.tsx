// Formulario.jsmonodirecional
import { useRef, useState, useEffect } from 'react';
import './CalcTintaEsfera.css';
import { format } from 'date-fns';

import BlocoDivVariavel from '../../components/blocosCalcTintaEsfera/blocoDiv'
import BlocoTrVariavel from '../../components/blocosCalcTintaEsfera/blocoTr'

const Formulario = () => {

    // ---------------------------------------------------------------------------------------------
    // Variáveis da página
    // --------------------------------------------------------------------------------------------
    const [larguraDaJanela, setLarguraDaJanela] = useState(window.innerWidth);
    const [isFocused, setIsFocused] = useState('');
    const [mostrarConteudo, setMostrarConteudo] = useState(false);
    const [editarEsferas, setEditarEsferas] = useState(false);
    const [editarTinta, setEditarTinta] = useState(false);
    const [levantamento, setLevantamento] = useState('');

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
        esfera: localStorage.getItem('esfera') || '',
        resultadoEsferas: localStorage.getItem('resultadoEsferas') || '',
        tinta: localStorage.getItem('tinta') || '',
        resultadoTinta: localStorage.getItem('resultadoTinta') || '',
    };

    const [campos, setCampos] = useState(initialState);

    // ---------------------------------------------------------------------------------------------
    // Handlers
    // --------------------------------------------------------------------------------------------

    //Controle do tamanho da tela, para responsividade
    useEffect(() => {
        const handleResize = () => {
            setLarguraDaJanela(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    // 
    useEffect(() => {
        parXeY('direito');
    }, [campos.direitoX, campos.direitoY]);

    useEffect(() => {
        parXeY('esquerdo');
    }, [campos.esquerdoX, campos.esquerdoY]);

    useEffect(() => {
        parXeY('eixo4x4');
    }, [campos.eixo4x4X, campos.eixo4x4Y]);

    useEffect(() => {
        parXeY('eixo2x2');
    }, [campos.eixo2x2X, campos.eixo2x2Y]);

    useEffect(() => {
        parXeY('alca');
    }, [campos.alcaX, campos.alcaY]);

    useEffect(() => {
        calcularResultadoEsferas();
        calcularResultadoTinta();
    }, [campos.direitoZ, campos.esquerdoZ, campos.eixo4x4Z, campos.eixo2x2Z, campos.alcaZ, campos.esfera, campos.tinta]);

    // Libera ou trava a edição no campo
    const handleEditEsfera = () => {
        setEditarEsferas(!editarEsferas);
    };
    // Libera ou trava a edição no campo
    const handleEditTinta = () => {
        setEditarTinta(!editarTinta);
    };

    // Controle se o campo está focado ou não.
    const handleInputFocus = (inputName: string) => {
        //console.log(inputName);
        setIsFocused(inputName);
    };

    const handleInputBlur = () => {
        setIsFocused('');
    };

    // ---------------------------------------------------------------------------------------------
    // Controle de input
    // ---------------------------------------------------------------------------------------------

    // opções de espeçura da faixa
    const opcoesDeSelectEspessura = [
        { valor: '', label: 'Selecione...' },
        { valor: '0.10', label: '0.10' },
        { valor: '0.15', label: '0.15' },
    ];

    // opções de espeçura da tacha
    const opcoesDeSelectTacha = [
        { valor: '', label: 'Selecione...' },
        { valor: 'Tacha monodirecional', label: 'Tacha monodirecional' },
        { valor: 'Tacha bidirecional', label: 'Tacha bidirecional' },
        { valor: 'Tachão monodirecional', label: 'Tachão monodirecional ' },
        { valor: 'Tachão bidirecional', label: 'Tachão bidirecional' },
    ];

    // ---------------------------------------------------------------------------------------------
    // Calculos
    // ---------------------------------------------------------------------------------------------


    //Pega o par X e Y correto em cache para o cálculo de M2.
    const parXeY = (campo: string) => {
        const campoX = campo + 'X';
        const campoY = campo + 'Y';
        const x = parseFloat(campos[campoX as keyof typeof campos] as string) || 0;
        const y = parseFloat(campos[campoY as keyof typeof campos] as string) || 0;

        let valorZ = calcularM2(x.toString(), y.toString()).toString();
        if (valorZ == '0') {
            valorZ = '';
        }

        const campoZ = campo + 'Z';
        handleChange(campoZ as keyof typeof campos, valorZ)
    }

    // Calcula metro quadro para a tabela 
    const calcularM2 = (x: string, y: string): number => {
        const xNumber = parseFloat(x);
        const yNumber = parseFloat(y);

        if (isNaN(xNumber) || isNaN(yNumber)) {
            return 0; // ou outra lógica apropriada se os valores não forem números válidos
        }

        const result = xNumber * yNumber;
        const roundedResult = Math.ceil(result * 100) / 100; // Arredonda para cima com duas casas decimais
        return roundedResult;
    };

    const calcularResultadoEsferas = () => {
        let direitoZNumber = parseFloat(campos.direitoZ);
        let esquerdoZNumber = parseFloat(campos.esquerdoZ);
        let eixo2x2ZNumber = parseFloat(campos.eixo2x2Z);
        let eixo4x4ZNumber = parseFloat(campos.eixo4x4Z);
        let alcaZNumber = parseFloat(campos.alcaZ);
        let esferaNumber = parseFloat(campos.esfera);

        // Função para verificar se é NaN e atribuir 0 se for
        const handleNaN = (value: number) => isNaN(value) ? 0 : value;

        // Aplicar a função para cada variável
        direitoZNumber = handleNaN(direitoZNumber);
        esquerdoZNumber = handleNaN(esquerdoZNumber);
        eixo2x2ZNumber = handleNaN(eixo2x2ZNumber);
        eixo4x4ZNumber = handleNaN(eixo4x4ZNumber);
        alcaZNumber = handleNaN(alcaZNumber);
        esferaNumber = handleNaN(esferaNumber);

        const denominador =
            direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x4ZNumber + alcaZNumber;

        if (denominador === 0) {
            handleChange('resultadoEsferas', '');
            return;
        }

        const resultado = esferaNumber / denominador;
        const roundedResultado = Math.ceil(resultado * 100) / 100;
        handleChange('resultadoEsferas', roundedResultado.toString());
    };

    // Calcula resultado de tinta
    const calcularResultadoTinta = () => {
        let direitoZNumber = parseFloat(campos.direitoZ);
        let esquerdoZNumber = parseFloat(campos.esquerdoZ);
        let eixo2x2ZNumber = parseFloat(campos.eixo2x2Z);
        let eixo4x4ZNumber = parseFloat(campos.eixo4x4Z);
        let alcaZNumber = parseFloat(campos.alcaZ);
        let tintaNumber = parseFloat(campos.tinta);

        // Função para verificar se é NaN e atribuir 0 se for
        const handleNaN = (value: number) => isNaN(value) ? 0 : value;

        // Aplicar a função para cada variável
        direitoZNumber = handleNaN(direitoZNumber);
        esquerdoZNumber = handleNaN(esquerdoZNumber);
        eixo2x2ZNumber = handleNaN(eixo2x2ZNumber);
        eixo4x4ZNumber = handleNaN(eixo4x4ZNumber);
        alcaZNumber = handleNaN(alcaZNumber);
        tintaNumber = handleNaN(tintaNumber);

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
    // Gerar texto do levantamento
    // ---------------------------------------------------------------------------------------------
    const gerarLevantamento = () => {
        let textoLevantamento = ``;
        if (campos.diaMesAno && campos.diaMesAno != '') {
            textoLevantamento += `BR050 - MG - ${format(new Date(campos.diaMesAno), 'dd/MM/yyyy')}\n\n`
            textoLevantamento += `Trecho: KM ${campos.kmInicial || '0'} ao KM ${campos.kmFinal || '0'} / Equipe: ${campos.equipe}\n\n`;
        }

        // Pintura Automática Definitiva
        if ((campos.direitoZ && campos.direitoZ != '0')
            || (campos.esquerdoZ && campos.esquerdoZ != '0')
            || (campos.eixo4x4Z && campos.eixo4x4Z != '0')
            || (campos.eixo2x2Z && campos.eixo2x2Z != '0')
            || (campos.alcaZ && campos.alcaZ != '0')
            || (campos.esfera && campos.esfera != '0')
            || (campos.tinta && campos.tinta != '0')) {
            textoLevantamento += `*Pintura Automática Definitiva*\n`;

            if (campos.direitoZ && campos.direitoZ != '0') textoLevantamento += `\u00A0\u00A0\u00A0\u00A0\u00A0Bordo direito: ${campos.direitoZ} metros\n`;
            if (campos.esquerdoZ && campos.esquerdoZ != '0') textoLevantamento += `Bordo esquerdo: ${campos.esquerdoZ} metros\n`;
            if (campos.eixo4x4Z && campos.eixo4x4Z != '0') textoLevantamento += `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Eixo 4x4: ${campos.eixo4x4Z} unidades\n`;
            if (campos.eixo2x2Z && campos.eixo2x2Z != '0') textoLevantamento += `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Eixo 2X2: ${campos.eixo2x2Z} unidades\n`;
            if (campos.alcaZ && campos.alcaZ != '0') textoLevantamento += `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Alça: ${campos.alcaZ} unidades\n`;
            /*             if (campos.esfera && campos.esfera != '0') textoLevantamento += `Esfera(Kg): ${campos.esfera}\n`;
                        if (campos.tinta && campos.tinta != '0') textoLevantamento += `Tinta (baldes): ${campos.tinta}\n`; */
        }

        // Implantação de Tachas monodirecional
        if ((campos.direitoTipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha)
            || (campos.eixo4x4TipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha)
            || (campos.alcaTipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha)) {
            textoLevantamento += `
                 **Implantação de Tachas Monodirecionais**
                 `;

            if (campos.direitoTipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha) textoLevantamento += `**BORDO DIREITO :  ${campos.direitoQtdTacha} unidades**\n`;
            if (campos.esquerdoTipoTacha == 'Tacha monodirecional' && campos.esquerdoQtdTacha) textoLevantamento += `**BORDO ESQUERDO : ${campos.esquerdoQtdTacha} unidades**\n`;
            if (campos.eixo4x4TipoTacha == 'Tacha monodirecional' && campos.eixo4x4QtdTacha) textoLevantamento += `**EIXO 4x4 : ${campos.eixo4x4QtdTacha} unidades**\n`;
            if (campos.eixo2x2TipoTacha == 'Tacha monodirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `**Eixo 2X2 : ${campos.eixo2x2QtdTacha} unidades**\n`;
            if (campos.alcaTipoTacha == 'Tacha monodirecional' && campos.alcaQtdTacha) textoLevantamento += `**Alça : ${campos.alcaQtdTacha} unidades**\n`;
        }

        // Implantação de Tacha bidirecional
        if ((campos.direitoTipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha)
            || (campos.eixo4x4TipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha)
            || (campos.alcaTipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha)) {
            textoLevantamento += `
                     **Implantação de Tachas bidirecionais**
                     `;

            if (campos.direitoTipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha) textoLevantamento += `**BORDO DIREITO :  ${campos.direitoQtdTacha} unidades**\n`;
            if (campos.esquerdoTipoTacha == 'Tacha bidirecional' && campos.esquerdoQtdTacha) textoLevantamento += `**BORDO ESQUERDO : ${campos.esquerdoQtdTacha} unidades**\n`;
            if (campos.eixo4x4TipoTacha == 'Tacha bidirecional' && campos.eixo4x4QtdTacha) textoLevantamento += `**EIXO 4x4 : ${campos.eixo4x4QtdTacha} unidades**\n`;
            if (campos.eixo2x2TipoTacha == 'Tacha bidirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `**Eixo 2X2 : ${campos.eixo2x2QtdTacha} unidades**\n`;
            if (campos.alcaTipoTacha == 'Tacha bidirecional' && campos.alcaQtdTacha) textoLevantamento += `**Alça : ${campos.alcaQtdTacha} unidades**\n`;
        }

        // Implantação de Tachão monodirecional
        if ((campos.direitoTipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha)
            || (campos.eixo4x4TipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha)
            || (campos.alcaTipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha)) {
            textoLevantamento += `
                         **Implantação de Tachões monodirecionais**
                         `;

            if (campos.direitoTipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha) textoLevantamento += `**BORDO DIREITO :  ${campos.direitoQtdTacha} unidades**\n`;
            if (campos.esquerdoTipoTacha == 'Tachão monodirecional' && campos.esquerdoQtdTacha) textoLevantamento += `**BORDO ESQUERDO : ${campos.esquerdoQtdTacha} unidades**\n`;
            if (campos.eixo4x4TipoTacha == 'Tachão monodirecional' && campos.eixo4x4QtdTacha) textoLevantamento += `**EIXO 4x4 : ${campos.eixo4x4QtdTacha} unidades**\n`;
            if (campos.eixo2x2TipoTacha == 'Tachão monodirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `**Eixo 2X2 : ${campos.eixo2x2QtdTacha} unidades**\n`;
            if (campos.alcaTipoTacha == 'Tachão monodirecional' && campos.alcaQtdTacha) textoLevantamento += `**Alça : ${campos.alcaQtdTacha} unidades**\n`;
        }

        // Implantação de Tachão bidirecional
        if ((campos.direitoTipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha)
            || (campos.eixo4x4TipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha)
            || (campos.alcaTipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha)) {
            textoLevantamento += `
                             **Implantação de Tachões Bidirecionais**
                             `;

            if (campos.direitoTipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha) textoLevantamento += `**BORDO DIREITO :  ${campos.direitoQtdTacha} unidades**\n`;
            if (campos.esquerdoTipoTacha == 'Tachão bidirecional' && campos.esquerdoQtdTacha) textoLevantamento += `**BORDO ESQUERDO : ${campos.esquerdoQtdTacha} unidades**\n`;
            if (campos.eixo4x4TipoTacha == 'Tachão bidirecional' && campos.eixo4x4QtdTacha) textoLevantamento += `**EIXO 4x4 : ${campos.eixo4x4QtdTacha} unidades**\n`;
            if (campos.eixo2x2TipoTacha == 'Tachão bidirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `**Eixo 2X2 : ${campos.eixo2x2QtdTacha} unidades**\n`;
            if (campos.alcaTipoTacha == 'Tachão bidirecional' && campos.alcaQtdTacha) textoLevantamento += `**Alça : ${campos.alcaQtdTacha} unidades**\n`;
        }

        // Remoção
        textoLevantamento += `**REMOÇÃO : 00 unidades**\n`;

        if (textoLevantamento == '') {
            textoLevantamento = 'Favor preencher os campos do formulário';
        }
        //console.log(textoLevantamento)
        setLevantamento(textoLevantamento);
    };


    // ---------------------------------------------------------------------------------------------
    // Controle do compatilhamento
    // ---------------------------------------------------------------------------------------------
    const compartilharTexto = () => {
        if (levantamento && levantamento != 'Favor preencher os campos do formulário' && navigator.share) {
            navigator.share({
                title: 'Compartilhar Levantamento',
                text: levantamento,
            })
                .then(() => console.log('Levantamento compartilhado com sucesso!'))
                .catch((error) => console.error('Erro ao compartilhar levantamento:', error));
        } else if (!levantamento || levantamento == 'Favor preencher os campos do formulário') {
            alert('O levantamento precisa ser gerado antes de compartilhar.');
        } else {
            alert('A funcionalidade de compartilhamento não é suportada neste navegador.');
        }
    };

    // Verifica se levantamento é verdadeiro e se a referência existe
    const levantamentoRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Verifica se levantamento é verdadeiro e se a referência existe
        if (levantamento && levantamentoRef.current) {
            levantamentoRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [levantamento]);

    // ---------------------------------------------------------------------------------------------
    // Reset
    // ---------------------------------------------------------------------------------------------

    const resetarFormulario = () => {
        const initialState = {
            estado: '',
            equipe: '',
            nomeEstrada: '',
            kmInicial: '',
            diaMesAno: '',
            kmFinal: '',
            esquerdoX: '',
            esquerdoY: '',
            esquerdoZ: '',
            esquerdoTipoTacha: '',
            esquerdoQtdTacha: '',
            direitoX: '',
            direitoY: '',
            direitoZ: '',
            direitoTipoTacha: '',
            direitoQtdTacha: '',
            eixo4x4X: '',
            eixo4x4Y: '',
            eixo4x4Z: '',
            eixo4x4TipoTacha: '',
            eixo4x4QtdTacha: '',
            eixo2x2X: '',
            eixo2x2Y: '',
            eixo2x2Z: '',
            eixo2x2TipoTacha: '',
            eixo2x2QtdTacha: '',
            alcaX: '',
            alcaY: '',
            alcaZ: '',
            alcaTipoTacha: '',
            alcaQtdTacha: '',
            esfera: '',
            resultadoEsferas: '',
            tinta: '',
            resultadoTinta: '',
        };

        // Atualizar campos com os valores inciais.
        // O useeffect toma conta de atualizar o localStorage.
        setCampos(initialState);

        setIsFocused('');
        setMostrarConteudo(false);
        setEditarEsferas(false);
        setEditarTinta(false);
        setLevantamento('');
    };
    // ---------------------------------------------------------------------------------------------
    // Controle de tema
    // ---------------------------------------------------------------------------------------------
    const theme = document.documentElement.getAttribute('theme');
    const corDoSVG = theme == 'dark' ? 'white' : 'hsl(300, 1%, 30%)';

    return (
        <div>

            {/* Primeiro quadro */}
            <div className="primeiroQuadro p-2 m-4 mb-4 flex flex-col">

                <div className="inputsDoPrimeiroQuadro flex flex-col lg:flex-row lg:flex-wrap mt-2">

                    <div className="interacaoBox flex flex-col lg:mr-2 lg:w-1/5">
                        <label className={`input-label ${campos.nomeEstrada ? 'input-label-active' : (isFocused == 'nomeEstrada' ? 'input-label-focus' : 'input-label-inactive')}`}>
                            Estrada
                        </label>
                        <input
                            type="text"
                            placeholder=" "
                            value={campos.nomeEstrada}
                            onChange={(e) => handleChange('nomeEstrada', e.target.value)}
                            onFocus={() => handleInputFocus('nomeEstrada')}
                            onBlur={handleInputBlur}
                        />
                    </div>

                    <div className="interacaoBox flex flex-col lg:mr-2 lg:w-1/5">
                        <label className={`input-label ${campos.estado ? 'input-label-active' : (isFocused == 'estado' ? 'input-label-focus' : 'input-label-inactive')}`}>
                            Estado
                        </label>
                        <select
                            className={`
                            ${campos.estado ? 'input-label-active border-green' : (isFocused == 'estado' ? 'input-label-focus border-yellow' : 'input-label-inactive border-white')}
                        `}
                            value={campos.estado}
                            onChange={(e) => handleChange('estado', e.target.value)}
                            onFocus={() => handleInputFocus('estado')}
                            onBlur={handleInputBlur}
                        >
                            <option value=''>
                                Selecione um estado
                            </option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>

                    <div className="interacaoBox flex flex-col lg:mr-2 lg:w-1/5">
                        <label className={`input-label ${campos.diaMesAno ? 'input-label-active' : (isFocused == 'diaMesAno' ? 'input-label-focus' : 'input-label-inactive')}`}>
                            Data
                        </label>
                        <input
                            type="date"
                            className={`date-input 
                            ${campos.diaMesAno ? 'input-label-active border-green' : (isFocused == 'diaMesAno' ? 'input-label-focus border-yellow' : 'input-label-inactive border-white')}
                            `}
                            value={campos.diaMesAno}
                            onChange={(e) => handleChange('diaMesAno', e.target.value)}
                            onFocus={() => handleInputFocus('diaMesAno')}
                            onBlur={handleInputBlur}
                        />
                    </div>

                    <div className="interacaoBox flex flex-col lg:mr-2 lg:w-1/5">
                        <label className={`input-label ${campos.equipe ? 'input-label-active' : (isFocused == 'estado' ? 'input-label-focus' : 'input-label-inactive')}`}>
                            Equipe
                        </label>
                        <select
                            className={`
                            ${campos.equipe ? 'input-label-active border-green' : (isFocused == 'equipe' ? 'input-label-focus border-yellow' : 'input-label-inactive border-white')}
                        `}
                            value={campos.equipe}
                            onChange={(e) => handleChange('equipe', e.target.value)}
                            onFocus={() => handleInputFocus('equipe')}
                            onBlur={handleInputBlur}
                        >
                            <option value=''>
                                Selecione uma equipe
                            </option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                        </select>
                    </div>

                    <div className="interacaoBox flex flex-col lg:mr-2 lg:w-1/5">
                        <label className={`input-label ${campos.kmInicial ? 'input-label-active' : (isFocused == 'kmInicial' ? 'input-label-focus' : 'input-label-inactive')}`}>
                            Km inicial/Estaca inicial
                        </label>
                        <input
                            type="text"
                            placeholder=" "
                            value={campos.kmInicial}
                            onChange={(e) => handleChange('kmInicial', e.target.value)}
                            onFocus={() => handleInputFocus('kmInicial')}
                            onBlur={handleInputBlur}
                        />
                    </div>

                    <div className="interacaoBox flex flex-col lg:mr-2 lg:w-1/5">
                        <label className={`input-label ${campos.kmFinal ? 'input-label-active' : (isFocused == 'kmFinal' ? 'input-label-focus' : 'input-label-inactive')}`}>
                            Km final/Estaca final
                        </label>
                        <input
                            type="text"
                            placeholder=" "
                            value={campos.kmFinal}
                            onChange={(e) => handleChange('kmFinal', e.target.value)}
                            onFocus={() => handleInputFocus('kmFinal')}
                            onBlur={handleInputBlur}
                        />
                    </div>

                </div>
            </div>

            {/* Segundo quadro */}
            <div className="segundoQuadro  m-4">
                {larguraDaJanela <= 800 ? (
                    <>
                        <div className='divsSegundoQuadroTelaPequena'>

                            <BlocoDivVariavel
                                label="Bordo Direito"
                                valorX={campos.direitoX}
                                valorY={campos.direitoY}
                                valorZ={campos.direitoZ}
                                tipoTacha={campos.direitoTipoTacha}
                                qtdTacha={campos.direitoQtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'direito' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoDivVariavel
                                label="Bordo Esquerdo"
                                valorX={campos.esquerdoX}
                                valorY={campos.esquerdoY}
                                valorZ={campos.esquerdoZ}
                                tipoTacha={campos.esquerdoTipoTacha}
                                qtdTacha={campos.esquerdoQtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'esquerdo' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoDivVariavel
                                label="Eixo 4X4:"
                                valorX={campos.eixo4x4X}
                                valorY={campos.eixo4x4Y}
                                valorZ={campos.eixo4x4Z}
                                tipoTacha={campos.eixo4x4TipoTacha}
                                qtdTacha={campos.eixo4x4QtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo4x4' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoDivVariavel
                                label="Eixo 2X2:"
                                valorX={campos.eixo2x2X}
                                valorY={campos.eixo2x2Y}
                                valorZ={campos.eixo2x2Z}
                                tipoTacha={campos.eixo2x2TipoTacha}
                                qtdTacha={campos.eixo2x2QtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo2x2' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoDivVariavel
                                label="Alça:"
                                valorX={campos.alcaX}
                                valorY={campos.alcaY}
                                valorZ={campos.alcaZ}
                                tipoTacha={campos.alcaTipoTacha}
                                qtdTacha={campos.alcaQtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'alca' + campo as keyof typeof campos}`, valor)}
                            />
                        </div>

                    </>
                ) : (
                    <table className="tabela1TelaGrande w-full">
                        <thead>
                            <tr>
                                <th className="tdLegendaTelaGrande"></th>
                                <th className="tdLegendaTelaGrande">Espessura</th>
                                <th className="tdLegendaTelaGrande">Comprimento (m)</th>
                                <th className="tdLegendaTelaGrande">m²</th>
                                <th className="tdLegendaTelaGrande">Tipo de tacha</th>
                                <th className="tdLegendaTelaGrande">Quantidade de tachas</th>
                            </tr>
                        </thead>
                        <tbody>

                            <BlocoTrVariavel
                                label="Bordo Direito:"
                                valorX={campos.direitoX}
                                valorY={campos.direitoY}
                                valorZ={campos.direitoZ}
                                tipoTacha={campos.direitoTipoTacha}
                                qtdTacha={campos.direitoQtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'direito' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoTrVariavel
                                label="Bordo Esquerdo:"
                                valorX={campos.esquerdoX}
                                valorY={campos.esquerdoY}
                                valorZ={campos.esquerdoZ}
                                tipoTacha={campos.esquerdoTipoTacha}
                                qtdTacha={campos.esquerdoQtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'esquerdo' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoTrVariavel
                                label="Eixo 4X4:"
                                valorX={campos.eixo4x4X}
                                valorY={campos.eixo4x4Y}
                                valorZ={campos.eixo4x4Z}
                                tipoTacha={campos.eixo4x4TipoTacha}
                                qtdTacha={campos.eixo4x4QtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo4x4' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoTrVariavel
                                label="Eixo 2X2:"
                                valorX={campos.eixo2x2X}
                                valorY={campos.eixo2x2Y}
                                valorZ={campos.eixo2x2Z}
                                tipoTacha={campos.eixo2x2TipoTacha}
                                qtdTacha={campos.eixo2x2QtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo2x2' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoTrVariavel
                                label="Alça:"
                                valorX={campos.alcaX}
                                valorY={campos.alcaY}
                                valorZ={campos.alcaZ}
                                tipoTacha={campos.alcaTipoTacha}
                                qtdTacha={campos.alcaQtdTacha}
                                opcoesEspessura={opcoesDeSelectEspessura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'alca' + campo as keyof typeof campos}`, valor)}
                            />

                        </tbody>
                    </table>
                )}
            </div>

            {/* Terceiro quadro */}
            <div className="terceiroQuadro mx-4 mb-4">
                <div
                    className="colapsavelCursorPointer p-4 flex justify-between items-center transition-all duration-300"
                    onClick={() => setMostrarConteudo(!mostrarConteudo)}
                >
                    <label className="colapsavelCursorPointer text-lg font-bold mb-2 lg:mb-0 lg:mr-2 lg:w-full">Consumo</label>
                    <svg
                        className={`w-6 h-6 ${mostrarConteudo ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div className={`transition-all duration-300 overflow-hidden ${mostrarConteudo ? 'max-h-96' : 'max-h-0'}`}>
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
                </div>
            </div>

            {/* Botões */}
            <div className='quartoQuadro'>
                {/* Se levantamento existe, mostra a div */}
                {levantamento && (
                    <div className="levantamento mt-5 p-4 m-4" ref={levantamentoRef}>
                        <label className="text-lg font-bold">Levantamento Gerado:</label>
                        <pre className="mt-2 whitespace-pre-line">{levantamento}</pre>
                    </div>
                )}

                <div className="flex items-center justify-center h-16 m-2">
                    <button
                        className="flex-grow bg-green-500 text-white p-4 m-2 rounded-md"
                        onClick={gerarLevantamento}
                    >
                        <svg fill="#ffffff" strokeWidth="0.05" height="24" width="24" stroke="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path className="cls-1" d="M11,5H5A2,2,0,0,1,7,3H7V2A1,1,0,0,1,9,2V3H9a2,2,0,0,1,2,2Zm1-2v9H4V3H3A1,1,0,0,0,2,4v9a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1ZM10,7H5V8h5ZM8,9H5v1H8Z">
                            </path>
                        </svg>
                    </button>

                    <button
                        className="flex-grow bg-red-500 text-white p-4 m-2 rounded-md"
                        onClick={resetarFormulario}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <button
                        className="flex-grow bg-blue-500 text-white p-4 m-2 rounded-md"
                        onClick={compartilharTexto}
                    >
                        <svg fill="#ffffff" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M12,10c-.6012,0-1.13403,.27069-1.50067,.69055l-4.54468-2.27234c.02881-.13507,.04535-.2746,.04535-.41821,0-.14368-.01654-.28314-.04535-.41821l4.54468-2.2724c.36664,.4198,.89954,.69061,1.50067,.69061,1.10455,0,2-.89545,2-2,0-1.10461-.89545-2-2-2s-2,.89539-2,2c0,.14362,.01654,.28314,.04535,.41821l-4.54468,2.27234c-.36664-.41986-.89948-.69055-1.50067-.69055-1.10455,0-2,.89539-2,2,0,1.10455,.89545,2,2,2,.60114,0,1.13403-.27081,1.50067-.69061l4.54468,2.2724c-.02881,.13507-.04535,.27454-.04535,.41821,0,1.10455,.89545,2,2,2s2-.89545,2-2c0-1.10461-.89545-2-2-2Z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Formulario;
