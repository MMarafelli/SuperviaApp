import { useMemo, useCallback } from 'react';

interface CamposCalculo {
  direitoX?: string;
  direitoY?: string;
  direitoZ?: string;
  esquerdoX?: string;
  esquerdoY?: string;
  esquerdoZ?: string;
  eixo4x12X?: string;
  eixo4x12Y?: string;
  eixo4x12Z?: string;
  eixo2x2X?: string;
  eixo2x2Y?: string;
  eixo2x2Z?: string;
  alcaX?: string;
  alcaY?: string;
  alcaZ?: string;
  totalMetrosPista?: string;
}

export const useOptimizedCalculations = (campos: CamposCalculo) => {
  // Memoizar os campos que devem ser atualizados
  const fieldsToUpdate = useMemo(() => {
    const fields: string[] = [];
    
    if (campos.direitoX || campos.direitoY) fields.push('direito');
    if (campos.esquerdoX || campos.esquerdoY) fields.push('esquerdo');
    if (campos.eixo4x12X || campos.eixo4x12Y) fields.push('eixo4x12');
    if (campos.eixo2x2X || campos.eixo2x2Y) fields.push('eixo2x2');
    if (campos.alcaX || campos.alcaY) fields.push('alca');
    
    return fields;
  }, [
    campos.direitoX, campos.direitoY,
    campos.esquerdoX, campos.esquerdoY,
    campos.eixo4x12X, campos.eixo4x12Y,
    campos.eixo2x2X, campos.eixo2x2Y,
    campos.alcaX, campos.alcaY
  ]);

  // Função otimizada para calcular M²
  const calcularM2 = useCallback((x: string, y: string): number => {
    const xNumber = parseFloat(x);
    const yNumber = parseFloat(y);

    if (isNaN(xNumber) || isNaN(yNumber)) {
      return 0;
    }

    const result = xNumber * yNumber;
    return Math.ceil(result * 100) / 100; // Arredonda para cima com duas casas decimais
  }, []);

  // Função para calcular área com multiplicadores específicos
  const calcularAreaComMultiplicador = useCallback((campo: string, x: string, y: string): string => {
    const xNumber = parseFloat(x) || 0;
    let yNumber = parseFloat(y) || 0;
    
    // Aplicar multiplicadores específicos
    if (campo === 'eixo4x12') yNumber = yNumber * 4;
    if (campo === 'eixo2x2') yNumber = yNumber * 2;
    
    const resultado = calcularM2(xNumber.toString(), yNumber.toString());
    return resultado === 0 ? '' : resultado.toString();
  }, [calcularM2]);

  // Função otimizada para calcular total de metros da pista
  const calcularTotalMetrosPista = useCallback(() => {
    const handleNaN = (value: number) => isNaN(value) ? 0 : value;
    
    const direitoZNumber = handleNaN(parseFloat(campos.direitoZ || '0'));
    const esquerdoZNumber = handleNaN(parseFloat(campos.esquerdoZ || '0'));
    const eixo2x2ZNumber = handleNaN(parseFloat(campos.eixo2x2Z || '0'));
    const eixo4x12ZNumber = handleNaN(parseFloat(campos.eixo4x12Z || '0'));
    const alcaZNumber = handleNaN(parseFloat(campos.alcaZ || '0'));
    
    const total = direitoZNumber + esquerdoZNumber + eixo2x2ZNumber + eixo4x12ZNumber + alcaZNumber;
    return Math.ceil(total * 100) / 100;
  }, [campos.direitoZ, campos.esquerdoZ, campos.eixo2x2Z, campos.eixo4x12Z, campos.alcaZ]);

  // Verificar se os cálculos devem ser executados
  const shouldRecalculate = useMemo(() => {
    return fieldsToUpdate.length > 0;
  }, [fieldsToUpdate]);

  return {
    fieldsToUpdate,
    calcularM2,
    calcularAreaComMultiplicador,
    calcularTotalMetrosPista,
    shouldRecalculate,
  };
};
