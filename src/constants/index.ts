export const STORAGE_KEYS = {
    TINTA_ESFERA_CARDS: 'tintaEsferaCards',
    ESTADO: 'estado',
    EQUIPE: 'equipe',
    NOME_ESTRADA: 'nomeEstrada',
    KM_INICIAL: 'kmInicial',
    DATA: 'diaMesAno',
    KM_FINAL: 'kmFinal'
} as const;

export const ROUTE_PATHS = {
    HOME: '/SuperviaApp',
    CALC_TINTA_ESFERA: '/SuperviaApp/calcTintaEsfera',
    CALC_CONSUMO: '/SuperviaApp/calcConsumo',
    ABOUT: '/SuperviaApp/about'
} as const;
