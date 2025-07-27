export interface ICampos {
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

export interface ICalculoProps {
    campos: ICampos;
    onResultadoChange: (campo: keyof ICampos, valor: string) => void;
}

export interface IInputFieldProps {
    label: string;
    value: string;
    name: keyof ICampos;
    onChange: (campo: keyof ICampos, valor: string) => void;
    readOnly?: boolean;
    isFocused?: boolean;
    onFocus?: (name: string) => void;
    onBlur?: () => void;
}
