import { useMemo } from 'react';

export interface CamposFormulario {
  estado: string;
  equipe: string;
  nomeEstrada: string;
  kmInicial: string;
  diaMesAno: string;
  kmFinal: string;
  esquerdoX: string;
  esquerdoY: string;
  esquerdoZ: string;
  esquerdoTipoTacha: string;
  esquerdoQtdTacha: string;
  direitoX: string;
  direitoY: string;
  direitoZ: string;
  direitoTipoTacha: string;
  direitoQtdTacha: string;
  eixo4x12X: string;
  eixo4x12Y: string;
  eixo4x12Z: string;
  eixo4x12TipoTacha: string;
  eixo4x12QtdTacha: string;
  eixo2x2X: string;
  eixo2x2Y: string;
  eixo2x2Z: string;
  eixo2x2TipoTacha: string;
  eixo2x2QtdTacha: string;
  alcaX: string;
  alcaY: string;
  alcaZ: string;
  alcaTipoTacha: string;
  alcaQtdTacha: string;
  totalMetrosPista: string;
  esfera: string;
  resultadoEsferas: string;
  tinta: string;
  resultadoTinta: string;
  remocao: string;
}

/**
 * Hook para gerenciar o localStorage de forma segura
 */
export const useLocalStorage = () => {
  const getStorageItem = (key: string): string => {
    try {
      return localStorage.getItem(key) || '';
    } catch (error) {
      console.error(`Erro ao acessar localStorage para ${key}:`, error);
      return '';
    }
  };

  const setStorageItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Erro ao salvar no localStorage para ${key}:`, error);
    }
  };

  return { getStorageItem, setStorageItem };
};

/**
 * Hook customizado para o formulário de Tinta e Esfera
 */
export const useFormularioTintaEsfera = () => {
  const { getStorageItem } = useLocalStorage();
  const isDev = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  const initialState = useMemo((): CamposFormulario => ({
    estado: getStorageItem('estado'),
    equipe: getStorageItem('equipe'),
    nomeEstrada: getStorageItem('nomeEstrada'),
    kmInicial: getStorageItem('kmInicial'),
    diaMesAno: getStorageItem('diaMesAno'),
    kmFinal: getStorageItem('kmFinal'),
    esquerdoX: getStorageItem('esquerdoX'),
    esquerdoY: getStorageItem('esquerdoY'),
    esquerdoZ: getStorageItem('esquerdoZ'),
    esquerdoTipoTacha: getStorageItem('esquerdoTipoTacha'),
    esquerdoQtdTacha: getStorageItem('esquerdoQtdTacha'),
    direitoX: getStorageItem('direitoX'),
    direitoY: getStorageItem('direitoY'),
    direitoZ: getStorageItem('direitoZ'),
    direitoTipoTacha: getStorageItem('direitoTipoTacha'),
    direitoQtdTacha: getStorageItem('direitoQtdTacha'),
    eixo4x12X: getStorageItem('eixo4x12X'),
    eixo4x12Y: getStorageItem('eixo4x12Y'),
    eixo4x12Z: getStorageItem('eixo4x12Z'),
    eixo4x12TipoTacha: getStorageItem('eixo4x12TipoTacha'),
    eixo4x12QtdTacha: getStorageItem('eixo4x12QtdTacha'),
    eixo2x2X: getStorageItem('eixo2x2X'),
    eixo2x2Y: getStorageItem('eixo2x2Y'),
    eixo2x2Z: getStorageItem('eixo2x2Z'),
    eixo2x2TipoTacha: getStorageItem('eixo2x2TipoTacha'),
    eixo2x2QtdTacha: getStorageItem('eixo2x2QtdTacha'),
    alcaX: getStorageItem('alcaX'),
    alcaY: getStorageItem('alcaY'),
    alcaZ: getStorageItem('alcaZ'),
    alcaTipoTacha: getStorageItem('alcaTipoTacha'),
    alcaQtdTacha: getStorageItem('alcaQtdTacha'),
    totalMetrosPista: getStorageItem('totalMetrosPista'),
    esfera: getStorageItem('esfera'),
    resultadoEsferas: getStorageItem('resultadoEsferas'),
    tinta: getStorageItem('tinta'),
    resultadoTinta: getStorageItem('resultadoTinta'),
    remocao: getStorageItem('remocao'),
  }), [isDev, getStorageItem]);

  return { initialState, isDev };
};
