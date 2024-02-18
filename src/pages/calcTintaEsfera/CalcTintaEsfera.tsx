// Formulario.js
import { useState } from 'react';

const Formulario = () => {
    const [sentido, setSentido] = useState('');
    const [kmInicial, setKmInicial] = useState('');
    const [mesDiaAno, setMesDiaAno] = useState('');
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
      
        return xNumber * yNumber;
    };

    const gerarLevantamento = () => {
        const textoLevantamento = `
      Sentido: ${sentido},
      KM Inicial: ${kmInicial},
      KM Final: ${kmFinal},
      mesDiaAno: ${mesDiaAno},
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
                        type="text"
                        className="p-2 border border-gray-300 rounded-md mb-2 lg:mr-2"
                        placeholder="mesDiaAno"
                        value={mesDiaAno}
                        onChange={(e) => setMesDiaAno(e.target.value)}
                    />
                </div>
            </div>

            <div className="border-gray-300 border p-4 mb-4">
                <label className="text-lg font-bold">Segundo Quadro:</label>
                <table className="w-full border border-collapse mt-2">
                    <thead>
                        <tr>
                            <th className="border p-2">branco</th>
                            <th className="border p-2">ESPESSURA</th>
                            <th className="border p-2">COMPRIMENTO (m)</th>
                            <th className="border p-2">M²</th>
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
                                    onChange={(e) => setDireitoY(e.target.value)}
                                />
                            </td>
                            <td className="border p-2">{calcularM2(direitoX, direitoY)}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">BORDO ESQUERDO(estático)</td>
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
                            <td className="border p-2">EIXO 4X4(estático)</td>
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
                                    onChange={(e) => setEixo4x4Y(e.target.value)}
                                />
                            </td>
                            <td className="border p-2">{calcularM2(eixo4x4X, eixo4x4Y)}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">EIXO 2X2(estático)</td>
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
                                    onChange={(e) => setEixo2x2Y(e.target.value)}
                                />
                            </td>
                            <td className="border p-2">{calcularM2(eixo2x2X, eixo2x2Y)}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">ALÇA(estático)</td>
                            <td className="border p-2">
                                <select value={alcaX} onChange={(e) => setAlcaX(e.target.value)}>
                                    <option value="0.10">0.10</option>
                                    <option value="0.15">0.15</option>
                                </select>
                            </td>
                            <td className="border p-2">
                                <input type="text" value={alcaY} onChange={(e) => setAlcaY(e.target.value)} />
                            </td>
                            <td className="border p-2">{calcularM2(alcaX, alcaY)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="border-gray-300 border p-4 mb-4">
                <label className="text-lg font-bold">Terceiro Quadro:</label>
                <div className="mt-2">
                    <label>Consumo:</label>
                    <div className="flex space-x-4 mt-2">
                        <div>
                            <label>Esfera(Kg)</label>
                            <input
                                type="text"
                                className="p-2 border border-gray-300 rounded-md"
                                value={esfera}
                                onChange={(e) => setEsfera(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>TINTA (baldes)</label>
                            <input
                                type="text"
                                className="p-2 border border-gray-300 rounded-md"
                                value={tinta}
                                onChange={(e) => setTinta(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
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
