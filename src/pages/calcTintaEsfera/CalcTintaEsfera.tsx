// Formulario.js
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import './CalcTintaEsfera.css';

const Formulario = () => {
    const [larguraDaJanela, setLarguraDaJanela] = useState(window.innerWidth);

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

    const [mostrarConteudo, setMostrarConteudo] = useState(false);
    const [estado, setEstado] = useState('');
    const [sentido, setSentido] = useState('');
    const [nomeEstrada, setNomeEstrada] = useState('');
    const [kmInicial, setKmInicial] = useState('');
    const [diaMesAno, setDiaMesAno] = useState('');
    const [kmFinal, setKmFinal] = useState('');
    const [esquerdoX, setEsquerdoX] = useState('');
    const [esquerdoY, setEsquerdoY] = useState('');
    const [esquerdoZ, setEsquerdoZ] = useState('');
    const [direitoX, setDireitoX] = useState('');
    const [direitoY, setDireitoY] = useState('');
    const [direitoZ, setDireitoZ] = useState('');
    const [eixo4x4X, setEixo4x4X] = useState('');
    const [eixo4x4Y, setEixo4x4Y] = useState('');
    const [eixo4x4Z, setEixo4x4Z] = useState('');
    const [eixo2x2X, setEixo2x2X] = useState('');
    const [eixo2x2Y, setEixo2x2Y] = useState('');
    const [eixo2x2Z, setEixo2x2Z] = useState('');
    const [alcaX, setAlcaX] = useState('');
    const [alcaY, setAlcaY] = useState('');
    const [alcaZ, setAlcaZ] = useState('');
    const [esfera, setEsfera] = useState('');
    const [resultadoEsferas, setResultadoEsferas] = useState('');
    const [editarEsferas, setEditarEsferas] = useState(false);
    const [tinta, setTinta] = useState('');
    const [resultadoTinta, setResultadoTinta] = useState('');
    const [editarTinta, setEditarTinta] = useState(false);
    const [levantamento, setLevantamento] = useState('');

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

    // Controla o campo para só aceitar valor numérico
    const handleInputChangeNumeric = (
        inputValue: string,
        setFunction: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const numericValue = inputValue.replace(/[^\d.]/g, '');
        setFunction(numericValue);
    };

    const handleEditEsfera = () => {
        setEditarEsferas(!editarEsferas);
    };

    const handleEditTinta = () => {
        setEditarTinta(!editarTinta);
    };

    // opções de espeçura da faixa
    const opcoesDeSelect = [
        { valor: '', label: 'Selecione...' },
        { valor: '0.10', label: '0.10' },
        { valor: '0.15', label: '0.15' },
    ];

    useEffect(() => {
        const novoDireitoZ = calcularM2(direitoX, direitoY).toString(); // Converta o número para string
        setDireitoZ(novoDireitoZ);
    }, [direitoX, direitoY]);

    useEffect(() => {
        const novoEsquerdoZ = calcularM2(esquerdoX, esquerdoY).toString(); // Converta o número para string
        setEsquerdoZ(novoEsquerdoZ);
    }, [esquerdoX, esquerdoY]);

    useEffect(() => {
        const novoEixo4x4Z = calcularM2(eixo4x4X, eixo4x4Y).toString(); // Converta o número para string
        setEixo4x4Z(novoEixo4x4Z);
    }, [eixo4x4X, eixo4x4Y]);

    useEffect(() => {
        const novoEixo2x2Z = calcularM2(eixo2x2X, eixo2x2Y).toString(); // Converta o número para string
        setEixo2x2Z(novoEixo2x2Z);
    }, [eixo2x2X, eixo2x2Y]);

    useEffect(() => {
        const novoAlcaZ = calcularM2(alcaX, alcaY).toString(); // Converta o número para string
        setAlcaZ(novoAlcaZ);
    }, [alcaX, alcaY]);

    useEffect(() => {
        const novoAlcaZ = calcularM2(alcaX, alcaY).toString(); // Converta o número para string
        setAlcaZ(novoAlcaZ);
    }, [alcaX, alcaY]);


    useEffect(() => {
        const calcularResultadoEsferas = () => {
            const direitoZNumber = parseFloat(direitoZ);
            const esquerdoZNumber = parseFloat(esquerdoZ);
            const eixo2x2ZNumber = parseFloat(eixo2x2Z);
            const eixo4x4ZNumber = parseFloat(eixo4x4Z);
            const alcaZNumber = parseFloat(alcaZ);
            const esferaNumber = parseFloat(esfera);

            if (
                isNaN(direitoZNumber) ||
                isNaN(esquerdoZNumber) ||
                isNaN(eixo2x2ZNumber) ||
                isNaN(eixo4x4ZNumber) ||
                isNaN(alcaZNumber) ||
                isNaN(esferaNumber)
            ) {
                setResultadoEsferas('');
                return;
            }

            const denominador =
                direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x4ZNumber + alcaZNumber;

            if (denominador === 0) {
                setResultadoEsferas('');
                return;
            }

            const resultado = esferaNumber / denominador;
            const roundedResultado = Math.ceil(resultado * 100) / 100;
            setResultadoEsferas(roundedResultado.toString());
        };

        calcularResultadoEsferas();
    }, [direitoZ, esquerdoZ, eixo2x2Z, eixo4x4Z, alcaZ, esfera]);

    useEffect(() => {
        const calcularResultadoTinta = () => {
            const direitoZNumber = parseFloat(direitoZ);
            const esquerdoZNumber = parseFloat(esquerdoZ);
            const eixo2x2ZNumber = parseFloat(eixo2x2Z);
            const eixo4x4ZNumber = parseFloat(eixo4x4Z);
            const alcaZNumber = parseFloat(alcaZ);
            const tintaNumber = parseFloat(tinta);

            if (
                isNaN(direitoZNumber) ||
                isNaN(esquerdoZNumber) ||
                isNaN(eixo2x2ZNumber) ||
                isNaN(eixo4x4ZNumber) ||
                isNaN(alcaZNumber) ||
                isNaN(tintaNumber)
            ) {
                setResultadoTinta('');
                return;
            }

            const numerador =
                direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x4ZNumber + alcaZNumber;

            if (numerador === 0) {
                setResultadoTinta('');
                return;
            }

            const resultado = numerador / tintaNumber;
            const roundedResultado = Math.ceil(resultado * 100) / 100;
            setResultadoTinta(roundedResultado.toString());
        };

        calcularResultadoTinta();
    }, [direitoZ, esquerdoZ, eixo2x2Z, eixo4x4Z, alcaZ, tinta]);

    const gerarLevantamento = () => {
        const textoLevantamento = `
      Sentido: ${sentido},
      KM Inicial: ${kmInicial},
      KM Final: ${kmFinal},
      Data: ${diaMesAno},
      Bordo Direito - X: ${direitoX}, Y: ${direitoY}, Z: ${calcularM2(direitoX, direitoY)},
      Bordo Esquerdo - X: ${esquerdoX}, Y: ${esquerdoY}, Z: ${calcularM2(esquerdoX, esquerdoY)},
      Eixo 4X4 - X: ${eixo4x4X}, Y: ${eixo4x4Y}, Z: ${calcularM2(eixo4x4X, eixo4x4Y)},
      Eixo 2X2 - X: ${eixo2x2X}, Y: ${eixo2x2Y}, Z: ${calcularM2(eixo2x2X, eixo2x2Y)},
      Alça - X: ${alcaX}, Y: ${alcaY}, Z: ${calcularM2(alcaX, alcaY)},
      Esfera(Kg): ${esfera},
      TINTA (baldes): ${tinta}
    `;
        setLevantamento(textoLevantamento);
    };

    const compartilharTexto = () => {
        if (levantamento && navigator.share) {
            navigator.share({
                title: 'Compartilhar Levantamento',
                text: levantamento,
            })
                .then(() => console.log('Levantamento compartilhado com sucesso!'))
                .catch((error) => console.error('Erro ao compartilhar levantamento:', error));
        } else if (!levantamento) {
            alert('O levantamento precisa ser gerado antes de compartilhar.');
        } else {
            alert('A funcionalidade de compartilhamento não é suportada neste navegador.');
        }
    };

    const levantamentoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Verifica se levantamento é verdadeiro e se a referência existe
        if (levantamento && levantamentoRef.current) {
            levantamentoRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [levantamento]);

    const resetarFormulario = () => {
        setMostrarConteudo(false);
        setEstado('');
        setSentido('');
        setNomeEstrada('');
        setKmInicial('');
        setKmFinal('');
        setDiaMesAno('')
        setEsquerdoX('');
        setEsquerdoY('');
        setDireitoX('');
        setDireitoY('');
        setEixo4x4X('');
        setEixo4x4Y('');
        setEixo2x2X('');
        setEixo2x2Y('');
        setAlcaX('');
        setAlcaY('');
        setEsfera('');
        setResultadoEsferas('');
        setEditarEsferas(false);
        setTinta('');
        setResultadoTinta('');
        setEditarTinta(false);
        setLevantamento('');
    };

    // Função para obter e ajustar a cor do SVG com base no tema
    const theme = document.documentElement.getAttribute('theme');
    const corDoSVG = theme == 'dark' ? 'white' : 'hsl(300, 1%, 30%)';

    return (
        <div className="rounded-md">

            {/* Primeiro quadro */}
            <div className="primeiroQuadro p-2 m-4 mb-4 flex flex-col">

                <div className="inputsDoPrimeiroQuadro flex flex-col lg:flex-row lg:flex-wrap mt-2">

                    <input
                        type="text"
                        className="lg:mr-2 lg:w-1/5"
                        placeholder="Sentido"
                        value={sentido}
                        onChange={(e) => setSentido(e.target.value)}
                    />

                    <input
                        type="text"
                        className="lg:mr-2 lg:w-1/5"
                        placeholder="KM Inicial"
                        value={kmInicial}
                        onChange={(e) => setKmInicial(e.target.value)}
                    />

                    <input
                        type="text"
                        className="lg:mr-2 lg:w-1/5"
                        placeholder="KM Final"
                        value={kmFinal}
                        onChange={(e) => setKmFinal(e.target.value)}
                    />

                    <input
                        type="date"
                        className={`lg:mr-2 lg:w-1/5 date-input 
                        ${(!diaMesAno) ? 'border-white' : ''}
                        ${(diaMesAno) ? 'border-green' : ''}`}
                        value={diaMesAno}
                        onChange={(e) => setDiaMesAno(e.target.value)}
                    />

                    <select
                        className={`w-full lg:mr-2 lg:w-1/5 
                        ${(!estado) ? 'border-white' : ''}
                        ${(estado) ? 'border-green' : ''}
                        `}
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="" selected>
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

                    <input
                        type="text"
                        className="lg:mr-2 lg:w-1/5"
                        placeholder="Nome da Estrada"
                        value={nomeEstrada}
                        onChange={(e) => setNomeEstrada(e.target.value)}
                    />

                </div>
            </div>


            {/* Segundo quadro */}
            <div className="segundoQuadro p-4 mb-4">

                {larguraDaJanela <= 600 ? (
                    <>
                        <div className='divsSegundoQuadroTelaPequena'>
                            <div className='grupo'>
                                <label className='quadro'>Bordo direito:</label>
                                <div>
                                    <div className='bloco'>
                                        <div className='quadro'>
                                            Espessura
                                        </div>
                                        <select
                                            className={`${(!direitoX) ? 'border-white' : ''}
                                                        ${(direitoX) ? 'border-green' : ''}`}
                                            value={direitoX}
                                            onChange={(e) => setDireitoX(e.target.value)}
                                        >
                                            {opcoesDeSelect.map((opcao) => (
                                                <option key={opcao.valor} value={opcao.valor}>
                                                    {opcao.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='bloco'>
                                        <div className='quadro'>Comprimento (m)</div>
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={direitoY}
                                            onChange={(e) => handleInputChangeNumeric(e.target.value, setDireitoY)}
                                        />
                                    </div>
                                    <div className='quadro'>Resultado: {direitoZ} m²</div>
                                </div>
                            </div>

                            <div className='grupo'>
                                <label className='quadro'>Bordo Esquerdo:</label>
                                <div>
                                    <div className='bloco'>
                                        <div className='quadro'>Espessura</div>

                                        <select
                                            className={`${(!esquerdoX) ? 'border-white' : ''}
                                        ${(esquerdoX) ? 'border-green' : ''}`}
                                            value={esquerdoX} onChange={(e) => setEsquerdoX(e.target.value)}>
                                            {opcoesDeSelect.map((opcao) => (
                                                <option key={opcao.valor} value={opcao.valor}>
                                                    {opcao.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='bloco'>
                                        <div className='quadro'>Comprimento (m)</div>
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={esquerdoY}
                                            onChange={(e) => handleInputChangeNumeric(e.target.value, setEsquerdoY)}
                                        />
                                    </div>
                                    <div className='quadro'>Resultado: {esquerdoZ} m²</div>
                                </div>
                            </div>

                            <div className='grupo'>
                                <label className='quadro'>Eixo 4X4:</label>
                                <div>
                                    <div className='bloco'>
                                        <div className='quadro'>Espessura</div>
                                        <select
                                            className={`${(!eixo4x4X) ? 'border-white' : ''}
                                        ${(eixo4x4X) ? 'border-green' : ''}`}
                                            value={eixo4x4X} onChange={(e) => setEixo4x4X(e.target.value)}>
                                            {opcoesDeSelect.map((opcao) => (
                                                <option key={opcao.valor} value={opcao.valor}>
                                                    {opcao.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='bloco'>
                                        <div className='quadro'>Comprimento (m)</div>
                                        <input className='w-full'
                                            placeholder=" "
                                            type="text"
                                            value={eixo4x4Y}
                                            onChange={(e) => handleInputChangeNumeric(e.target.value, setEixo4x4Y)}
                                        />
                                    </div>
                                    <div className='quadro'>Resultado: {eixo4x4Z} m²</div>
                                </div>
                            </div>

                            <div className='grupo'>
                                <label className='quadro'>Eixo 2X2:</label>
                                <div>
                                    <div className='bloco'>
                                        <div className='quadro'>Espessura</div>
                                        <select
                                            className={`${(!eixo2x2X) ? 'border-white' : ''}
                                        ${(eixo2x2X) ? 'border-green' : ''}`}
                                            value={eixo2x2X} onChange={(e) => setEixo2x2X(e.target.value)}>
                                            {opcoesDeSelect.map((opcao) => (
                                                <option key={opcao.valor} value={opcao.valor}>
                                                    {opcao.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='bloco'>
                                        <div className='quadro'>Comprimento (m)</div>
                                        <input className='w-full'
                                            placeholder=" "
                                            type="text"
                                            value={eixo2x2Y}
                                            onChange={(e) => handleInputChangeNumeric(e.target.value, setEixo2x2Y)}
                                        />
                                    </div>
                                    <div className='quadro'>Resultado: {eixo2x2Z} m²</div>
                                </div>
                            </div>

                            <div className='grupo'>
                                <label className='quadro'>Alça:</label>
                                <div>
                                    <div className='bloco'>
                                        <div className='quadro'>Espessura</div>
                                        <select
                                            className={`${(!alcaX) ? 'border-white' : ''}
                                        ${(alcaX) ? 'border-green' : ''}`}
                                            value={alcaX} onChange={(e) => setAlcaX(e.target.value)}>
                                            {opcoesDeSelect.map((opcao) => (
                                                <option key={opcao.valor} value={opcao.valor}>
                                                    {opcao.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='bloco'>
                                        <div className='quadro'>Comprimento (m)</div>
                                        <input className='w-full'
                                            placeholder=" "
                                            type="text"
                                            value={alcaY}
                                            onChange={(e) => handleInputChangeNumeric(e.target.value, setAlcaY)}
                                        />
                                    </div>
                                    <div className='quadro'>{alcaZ} m²</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (

                    <table className="tabela1TelaGrande w-full mt-2">
                        <thead>
                            <tr>
                                <th className="tdLegendaTelaGrande"></th>
                                <th className="tdLegendaTelaGrande">Espessura</th>
                                <th className="tdLegendaTelaGrande">Comprimento (m)</th>
                                <th className="tdLegendaTelaGrande">m²</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tdLegendaTelaGrande">Bordo Direito</td>
                                <td>
                                    <select
                                        className={`${(!direitoX) ? 'border-white' : ''}
                                        ${(direitoX) ? 'border-green' : ''}`}
                                        value={direitoX}
                                        onChange={(e) => setDireitoX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={direitoY}
                                        placeholder=" "
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChangeNumeric(e.target.value, setDireitoY)}
                                    />
                                </td>
                                <td className='tdResultadoTelaGrande'>{direitoZ}</td>
                            </tr>
                            <tr>
                                <td className="tdLegendaTelaGrande">Bordo Esquerdo</td>
                                <td>
                                    <select
                                        className={`${(!esquerdoX) ? 'border-white' : ''}
                                        ${(esquerdoX) ? 'border-green' : ''}`}
                                        value={esquerdoX} onChange={(e) => setEsquerdoX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={esquerdoY}
                                        placeholder=" "
                                        onChange={(e) => setEsquerdoY(e.target.value)}
                                    />
                                </td>
                                <td className='tdResultadoTelaGrande'>{esquerdoZ}</td>
                            </tr>
                            <tr>
                                <td className="tdLegendaTelaGrande">Eixo 4X4:</td>
                                <td>
                                    <select
                                        className={`${(!eixo4x4X) ? 'border-white' : ''}
                                        ${(eixo4x4X) ? 'border-green' : ''}`}
                                        value={eixo4x4X}
                                        onChange={(e) => setEixo4x4X(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={eixo4x4Y}
                                        placeholder=" "
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChangeNumeric(e.target.value, setEixo4x4Y)}
                                    />
                                </td>
                                <td className='tdResultadoTelaGrande'>{eixo4x4Z}</td>
                            </tr>
                            <tr>
                                <td className="tdLegendaTelaGrande">Eixo 2X2:</td>
                                <td>
                                    <select
                                        className={`${(!eixo2x2X) ? 'border-white' : ''}
                                        ${(eixo2x2X) ? 'border-green' : ''}`}
                                        value={eixo2x2X}
                                        onChange={(e) => setEixo2x2X(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={eixo2x2Y}
                                        placeholder=" "
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChangeNumeric(e.target.value, setEixo2x2Y)}
                                    />
                                </td>
                                <td className='tdResultadoTelaGrande'>{eixo2x2Z}</td>
                            </tr>
                            <tr>
                                <td className="tdLegendaTelaGrande">Alça:</td>
                                <td>
                                    <select
                                        className={`${(!alcaX) ? 'border-white' : ''}
                                        ${(alcaX) ? 'border-green' : ''}`}
                                        value={alcaX}
                                        onChange={(e) => setAlcaX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input type="text"
                                        value={alcaY}
                                        placeholder=" "
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChangeNumeric(e.target.value, setAlcaY)}
                                    />
                                </td>
                                <td className='tdResultadoTelaGrande'>{alcaZ}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            {/* Terceiro quadro */}
            <div className="terceiroQuadro p-4 m-4 mb-4">
                <div
                    className="cursor-pointer flex justify-between items-center transition-all duration-300"
                    onClick={() => setMostrarConteudo(!mostrarConteudo)}
                >
                    <label className="text-lg font-bold mb-2 lg:mb-0 lg:mr-2 lg:w-full">Consumo</label>
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
                    <div className="flex flex-col w-full">
                        <table className="tabela2TelaGrande w-full border-collapse">
                            <tbody>
                                <tr>
                                    <td>
                                        <label>Esfera:</label>
                                        <input
                                            type="text"
                                            className="w-full"
                                            placeholder="Esfera(Kg)"
                                            value={esfera}
                                            onChange={(e) => setEsfera(e.target.value)}
                                        />
                                    </td>
                                    <td className="flex items-center">
                                        <div className="w-4/5 pr-2">
                                            <label className="block">Resultado:</label>
                                            <input
                                                type="text"
                                                placeholder=' '
                                                className={`w-full
                                                    ${(!editarEsferas && !resultadoEsferas) ? 'border-white' : ''}
                                                    ${(!editarEsferas && resultadoEsferas) ? 'border-green' : ''}
                                                    ${editarEsferas && !resultadoEsferas ? 'border-white' : ''}
                                                    ${editarEsferas && resultadoEsferas ? 'border-green' : ''}
                                                `}
                                                readOnly={!editarEsferas}
                                                value={resultadoEsferas}
                                                onChange={(e) => setResultadoEsferas(e.target.value)}
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
                                                            <g id="svgCanetaEditar" transform="translate(-583.000000, -101.000000)" fill={editarEsferas ? '#4299e1' : corDoSVG}>
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
                                        <label>Tinta:</label>
                                        <input
                                            type="text"
                                            className="w-full"
                                            placeholder="Tinta (baldes)"
                                            value={tinta}
                                            onChange={(e) => setTinta(e.target.value)}
                                        />
                                    </td>
                                    <td className="flex items-center">
                                        <div className="w-4/5 pr-2">
                                            <label className="block">Resultado:</label>
                                            <input
                                                type="text"
                                                placeholder=' '
                                                className={`w-full
                                                    ${(!editarTinta && !resultadoTinta) ? 'border-white' : ''}
                                                    ${(!editarTinta && resultadoTinta) ? 'border-green' : ''}
                                                    ${editarTinta && !resultadoTinta ? 'border-white' : ''}
                                                    ${editarTinta && resultadoTinta ? 'border-green' : ''}
                                                `}
                                                readOnly={!editarTinta}
                                                value={resultadoTinta}
                                                onChange={(e) => handleInputChangeNumeric(e.target.value, setResultadoTinta)}
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
                                                            <g id="svgCanetaEditar" transform="translate(-583.000000, -101.000000)" fill={editarTinta ? '#4299e1' : corDoSVG}>
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
