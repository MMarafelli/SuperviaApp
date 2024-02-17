// src/components/CalcTintaEsfera.js
import { useState } from 'react';

const CalcTintaEsfera = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [idade, setIdade] = useState('');
    const [resultado, setResultado] = useState('');

    const handleButtonClick = () => {
        // Lógica para gerar o texto na caixa abaixo
        const textoResultado = `Nome: ${nome}, Sobrenome: ${sobrenome}, Idade: ${idade}`;
        setResultado(textoResultado);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <label className="block mb-2 text-lg font-bold text-gray-800">Nome:</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label className="block mb-2 text-lg font-bold text-gray-800">Sobrenome:</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                    />

                    <label className="block mb-2 text-lg font-bold text-gray-800">Idade:</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded-md"
                        onClick={handleButtonClick}
                    >
                        Gerar Resultado
                    </button>

                    {resultado && (
                        <div className="mt-4">
                            <label className="block mb-2 text-lg font-bold text-gray-800">Resultado:</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={resultado}
                                readOnly
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalcTintaEsfera;