export interface TintaEsferaCard {
    id: string;
    resumo: string;
    data: {
        quantidade: number;
        cor: string;
        data: string;
        nomeEstrada?: string;
    };
    show: boolean;
}

export interface OpcaoSelect {
    valor: string;
    label: string;
}
