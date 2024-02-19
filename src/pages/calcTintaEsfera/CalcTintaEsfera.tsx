// Formulario.js
import { useState, ChangeEvent, useEffect } from 'react';

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

    const [sentido, setSentido] = useState('');
    const [kmInicial, setKmInicial] = useState('');
    const [diaMesAno, setDiaMesAno] = useState('');
    const [kmFinal, setKmFinal] = useState('');
    const [esquerdoX, setEsquerdoX] = useState('0.10');
    const [esquerdoY, setEsquerdoY] = useState('');
    const [direitoX, setDireitoX] = useState('0.10');
    const [direitoY, setDireitoY] = useState('');
    const [eixo4x4X, setEixo4x4X] = useState('0.10');
    const [eixo4x4Y, setEixo4x4Y] = useState('');
    const [eixo2x2X, setEixo2x2X] = useState('0.10');
    const [eixo2x2Y, setEixo2x2Y] = useState('');
    const [alcaX, setAlcaX] = useState('0.10');
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
            <div className="border-gray-300 border p-4 mb-4 flex flex-col lg:flex-row">
                <label className="text-lg font-bold">Primeiro Quadro:</label>

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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                                        <option value="0.10">0.10</option>
                                        <option value="0.15">0.15</option>
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
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => setMostrarConteudo(!mostrarConteudo)}
                >
                    <label className="text-lg font-bold">Quadro 3</label>
                    <svg
                        className={`w-6 h-6 ${mostrarConteudo ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>

                {mostrarConteudo && (
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
                )}
            </div>


            <div className="mt-5 flex space-x-4">
                <button
                    className="bg-green-500 text-white p-2 rounded-md"
                    onClick={() => gerarLevantamento()}
                >
                    Gerar Levantamento
                </button>

                <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() => resetarFormulario()}
                >
                    Resetar
                </button>
            </div>

            {levantamento && (
                <div className="mt-5 p-4 rounded-md">
                    <label className="text-lg font-bold">Levantamento Gerado:</label>
                    <pre className="mt-2 whitespace-pre-line">{levantamento}</pre>
                </div>
            )}
        </div>
    );
};

export default Formulario;
