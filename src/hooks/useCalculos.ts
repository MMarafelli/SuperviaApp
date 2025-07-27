import { useMemo } from 'react';
import { ICampos } from '../types/calcConsumo.types';

export const useCalculos = (campos: ICampos) => {
    const handleNaN = (value: number) => isNaN(value) ? 0 : value;

    const resultadoEsferas = useMemo(() => {
        const direitoZNumber = handleNaN(parseFloat(campos.direitoZ));
        const esquerdoZNumber = handleNaN(parseFloat(campos.esquerdoZ));
        const eixo2x2ZNumber = handleNaN(parseFloat(campos.eixo2x2Z));
        const eixo4x12ZNumber = handleNaN(parseFloat(campos.eixo4x12Z));
        const alcaZNumber = handleNaN(parseFloat(campos.alcaZ));
        const esferaNumber = handleNaN(parseFloat(campos.esfera));

        const denominador =
            direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x12ZNumber + alcaZNumber;

        if (denominador === 0 || esferaNumber === 0) {
            return '';
        }

        const resultado = esferaNumber / denominador;
        return Math.ceil(resultado * 100) / 100;
    }, [
        campos.direitoZ,
        campos.esquerdoZ,
        campos.eixo2x2Z,
        campos.eixo4x12Z,
        campos.alcaZ,
        campos.esfera
    ]);

    const resultadoTinta = useMemo(() => {
        const direitoZNumber = handleNaN(parseFloat(campos.direitoZ));
        const esquerdoZNumber = handleNaN(parseFloat(campos.esquerdoZ));
        const eixo2x2ZNumber = handleNaN(parseFloat(campos.eixo2x2Z));
        const eixo4x12ZNumber = handleNaN(parseFloat(campos.eixo4x12Z));
        const alcaZNumber = handleNaN(parseFloat(campos.alcaZ));
        const tintaNumber = handleNaN(parseFloat(campos.tinta));

        const numerador =
            direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x12ZNumber + alcaZNumber;

        if (tintaNumber === 0) {
            return '';
        }

        const resultado = numerador / tintaNumber;
        return Math.ceil(resultado * 100) / 100;
    }, [
        campos.direitoZ,
        campos.esquerdoZ,
        campos.eixo2x2Z,
        campos.eixo4x12Z,
        campos.alcaZ,
        campos.tinta
    ]);

    return {
        resultadoEsferas: resultadoEsferas.toString(),
        resultadoTinta: resultadoTinta.toString()
    };
};
