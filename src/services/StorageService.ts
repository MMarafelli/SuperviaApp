import { ICampos } from '../types/calcConsumo.types';

export interface IConsumoCard extends ICampos {
  id: string;
  show: boolean;
}

export const StorageService = {
  /**
   * Se isDev=true, sempre retorna defaultValue.
   * Caso contrário tenta ler do localStorage e, se não existir ou for string vazia, retorna defaultValue.
   */
  getItem: (
    key: string,
    defaultValue: string = '',
    isDev: boolean = false
  ): string => {
    try {
      if (isDev) {
        return defaultValue;
      }
      const value = localStorage.getItem(key);
      return value && value.trim() !== '' ? value : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  getConsumoCards: (): IConsumoCard[] => {
    try {
      const cards = localStorage.getItem('consumoCards');
      return cards ? JSON.parse(cards) : [];
    } catch (error) {
      console.error('Erro ao obter consumoCards:', error);
      return [];
    }
  },

  saveConsumoCards: (cards: IConsumoCard[]): void => {
    try {
      localStorage.setItem('consumoCards', JSON.stringify(cards));
    } catch (error) {
      console.error('Erro ao salvar consumoCards:', error);
    }
  },

  addConsumoCard: (card: IConsumoCard): void => {
    const cards = StorageService.getConsumoCards();
    cards.push(card);
    StorageService.saveConsumoCards(cards);
  },

  updateConsumoCard: (
    id: string,
    updatedCard: Partial<IConsumoCard>
  ): void => {
    const cards = StorageService.getConsumoCards();
    const idx = cards.findIndex((c) => c.id === id);
    if (idx !== -1) {
      cards[idx] = { ...cards[idx], ...updatedCard };
      StorageService.saveConsumoCards(cards);
    }
  },

  hideConsumoCard: (id: string): void => {
    StorageService.updateConsumoCard(id, { show: false });
  },

  /**
   * Cria o estado inicial de ICampos.
   * Cada campo passa o mesmo isDev que veio por parâmetro:
   *   • isDev=true → sempre default
   *   • isDev=false → tenta ler do localStorage
   */
  getInitialState: (isDev: boolean): ICampos => {
    //

    if (isDev) {
      // DEV: sempre retorna valores fixos para teste
      return {
        estado: 'MG',
        equipe: '01',
        nomeEstrada: 'Estrada Teste',
        kmInicial: '10.00',
        diaMesAno: '2025-07-26',
        kmFinal: '20.00',
        esquerdoX: '0.10',
        esquerdoY: '100.00',
        esquerdoZ: '10.00',
        esquerdoTipoTacha: 'Tacha monodirecional',
        esquerdoQtdTacha: '10',
        direitoX: '0.10',
        direitoY: '150.00',
        direitoZ: '15.00',
        direitoTipoTacha: 'Tacha bidirecional',
        direitoQtdTacha: '15',
        eixo4x12X: '0.10',
        eixo4x12Y: '20',
        eixo4x12Z: '2.00',
        eixo4x12TipoTacha: 'Tacha monodirecional',
        eixo4x12QtdTacha: '5',
        eixo2x2X: '0.10',
        eixo2x2Y: '10',
        eixo2x2Z: '1.00',
        eixo2x2TipoTacha: 'Tacha bidirecional',
        eixo2x2QtdTacha: '3',
        alcaX: '0.10',
        alcaY: '50.00',
        alcaZ: '5.00',
        alcaTipoTacha: 'Tachão monodirecional',
        alcaQtdTacha: '8',
        totalMetrosPista: '33.00',
        esfera: '10.00',
        resultadoEsferas: '',
        tinta: '5.00',
        resultadoTinta: '',
        remocao: '2',
      };
    }
    // PROD: sempre busca do localStorage ou default, nunca usa isDev
    return {
      estado: StorageService.getItem('estado', '', false),
      equipe: StorageService.getItem('equipe', '', false),
      nomeEstrada: StorageService.getItem('nomeEstrada', '', false),
      kmInicial: StorageService.getItem('kmInicial', '', false),
      diaMesAno: StorageService.getItem('diaMesAno', '', false),
      kmFinal: StorageService.getItem('kmFinal', '', false),
      esquerdoX: StorageService.getItem('esquerdoX', '', false),
      esquerdoY: StorageService.getItem('esquerdoY', '', false),
      esquerdoZ: StorageService.getItem('esquerdoZ', '', false),
      esquerdoTipoTacha: StorageService.getItem('esquerdoTipoTacha', '', false),
      esquerdoQtdTacha: StorageService.getItem('esquerdoQtdTacha', '', false),
      direitoX: StorageService.getItem('direitoX', '', false),
      direitoY: StorageService.getItem('direitoY', '', false),
      direitoZ: StorageService.getItem('direitoZ', '', false),
      direitoTipoTacha: StorageService.getItem('direitoTipoTacha', '', false),
      direitoQtdTacha: StorageService.getItem('direitoQtdTacha', '', false),
      eixo4x12X: StorageService.getItem('eixo4x12X', '', false),
      eixo4x12Y: StorageService.getItem('eixo4x12Y', '', false),
      eixo4x12Z: StorageService.getItem('eixo4x12Z', '', false),
      eixo4x12TipoTacha: StorageService.getItem('eixo4x12TipoTacha', '', false),
      eixo4x12QtdTacha: StorageService.getItem('eixo4x12QtdTacha', '', false),
      eixo2x2X: StorageService.getItem('eixo2x2X', '', false),
      eixo2x2Y: StorageService.getItem('eixo2x2Y', '', false),
      eixo2x2Z: StorageService.getItem('eixo2x2Z', '', false),
      eixo2x2TipoTacha: StorageService.getItem('eixo2x2TipoTacha', '', false),
      eixo2x2QtdTacha: StorageService.getItem('eixo2x2QtdTacha', '', false),
      alcaX: StorageService.getItem('alcaX', '', false),
      alcaY: StorageService.getItem('alcaY', '', false),
      alcaZ: StorageService.getItem('alcaZ', '', false),
      alcaTipoTacha: StorageService.getItem('alcaTipoTacha', '', false),
      alcaQtdTacha: StorageService.getItem('alcaQtdTacha', '', false),
      totalMetrosPista: StorageService.getItem('totalMetrosPista', '', false),
      esfera: StorageService.getItem('esfera', '', false),
      resultadoEsferas: StorageService.getItem('resultadoEsferas', '', false),
      tinta: StorageService.getItem('tinta', '', false),
      resultadoTinta: StorageService.getItem('resultadoTinta', '', false),
      remocao: StorageService.getItem('remocao', '', false),
    };
  },
};
