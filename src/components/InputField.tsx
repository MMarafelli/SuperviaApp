import { IInputFieldProps } from '../types/calcConsumo.types';
import { formatDate, formatDateToPtBR } from '../utils/dateUtils';

export const InputField = ({
    label,
    value,
    name,
    onChange,
    readOnly = false,
    isFocused = false,
    onFocus,
    onBlur
}: IInputFieldProps) => {
    const labelClass = value 
        ? 'input-label-active' 
        : (isFocused ? 'input-label-focus' : 'input-label-inactive');

    const isDateField = name === 'diaMesAno';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDateField) {
            // Para campos de data, converte para o formato brasileiro antes de salvar
            onChange(name, formatDateToPtBR(e.target.value));
        } else {
            onChange(name, e.target.value);
        }
    };

    const displayValue = isDateField 
        ? (value ? formatDate(value) : '') 
        : value;

    return (
        <div className="interacaoBox flex flex-col lg:mr-2">
            <label className={`input-label ${labelClass}`}>
                {label}
            </label>
            <input
                type={isDateField ? "date" : "text"}
                placeholder=" "
                value={displayValue}
                onChange={handleChange}
                onFocus={() => onFocus?.(name)}
                onBlur={onBlur}
                readOnly={readOnly}
            />
        </div>
    );
};
