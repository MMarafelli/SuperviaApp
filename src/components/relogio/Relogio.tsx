import { useState, useEffect } from 'react';

function Relogio() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourRotation = (360 / 12) * hours + (360 / 12) * (minutes / 60);
    const minuteRotation = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
    const secondRotation = (360 / 60) * seconds;

    const radius = 130; // Novo raio

    // Criando os números romanos para cada hora
    const romanNumerals = Array.from({ length: 12 }, (_, index) => toRoman(index + 1));

    function toRoman(num: number): string {
        const romanNumerals = [
            'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
        ];

        return romanNumerals[num - 1];
    }

    return (
        <div className="div-geral-do-relogio relative">
            <svg viewBox="0 0 260 260" className="relogio-svg"> {/* Ajuste da viewBox para acomodar o novo raio */}
                <circle cx="130" cy="130" r={radius} fill="transparent" stroke="black" strokeWidth="2" />

                {/* Adicionando os algarismos romanos */}
                {romanNumerals.map((numeral, index) => (
                    <text
                        key={index}
                        x={130 + (radius - 20) * Math.sin((index * 360) / 12 * (Math.PI / 180))}
                        y={130 - (radius - 20) * Math.cos((index * 360) / 12 * (Math.PI / 180))}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize={(20).toString()}
                        fill="black"
                    >
                        {numeral}
                    </text>
                ))}

                {/* Adicionando os ponteiros do relógio */}
                <line
                    x1="130"
                    y1="130"
                    x2="130"
                    y2="80"
                    transform={`rotate(${hourRotation} 130 130)`}
                    stroke="black"
                    strokeWidth="4"
                />
                <line
                    x1="130"
                    y1="130"
                    x2="130"
                    y2="70"
                    transform={`rotate(${minuteRotation} 130 130)`}
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1="130"
                    y1="130"
                    x2="130"
                    y2="60"
                    transform={`rotate(${secondRotation} 130 130)`}
                    stroke="#ffcc29"
                    strokeWidth="1"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                {`${hours}:${minutes}:${seconds}`}
            </div>
        </div>
    );
}

export default Relogio;
