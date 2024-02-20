// Formulario.js
import { useRef, useState, ChangeEvent, useEffect } from 'react';

const Formulario = () => {
    const [larguraDaJanela, setLarguraDaJanela] = useState(window.innerWidth);

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
    const [direitoX, setDireitoX] = useState('');
    const [direitoY, setDireitoY] = useState('');
    const [eixo4x4X, setEixo4x4X] = useState('');
    const [eixo4x4Y, setEixo4x4Y] = useState('');
    const [eixo2x2X, setEixo2x2X] = useState('');
    const [eixo2x2Y, setEixo2x2Y] = useState('');
    const [alcaX, setAlcaX] = useState('');
    const [alcaY, setAlcaY] = useState('');
    const [esfera, setEsfera] = useState('');
    const [tinta, setTinta] = useState('');
    const [levantamento, setLevantamento] = useState('');

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

    const handleInputChange = (
        inputValue: string,
        setFunction: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const numericValue = inputValue.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        setFunction(numericValue);
    };

    const opcoesDeSelect = [
        { valor: '', label: 'Selecione...' },
        { valor: '0.10', label: '0.10' },
        { valor: '0.15', label: '0.15' },
    ];

    const gerarLevantamento = () => {
        const textoLevantamento = `
      Sentido: ${sentido},
      KM Inicial: ${kmInicial},
      KM Final: ${kmFinal},
      Data: ${diaMesAno},
      BORDO DIREITO - X: ${direitoX}, Y: ${direitoY}, Z: ${calcularM2(direitoX, direitoY)},
      BORDO ESQUERDO - X: ${esquerdoX}, Y: ${esquerdoY}, Z: ${calcularM2(esquerdoX, esquerdoY)},
      EIXO 4X4 - X: ${eixo4x4X}, Y: ${eixo4x4Y}, Z: ${calcularM2(eixo4x4X, eixo4x4Y)},
      EIXO 2X2 - X: ${eixo2x2X}, Y: ${eixo2x2Y}, Z: ${calcularM2(eixo2x2X, eixo2x2Y)},
      ALÇA - X: ${alcaX}, Y: ${alcaY}, Z: ${calcularM2(alcaX, alcaY)},
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
        setSentido('');
        setKmInicial('');
        setKmFinal('');
        setDiaMesAno('')
        setEsquerdoX('0.10');
        setEsquerdoY('');
        setDireitoX('0.10');
        setDireitoY('');
        setEixo4x4X('0.10');
        setEixo4x4Y('');
        setEixo2x2X('0.10');
        setEixo2x2Y('');
        setAlcaX('0.10');
        setAlcaY('');
        setEsfera('');
        setTinta('');
        setLevantamento('');
    };

    return (
        <div className="rounded-md">

            {/* Primeiro quadro */}
            <div className="border-gray-300 border p-4 mb-4 flex flex-col">
                <label className="text-lg font-bold mb-2 lg:mb-0 lg:mr-2 lg:w-full">Primeiro Quadro:</label>

                <div className="flex flex-col lg:flex-row mt-2">
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        placeholder="Sentido"
                        value={sentido}
                        onChange={(e) => setSentido(e.target.value)}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        placeholder="KM Inicial"
                        value={kmInicial}
                        onChange={(e) => setKmInicial(e.target.value)}
                    />

                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        placeholder="KM Final"
                        value={kmFinal}
                        onChange={(e) => setKmFinal(e.target.value)}
                    />

                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        value={diaMesAno}
                        onChange={(e) => setDiaMesAno(e.target.value)}
                    />

                    {/* Novo campo de seleção para estados */}
                    <select
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="" disabled selected>
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


                    {/* Novo campo de texto para o nome da estrada */}
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        placeholder="Nome da Estrada"
                        value={nomeEstrada}
                        onChange={(e) => setNomeEstrada(e.target.value)}
                    />
                </div>
            </div>

            {/* Segundo quadro */}
            <div className="border-gray-300 border p-4 mb-4">
                <label className="text-lg font-bold">Segundo Quadro:</label>

                {larguraDaJanela <= 600 ? (
                    <>
                        <div className="mt-2">
                            <label className="text-lg font-bold">BORDO DIREITO:</label>
                            <div className="border border-collapse mt-2">
                                <div className="border p-2">ESPESSURA</div>
                                <div className="border p-2">
                                    <select value={direitoX} onChange={(e) => setDireitoX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="border p-2">COMPRIMENTO (m)</div>
                                <div className="border p-2">
                                    <input
                                        type="text"
                                        value={direitoY}
                                        onChange={(e) => handleInputChange(e.target.value, setDireitoY)}
                                    />
                                </div>
                                <div className="border p-2">m²</div>
                                <div className="border p-2">{calcularM2(direitoX, direitoY)}</div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="text-lg font-bold">BORDO ESQUERDO:</label>
                            <div className="border border-collapse mt-2">
                                <div className="border p-2">ESPESSURA</div>
                                <div className="border p-2">
                                    <select value={esquerdoX} onChange={(e) => setEsquerdoX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="border p-2">COMPRIMENTO (m)</div>
                                <div className="border p-2">
                                    <input
                                        type="text"
                                        value={esquerdoY}
                                        onChange={(e) => handleInputChange(e.target.value, setEsquerdoY)}
                                    />
                                </div>
                                <div className="border p-2">m²</div>
                                <div className="border p-2">{calcularM2(esquerdoX, esquerdoY)}</div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="text-lg font-bold">EIXO 4X4:</label>
                            <div className="border border-collapse mt-2">
                                <div className="border p-2">ESPESSURA</div>
                                <div className="border p-2">
                                    <select value={eixo4x4X} onChange={(e) => setEixo4x4X(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="border p-2">COMPRIMENTO (m)</div>
                                <div className="border p-2">
                                    <input
                                        type="text"
                                        value={eixo4x4Y}
                                        onChange={(e) => handleInputChange(e.target.value, setEixo4x4Y)}
                                    />
                                </div>
                                <div className="border p-2">m²</div>
                                <div className="border p-2">{calcularM2(eixo4x4X, eixo4x4Y)}</div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="text-lg font-bold">EIXO 2X2:</label>
                            <div className="border border-collapse mt-2">
                                <div className="border p-2">ESPESSURA</div>
                                <div className="border p-2">
                                    <select value={eixo2x2X} onChange={(e) => setEixo2x2X(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="border p-2">COMPRIMENTO (m)</div>
                                <div className="border p-2">
                                    <input
                                        type="text"
                                        value={eixo2x2Y}
                                        onChange={(e) => handleInputChange(e.target.value, setEixo2x2Y)}
                                    />
                                </div>
                                <div className="border p-2">m²</div>
                                <div className="border p-2">{calcularM2(eixo2x2X, eixo2x2Y)}</div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="text-lg font-bold">ALÇA:</label>
                            <div className="border border-collapse mt-2">
                                <div className="border p-2">ESPESSURA</div>
                                <div className="border p-2">
                                    <select value={alcaX} onChange={(e) => setAlcaX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="border p-2">COMPRIMENTO (m)</div>
                                <div className="border p-2">
                                    <input
                                        type="text"
                                        value={alcaY}
                                        onChange={(e) => handleInputChange(e.target.value, setAlcaY)}
                                    />
                                </div>
                                <div className="border p-2">m²</div>
                                <div className="border p-2">{calcularM2(alcaX, alcaY)}</div>
                            </div>
                        </div>

                    </>
                ) : (

                    <table className="w-full border border-collapse mt-2">
                        <thead>
                            <tr>
                                <th className="border p-2">branco</th>
                                <th className="border p-2">ESPESSURA</th>
                                <th className="border p-2">COMPRIMENTO (m)</th>
                                <th className="border p-2">m²</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">BORDO DIREITO</td>
                                <td className="border p-2">
                                    <select value={direitoX} onChange={(e) => setDireitoX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={direitoY}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e.target.value, setDireitoY)}
                                    />
                                </td>
                                <td className="border p-2">{calcularM2(direitoX, direitoY)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">BORDO ESQUERDO</td>
                                <td className="border p-2">
                                    <select value={esquerdoX} onChange={(e) => setEsquerdoX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={esquerdoY}
                                        onChange={(e) => setEsquerdoY(e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">{calcularM2(esquerdoX, esquerdoY)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">EIXO 4X4:</td>
                                <td className="border p-2">
                                    <select value={eixo4x4X} onChange={(e) => setEixo4x4X(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={eixo4x4Y}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e.target.value, setEixo4x4Y)}
                                    />
                                </td>
                                <td className="border p-2">{calcularM2(eixo4x4X, eixo4x4Y)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">EIXO 2X2:</td>
                                <td className="border p-2">
                                    <select value={eixo2x2X} onChange={(e) => setEixo2x2X(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={eixo2x2Y}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e.target.value, setEixo2x2Y)}
                                    />
                                </td>
                                <td className="border p-2">{calcularM2(eixo2x2X, eixo2x2Y)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">ALÇA:</td>
                                <td className="border p-2">
                                    <select value={alcaX} onChange={(e) => setAlcaX(e.target.value)}>
                                        {opcoesDeSelect.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <input type="text" value={alcaY}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e.target.value, setAlcaY)}
                                    />
                                </td>
                                <td className="border p-2">{calcularM2(alcaX, alcaY)}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            {/* Terceiro quadro */}
            <div className="border-gray-300 border p-4 mb-4">
                <div
                    className="cursor-pointer flex justify-between items-center transition-all duration-300"
                    onClick={() => setMostrarConteudo(!mostrarConteudo)}
                    style={{ marginBottom: mostrarConteudo ? '16px' : '0' }}
                >
                    <label className="text-lg font-bold">Quadro 3</label>
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
                    <div className="flex flex-col lg:flex-row mt-2">
                        <label>Consumo:</label>
                        <div className="flex flex-col lg:flex-row mt-2">
                            <input
                                type="text"
                                className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                                placeholder="Esfera(Kg)"
                                value={esfera}
                                onChange={(e) => setEsfera(e.target.value)}
                            />
                            <input
                                type="text"
                                className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                                placeholder="TINTA (baldes)"
                                value={tinta}
                                onChange={(e) => setTinta(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div>
                {/* Se levantamento existe, mostra a div */}
                {levantamento && (
                    <div className="mt-5 p-4 rounded-md" ref={levantamentoRef}>
                        <label className="text-lg font-bold">Levantamento Gerado:</label>
                        <pre className="mt-2 whitespace-pre-line">{levantamento}</pre>
                    </div>
                )}

                <div className="flex items-center justify-center h-16 m-2">
                    <button
                        className="flex-grow bg-green-500 text-white p-2 m-2 rounded-md"
                        onClick={gerarLevantamento}
                    >
                        <svg fill="#ffffff" stroke-width="0.05" height="24" width="24" stroke="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path className="cls-1" d="M11,5H5A2,2,0,0,1,7,3H7V2A1,1,0,0,1,9,2V3H9a2,2,0,0,1,2,2Zm1-2v9H4V3H3A1,1,0,0,0,2,4v9a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1ZM10,7H5V8h5ZM8,9H5v1H8Z">
                            </path>
                        </svg>
                    </button>

                    <button
                        className="flex-grow bg-red-500 text-white p-2 m-2 rounded-md"
                        onClick={resetarFormulario}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <button
                        className="flex-grow bg-blue-500 text-white p-2 m-2 rounded-md"
                        onClick={compartilharTexto}
                    >
                        <svg fill="#ffffff" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M12,10c-.6012,0-1.13403,.27069-1.50067,.69055l-4.54468-2.27234c.02881-.13507,.04535-.2746,.04535-.41821,0-.14368-.01654-.28314-.04535-.41821l4.54468-2.2724c.36664,.4198,.89954,.69061,1.50067,.69061,1.10455,0,2-.89545,2-2,0-1.10461-.89545-2-2-2s-2,.89539-2,2c0,.14362,.01654,.28314,.04535,.41821l-4.54468,2.27234c-.36664-.41986-.89948-.69055-1.50067-.69055-1.10455,0-2,.89539-2,2,0,1.10455,.89545,2,2,2,.60114,0,1.13403-.27081,1.50067-.69061l4.54468,2.2724c-.02881,.13507-.04535,.27454-.04535,.41821,0,1.10455,.89545,2,2,2s2-.89545,2-2c0-1.10461-.89545-2-2-2Z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Formulario;
