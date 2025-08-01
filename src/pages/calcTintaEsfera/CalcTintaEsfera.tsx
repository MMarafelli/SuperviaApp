// Formulario.tsx
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import './CalcTintaEsfera.css';
import { StorageService } from '../../services/StorageService';
import { formatDateToPtBR } from '../../utils/dateUtils';
import { isDevelopment } from '../../utils/devUtils';
import { PageTitle } from '../../design-system';

// Novos componentes do design system
import {
    SVInputField,
    SVSelectField
} from '../../components/ui';
import {
    CalculationSection,
    ResultDisplay,
    ResponsiveCalculationLayout,
    CalculationTable
} from '../../components/calculation/CalculationComponents';import BlocoDivCompVariavel from '../../components/blocosCalcTintaEsfera/blocoDivComprimento'
import BlocoDivUnidVariavel from '../../components/blocosCalcTintaEsfera/blocoDivUnidade'

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


const Formulario = () => {
    // ---------------------------------------------------------------------------------------------
    // Variáveis da página
    // --------------------------------------------------------------------------------------------
    //const [mostrarConteudo, setMostrarConteudo] = useState(false);
    const [levantamento, setLevantamento] = useState('');
    
    // Estados para edição dos blocos (alça, bordos, etc.)
    const [editarAlca, setEditarAlca] = useState(false);
    const [editarDireito, setEditarDireito] = useState(false);
    const [editarEsquerdo, setEditarEsquerdo] = useState(false);
    const [editarFundo, setEditarFundo] = useState(false);

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
                            diaMesAno: card.data.data ?? ''
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

    // Handlers para edição dos blocos
    const handleEditAlca = useCallback(() => {
        setEditarAlca(!editarAlca);
    }, [editarAlca]);

    const handleEditDireito = useCallback(() => {
        setEditarDireito(!editarDireito);
    }, [editarDireito]);

    const handleEditEsquerdo = useCallback(() => {
        setEditarEsquerdo(!editarEsquerdo);
    }, [editarEsquerdo]);

    const handleEditFundo = useCallback(() => {
        setEditarFundo(!editarFundo);
    }, [editarFundo]);

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
            || (campos.alcaZ && campos.alcaZ !== '0')) {
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
                quantidade: 0, // Removido campos.tinta pois não faz parte da pintura automática
                cor: campos.estado || '',
                data: campos.diaMesAno || '',
                nomeEstrada: campos.nomeEstrada || '',
                equipe: campos.equipe || '',
                kmInicial: campos.kmInicial || '',
                kmFinal: campos.kmFinal || '',
                totalMetrosPista: campos.totalMetrosPista || '',
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
    // Layouts Responsivos
    // ---------------------------------------------------------------------------------------------
    
    // Converter opções para o formato do SVSelectField
    const larguraOptions = opcoesDeSelectLargura.map(opcao => ({ value: opcao.valor, label: opcao.label }));
    const tachaOptions = opcoesDeSelectTacha.map(opcao => ({ value: opcao.valor, label: opcao.label }));
    
    // Layout Mobile - Mantém os grupos separados como está
    const MobileLayout = useCallback(() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                editavel={editarDireito}
                onEditToggle={handleEditDireito}
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
                editavel={editarEsquerdo}
                onEditToggle={handleEditEsquerdo}
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
                editavel={editarFundo}
                onEditToggle={handleEditFundo}
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
                editavel={editarFundo}
                onEditToggle={handleEditFundo}
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
                editavel={editarAlca}
                onEditToggle={handleEditAlca}
            />
        </div>
    ), [campos, opcoesDeSelectLargura, opcoesDeSelectTacha, editarDireito, editarEsquerdo, editarFundo, editarAlca, handleChange, limparCampos, handleEditDireito, handleEditEsquerdo, handleEditFundo, handleEditAlca]);

    // Layout Desktop - Tabela organizada
    const DesktopLayout = useCallback(() => (
        <CalculationSection 
            title="📐 Medições de Pintura"
        >
            <CalculationTable 
                headers={[
                    'Material', 
                    'Largura (m)', 
                    'Comprimento/Unid.', 
                    'Resultado (m²)', 
                    'Tipo Tacha',
                    'Qtd. Tacha'
                ]}
            >
                <tr>
                    <td style={{ 
                        fontWeight: 'var(--sv-font-medium)',
                        width: '15%'
                    }}>
                        🛣️ Bordo Direito
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVSelectField
                            value={campos.direitoX}
                            onChange={(e) => handleChange('direitoX', e.target.value)}
                            options={larguraOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.direitoY}
                            onChange={(e) => handleChange('direitoY', e.target.value)}
                            variant="calculation"
                            placeholder="metros"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.direitoZ}
                            readOnly
                            variant="result"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVSelectField
                            value={campos.direitoTipoTacha}
                            onChange={(e) => handleChange('direitoTipoTacha', e.target.value)}
                            options={tachaOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVInputField
                            value={campos.direitoQtdTacha}
                            onChange={(e) => handleChange('direitoQtdTacha', e.target.value)}
                            variant="calculation"
                            placeholder="quantidade"
                            containerClassName="!mb-0"
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ 
                        fontWeight: 'var(--sv-font-medium)',
                        width: '15%'
                    }}>
                        🛣️ Bordo Esquerdo
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVSelectField
                            value={campos.esquerdoX}
                            onChange={(e) => handleChange('esquerdoX', e.target.value)}
                            options={larguraOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.esquerdoY}
                            onChange={(e) => handleChange('esquerdoY', e.target.value)}
                            variant="calculation"
                            placeholder="metros"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.esquerdoZ}
                            readOnly
                            variant="result"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVSelectField
                            value={campos.esquerdoTipoTacha}
                            onChange={(e) => handleChange('esquerdoTipoTacha', e.target.value)}
                            options={tachaOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVInputField
                            value={campos.esquerdoQtdTacha}
                            onChange={(e) => handleChange('esquerdoQtdTacha', e.target.value)}
                            variant="calculation"
                            placeholder="quantidade"
                            containerClassName="!mb-0"
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ 
                        fontWeight: 'var(--sv-font-medium)',
                        width: '15%'
                    }}>
                        ⚡ Eixo 4x12
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVSelectField
                            value={campos.eixo4x12X}
                            onChange={(e) => handleChange('eixo4x12X', e.target.value)}
                            options={larguraOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.eixo4x12Y}
                            onChange={(e) => handleChange('eixo4x12Y', e.target.value)}
                            variant="calculation"
                            placeholder="unidades"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.eixo4x12Z}
                            readOnly
                            variant="result"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVSelectField
                            value={campos.eixo4x12TipoTacha}
                            onChange={(e) => handleChange('eixo4x12TipoTacha', e.target.value)}
                            options={tachaOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVInputField
                            value={campos.eixo4x12QtdTacha}
                            onChange={(e) => handleChange('eixo4x12QtdTacha', e.target.value)}
                            variant="calculation"
                            placeholder="quantidade"
                            containerClassName="!mb-0"
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ 
                        fontWeight: 'var(--sv-font-medium)',
                        width: '15%'
                    }}>
                        ⚡ 2x2
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVSelectField
                            value={campos.eixo2x2X}
                            onChange={(e) => handleChange('eixo2x2X', e.target.value)}
                            options={larguraOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.eixo2x2Y}
                            onChange={(e) => handleChange('eixo2x2Y', e.target.value)}
                            variant="calculation"
                            placeholder="unidades"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.eixo2x2Z}
                            readOnly
                            variant="result"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVSelectField
                            value={campos.eixo2x2TipoTacha}
                            onChange={(e) => handleChange('eixo2x2TipoTacha', e.target.value)}
                            options={tachaOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVInputField
                            value={campos.eixo2x2QtdTacha}
                            onChange={(e) => handleChange('eixo2x2QtdTacha', e.target.value)}
                            variant="calculation"
                            placeholder="quantidade"
                            containerClassName="!mb-0"
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ 
                        fontWeight: 'var(--sv-font-medium)',
                        width: '15%'
                    }}>
                        🔗 Alça
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVSelectField
                            value={campos.alcaX}
                            onChange={(e) => handleChange('alcaX', e.target.value)}
                            options={larguraOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.alcaY}
                            onChange={(e) => handleChange('alcaY', e.target.value)}
                            variant="calculation"
                            placeholder="metros"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '15%' }}>
                        <SVInputField
                            value={campos.alcaZ}
                            readOnly
                            variant="result"
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVSelectField
                            value={campos.alcaTipoTacha}
                            onChange={(e) => handleChange('alcaTipoTacha', e.target.value)}
                            options={tachaOptions}
                            containerClassName="!mb-0"
                        />
                    </td>
                    <td style={{ width: '20%' }}>
                        <SVInputField
                            value={campos.alcaQtdTacha}
                            onChange={(e) => handleChange('alcaQtdTacha', e.target.value)}
                            variant="calculation"
                            placeholder="quantidade"
                            containerClassName="!mb-0"
                        />
                    </td>
                </tr>
            </CalculationTable>
        </CalculationSection>
    ), [campos, larguraOptions, tachaOptions, handleChange]);

    // ---------------------------------------------------------------------------------------------
    // Pagina
    // ---------------------------------------------------------------------------------------------

    return (
        <div className="sv-container sv-fade-in">
            <PageTitle title="PINTURA AUTOMÁTICA" />
            
            <div className="calc-tinta-container">{/* Conteúdo dos formulários */}

            {/* Primeiro quadro - Migrado para Design System */}
            <CalculationSection 
                title="📋 Informações do Projeto"
            >
                <div className="sv-grid sv-grid-cols-1 md:sv-grid-cols-2 lg:sv-grid-cols-3 sv-gap-4">
                    <SVInputField
                        label="🛣️ Estrada"
                        value={campos.nomeEstrada}
                        onChange={(e) => handleChange('nomeEstrada', e.target.value)}
                        variant="calculation"
                        placeholder="Nome da estrada"
                    />
                    
                    <SVSelectField
                        label="🗺️ Estado"
                        value={campos.estado}
                        onChange={(e) => handleChange('estado', e.target.value)}
                        options={[
                            { value: '', label: 'Selecione um estado' },
                            { value: 'AC', label: 'Acre' },
                            { value: 'AL', label: 'Alagoas' },
                            { value: 'AP', label: 'Amapá' },
                            { value: 'AM', label: 'Amazonas' },
                            { value: 'BA', label: 'Bahia' },
                            { value: 'CE', label: 'Ceará' },
                            { value: 'DF', label: 'Distrito Federal' },
                            { value: 'ES', label: 'Espírito Santo' },
                            { value: 'GO', label: 'Goiás' },
                            { value: 'MA', label: 'Maranhão' },
                            { value: 'MT', label: 'Mato Grosso' },
                            { value: 'MS', label: 'Mato Grosso do Sul' },
                            { value: 'MG', label: 'Minas Gerais' },
                            { value: 'PA', label: 'Pará' },
                            { value: 'PB', label: 'Paraíba' },
                            { value: 'PR', label: 'Paraná' },
                            { value: 'PE', label: 'Pernambuco' },
                            { value: 'PI', label: 'Piauí' },
                            { value: 'RJ', label: 'Rio de Janeiro' },
                            { value: 'RN', label: 'Rio Grande do Norte' },
                            { value: 'RS', label: 'Rio Grande do Sul' },
                            { value: 'RO', label: 'Rondônia' },
                            { value: 'RR', label: 'Roraima' },
                            { value: 'SC', label: 'Santa Catarina' },
                            { value: 'SP', label: 'São Paulo' },
                            { value: 'SE', label: 'Sergipe' },
                            { value: 'TO', label: 'Tocantins' }
                        ]}
                    />

                    <SVInputField
                        label="📅 Data"
                        value={campos.diaMesAno}
                        onChange={(e) => handleChange('diaMesAno', e.target.value)}
                        variant="calculation"
                        type="date"
                    />

                    <SVSelectField
                        label="👥 Equipe"
                        value={campos.equipe}
                        onChange={(e) => handleChange('equipe', e.target.value)}
                        options={[
                            { value: '', label: 'Selecione uma equipe' },
                            { value: '01', label: '01' },
                            { value: '02', label: '02' },
                            { value: '03', label: '03' }
                        ]}
                    />

                    <SVInputField
                        label="📍 Km inicial/Estaca inicial"
                        value={campos.kmInicial}
                        onChange={(e) => handleChange('kmInicial', e.target.value)}
                        variant="calculation"
                        placeholder="Km inicial"
                    />

                    <SVInputField
                        label="🏁 Km final/Estaca final"
                        value={campos.kmFinal}
                        onChange={(e) => handleChange('kmFinal', e.target.value)}
                        variant="calculation"
                        placeholder="Km final"
                    />
                </div>
            </CalculationSection>

            {/* Segundo quadro - Layout Responsivo */}
            <ResponsiveCalculationLayout
                mobileLayout={MobileLayout()}
                desktopLayout={DesktopLayout()}
                breakpoint={900}
            />

            {/* Terceiro quadro - Migrado para Design System */}
            <CalculationSection 
                title="📊 Totais Calculados"
            >
                <ResultDisplay
                    label="📐 Total m²"
                    value={campos.totalMetrosPista}
                    unit="m²"
                />
            </CalculationSection>

            {/* Quarto quadro - Remoção - Migrado para Design System */}
            <CalculationSection 
                title="🗑️ Remoção"
            >
                <SVInputField
                    label="Remoção (unidade(s))"
                    value={campos.remocao}
                    onChange={(e) => handleChange('remocao', handleInputChangeNumeric(e.target.value))}
                    variant="calculation"
                    placeholder="Quantidade a remover"
                />
            </CalculationSection>

            {/* Levantamento gerado - fora do quartoQuadro para evitar card dentro de card */}
            {levantamento && (
                <div className="levantamento-container" ref={levantamentoRef}>
                    <label className="levantamento-title">Levantamento Gerado:</label>
                    <textarea className="levantamento-textarea"
                        readOnly
                        ref={textareaRef}
                        value={levantamento}
                        style={{ height: textareaHeight }}
                    />
                    <div className="levantamento-divider"></div>
                </div>
            )}

            {/* Botões */}
            <CalculationSection title="">
                <div className="action-buttons" style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    gap: '1rem', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <button
                        className="modern-button"
                        onClick={gerarLevantamento}
                        type="button"
                        aria-label="Gerar levantamento de pintura automática"
                        style={{
                            backgroundColor: '#10b981',
                            color: '#ffffff',
                            border: '2px solid #10b981',
                            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                            fontSize: '0.875rem'
                        }}
                    >
                        📋 Gerar
                    </button>

                    <button
                        className="modern-button"
                        onClick={resetarFormulario}
                        type="button"
                        aria-label="Resetar formulário"
                        style={{
                            background: '#fff',
                            color: '#ef4444',
                            border: '2px solid #ef4444',
                            boxShadow: '0 2px 4px rgba(239,68,68,0.1)',
                            fontSize: '0.875rem'
                        }}
                    >
                        🗑️ Limpar
                    </button>

                    <button
                        className="modern-button"
                        onClick={compartilharTexto}
                        type="button"
                        aria-label="Compartilhar levantamento"
                        style={{
                            backgroundColor: '#3b82f6',
                            color: '#ffffff',
                            border: '2px solid #3b82f6',
                            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
                            fontSize: '0.875rem'
                        }}
                    >
                        📤 Enviar
                    </button>
                </div>
            </CalculationSection>
            </div>{/* fim calc-tinta-container */}
        </div >
    );
};

export default Formulario;
