/**
 * Utilitários para validação e comparação de strings
 */

/**
 * Verifica se um valor está vazio ou é zero (string)
 */
export const isEmptyOrZero = (value?: string): boolean => {
  return !value || value.trim() === '' || value === '0';
};

/**
 * Verifica se um valor não está vazio e não é zero
 */
export const isNotEmptyAndNotZero = (value?: string): boolean => {
  return !isEmptyOrZero(value);
};

/**
 * Verifica se um tipo de tacha corresponde ao tipo esperado
 */
export const isTachaType = (tipoTacha: string, expectedType: string): boolean => {
  return tipoTacha === expectedType;
};

/**
 * Verifica se um campo de quantidade tem valor válido
 */
export const hasValidQuantity = (qtdTacha: string): boolean => {
  return isNotEmptyAndNotZero(qtdTacha);
};

/**
 * Tipos de tacha disponíveis
 */
export const TACHA_TYPES = {
  MONO: 'Tacha monodirecional',
  BI: 'Tacha bidirecional',
  TACHAO_MONO: 'Tachão monodirecional',
  TACHAO_BI: 'Tachão bidirecional',
} as const;

/**
 * Verifica se há tachas de um tipo específico nos campos
 */
export const hasTachaOfType = (
  campos: Record<string, string>,
  tachaType: string,
  areas: string[]
): boolean => {
  return areas.some(area => 
    isTachaType(campos[`${area}TipoTacha`], tachaType) && 
    hasValidQuantity(campos[`${area}QtdTacha`])
  );
};
