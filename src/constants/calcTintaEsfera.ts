/**
 * Constantes do módulo CalcTintaEsfera
 */

export const BREAKPOINT_MOBILE = 900;

export const DEFAULT_LARGURA = '0.10';

export const OPÇÕES_LARGURA = [
    { valor: '', label: 'Selecione...' },
    { valor: '0.10', label: '0.10' },
    { valor: '0.15', label: '0.15' },
] as const;

export const OPÇÕES_TACHA = [
    { valor: '', label: 'Selecione...' },
    { valor: 'Tacha monodirecional', label: 'Tacha monodirecional' },
    { valor: 'Tacha bidirecional', label: 'Tacha bidirecional' },
    { valor: 'Tachão monodirecional', label: 'Tachão monodirecional' },
    { valor: 'Tachão bidirecional', label: 'Tachão bidirecional' },
] as const;

export const ESTADOS_BRASIL = [
    { valor: '', label: 'Selecione um estado' },
    { valor: 'AC', label: 'Acre' },
    { valor: 'AL', label: 'Alagoas' },
    { valor: 'AP', label: 'Amapá' },
    { valor: 'AM', label: 'Amazonas' },
    { valor: 'BA', label: 'Bahia' },
    { valor: 'CE', label: 'Ceará' },
    { valor: 'DF', label: 'Distrito Federal' },
    { valor: 'ES', label: 'Espírito Santo' },
    { valor: 'GO', label: 'Goiás' },
    { valor: 'MA', label: 'Maranhão' },
    { valor: 'MT', label: 'Mato Grosso' },
    { valor: 'MS', label: 'Mato Grosso do Sul' },
    { valor: 'MG', label: 'Minas Gerais' },
    { valor: 'PA', label: 'Pará' },
    { valor: 'PB', label: 'Paraíba' },
    { valor: 'PR', label: 'Paraná' },
    { valor: 'PE', label: 'Pernambuco' },
    { valor: 'PI', label: 'Piauí' },
    { valor: 'RJ', label: 'Rio de Janeiro' },
    { valor: 'RN', label: 'Rio Grande do Norte' },
    { valor: 'RS', label: 'Rio Grande do Sul' },
    { valor: 'RO', label: 'Rondônia' },
    { valor: 'RR', label: 'Roraima' },
    { valor: 'SC', label: 'Santa Catarina' },
    { valor: 'SP', label: 'São Paulo' },
    { valor: 'SE', label: 'Sergipe' },
    { valor: 'TO', label: 'Tocantins' },
] as const;

export const EQUIPES = [
    { valor: '', label: 'Selecione uma equipe' },
    { valor: '01', label: '01' },
    { valor: '02', label: '02' },
    { valor: '03', label: '03' },
] as const;

export const MENSAGEM_ERRO_FORMULARIO = 'Favor preencher os campos do formulário';
