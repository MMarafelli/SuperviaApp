// Formulario.tsx
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { PageTitle } from '../../components/PageTitle';
import './CalcTintaEsfera.css';
import { StorageService } from '../../services/StorageService';
import { formatDateToPtBR } from '../../utils/dateUtils';
import { isDevelopment } from '../../utils/devUtils';

import BlocoDivCompVariavel from '../../components/blocosCalcTintaEsfera/blocoDivComprimento'
import BlocoDivUnidVariavel from '../../components/blocosCalcTintaEsfera/blocoDivUnidade'
import BlocoTrVariavel from '../../components/blocosCalcTintaEsfera/blocoTr'

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


const Formulario = () => {
    // ---------------------------------------------------------------------------------------------
    // Variáveis da página
    // --------------------------------------------------------------------------------------------
    const [larguraDaJanela, setLarguraDaJanela] = useState(window.innerWidth);
    const [isFocused, setIsFocused] = useState('');
    //const [mostrarConteudo, setMostrarConteudo] = useState(false);
    const [levantamento, setLevantamento] = useState('');

    const isDev = isDevelopment();

    const initialState = useMemo(() => {
        return StorageService.getInitialState(isDev);
    }, [isDev]);

    const [campos, setCampos] = useState(initialState);
    const [editId, setEditId] = useState<string | null>(null);

    // Ao montar, verifica se há id na query e carrega o card correspondente
    useEffect(() => {
        const id = getQueryParam('id');
        setEditId(id);

        if (id) {
            // Sempre que for editar, preenche tudo com os dados do card salvo
            const cardsSalvos = localStorage.getItem('tintaEsferaCards');
            if (cardsSalvos) {
                try {
                    type CardData = {
                        quantidade: number;
                        cor: string;
                        data: string;
                        nomeEstrada?: string;
                    };
                    type TintaEsferaCard = { id: string; resumo: string; data: CardData; show: boolean };
                    const cardsArray: TintaEsferaCard[] = JSON.parse(cardsSalvos);
                    const card = cardsArray.find((c) => c.id === id);
                    if (card) {
                        setCampos(prev => ({
                            ...prev,
                            nomeEstrada: card.data.nomeEstrada ?? '',
                            estado: card.data.cor ?? '',
                            diaMesAno: card.data.data ?? '',
                            tinta: card.data.quantidade !== undefined ? card.data.quantidade.toString() : ''
                        }));
                    } else {
                        setCampos(initialState);
                    }
                } catch {
                    setCampos(initialState);
                }
            } else {
                setCampos(initialState);
            }
        } else {
            // Acesso direto à página (sem ID de edição)
            // O initialState já foi criado com a lógica correta de DEV/PROD pelo StorageService
            setCampos(initialState);
        }
    }, [initialState, isDev]);

    // Ao montar, verifica se há id na query e carrega o card correspondente
// ...existing code...

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


    // handler de valor geral
    const handleChange = useCallback((
        campo: keyof typeof campos,
        valor: string | boolean
    ) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [campo]: valor,
        }));
    }, []);

    // Funções usadas em hooks precisam ser estáveis
    const parXeY = useCallback((campo: string) => {
        const campoX = campo + 'X';
        const campoY = campo + 'Y';
        const campoZ = campo + 'Z';
        
        setCampos(prevCampos => {
            const x = parseFloat(prevCampos[campoX as keyof typeof campos] as string) || 0;
            let y = parseFloat(prevCampos[campoY as keyof typeof campos] as string) || 0;
            if (campo === 'eixo4x12') y = y * 4;
            if (campo === 'eixo2x2') y = y * 2;
            let valorZ = calcularM2(x.toString(), y.toString()).toString();
            if (valorZ === '0') valorZ = '';
            
            return {
                ...prevCampos,
                [campoZ]: valorZ
            };
        });
    }, []);

    const calcularMetrosPista = useCallback(() => {
        setCampos(prevCampos => {
            const handleNaN = (value: number) => isNaN(value) ? 0 : value;
            const direitoZNumber = handleNaN(parseFloat(prevCampos.direitoZ));
            const esquerdoZNumber = handleNaN(parseFloat(prevCampos.esquerdoZ));
            const eixo2x2ZNumber = handleNaN(parseFloat(prevCampos.eixo2x2Z));
            const eixo4x12ZNumber = handleNaN(parseFloat(prevCampos.eixo4x12Z));
            const alcaZNumber = handleNaN(parseFloat(prevCampos.alcaZ));
            const total = direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x12ZNumber + alcaZNumber;
            const roundedResultado = Math.ceil(total * 100) / 100;
            
            return {
                ...prevCampos,
                totalMetrosPista: roundedResultado.toString()
            };
        });
    }, []);

    // Removido o useEffect que atualizava localStorage a cada mudança de campos para evitar loop infinito.

    // Atualize os cálculos quando os valores X ou Y mudarem
    useEffect(() => {
        const updatedFields = [];
        
        if (campos.direitoX || campos.direitoY) updatedFields.push('direito');
        if (campos.esquerdoX || campos.esquerdoY) updatedFields.push('esquerdo');
        if (campos.eixo4x12X || campos.eixo4x12Y) updatedFields.push('eixo4x12');
        if (campos.eixo2x2X || campos.eixo2x2Y) updatedFields.push('eixo2x2');
        if (campos.alcaX || campos.alcaY) updatedFields.push('alca');
        
        // Executa as atualizações em batch
        if (updatedFields.length > 0) {
            updatedFields.forEach(field => parXeY(field));
        }
    }, [
        campos.direitoX, campos.direitoY,
        campos.esquerdoX, campos.esquerdoY,
        campos.eixo4x12X, campos.eixo4x12Y,
        campos.eixo2x2X, campos.eixo2x2Y,
        campos.alcaX, campos.alcaY,
        parXeY
    ]);

    // Atualize o total quando os valores Z mudarem
    useEffect(() => {
        calcularMetrosPista();
    }, [
        campos.direitoZ,
        campos.esquerdoZ,
        campos.eixo4x12Z,
        campos.eixo2x2Z,
        campos.alcaZ,
        calcularMetrosPista
    ]);

    // Libera ou trava a edição no campo
    /*     const handleEditEsfera = () => {
            setEditarEsferas(!editarEsferas);
        };
        // Libera ou trava a edição no campo
        const handleEditTinta = () => {
            setEditarTinta(!editarTinta);
        }; */

    // Controle se o campo está focado ou não.
    const handleInputFocus = (inputName: string) => {
        setIsFocused(inputName);
    };

    const handleInputBlur = () => {
        setIsFocused('');
    };

    const handleInputChangeNumeric = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        return numericValue;
    };

    // ---------------------------------------------------------------------------------------------
    // Controle da textArea
    // ---------------------------------------------------------------------------------------------
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const levantamentoRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Verifica se levantamento é verdadeiro e se a referência existe
        if (levantamento && levantamentoRef.current) {
            levantamentoRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        if (textareaRef.current) {
            setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
        }
    }, [levantamento]);

    // ---------------------------------------------------------------------------------------------
    // Controle de input
    // ---------------------------------------------------------------------------------------------

    // opções de espeçura da faixa
    const opcoesDeSelectLargura = [
        { valor: '', label: 'Selecione...' },
        { valor: '0.10', label: '0.10' },
        { valor: '0.15', label: '0.15' },
    ];

    // opções de espeçura da tacha
    const opcoesDeSelectTacha = [
        { valor: '', label: 'Selecione...' },
        { valor: 'Tacha monodirecional', label: 'Tacha monodirecional' },
        { valor: 'Tacha bidirecional', label: 'Tacha bidirecional' },
        { valor: 'Tachão monodirecional', label: 'Tachão monodirecional' },
        { valor: 'Tachão bidirecional', label: 'Tachão bidirecional' },
    ];

    // ---------------------------------------------------------------------------------------------
    // Calculos
    // ---------------------------------------------------------------------------------------------


    //Pega o par X e Y correto em cache para o cálculo de M2.

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


    // ---------------------------------------------------------------------------------------------
    // Gerar texto do levantamento
    // ---------------------------------------------------------------------------------------------
    const gerarLevantamento = () => {
        let textoLevantamento = ``;
        if (campos.nomeEstrada && campos.estado && campos.diaMesAno && campos.diaMesAno !== '' && campos.equipe) {
            const partes = campos.diaMesAno.split('-');
            const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
            textoLevantamento += `${campos.nomeEstrada} - ${campos.estado} - ${dataFormatada}\n\n`
            textoLevantamento += `Trecho: KM ${campos.kmInicial || '0'} ao KM ${campos.kmFinal || '0'} / Equipe: ${campos.equipe}\n\n`;
        // não feche a função aqui!

        // Pintura Automática Definitiva
        if ((campos.direitoZ && campos.direitoZ !== '0')
            || (campos.esquerdoZ && campos.esquerdoZ !== '0')
            || (campos.eixo4x12Z && campos.eixo4x12Z !== '0')
            || (campos.eixo2x2Z && campos.eixo2x2Z !== '0')
            || (campos.alcaZ && campos.alcaZ !== '0')
            || (campos.esfera && campos.esfera !== '0')
            || (campos.tinta && campos.tinta !== '0')) {
            textoLevantamento += `*Pintura Automática Definitiva*\n`;

            if (campos.direitoZ && campos.direitoZ !== '0') textoLevantamento += `\u0020\u0020\u0020\u0020\u0020Bordo direito: ${campos.direitoY} metro(s)\n`;
            if (campos.esquerdoZ && campos.esquerdoZ !== '0') textoLevantamento += `Bordo esquerdo: ${campos.esquerdoY} metro(s)\n`;
        }

        // --- Salvar no localStorage para exibir na Home ---
        try {
            const cardsSalvos = localStorage.getItem('tintaEsferaCards');
            let cardsArray = [];
            if (cardsSalvos) {
                try {
                    cardsArray = JSON.parse(cardsSalvos);
                } catch {
                    cardsArray = [];
                }
            }
            const resumo = `${campos.nomeEstrada || ''} - ${campos.estado || ''} (${formatDateToPtBR(campos.diaMesAno || '')})`;
            const cardData = {
                quantidade: Number(campos.tinta) || 0,
                cor: campos.estado || '',
                data: campos.diaMesAno || '',
                nomeEstrada: campos.nomeEstrada || '',
                equipe: campos.equipe || '',
                kmInicial: campos.kmInicial || '',
                kmFinal: campos.kmFinal || '',
                esfera: campos.esfera || '',
                totalMetrosPista: campos.totalMetrosPista || '',
                resultadoEsferas: campos.resultadoEsferas || '',
                resultadoTinta: campos.resultadoTinta || '',
            };
            if (editId) {
                // Atualizar card existente
                const idx = cardsArray.findIndex((c: { id: string }) => c.id === editId);
                if (idx !== -1) {
                    cardsArray[idx] = {
                        ...cardsArray[idx],
                        resumo,
                        data: cardData,
                        show: true
                    };
                }
            } else {
                // Criar novo card
                const id = Date.now().toString() + Math.random().toString(36).substring(2, 8);
                const novoCard = {
                    id,
                    resumo,
                    data: cardData,
                    show: true
                };
                cardsArray.push(novoCard);
            }
            localStorage.setItem('tintaEsferaCards', JSON.stringify(cardsArray));
        } catch (e) {
            // Erro ao salvar card, pode ser exibido para o usuário se necessário
        }
        
        if (campos.eixo4x12Z && campos.eixo4x12Z !== '0') textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Eixo 4x12: ${campos.eixo4x12Y} unidade(s)\n`;
        if (campos.eixo2x2Z && campos.eixo2x2Z !== '0') textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u00202X2: ${campos.eixo2x2Y} unidade(s)\n`;
        if (campos.alcaZ && campos.alcaZ !== '0') textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Alça: ${campos.alcaY} metro(s)\n`;
            textoLevantamento += `\n`;
        }

        // Implantação de Tachas monodirecional
        if ((campos.direitoTipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tacha monodirecional' && campos.esquerdoQtdTacha)
            || (campos.eixo4x12TipoTacha == 'Tacha monodirecional' && campos.eixo4x12QtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tacha monodirecional' && campos.eixo2x2QtdTacha)
            || (campos.alcaTipoTacha == 'Tacha monodirecional' && campos.alcaQtdTacha)) {
            textoLevantamento += `*Implantação de Tachas monodirecionais*\n`;

            if (campos.direitoTipoTacha == 'Tacha monodirecional' && campos.direitoQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020Bordo direito: ${campos.direitoQtdTacha} unidade(s)\n`;
            if (campos.esquerdoTipoTacha == 'Tacha monodirecional' && campos.esquerdoQtdTacha) textoLevantamento += `Bordo esquerdo: ${campos.esquerdoQtdTacha} unidade(s)\n`;
            if (campos.eixo4x12TipoTacha == 'Tacha monodirecional' && campos.eixo4x12QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Eixo 4x12: ${campos.eixo4x12QtdTacha} unidade(s)\n`;
            if (campos.eixo2x2TipoTacha == 'Tacha monodirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u00202X2: ${campos.eixo2x2QtdTacha} unidade(s)\n`;
            if (campos.alcaTipoTacha == 'Tacha monodirecional' && campos.alcaQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Alça: ${campos.alcaQtdTacha} unidade(s)\n`;
            textoLevantamento += `\n`;
        }

        // Implantação de Tacha bidirecional
        if ((campos.direitoTipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tacha bidirecional' && campos.esquerdoQtdTacha)
            || (campos.eixo4x12TipoTacha == 'Tacha bidirecional' && campos.eixo4x12QtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tacha bidirecional' && campos.eixo2x2QtdTacha)
            || (campos.alcaTipoTacha == 'Tacha bidirecional' && campos.alcaQtdTacha)) {
            textoLevantamento += `*Implantação de Tachas bidirecionais*\n`;

            if (campos.direitoTipoTacha == 'Tacha bidirecional' && campos.direitoQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020Bordo direito: ${campos.direitoQtdTacha} unidade(s)\n`;
            if (campos.esquerdoTipoTacha == 'Tacha bidirecional' && campos.esquerdoQtdTacha) textoLevantamento += `Bordo esquerdo: ${campos.esquerdoQtdTacha} unidade(s)\n`;
            if (campos.eixo4x12TipoTacha == 'Tacha bidirecional' && campos.eixo4x12QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Eixo 4x12: ${campos.eixo4x12QtdTacha} unidade(s)\n`;
            if (campos.eixo2x2TipoTacha == 'Tacha bidirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u00202X2: ${campos.eixo2x2QtdTacha} unidade(s)\n`;
            if (campos.alcaTipoTacha == 'Tacha bidirecional' && campos.alcaQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Alça: ${campos.alcaQtdTacha} unidade(s)\n`;
            textoLevantamento += `\n`;
        }

        // Implantação de Tachão monodirecional
        if ((campos.direitoTipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tachão monodirecional' && campos.esquerdoQtdTacha)
            || (campos.eixo4x12TipoTacha == 'Tachão monodirecional' && campos.eixo4x12QtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tachão monodirecional' && campos.eixo2x2QtdTacha)
            || (campos.alcaTipoTacha == 'Tachão monodirecional' && campos.alcaQtdTacha)) {
            textoLevantamento += `*Implantação de Tachões monodirecionais*\n`;

            if (campos.direitoTipoTacha == 'Tachão monodirecional' && campos.direitoQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020Bordo direito: ${campos.direitoQtdTacha} unidade(s)\n`;
            if (campos.esquerdoTipoTacha == 'Tachão monodirecional' && campos.esquerdoQtdTacha) textoLevantamento += `Bordo esquerdo: ${campos.esquerdoQtdTacha} unidade(s)\n`;
            if (campos.eixo4x12TipoTacha == 'Tachão monodirecional' && campos.eixo4x12QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Eixo 4x12: ${campos.eixo4x12QtdTacha} unidade(s)\n`;
            if (campos.eixo2x2TipoTacha == 'Tachão monodirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u00202X2: ${campos.eixo2x2QtdTacha} unidade(s)\n`;
            if (campos.alcaTipoTacha == 'Tachão monodirecional' && campos.alcaQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Alça: ${campos.alcaQtdTacha} unidade(s)\n`;
            textoLevantamento += `\n`;
        }

        // Implantação de Tachão bidirecional
        if ((campos.direitoTipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha)
            || (campos.esquerdoTipoTacha == 'Tachão bidirecional' && campos.esquerdoQtdTacha)
            || (campos.eixo4x12TipoTacha == 'Tachão bidirecional' && campos.eixo4x12QtdTacha)
            || (campos.eixo2x2TipoTacha == 'Tachão bidirecional' && campos.eixo2x2QtdTacha)
            || (campos.alcaTipoTacha == 'Tachão bidirecional' && campos.alcaQtdTacha)) {
            textoLevantamento += `*Implantação de Tachões bidirecionais*\n`;

            if (campos.direitoTipoTacha == 'Tachão bidirecional' && campos.direitoQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020Bordo direito: ${campos.direitoQtdTacha} unidade(s)\n`;
            if (campos.esquerdoTipoTacha == 'Tachão bidirecional' && campos.esquerdoQtdTacha) textoLevantamento += `Bordo esquerdo: ${campos.esquerdoQtdTacha} unidade(s)\n`;
            if (campos.eixo4x12TipoTacha == 'Tachão bidirecional' && campos.eixo4x12QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Eixo 4x12: ${campos.eixo4x12QtdTacha} unidade(s)\n`;
            if (campos.eixo2x2TipoTacha == 'Tachão bidirecional' && campos.eixo2x2QtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u00202X2: ${campos.eixo2x2QtdTacha} unidade(s)\n`;
            if (campos.alcaTipoTacha == 'Tachão bidirecional' && campos.alcaQtdTacha) textoLevantamento += `\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020Alça: ${campos.alcaQtdTacha} unidade(s)\n`;
            textoLevantamento += `\n`;
        }

        // Remoção
        if (campos.remocao) {
            textoLevantamento += `*Remoção*: ${campos.remocao} unidade(s)\n`;
        }

        if (textoLevantamento === '') {
            textoLevantamento = 'Favor preencher os campos do formulário';
        }
        setLevantamento(textoLevantamento);
    };

    // ---------------------------------------------------------------------------------------------
    // Controle do compatilhamento
    // ---------------------------------------------------------------------------------------------
    const compartilharTexto = () => {
        if (levantamento && levantamento !== 'Favor preencher os campos do formulário' && navigator.share) {
            navigator.share({
                title: 'Compartilhar Levantamento',
                text: levantamento,
            })
                .then(() => {
                    // Compartilhamento realizado com sucesso
                })
                .catch((error) => {
                    console.error('Erro ao compartilhar levantamento:', error);
                });
        } else if (!levantamento || levantamento === 'Favor preencher os campos do formulário') {
            alert('O levantamento precisa ser gerado antes de compartilhar.');
        } else {
            alert('A funcionalidade de compartilhamento não é suportada neste navegador.');
        }
    };

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
            eixo4x12X: '',
            eixo4x12Y: '',
            eixo4x12Z: '',
            eixo4x12TipoTacha: '',
            eixo4x12QtdTacha: '',
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
            remocao: '',
            totalMetrosPista: '',
        };

        // Atualizar campos com os valores inciais.
        // O useeffect toma conta de atualizar o localStorage.
        setCampos(initialState);

        setIsFocused('');
        /*      setMostrarConteudo(false);
                setEditarEsferas(false);
                setEditarTinta(false); */
        setLevantamento('');
    };

    const limparCampos = (campo: string) => {
        handleChange(`${campo + 'X' as keyof typeof campos}`, '0.10'); // valor default válido para select
        handleChange(`${campo + 'Y' as keyof typeof campos}`, '');
        handleChange(`${campo + 'TipoTacha' as keyof typeof campos}`, '');
        handleChange(`${campo + 'QtdTacha' as keyof typeof campos}`, '');
    }
    // ---------------------------------------------------------------------------------------------
    // Controle de tema
    // ---------------------------------------------------------------------------------------------
    /*  const theme = document.documentElement.getAttribute('theme');
        const corDoSVG = theme == 'dark' ? 'white' : 'hsl(300, 1%, 30%)'; */

    // ---------------------------------------------------------------------------------------------
    // Pagina
    // ---------------------------------------------------------------------------------------------

    return (
        <div>
            <PageTitle title="Pintura Automática" />

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
                        <label className={`input-label ${campos.equipe ? 'input-label-active' : (isFocused == 'equipe' ? 'input-label-focus' : 'input-label-inactive')}`}>
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
                {larguraDaJanela <= 900 ? (
                    <>
                        <div className='divsSegundoQuadroTelaPequena'>

                            <BlocoDivCompVariavel
                                label="Bordo Direito"
                                valorX={campos.direitoX}
                                valorY={campos.direitoY}
                                valorZ={campos.direitoZ}
                                tipoTacha={campos.direitoTipoTacha}
                                qtdTacha={campos.direitoQtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'direito' + campo as keyof typeof campos}`, valor)}
                                onClickIcon={() => limparCampos('direito')}
                            />

                            <BlocoDivCompVariavel
                                label="Bordo Esquerdo"
                                valorX={campos.esquerdoX}
                                valorY={campos.esquerdoY}
                                valorZ={campos.esquerdoZ}
                                tipoTacha={campos.esquerdoTipoTacha}
                                qtdTacha={campos.esquerdoQtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'esquerdo' + campo as keyof typeof campos}`, valor)}
                                onClickIcon={() => limparCampos('esquerdo')}
                            />

                            <BlocoDivUnidVariavel
                                label="Eixo 4x12"
                                valorX={campos.eixo4x12X}
                                valorY={campos.eixo4x12Y}
                                valorZ={campos.eixo4x12Z}
                                tipoTacha={campos.eixo4x12TipoTacha}
                                qtdTacha={campos.eixo4x12QtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo4x12' + campo as keyof typeof campos}`, valor)}
                                onClickIcon={() => limparCampos('eixo4x12')}
                            />

                            <BlocoDivUnidVariavel
                                label="2x2"
                                valorX={campos.eixo2x2X}
                                valorY={campos.eixo2x2Y}
                                valorZ={campos.eixo2x2Z}
                                tipoTacha={campos.eixo2x2TipoTacha}
                                qtdTacha={campos.eixo2x2QtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo2x2' + campo as keyof typeof campos}`, valor)}
                                onClickIcon={() => limparCampos('eixo2x2')}
                            />

                            <BlocoDivCompVariavel
                                label="Alça"
                                valorX={campos.alcaX}
                                valorY={campos.alcaY}
                                valorZ={campos.alcaZ}
                                tipoTacha={campos.alcaTipoTacha}
                                qtdTacha={campos.alcaQtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'alca' + campo as keyof typeof campos}`, valor)}
                                onClickIcon={() => limparCampos('alca')}
                            />
                        </div>

                    </>
                ) : (
                    <table className="tabela1TelaGrande w-full">
                        <thead>
                            <tr>
                                <th className="tdLegendaTelaGrande"></th>
                                <th className="tdLegendaTelaGrande">Largura</th>
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
                                opcoesLargura={opcoesDeSelectLargura}
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
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'esquerdo' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoTrVariavel
                                label="Alça:"
                                valorX={campos.alcaX}
                                valorY={campos.alcaY}
                                valorZ={campos.alcaZ}
                                tipoTacha={campos.alcaTipoTacha}
                                qtdTacha={campos.alcaQtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'alca' + campo as keyof typeof campos}`, valor)}
                            />

                        </tbody>
                        <thead>
                            <tr>
                                <th className="tdLegendaTelaGrande"></th>
                                <th className="tdLegendaTelaGrande">Largura</th>
                                <th className="tdLegendaTelaGrande">Unidades</th>
                                <th className="tdLegendaTelaGrande">Qtd</th>
                                <th className="tdLegendaTelaGrande">Tipo de tacha</th>
                                <th className="tdLegendaTelaGrande">Quantidade de tachas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <BlocoTrVariavel
                                label="Eixo 4x12:"
                                valorX={campos.eixo4x12X}
                                valorY={campos.eixo4x12Y}
                                valorZ={campos.eixo4x12Z}
                                tipoTacha={campos.eixo4x12TipoTacha}
                                qtdTacha={campos.eixo4x12QtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo4x12' + campo as keyof typeof campos}`, valor)}
                            />

                            <BlocoTrVariavel
                                label="2X2:"
                                valorX={campos.eixo2x2X}
                                valorY={campos.eixo2x2Y}
                                valorZ={campos.eixo2x2Z}
                                tipoTacha={campos.eixo2x2TipoTacha}
                                qtdTacha={campos.eixo2x2QtdTacha}
                                opcoesLargura={opcoesDeSelectLargura}
                                opcoesTacha={opcoesDeSelectTacha}
                                onChange={(campo, valor) => handleChange(`${'eixo2x2' + campo as keyof typeof campos}`, valor)}
                            />

                        </tbody>
                    </table>
                )}
            </div>

            {/* Terceiro quadro */}
            <div className="terceiroQuadro mx-4 mb-4">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td>
                                <div className="interacaoBox flex flex-col lg:mr-2">
                                    <label className={`input-label ${campos.totalMetrosPista ? 'input-label-active' : (isFocused == 'totalMetrosPista' ? 'input-label-focus' : 'input-label-inactive')}`}>
                                        Total m²:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        readOnly
                                        value={campos.totalMetrosPista}
                                        onFocus={() => handleInputFocus('totalMetrosPista')}
                                        onBlur={handleInputBlur}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Terceiro quadro */}
            <div className="terceiroQuadro mx-4 mb-4">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td>
                                <div className="interacaoBox flex flex-col lg:mr-2">
                                    <label className={`input-label ${campos.remocao ? 'input-label-active' : (isFocused == 'remocao' ? 'input-label-focus' : 'input-label-inactive')}`}>
                                        Remoção(unidade(s)):
                                    </label>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={campos.remocao}
                                        onChange={(e) => handleChange('remocao', handleInputChangeNumeric(e.target.value))}
                                        onFocus={() => handleInputFocus('remocao')}
                                        onBlur={handleInputBlur}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Quadro de consumo */}
            {/*             <div className="terceiroQuadro mx-4 mb-4">
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
            </div> */}

            {/* Botões */}
            <div className='quartoQuadro'>
                {/* Se levantamento existe, mostra a div */}
                {levantamento && (
                    <div className="levantamento mt-5 p-4 m-4" ref={levantamentoRef}>
                        <label className="text-lg font-bold">Levantamento Gerado:</label>
                        <textarea className="w-full mt-2"
                            readOnly
                            ref={textareaRef}
                            value={levantamento}
                            style={{ height: textareaHeight }}
                        />
                    </div>
                )}

                <div className="flex items-center justify-center h-16 m-2">
                    <button
                        className="flex-grow bg-green-500 text-white p-4 m-2 rounded-md"
                        onClick={gerarLevantamento}
                        type="button"
                        aria-label="Gerar levantamento de pintura automática"
                    >
                        <svg fill="#ffffff" strokeWidth="0.05" height="24" width="24" stroke="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path className="cls-1" d="M11,5H5A2,2,0,0,1,7,3H7V2A1,1,0,0,1,9,2V3H9a2,2,0,0,1,2,2Zm1-2v9H4V3H3A1,1,0,0,0,2,4v9a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1ZM10,7H5V8h5ZM8,9H5v1H8Z">
                            </path>
                        </svg>
                    </button>

                    <button
                        className="flex-grow bg-red-500 text-white p-4 m-2 rounded-md"
                        onClick={resetarFormulario}
                        type="button"
                        aria-label="Resetar formulário"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <button
                        className="flex-grow bg-blue-500 text-white p-4 m-2 rounded-md"
                        onClick={compartilharTexto}
                        type="button"
                        aria-label="Compartilhar levantamento"
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
