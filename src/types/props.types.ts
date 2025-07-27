export interface PageTitleProps {
    title: string;
}

export interface InputFieldProps {
    label: string;
    value: string;
    name: string;
    onChange: (campo: string, valor: string) => void;
    readOnly?: boolean;
    isFocused?: boolean;
    onFocus?: (inputName: string) => void;
    onBlur?: () => void;
}

export interface LoadingScreenProps {
    message?: string;
}
